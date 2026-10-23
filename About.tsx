import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PROJECT_FILES,
  TECH_STACK,
  FEATURE_GROUPS,
  TOTAL_FILES,
  TOTAL_LINES,
} from "@/lib/about";
import {
  Sigma,
  FileCode2,
  Layers,
  Rocket,
  Sparkles,
  Code2,
} from "lucide-react";

export function About() {
  const totalFiles = TOTAL_FILES;
  const totalLines = TOTAL_LINES;

  const stats = [
    {
      label: "Total Files",
      value: totalFiles.toString(),
      hint: "Source modules in the app",
      icon: FileCode2,
    },
    {
      label: "Total Lines of Code",
      value: totalLines.toLocaleString(),
      hint: "Across the whole project",
      icon: Layers,
    },
    {
      label: "Tool Tabs",
      value: "40+",
      hint: "Interactive math & science tools",
      icon: Sigma,
    },
    {
      label: "Deploy Target",
      value: "Vercel",
      hint: "Zero-config static build",
      icon: Rocket,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-900/50 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-800/60 bg-blue-950/60 px-3 py-1 text-xs font-medium text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            About this project
          </div>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Math & Science Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-blue-200/80 sm:text-base">
            A single-page, browser-only workbench that bundles calculators,
            solvers, graphers, and reference tools for algebra, geometry,
            trigonometry, statistics, and the sciences. Every tool runs
            entirely client-side — no backend, no external API calls — and
            deploys as a static site on Vercel.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {TECH_STACK.map((t) => (
              <Badge
                key={t.name}
                variant="outline"
                className="border-blue-800/60 bg-blue-950/40 text-blue-200"
              >
                {t.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.label}
              className="border-blue-900/50 bg-slate-900/60 transition hover:border-blue-700"
            >
              <CardContent className="p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-300">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-sm font-medium text-blue-200">{s.label}</p>
                {s.hint && (
                  <p className="mt-0.5 text-xs text-blue-400/70">{s.hint}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* File manifest */}
      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-100">
            <FileCode2 className="h-5 w-5 text-blue-400" />
            Source Files
          </CardTitle>
          <p className="text-sm text-blue-400/70">
            {totalFiles} files · {totalLines.toLocaleString()} lines total
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-blue-950">
            <table className="w-full text-left text-sm">
              <thead className="bg-blue-950/50 text-xs uppercase tracking-wider text-blue-400/80">
                <tr>
                  <th className="px-4 py-2 font-medium">File</th>
                  <th className="hidden px-4 py-2 font-medium md:table-cell">
                    Description
                  </th>
                  <th className="px-4 py-2 text-right font-medium">Lines</th>
                </tr>
              </thead>
              <tbody>
                {PROJECT_FILES.map((f, i) => (
                  <tr
                    key={f.path}
                    className={cn(
                      "border-t border-blue-950/60",
                      i % 2 === 1 && "bg-blue-950/20"
                    )}
                  >
                    <td className="px-4 py-2 font-mono text-xs text-blue-200">
                      {f.path}
                    </td>
                    <td className="hidden px-4 py-2 text-blue-300/70 md:table-cell">
                      {f.description}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-blue-300">
                      {f.lines.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-blue-800/60 bg-blue-950/40">
                  <td className="px-4 py-2 font-semibold text-blue-100">
                    Total
                  </td>
                  <td className="hidden px-4 py-2 md:table-cell" />
                  <td className="px-4 py-2 text-right font-mono font-semibold text-blue-100">
                    {totalLines.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-3 text-xs text-blue-400/60">
            Showing a representative sample of the {totalFiles} source files.
            Totals are defined in{" "}
            <span className="font-mono text-blue-300">src/lib/about.ts</span>.
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid gap-6 lg:grid-cols-2">
        {FEATURE_GROUPS.map((g) => (
          <Card key={g.title} className="border-blue-900/50 bg-slate-900/60">
            <CardHeader>
              <CardTitle className="text-blue-100">{g.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-blue-200/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer note */}
      <Card className="border-blue-900/50 bg-gradient-to-br from-blue-950/60 to-slate-900/60">
        <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-serif text-lg font-semibold text-blue-100">
              Built for students, teachers, and self-learners.
            </p>
            <p className="mt-1 text-sm text-blue-300/70">
              Everything runs locally in your browser — your inputs never leave
              your device.
            </p>
          </div>
          <div className="flex items-center gap-2 text-blue-400/70">
            <Code2 className="h-4 w-4" />
            <span className="text-xs">Static build · Vercel-ready</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}