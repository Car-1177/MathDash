import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SCIENCE_GROUPS, SCIENCE_TOOLS } from "@/lib/scienceTools";
import { FlaskConical, Dna, Atom, Globe2, Beaker } from "lucide-react";

const GROUP_ICONS: Record<string, React.ReactNode> = {
  Chemistry: <FlaskConical className="h-5 w-5" />,
  Biology: <Dna className="h-5 w-5" />,
  Physics: <Atom className="h-5 w-5" />,
  "Earth & Space": <Globe2 className="h-5 w-5" />,
  "Lab & Reference": <Beaker className="h-5 w-5" />,
};

export function ScienceAbout() {
  const categories = SCIENCE_GROUPS.filter((g) => g.name !== "Home" && g.name !== "Support");

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="rounded-2xl border border-cyan-900/50 bg-gradient-to-br from-cyan-950/60 via-slate-900/60 to-slate-950 p-8 shadow-md">
        <Badge className="bg-cyan-600 text-white hover:bg-cyan-600">
          Science Mode
        </Badge>
        <h1 className="mt-4 font-serif text-3xl font-bold text-white">
          Science Workspace
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cyan-200/80">
          A separate toolkit for chemistry, biology, physics, and Earth &amp;
          space science. All tools run in your browser and save locally —
          completely independent from the math workspace.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.slice(0, 4).map((g) => (
          <div
            key={g.name}
            className="rounded-2xl border border-cyan-900/50 bg-gradient-to-br from-slate-900/80 to-cyan-950/40 p-5 shadow-sm"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300">
              {GROUP_ICONS[g.name]}
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-cyan-400/70">
              {g.name}
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-white">
              {g.tools.length}
            </p>
            <p className="mt-1 text-xs text-cyan-400/60">tools available</p>
          </div>
        ))}
      </div>

      <Card className="border-cyan-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-cyan-100">All Science Tools</CardTitle>
          <p className="text-sm text-cyan-400/70">
            {SCIENCE_TOOLS.length} tools across {categories.length} categories
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {categories.map((g) => (
            <div key={g.name} className="space-y-2">
              <p className="text-sm font-semibold text-cyan-200">{g.name}</p>
              <div className="flex flex-wrap gap-2">
                {g.tools.map((t) => (
                  <span
                    key={t.id}
                    className="rounded-full border border-cyan-900/60 bg-cyan-950/40 px-3 py-1 text-xs text-cyan-300"
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}