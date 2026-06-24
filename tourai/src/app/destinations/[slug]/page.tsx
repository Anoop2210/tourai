import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";

async function getDestination(slug: string) {
  return prisma.destination.findUnique({ where: { slug } });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dest = await getDestination(slug).catch(() => null);
  if (!dest) return { title: "Destination Guide" };
  return {
    title: `${dest.name} Trip Cost & Itinerary`,
    description: dest.summary,
    alternates: { canonical: `/${dest.slug}` },
    openGraph: { title: `${dest.name} Trip Cost & Itinerary`, description: dest.summary, images: dest.heroImage ? [dest.heroImage] : [] },
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = await getDestination(slug).catch(() => null);
  if (!dest) return notFound();

  const attractions = dest.attractions as { name: string; desc: string }[];
  const costs = dest.costs as { label: string; amount: number }[];
  const hotels = dest.hotels as { name: string; pricePerNight: number; rating: number }[];
  const food = dest.food as { dish: string; price: number }[];
  const faq = dest.faq as { q: string; a: string }[];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">{dest.name} Trip Cost & Complete Guide</h1>
      <p className="mt-3 text-slate-600">{dest.summary}</p>

      <Card className="mt-8">
        <CardContent className="pt-6">
          <CardTitle>Top Attractions</CardTitle>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {attractions?.map((a) => <li key={a.name}><span className="font-medium text-slate-900">{a.name}</span> — {a.desc}</li>)}
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <CardTitle>Estimated Costs</CardTitle>
          <table className="mt-3 w-full text-sm">
            <tbody>
              {costs?.map((c) => (
                <tr key={c.label} className="border-t border-slate-100">
                  <td className="py-1.5 text-slate-600">{c.label}</td>
                  <td className="py-1.5 text-right font-medium">{formatINR(c.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <CardTitle>Recommended Hotels</CardTitle>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {hotels?.map((h) => <li key={h.name}>{h.name} — {formatINR(h.pricePerNight)}/night ★{h.rating}</li>)}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <CardTitle>Must-Try Food</CardTitle>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {food?.map((f) => <li key={f.dish}>{f.dish} — {formatINR(f.price)}</li>)}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <CardTitle>FAQs</CardTitle>
          <div className="mt-3 space-y-3 text-sm">
            {faq?.map((f) => (
              <div key={f.q}>
                <div className="font-medium text-slate-900">{f.q}</div>
                <div className="text-slate-600">{f.a}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
