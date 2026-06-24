import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "TourAI – AI Travel Planner & Trip Budget Calculator", template: "%s | TourAI" },
  description:
    "Plan your perfect trip with AI. Get day-wise itineraries, travel cost estimates, hotel recommendations and travel tips in seconds.",
  keywords: ["Trip Planner", "AI Travel Planner", "Tour Budget Calculator", "Travel Cost Calculator", "Trip Cost Estimator"],
  openGraph: {
    title: "TourAI – AI Travel Planner & Trip Budget Calculator",
    description: "Get day-wise itineraries, budget estimates, hotel recommendations and travel tips in seconds.",
    type: "website",
  },
  metadataBase: undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
