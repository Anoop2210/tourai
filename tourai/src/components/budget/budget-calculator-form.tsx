"use client";

import { useState } from "react";
import { Input, Label, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatINR } from "@/lib/utils";
import type { BudgetResult } from "@/lib/budget";
import { Loader2 } from "lucide-react";

const COLORS = ["#2f7fff", "#58a4ff", "#f59e0b", "#10b981", "#a855f7", "#f43f5e"];

function PieFor({ tier }: { tier: BudgetResult["average"] }) {
  const data = [
    { name: "Travel", value: tier.travel },
    { name: "Hotel", value: tier.hotel },
    { name: "Food", value: tier.food },
    { name: "Activities", value: tier.activities },
    { name: "Local Transport", value: tier.localTransport },
    { name: "Misc", value: tier.misc },
  ];
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip formatter={(v: number) => formatINR(v)} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

function TierTable({ label, tier }: { label: string; tier: BudgetResult["average"] }) {
  const rows: [string, number][] = [
    ["Travel Cost", tier.travel],
    ["Hotel Cost", tier.hotel],
    ["Food Cost", tier.food],
    ["Activities Cost", tier.activities],
    ["Local Transport", tier.localTransport],
    ["Miscellaneous", tier.misc],
  ];
  return (
    <Card>
      <CardContent className="pt-6">
        <CardTitle className="text-base">{label} Budget — {formatINR(tier.total)}</CardTitle>
        <PieFor tier={tier} />
        <table className="mt-3 w-full text-sm">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k} className="border-t border-slate-100">
                <td className="py-1.5 text-slate-600">{k}</td>
                <td className="py-1.5 text-right font-medium text-slate-900">{formatINR(v)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export function BudgetCalculatorForm() {
  const [form, setForm] = useState({ days: "5", travelers: "2", travelMode: "FLIGHT" });
  const [result, setResult] = useState<BudgetResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/budget-calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, days: Number(form.days), travelers: Number(form.travelers) }),
      });
      const data = await res.json();
      if (data.success) setResult(data.result);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-4 sm:items-end">
            <div>
              <Label>Days</Label>
              <Input type="number" min={1} max={30} value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
            </div>
            <div>
              <Label>Travelers</Label>
              <Input type="number" min={1} max={20} value={form.travelers} onChange={(e) => setForm({ ...form, travelers: e.target.value })} />
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
            <Button type="submit" disabled={loading}>{loading ? <Loader2 className="animate-spin" size={16} /> : "Calculate"}</Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="grid gap-6 sm:grid-cols-3">
          <TierTable label="Minimum" tier={result.minimum} />
          <TierTable label="Average" tier={result.average} />
          <TierTable label="Premium" tier={result.premium} />
        </div>
      )}
    </div>
  );
}
