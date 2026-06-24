"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function HeroForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    startingCity: "",
    destination: "",
    days: "5",
    travelers: "2",
    budget: "20000",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(form);
    router.push(`/planner?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 grid max-w-4xl gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:grid-cols-5 sm:items-end"
    >
      <div className="sm:col-span-1">
        <Label>Starting City</Label>
        <Input required placeholder="Delhi" value={form.startingCity} onChange={(e) => setForm({ ...form, startingCity: e.target.value })} />
      </div>
      <div className="sm:col-span-1">
        <Label>Destination</Label>
        <Input required placeholder="Goa" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
      </div>
      <div className="sm:col-span-1">
        <Label>Days</Label>
        <Input required type="number" min={1} max={30} value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
      </div>
      <div className="sm:col-span-1">
        <Label>Travelers</Label>
        <Input required type="number" min={1} max={20} value={form.travelers} onChange={(e) => setForm({ ...form, travelers: e.target.value })} />
      </div>
      <div className="sm:col-span-1">
        <Label>Budget (₹)</Label>
        <Input required type="number" min={500} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
      </div>
      <div className="sm:col-span-5">
        <Button type="submit" size="lg" className="w-full">Generate Plan</Button>
      </div>
    </form>
  );
}
