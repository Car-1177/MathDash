import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TEMPLATES = [
  {
    id: "distance",
    name: "Distance (d = rt)",
    fields: ["Rate", "Time"],
    solve: (v: number[]) => [`Distance = ${(v[0] * v[1]).toFixed(4)}`],
  },
  {
    id: "work",
    name: "Work (1/t = 1/a + 1/b)",
    fields: ["Time A", "Time B"],
    solve: (v: number[]) => {
      const t = 1 / (1 / v[0] + 1 / v[1]);
      return [`Combined time = ${t.toFixed(4)}`];
    },
  },
  {
    id: "interest",
    name: "Interest (I = Prt)",
    fields: ["Principal", "Rate %", "Time"],
    solve: (v: number[]) => [`Interest = ${(v[0] * (v[1] / 100) * v[2]).toFixed(2)}`],
  },
];

export function WordProblemSolver() {
  const [tid, setTid] = useState("distance");
  const [vals, setVals] = useState<string[]>(["60", "2"]);
  const [out, setOut] = useState<string[]>([]);

  const template = TEMPLATES.find((t) => t.id === tid)!;

  const selectTemplate = (id: string) => {
    setTid(id);
    const t = TEMPLATES.find((x) => x.id === id)!;
    setVals(t.fields.map(() => "1"));
    setOut([]);
  };

  const solve = () => {
    const nums = vals.map(Number);
    if (nums.some(isNaN)) {
      setOut(["Please enter valid numbers."]);
      return;
    }
    setOut(template.solve(nums));
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-blue-100">Word Problem Solver</CardTitle>
          <p className="text-sm text-blue-400/70">
            Pick a template and enter the known values.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2 sm:grid-cols-3">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => selectTemplate(t.id)}
                className={
                  "rounded-xl border px-3 py-3 text-left text-sm transition " +
                  (tid === t.id
                    ? "border-blue-500 bg-blue-600/25 text-white"
                    : "border-blue-900/50 bg-blue-950/30 text-blue-300 hover:border-blue-700")
                }
              >
                {t.name}
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {template.fields.map((f, i) => (
              <div key={f} className="space-y-1.5">
                <Label className="text-blue-300">{f}</Label>
                <Input
                  value={vals[i] ?? ""}
                  onChange={(e) =>
                    setVals((v) => v.map((x, j) => (j === i ? e.target.value : x)))
                  }
                  className="border-blue-900/60 bg-slate-950 text-white"
                />
              </div>
            ))}
          </div>
          <Button onClick={solve} className="bg-blue-600 hover:bg-blue-500">
            Solve
          </Button>
          {out.length > 0 && (
            <div className="rounded-xl border border-blue-900/50 bg-blue-950/30 p-4 font-mono text-sm text-blue-200">
              {out.map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}