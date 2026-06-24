import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateBudget } from "@/lib/budget";

const schema = z.object({
  days: z.number().int().min(1).max(30),
  travelers: z.number().int().min(1).max(20),
  travelMode: z.enum(["FLIGHT", "TRAIN", "BUS", "CAR"]).default("FLIGHT"),
});

export async function POST(req: NextRequest) {
  try {
    const { days, travelers, travelMode } = schema.parse(await req.json());
    const result = calculateBudget(days, travelers, travelMode);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
  }
}
