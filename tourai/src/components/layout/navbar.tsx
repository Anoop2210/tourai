"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/planner", label: "Tour Planner" },
  { href: "/budget", label: "Budget Calculator" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
            <Plane size={16} />
          </span>
          TourAI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-slate-600 hover:text-brand-600">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/dashboard"><Button variant="ghost" size="sm">Dashboard</Button></Link>
          <Link href="/planner"><Button size="sm">Plan a Trip</Button></Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block py-2 text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/planner" className="mt-2 block"><Button className="w-full">Plan a Trip</Button></Link>
        </div>
      )}
    </header>
  );
}
