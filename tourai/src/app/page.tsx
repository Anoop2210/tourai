import Link from "next/link";
import { Sparkles, MapPinned, Wallet, FileDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroForm } from "@/components/home/hero-form";

const features = [
  { icon: Sparkles, title: "AI Day-Wise Itinerary", desc: "Get a personalized, day-by-day plan generated in seconds by AI." },
  { icon: Wallet, title: "Smart Budget Estimator", desc: "Minimum, average, and premium cost breakdowns for every trip." },
  { icon: MapPinned, title: "Local Insights", desc: "Hidden places, food recommendations, and real travel tips." },
  { icon: FileDown, title: "PDF Export", desc: "Download a polished trip plan you can carry anywhere, offline." },
];

const destinations = [
  { name: "Goa", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600", price: "₹8,000+" },
  { name: "Manali", img: "https://images.unsplash.com/photo-1626198226928-617bfde74f6e?w=600", price: "₹6,500+" },
  { name: "Kashmir", img: "https://images.unsplash.com/photo-1602680905134-3068afaf2c4a?w=600", price: "₹12,000+" },
  { name: "Thailand", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600", price: "₹35,000+" },
];

const testimonials = [
  { name: "Riya Sharma", text: "Planned my entire Manali trip in 2 minutes. The budget split was spot on!", rating: 5 },
  { name: "Arjun Mehta", text: "Loved the day-wise plan with food suggestions. Saved hours of research.", rating: 5 },
  { name: "Sneha Kapoor", text: "The PDF export was perfect for offline use during my Goa trip.", rating: 4 },
];

const faqs = [
  { q: "Is TourAI free to use?", a: "Yes, generating an itinerary and basic budget plan is free. Premium trips with hidden places and travel hacks cost ₹99 per trip." },
  { q: "How accurate are the budget estimates?", a: "Estimates are based on real travel cost patterns and refined by AI for your specific dates, group size, and travel mode." },
  { q: "Can I download my itinerary as a PDF?", a: "Yes, every saved trip can be exported as a professional PDF with your day-wise plan and budget breakdown." },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Plan Your Perfect Trip with <span className="text-brand-600">AI</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              Get day-wise itineraries, budget estimates, hotel recommendations and travel tips in seconds.
            </p>
          </div>

          <HeroForm />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-slate-900">Everything you need to plan smart</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="p-2">
              <CardHeader>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <f.icon size={20} />
                </span>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-base">{f.title}</CardTitle>
                <p className="mt-2 text-sm text-slate-500">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900">Popular Destinations</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <Link key={d.name} href={`/${d.name.toLowerCase()}-trip-cost`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="h-40 w-full overflow-hidden">
                  <img src={d.img} alt={d.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="font-semibold text-slate-900">{d.name}</div>
                  <div className="text-sm text-slate-500">From {d.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-slate-900">Loved by travelers</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name}>
              <CardContent className="pt-6">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="mt-3 text-sm text-slate-600">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 text-sm font-semibold text-slate-900">{t.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <Card key={f.q}>
                <CardContent className="pt-6">
                  <div className="font-semibold text-slate-900">{f.q}</div>
                  <p className="mt-2 text-sm text-slate-600">{f.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Ready to plan your next trip?</h2>
          <p className="mt-3 text-brand-100">Free to start. No app install required.</p>
          <Link href="/planner">
            <Button size="lg" variant="secondary" className="mt-6 bg-white text-brand-700 hover:bg-brand-50">
              Start Planning Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
