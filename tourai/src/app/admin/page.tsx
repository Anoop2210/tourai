import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Users, MapPin, IndianRupee, Crown } from "lucide-react";

async function getMetrics() {
  try {
    const [totalUsers, totalTrips, premiumPurchases, revenueAgg] = await Promise.all([
      prisma.user.count(),
      prisma.trip.count(),
      prisma.payment.count({ where: { status: "PAID" } }),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { status: "PAID" } }),
    ]);
    return { totalUsers, totalTrips, premiumPurchases, revenue: revenueAgg._sum.amount ?? 0 };
  } catch {
    // DB not yet connected/migrated — show zeros instead of crashing the page.
    return { totalUsers: 0, totalTrips: 0, premiumPurchases: 0, revenue: 0 };
  }
}

export default async function AdminPage() {
  const metrics = await getMetrics();

  const cards = [
    { label: "Total Users", value: metrics.totalUsers, icon: Users },
    { label: "Total Trips Generated", value: metrics.totalTrips, icon: MapPin },
    { label: "Revenue", value: `₹${metrics.revenue}`, icon: IndianRupee },
    { label: "Premium Purchases", value: metrics.premiumPurchases, icon: Crown },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
      <p className="mt-2 text-slate-600">Platform metrics and management.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600"><c.icon size={18} /></span>
              <div>
                <div className="text-2xl font-bold text-slate-900">{c.value}</div>
                <div className="text-xs text-slate-500">{c.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {["Users", "Trips", "Blogs", "Destinations"].map((m) => (
          <Card key={m}>
            <CardContent className="pt-6">
              <CardTitle className="text-base">Manage {m}</CardTitle>
              <p className="mt-2 text-sm text-slate-500">CRUD interface for {m.toLowerCase()} — wire up to Prisma queries + Server Actions.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
