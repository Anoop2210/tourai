import type { Metadata } from "next";
import { BudgetCalculatorForm } from "@/components/budget/budget-calculator-form";

export const metadata: Metadata = {
  title: "Tour Budget Calculator",
  description: "Calculate minimum, average, and premium trip budgets with cost breakdown charts.",
};

export default function BudgetPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Trip Budget Calculator</h1>
      <p className="mt-2 text-slate-600">Estimate travel, hotel, food, and activity costs instantly.</p>
      <div className="mt-8">
        <BudgetCalculatorForm />
      </div>
    </div>
  );
}
