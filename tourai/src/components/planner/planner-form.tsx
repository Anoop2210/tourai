"use client";

import { useState } from "react";
import { Input, Label, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ItineraryResult } from "@/components/planner/itinerary-result";

export type ItineraryData = {
  tripSummary: string;
  bestTimeToVisit: string;
  weather: { season: string; tempRangeC: string; notes: string };
  dayWisePlan: { day: number; title: string; activities: string[]; meals: string[]; estimatedCost: number }[];
  placesToVisit: { name: string; description: string; category: string }[];
  foodRecommendations: { dish: string; where: string }[];
  packingSuggestions: string[];
  travelTips: string[];
};

export function PlannerForm({ initial }: { initial: Record<string, string> }) {
  const [form, setForm] = useState({
    startingCity: initial.startingCity || "",
    destination: initial.destination || "",
    tripType: "SOLO",
    travelers: initial.travelers || "2",
    days: initial.days || "5",
    budget: initial.budget || "20000",
    travelMode: "FLIGHT",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ItineraryData | null>(null);
  const [tripId, setTripId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          travelers: Number(form.travelers),
          days: Number(form.days),
          budget: Number(form.budget),
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to generate plan");
      setResult(data.result);
      setTripId(data.tripId);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-1 lg:sticky lg:top-24 self-start">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Starting City</Label>
              <Input required value={form.startingCity} onChange={(e) => setForm({ ...form, startingCity: e.target.value })} />
            </div>
            <div>
              <Label>Destination</Label>
              <Input required value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
            </div>
            <div>
              <Label>Trip Type</Label>
              <Select value={form.tripType} onChange={(e) => setForm({ ...form, tripType: e.target.value })}>
                <option value="SOLO">Solo</option>
                <option value="COUPLE">Couple</option>
                <option value="FAMILY">Family</option>
                <option value="FRIENDS">Friends</option>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Travelers</Label>
                <Input required type="number" min={1} max={20} value={form.travelers} onChange={(e) => setForm({ ...form, travelers: e.target.value })} />
              </div>
              <div>
                <Label>Days</Label>
                <Input required type="number" min={1} max={30} value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Budget (₹)</Label>
              <Input required type="number" min={500} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
            </div>
            <div>
              <Label>Travel Mode</Label>
              <Select value={form.travelMode} onChange={(e) => setForm({ ...form, travelMode: e.target.value })}>
                <option value="FLIGHT">Flight</option>
                <option value="TRAIN">Train</option>
                <option value="BUS">Bus</option>
                <option value="CAR">Car</option>
              </Select>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <><Loader2 className="animate-spin" size={16} /> Generating...</> : "Generate Plan"}
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        {!result && !loading && (
          <div className="grid h-full place-items-center rounded-2xl border border-dashed border-slate-300 p-16 text-center text-slate-400">
            Fill the form to generate your AI-powered trip plan.
          </div>
        )}
        {loading && (
          <div className="grid h-full place-items-center rounded-2xl border border-slate-200 p-16 text-center text-slate-500">
            <Loader2 className="mx-auto mb-3 animate-spin" /> Crafting your itinerary...
          </div>
        )}
        {result && <ItineraryResult data={result} tripId={tripId} />}
      </div>
    </div>
  );
}
