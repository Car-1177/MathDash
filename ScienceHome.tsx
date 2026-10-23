import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FlaskConical,
  Dna,
  Atom,
  Globe2,
  Beaker,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const CATEGORIES = [
  {
    name: "Chemistry",
    icon: FlaskConical,
    tools: ["Molar Mass", "Stoichiometry", "pH & pOH", "Gas Laws"],
    id: "molar-mass",
  },
  {
    name: "Biology",
    icon: Dna,
    tools: ["Punnett Square", "DNA & RNA", "Population Growth", "Hardy-Weinberg"],
    id: "punnett",
  },
  {
    name: "Physics",
    icon: Atom,
    tools: ["Kinematics", "Forces", "Energy & Work", "Circuits"],
    id: "kinematics",
  },
  {
    name: "Earth & Space",
    icon: Globe2,
    tools: ["Astronomy", "Geology", "Climate Data"],
    id: "astronomy",
  },
  {
    name: "Lab & Reference",
    icon: Beaker,
    tools: ["Unit Converter", "Sig Figs", "Constants", "Scientific Notation"],
    id: "unit-conv-sci",
  },
];

export function ScienceHome({
  onNavigate,
  toolCount,
}: {
  onNavigate: (id: string) => void;
  toolCount: number;
}) {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-cyan-900/50 bg-gradient-to-br from-cyan-950/80 via-slate-900/60 to-slate-950 p-8 shadow-xl shadow-cyan-950/40">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-600/20 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-700/50 bg-cyan-900/40 px-3 py-1 text-xs font-medium text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" /> {toolCount} tools · all in your browser
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl">
            ScienceDash
          </h1>
          <p className="mt-3 max-w-2xl text-cyan-200/80">
            A complete science workspace — chemistry, biology, physics, and Earth
            &amp; space. Solve, model, and study with a full suite of calculators
            and reference tools, fully separate from the math dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => onNavigate("molar-mass")}
              className="bg-cyan-600 hover:bg-cyan-500"
            >
              <FlaskConical className="mr-2 h-4 w-4" /> Open Molar Mass
            </Button>
            <Button
              onClick={() => onNavigate("kinematics")}
              variant="outline"
              className="border-cyan-700 bg-cyan-950/40 text-cyan-200 hover:bg-cyan-900/50"
            >
              Physics tools <ArrowRight className="ml-2 h-4 w-4" />
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
                className="group rounded-2xl border border-cyan-900/50 bg-slate-900/60 p-5 text-left transition hover:border-cyan-600/60 hover:bg-cyan-950/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-900/40 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-cyan-100">{c.name}</h3>
                </div>
                <ul className="mt-3 space-y-1">
                  {c.tools.map((t) => (
                    <li key={t} className="text-sm text-cyan-400/70">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-cyan-400 opacity-0 transition group-hover:opacity-100">
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