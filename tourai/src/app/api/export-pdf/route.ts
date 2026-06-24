import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const tripId = req.nextUrl.searchParams.get("tripId");
  if (!tripId) return NextResponse.json({ success: false, error: "tripId required" }, { status: 400 });

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip) return NextResponse.json({ success: false, error: "Trip not found" }, { status: 404 });

  return NextResponse.json({ success: true, trip });
}
