import { NextRequest, NextResponse } from "next/server";
import { razorpay, PREMIUM_PRICE_INR } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { tripId, userId } = await req.json();

    const order = await razorpay.orders.create({
      amount: PREMIUM_PRICE_INR * 100,
      currency: "INR",
      receipt: `trip_${tripId ?? "guest"}_${Date.now()}`,
      notes: { tripId: tripId ?? "", userId: userId ?? "" },
    });

    await prisma.payment.create({
      data: {
        userId,
        tripId,
        razorpayOrderId: order.id,
        amount: PREMIUM_PRICE_INR,
        status: "CREATED",
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error("create-order error", err);
    return NextResponse.json({ success: false, error: "Could not create payment order" }, { status: 500 });
  }
}
