"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, MapPin, Crown } from "lucide-react";

type Trip = {
  id: string;
  destination: string;
  startingCity: string;
  days: number;
  budget: number;
  tier: string;
  createdAt: string;
};

export default function DashboardPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app this fetches from /api/user/trips with auth.
    // Stubbed here so the dashboard renders out of the box.
    setTrips([]);
    setLoading(false);
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
          <p className="mt-2 text-slate-600">Your saved trips and plans.</p>
        </div>
        <Link href="/planner"><Button>+ New Trip</Button></Link>
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : trips.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <MapPin className="text-slate-300" size={36} />
              <CardTitle className="text-base">No trips yet</CardTitle>
              <p className="text-sm text-slate-500">Generate your first AI itinerary to see it here.</p>
              <Link href="/planner"><Button>Plan a Trip</Button></Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {trips.map((t) => (
              <Card key={t.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{t.startingCity} → {t.destination}</CardTitle>
                    {t.tier === "PREMIUM" && <Crown size={16} className="text-amber-500" />}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{t.days} days · ₹{t.budget}</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm"><FileDown size={14} /> PDF</Button>
                    {t.tier !== "PREMIUM" && (
                      <Link href="/pricing"><Button size="sm">Upgrade</Button></Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
