import type { Metadata } from "next";
import { PlannerForm } from "@/components/planner/planner-form";

export const metadata: Metadata = {
  title: "AI Tour Planner",
  description: "Generate a complete day-wise travel itinerary with AI in seconds.",
};

export default function PlannerPage({ searchParams }: { searchParams: Record<string, string> }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">AI Tour Planner</h1>
      <p className="mt-2 text-slate-600">Tell us about your trip and let AI build your itinerary.</p>
      <div className="mt-8">
        <PlannerForm initial={searchParams} />
      </div>
    </div>
  );
}
