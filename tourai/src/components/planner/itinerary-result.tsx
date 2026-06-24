"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import type { ItineraryData } from "@/components/planner/planner-form";
import { formatINR } from "@/lib/utils";

export function ItineraryResult({ data, tripId }: { data: ItineraryData; tripId: string | null }) {
  async function downloadPdf() {
    const { jsPDF } = await import("jspdf");
    await import("jspdf-autotable");
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("TourAI - Trip Plan", 14, 20);
    doc.setFontSize(11);
    doc.text(data.tripSummary, 14, 30, { maxWidth: 180 });

    let y = 50;
    doc.setFontSize(14);
    doc.text("Day-wise Itinerary", 14, y);
    y += 6;
    (doc as any).autoTable({
      startY: y,
      head: [["Day", "Title", "Activities", "Est. Cost"]],
      body: data.dayWisePlan.map((d) => [d.day, d.title, d.activities.join(", "), formatINR(d.estimatedCost)]),
      styles: { fontSize: 8 },
    });

    doc.save("tourai-trip-plan.pdf");
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Trip Summary</CardTitle>
              <p className="mt-2 text-sm text-slate-600">{data.tripSummary}</p>
            </div>
            <Button variant="outline" size="sm" onClick={downloadPdf}><FileDown size={16} /> PDF</Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase text-slate-400">Best Time to Visit</div>
              <div className="text-sm text-slate-700">{data.bestTimeToVisit}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase text-slate-400">Weather</div>
              <div className="text-sm text-slate-700">{data.weather?.season} · {data.weather?.tempRangeC} · {data.weather?.notes}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <CardTitle>Day-wise Itinerary</CardTitle>
          <div className="mt-4 space-y-4">
            {data.dayWisePlan?.map((d) => (
              <div key={d.day} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-slate-900">Day {d.day}: {d.title}</div>
                  <div className="text-sm font-medium text-brand-600">{formatINR(d.estimatedCost)}</div>
                </div>
                <ul className="mt-2 list-inside list-disc text-sm text-slate-600">
                  {d.activities?.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
                {d.meals?.length > 0 && <div className="mt-2 text-xs text-slate-500">Meals: {d.meals.join(", ")}</div>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <CardTitle>Places to Visit</CardTitle>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {data.placesToVisit?.map((p) => (
                <li key={p.name}><span className="font-medium text-slate-900">{p.name}</span> — {p.description}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <CardTitle>Food Recommendations</CardTitle>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {data.foodRecommendations?.map((f) => (
                <li key={f.dish}><span className="font-medium text-slate-900">{f.dish}</span> — {f.where}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <CardTitle>Packing Suggestions</CardTitle>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600">
              {data.packingSuggestions?.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <CardTitle>Travel Tips</CardTitle>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600">
              {data.travelTips?.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
