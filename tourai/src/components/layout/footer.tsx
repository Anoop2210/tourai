import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="font-bold text-slate-900">TourAI</div>
          <p className="mt-2 text-sm text-slate-500">AI-powered trip planning and budget estimation for every traveler.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link href="/planner">Tour Planner</Link></li>
            <li><Link href="/budget">Budget Calculator</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Destinations</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link href="/goa-trip-cost">Goa Trip Cost</Link></li>
            <li><Link href="/manali-trip-budget">Manali Trip Budget</Link></li>
            <li><Link href="/kashmir-itinerary">Kashmir Itinerary</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 px-4 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} TourAI. All rights reserved.
      </div>
    </footer>
  );
}
