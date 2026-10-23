import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Sigma,
  Shapes,
  Briefcase,
  GraduationCap,
  BookOpen,
  Sparkles,
  Brain,
  TrendingUp,
  Infinity as InfinityIcon,
  Waves,
  ArrowRight,
} from "lucide-react";

const CATEGORIES = [
  { name: "Core", icon: Calculator, tools: ["Calculator", "Equation Solver", "Graphing"], id: "calculator" },
  { name: "Algebra", icon: Sigma, tools: ["Quadratics", "Polynomials", "Systems", "Matrices"], id: "algebra" },
  { name: "Geometry & Trig", icon: Shapes, tools: ["Triangles", "Unit Circle", "Conics"], id: "coordinate" },
  { name: "Applied", icon: Briefcase, tools: ["Growth & Interest", "Probability", "Unit Converter"], id: "growth" },
  { name: "Advanced", icon: Sparkles, tools: ["Derivatives", "Transformations", "Distributions"], id: "calculus" },
  { name: "Algebra 2", icon: Brain, tools: ["Rational Expressions", "Log Solver", "Matrix Ops"], id: "rational" },
  { name: "Pre-Calculus", icon: TrendingUp, tools: ["Sequences & Series", "Polar & Parametric"], id: "sequenceseries" },
  { name: "Calculus", icon: InfinityIcon, tools: ["Limits", "Riemann Sums", "Integrals"], id: "limits" },
  { name: "Trigonometry", icon: Waves, tools: ["Identities", "Law of Sines", "Trig Equations"], id: "identity" },
  { name: "Test Prep", icon: GraduationCap, tools: ["SAT", "ACT", "PSAT", "Mixed Drill"], id: "sat" },
  { name: "Reference", icon: BookOpen, tools: ["Formula Sheet", "Study Planner", "Reference"], id: "formulas" },
];

export function Home({
  onNavigate,
  toolCount,
}: {
  onNavigate: (id: string) => void;
  toolCount: number;
}) {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-blue-900/50 bg-gradient-to-br from-blue-950/80 via-slate-900/60 to-slate-950 p-8 shadow-xl shadow-blue-950/40">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-700/50 bg-blue-900/40 px-3 py-1 text-xs font-medium text-blue-300">
            <Sparkles className="h-3.5 w-3.5" /> {toolCount} tools · all in your browser
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl">
            MathDash
          </h1>
          <p className="mt-3 max-w-2xl text-blue-200/80">
            A complete math workspace — from arithmetic to calculus. Solve, graph,
            and study with a full suite of calculators, solvers, and reference tools.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => onNavigate("calculator")}
              className="bg-blue-600 hover:bg-blue-500"
            >
              <Calculator className="mr-2 h-4 w-4" /> Open Calculator
            </Button>
            <Button
              onClick={() => onNavigate("graphing")}
              variant="outline"
              className="border-blue-700 bg-blue-950/40 text-blue-200 hover:bg-blue-900/50"
            >
              Graph a function <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-serif text-2xl font-bold text-white">
          Explore by category
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.name}
                onClick={() => onNavigate(c.id)}
                className="group rounded-2xl border border-blue-900/50 bg-slate-900/60 p-5 text-left transition hover:border-blue-600/60 hover:bg-blue-950/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-900/40 text-blue-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-blue-100">{c.name}</h3>
                </div>
                <ul className="mt-3 space-y-1">
                  {c.tools.map((t) => (
                    <li key={t} className="text-sm text-blue-400/70">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-400 opacity-0 transition group-hover:opacity-100">
                  Open <ArrowRight className="h-3 w-3" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}