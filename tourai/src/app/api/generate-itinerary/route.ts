import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { openai, buildItineraryPrompt } from "@/lib/openai";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  startingCity: z.string().min(1),
  destination: z.string().min(1),
  tripType: z.enum(["SOLO", "COUPLE", "FAMILY", "FRIENDS"]).default("SOLO"),
  travelers: z.number().int().min(1).max(20),
  days: z.number().int().min(1).max(30),
  budget: z.number().int().min(500),
  travelMode: z.enum(["FLIGHT", "TRAIN", "BUS", "CAR"]).default("FLIGHT"),
  userId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = schema.parse(await req.json());

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: buildItineraryPrompt(body) }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const aiResult = JSON.parse(raw);

    const trip = await prisma.trip.create({
      data: {
        userId: body.userId,
        startingCity: body.startingCity,
        destination: body.destination,
        tripType: body.tripType,
        travelers: body.travelers,
        days: body.days,
        budget: body.budget,
        travelMode: body.travelMode,
        aiResult,
      },
    });

    return NextResponse.json({ success: true, tripId: trip.id, result: aiResult });
  } catch (err) {
    console.error("generate-itinerary error", err);
    return NextResponse.json(
      { success: false, error: "Failed to generate itinerary. Please check your input and try again." },
      { status: 500 }
    );
  }
}
