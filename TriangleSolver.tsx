import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
        {n}
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-semibold text-blue-100">{title}</p>
        <div className="text-sm text-blue-300/80">{children}</div>
      </div>
    </div>
  );
}

function num(v: string) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : NaN;
}

export function TriangleSolver({ tool }: { tool: string }) {
  if (tool === "similarity") return <Similarity />;
  return <Solver />;
}

function Similarity() {
  const [a1, setA1] = useState("3");
  const [b1, setB1] = useState("4");
  const [c1, setC1] = useState("5");
  const [a2, setA2] = useState("6");
  const [b2, setB2] = useState("8");
  const [c2, setC2] = useState("10");

  const result = useMemo(() => {
    const s1 = [num(a1), num(b1), num(c1)];
    const s2 = [num(a2), num(b2), num(c2)];
    if (s1.some((x) => !Number.isFinite(x) || x <= 0) || s2.some((x) => !Number.isFinite(x) || x <= 0))
      return null;
    const ratios = s1.map((x, i) => s2[i] / x);
    const k = ratios[0];
    const consistent = ratios.every((r) => Math.abs(r - k) < 1e-6);
    return { ratios, k, consistent };
  }, [a1, b1, c1, a2, b2, c2]);

  return (
    <div className="space-y-6">
      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-blue-100">Triangle Similarity Checker</CardTitle>
          <p className="text-sm text-blue-400/70">
            Enter corresponding sides of two triangles to test for similarity (SSS).
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3 rounded-xl border border-blue-950 bg-blue-950/30 p-4">
              <p className="text-sm font-semibold text-blue-200">Triangle 1</p>
              {[["a₁", a1, setA1], ["b₁", b1, setB1], ["c₁", c1, setC1]].map(
                ([l, v, s]) => (
                  <div key={l as string} className="space-y-1">
                    <Label className="text-xs text-blue-400">{l as string}</Label>
                    <Input
                      value={v as string}
                      onChange={(e) => (s as (x: string) => void)(e.target.value)}
                      className="border-blue-900/60 bg-slate-950 text-white"
                    />
                  </div>
                )
              )}
            </div>
            <div className="space-y-3 rounded-xl border border-blue-950 bg-blue-950/30 p-4">
              <p className="text-sm font-semibold text-blue-200">Triangle 2</p>
              {[["a₂", a2, setA2], ["b₂", b2, setB2], ["c₂", c2, setC2]].map(
                ([l, v, s]) => (
                  <div key={l as string} className="space-y-1">
                    <Label className="text-xs text-blue-400">{l as string}</Label>
                    <Input
                      value={v as string}
                      onChange={(e) => (s as (x: string) => void)(e.target.value)}
                      className="border-blue-900/60 bg-slate-950 text-white"
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Step-by-step
            </p>
            {!result ? (
              <p className="text-sm text-blue-400/70">
                Enter positive side lengths for both triangles.
              </p>
            ) : (
              <>
                <Step n={1} title="Compute side ratios">
                  {result.ratios.map((r, i) => (
                    <p key={i} className="font-mono">
                      side {i + 1}: {r.toFixed(4)}
                    </p>
                  ))}
                </Step>
                <Step n={2} title="Compare ratios">
                  {result.consistent
                    ? "All three ratios are equal → the triangles are similar (SSS)."
                    : "Ratios differ → the triangles are NOT similar."}
                </Step>
                {result.consistent && (
                  <Step n={3} title="Scale factor">
                    <p className="font-mono">k = {result.k.toFixed(4)}</p>
                    <p>
                      Triangle 2 is {result.k.toFixed(3)}× the size of Triangle 1.
                    </p>
                  </Step>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Solver() {
  const [mode, setMode] = useState<"sss" | "sas" | "asa">("sss");
  const [v1, setV1] = useState("3");
  const [v2, setV2] = useState("4");
  const [v3, setV3] = useState("5");

  const result = useMemo(() => {
    const x = num(v1), y = num(v2), z = num(v3);
    if (![x, y, z].every((n) => Number.isFinite(n) && n > 0)) return null;
    const rad = (d: number) => (d * Math.PI) / 180;
    const deg = (r: number) => (r * 180) / Math.PI;

    if (mode === "sss") {
      const [a, b, c] = [x, y, z];
      if (a + b <= c || a + c <= b || b + c <= a)
        return { error: "These sides cannot form a triangle (triangle inequality fails)." };
      const A = deg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
      const B = deg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
      const C = 180 - A - B;
      const s = (a + b + c) / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      return { angles: [A, B, C], sides: [a, b, c], area, perimeter: a + b + c };
    }
    if (mode === "sas") {
      const [a, b, C] = [x, y, z];
      const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(C)));
      const A = deg(Math.asin((a * Math.sin(rad(C))) / c));
      const B = 180 - A - C;
      const area = 0.5 * a * b * Math.sin(rad(C));
      return { angles: [A, B, C], sides: [a, b, c], area, perimeter: a + b + c };
    }
    const [A, B, c] = [x, y, z];
    const C = 180 - A - B;
    if (C <= 0) return { error: "Angles must sum to less than 180°." };
    const a = (c * Math.sin(rad(A))) / Math.sin(rad(C));
    const b = (c * Math.sin(rad(B))) / Math.sin(rad(C));
    const area = 0.5 * a * b * Math.sin(rad(C));
    return { angles: [A, B, C], sides: [a, b, c], area, perimeter: a + b + c };
  }, [mode, v1, v2, v3]);

  const labels: Record<string, [string, string, string]> = {
    sss: ["Side a", "Side b", "Side c"],
    sas: ["Side a", "Side b", "Included angle C (°)"],
    asa: ["Angle A (°)", "Angle B (°)", "Side c"],
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-blue-100">Triangle Solver</CardTitle>
          <p className="text-sm text-blue-400/70">
            Solve any triangle from SSS, SAS, or ASA inputs.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {(["sss", "sas", "asa"] as const).map((m) => (
              <Button
                key={m}
                onClick={() => setMode(m)}
                variant={mode === m ? "default" : "outline"}
                className={cn(
                  mode === m
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "border-blue-900/60 bg-transparent text-blue-300 hover:bg-blue-900/40"
                )}
              >
                {m.toUpperCase()}
              </Button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {labels[mode].map((l, i) => {
              const setters = [setV1, setV2, setV3];
              const vals = [v1, v2, v3];
              return (
                <div key={l} className="space-y-1">
                  <Label className="text-xs text-blue-400">{l}</Label>
                  <Input
                    value={vals[i]}
                    onChange={(e) => setters[i](e.target.value)}
                    className="border-blue-900/60 bg-slate-950 text-white"
                  />
                </div>
              );
            })}
          </div>

          <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Step-by-step
            </p>
            {!result ? (
              <p className="text-sm text-blue-400/70">Enter valid positive values.</p>
            ) : "error" in result ? (
              <p className="text-sm text-rose-400">{result.error}</p>
            ) : (
              <>
                <Step n={1} title={`Apply ${mode.toUpperCase()} method`}>
                  {mode === "sss" && "Use the Law of Cosines to find each angle."}
                  {mode === "sas" && "Use the Law of Cosines for the third side, then Law of Sines."}
                  {mode === "asa" && "Find the third angle, then apply the Law of Sines."}
                </Step>
                <Step n={2} title="Angles">
                  <p className="font-mono">
                    A = {result.angles[0].toFixed(2)}°, B = {result.angles[1].toFixed(2)}°, C ={" "}
                    {result.angles[2].toFixed(2)}°
                  </p>
                </Step>
                <Step n={3} title="Sides">
                  <p className="font-mono">
                    a = {result.sides[0].toFixed(3)}, b = {result.sides[1].toFixed(3)}, c ={" "}
                    {result.sides[2].toFixed(3)}
                  </p>
                </Step>
                <Step n={4} title="Area & perimeter">
                  <p className="font-mono">
                    Area = {result.area.toFixed(3)}, Perimeter = {result.perimeter.toFixed(3)}
                  </p>
                </Step>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}