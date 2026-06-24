"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

declare global {
  interface Window { Razorpay: any; }
}

const freeFeatures = ["AI day-wise itinerary", "Basic budget estimate", "Places to visit & food tips"];
const premiumFeatures = ["Detailed itinerary", "Hotel suggestions", "Restaurant suggestions", "PDF download", "Hidden places", "Travel hacks"];

export default function PricingPage() {
  async function handleUpgrade(tripId?: string) {
    const res = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tripId }),
    });
    const data = await res.json();
    if (!data.success) return alert(data.error || "Could not start payment");

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "TourAI",
        description: "Premium Trip Plan",
        handler: () => alert("Payment successful! Premium features unlocked for this trip."),
        theme: { color: "#175fed" },
      });
      rzp.open();
    };
    document.body.appendChild(script);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-bold text-slate-900">Simple, Pay-Per-Trip Pricing</h1>
      <p className="mt-2 text-center text-slate-600">No subscriptions. Pay only when you want premium details.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <CardTitle>Free</CardTitle>
            <div className="mt-2 text-3xl font-bold text-slate-900">₹0</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {freeFeatures.map((f) => <li key={f} className="flex items-center gap-2"><Check size={16} className="text-brand-600" /> {f}</li>)}
            </ul>
            <a href="/planner"><Button variant="outline" className="mt-6 w-full">Start Free</Button></a>
          </CardContent>
        </Card>
        <Card className="border-brand-600 ring-1 ring-brand-600">
          <CardContent className="pt-6">
            <CardTitle>Premium <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-600">Per Trip</span></CardTitle>
            <div className="mt-2 text-3xl font-bold text-slate-900">₹99 <span className="text-base font-normal text-slate-500">/ trip</span></div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {premiumFeatures.map((f) => <li key={f} className="flex items-center gap-2"><Check size={16} className="text-brand-600" /> {f}</li>)}
            </ul>
            <Button className="mt-6 w-full" onClick={() => handleUpgrade()}>Upgrade Now</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
