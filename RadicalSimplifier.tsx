import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
        {n}
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <p className="text-sm font-semibold text-blue-100">{title}</p>
        <div className="space-y-2 text-sm text-blue-300/80">{children}</div>
      </div>
    </div>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-blue-900/50 bg-blue-950/40 px-3 py-2 text-xs text-blue-300/70">
      {children}
    </p>
  );
}

function factorize(n: number) {
  const factors: number[] = [];
  let m = n;
  let d = 2;
  while (d * d <= m) {
    while (m % d === 0) {
      factors.push(d);
      m /= d;
    }
    d++;
  }
  if (m > 1) factors.push(m);
  return factors;
}

export function RadicalSimplifier() {
  const [radicand, setRadicand] = useState("72");
  const [index, setIndex] = useState("2");

  const result = useMemo(() => {
    const n = parseInt(radicand, 10);
    const k = parseInt(index, 10);
    if (!Number.isFinite(n) || n <= 0 || !Number.isFinite(k) || k < 2) return null;

    const factors = factorize(n);

    // Group identical factors
    const counts: Record<number, number> = {};
    factors.forEach((f) => (counts[f] = (counts[f] ?? 0) + 1));

    let outside = 1;
    let inside = 1;
    const groups: {
      base: number;
      count: number;
      pulled: number;
      remainder: number;
      outsideValue: number;
      insideValue: number;
    }[] = [];

    Object.entries(counts).forEach(([base, cnt]) => {
      const b = Number(base);
      const pulled = Math.floor(cnt / k);
      const remainder = cnt % k;
      const outsideValue = Math.pow(b, pulled);
      const insideValue = Math.pow(b, remainder);
      outside *= outsideValue;
      inside *= insideValue;
      groups.push({ base: b, count: cnt, pulled, remainder, outsideValue, insideValue });
    });

    const exact = Math.pow(n, 1 / k);
    const radicalSymbol = k === 2 ? "√" : `${k}√`;

    // Build the final simplified string
    let finalStr = "";
    if (outside !== 1 || inside === 1) finalStr += outside;
    if (inside !== 1) finalStr += `${radicalSymbol}${inside}`;
    if (finalStr === "") finalStr = "1";

    return {
      factors,
      groups,
      outside,
      inside,
      exact,
      k,
      n,
      radicalSymbol,
      finalStr,
    };
  }, [radicand, index]);

  return (
    <div className="space-y-6">
      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-blue-100">Radical Simplifier</CardTitle>
          <p className="text-sm text-blue-400/70">
            We'll simplify ⁿ√x one small step at a time — no shortcuts.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-xs text-blue-400">
                Number under the radical (x)
              </Label>
              <Input
                value={radicand}
                onChange={(e) => setRadicand(e.target.value)}
                className="border-blue-900/60 bg-slate-950 text-white"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-blue-400">
                Root index (n) — 2 means square root
              </Label>
              <Input
                value={index}
                onChange={(e) => setIndex(e.target.value)}
                className="border-blue-900/60 bg-slate-950 text-white"
              />
            </div>
          </div>

          {!result ? (
            <div className="rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
              <p className="text-sm text-blue-400/70">
                Enter a positive whole number for x and an index of 2 or more.
              </p>
            </div>
          ) : (
            <div className="space-y-5 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Working it out
              </p>

              <Step n={1} title="Write down the problem">
                <p className="font-mono text-base text-blue-100">
                  {result.radicalSymbol}
                  {result.n}
                </p>
                <Hint>
                  {result.k === 2
                    ? "This is a square root — we look for pairs of identical factors."
                    : `This is a ${result.k}th root — we look for groups of ${result.k} identical factors.`}
                </Hint>
              </Step>

              <Step n={2} title="Break the number into prime factors">
                <p>
                  Split {result.n} into factors until every factor is prime:
                </p>
                <p className="font-mono text-base text-blue-100">
                  {result.n} = {result.factors.join(" × ")}
                </p>
                <Hint>
                  A prime number can only be divided by 1 and itself (2, 3, 5, 7, 11…).
                </Hint>
              </Step>

              <Step n={3} title="Count how many times each factor appears">
                <div className="space-y-1">
                  {result.groups.map((g) => (
                    <p key={g.base} className="font-mono">
                      {g.base} appears {g.count} time{g.count === 1 ? "" : "s"}
                    </p>
                  ))}
                </div>
                <Hint>
                  We need groups of {result.k} to pull a factor out of the{" "}
                  {result.k === 2 ? "square" : `${result.k}th`} root.
                </Hint>
              </Step>

              <Step n={4} title={`Pull out groups of ${result.k}`}>
                <div className="space-y-2">
                  {result.groups.map((g) => (
                    <div
                      key={g.base}
                      className="rounded-lg border border-blue-900/40 bg-slate-950/50 px-3 py-2"
                    >
                      <p className="font-mono text-blue-200">
                        {g.base}: {g.count} ÷ {result.k} = {g.pulled} group
                        {g.pulled === 1 ? "" : "s"} out, {g.remainder} left inside
                      </p>
                      <p className="mt-1 text-xs text-blue-400/70">
                        {g.pulled > 0
                          ? `${g.base}^${g.pulled} = ${g.outsideValue} comes out front`
                          : `nothing comes out for ${g.base}`}
                        {g.remainder > 0
                          ? `, and ${g.base}^${g.remainder} = ${g.insideValue} stays inside`
                          : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </Step>

              <Step n={5} title="Multiply what came out and what stayed in">
                <div className="space-y-1 font-mono">
                  <p>
                    Outside:{" "}
                    {result.groups
                      .filter((g) => g.pulled > 0)
                      .map((g) => g.outsideValue)
                      .join(" × ") || "1"}{" "}
                    = {result.outside}
                  </p>
                  <p>
                    Inside:{" "}
                    {result.groups
                      .filter((g) => g.remainder > 0)
                      .map((g) => g.insideValue)
                      .join(" × ") || "1"}{" "}
                    = {result.inside}
                  </p>
                </div>
              </Step>

              <Step n={6} title="Write the simplified radical">
                <p className="font-mono text-lg text-blue-100">
                  {result.radicalSymbol}
                  {result.n} = {result.finalStr}
                </p>
                <Hint>
                  {result.inside === 1
                    ? "Nothing is left under the radical, so the answer is a whole number."
                    : result.outside === 1
                    ? "Nothing could be pulled out — this radical is already as simple as it gets."
                    : "The number out front multiplies the smaller radical that remains."}
                </Hint>
              </Step>

              <Step n={7} title="Check with a decimal">
                <p className="font-mono">
                  {result.radicalSymbol}
                  {result.n} ≈ {result.exact.toFixed(6)}
                </p>
                <p className="text-xs text-blue-400/70">
                  The simplified form equals the same decimal, so the work checks out.
                </p>
              </Step>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}