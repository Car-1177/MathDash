import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-semibold text-blue-100">{title}</p>
        <div className="text-sm text-blue-300/80">{children}</div>
      </div>
    </div>
  );
}

function Shell({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">{title}</CardTitle>
        <p className="text-sm text-blue-400/70">{desc}</p>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
}

function num(v: string) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : NaN;
}

export function Algebra2Tools({ tool }: { tool: string }) {
  switch (tool) {
    case "rational":
      return <RationalExpressions />;
    case "composition":
      return <CompositionInverse />;
    case "logsolve":
      return <LogEquationSolver />;
    case "exponential":
      return <ExponentialModeler />;
    case "conics2":
      return <ConicIdentifier />;
    case "matrixops":
      return <MatrixOperations />;
    default:
      return null;
  }
}

function RationalExpressions() {
  const [n1, setN1] = useState("1");
  const [d1, setD1] = useState("2");
  const [n2, setN2] = useState("1");
  const [d2, setD2] = useState("3");

  const result = useMemo(() => {
    const a = num(n1), b = num(d1), c = num(n2), e = num(d2);
    if (![a, b, c, e].every(Number.isFinite) || b === 0 || e === 0) return null;
    const gcd = (x: number, y: number): number =>
      y === 0 ? Math.abs(x) : gcd(y, x % y);
    const sumN = a * e + c * b;
    const sumD = b * e;
    const g = gcd(sumN, sumD) || 1;
    return {
      sumN,
      sumD,
      simpN: sumN / g,
      simpD: sumD / g,
      g,
      lcm: (b * e) / gcd(b, e),
    };
  }, [n1, d1, n2, d2]);

  return (
    <Shell
      title="Rational Expressions"
      desc="Add two fractions and simplify the result step by step."
    >
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          ["Numerator 1", n1, setN1],
          ["Denominator 1", d1, setD1],
          ["Numerator 2", n2, setN2],
          ["Denominator 2", d2, setD2],
        ].map(([l, v, s]) => (
          <div key={l as string} className="space-y-1">
            <Label className="text-xs text-blue-400">{l as string}</Label>
            <Input
              value={v as string}
              onChange={(e) => (s as (x: string) => void)(e.target.value)}
              className="border-blue-900/60 bg-slate-950 text-white"
            />
          </div>
        ))}
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">
            Enter valid numbers (denominators can't be 0).
          </p>
        ) : (
          <>
            <Step n={1} title="Find a common denominator">
              <p className="font-mono">
                LCM({num(d1)}, {num(d2)}) = {result.lcm}
              </p>
            </Step>
            <Step n={2} title="Rewrite each fraction">
              <p className="font-mono">
                {num(n1)}/{num(d1)} + {num(n2)}/{num(d2)}
              </p>
            </Step>
            <Step n={3} title="Add the numerators">
              <p className="font-mono">
                {result.sumN} / {result.sumD}
              </p>
            </Step>
            <Step n={4} title="Simplify by the GCF">
              <p className="font-mono">
                GCF = {result.g} → {result.simpN} / {result.simpD}
              </p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function CompositionInverse() {
  const [a, setA] = useState("2");
  const [b, setB] = useState("3");
  const [x, setX] = useState("4");

  const result = useMemo(() => {
    const A = num(a), B = num(b), X = num(x);
    if (![A, B, X].every(Number.isFinite) || A === 0) return null;
    return {
      f: A * X + B,
      inverse: (X - B) / A,
      composed: A * (A * X + B) + B,
    };
  }, [a, b, x]);

  return (
    <Shell
      title="Composition & Inverse"
      desc="For f(x) = ax + b, evaluate f, f⁻¹, and f(f(x))."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["a", a, setA],
          ["b", b, setB],
          ["x", x, setX],
        ].map(([l, v, s]) => (
          <div key={l as string} className="space-y-1">
            <Label className="text-xs text-blue-400">{l as string}</Label>
            <Input
              value={v as string}
              onChange={(e) => (s as (x: string) => void)(e.target.value)}
              className="border-blue-900/60 bg-slate-950 text-white"
            />
          </div>
        ))}
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">Enter valid numbers (a ≠ 0).</p>
        ) : (
          <>
            <Step n={1} title="Evaluate f(x)">
              <p className="font-mono">
                f({num(x)}) = {num(a)}({num(x)}) + {num(b)} = {result.f}
              </p>
            </Step>
            <Step n={2} title="Find the inverse f⁻¹(x) = (x − b)/a">
              <p className="font-mono">
                f⁻¹({num(x)}) = ({num(x)} − {num(b)}) / {num(a)} ={" "}
                {result.inverse.toFixed(4)}
              </p>
            </Step>
            <Step n={3} title="Compose f(f(x))">
              <p className="font-mono">
                f(f({num(x)})) = {num(a)}({result.f}) + {num(b)} ={" "}
                {result.composed}
              </p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function LogEquationSolver() {
  const [base, setBase] = useState("2");
  const [arg, setArg] = useState("8");

  const result = useMemo(() => {
    const b = num(base), a = num(arg);
    if (!Number.isFinite(b) || !Number.isFinite(a) || b <= 0 || b === 1 || a <= 0)
      return null;
    return { value: Math.log(a) / Math.log(b) };
  }, [base, arg]);

  return (
    <Shell
      title="Log Equation Solver"
      desc="Solve log_b(x) = y by converting to exponential form."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">Base (b)</Label>
          <Input
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="border-blue-900/60 bg-slate-950 text-white"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">Argument (x)</Label>
          <Input
            value={arg}
            onChange={(e) => setArg(e.target.value)}
            className="border-blue-900/60 bg-slate-950 text-white"
          />
        </div>
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">
            Base must be positive and not 1; argument must be positive.
          </p>
        ) : (
          <>
            <Step n={1} title="Write the equation">
              <p className="font-mono">
                log_{num(base)}({num(arg)}) = y
              </p>
            </Step>
            <Step n={2} title="Convert to exponential form">
              <p className="font-mono">
                {num(base)}^y = {num(arg)}
              </p>
            </Step>
            <Step n={3} title="Solve for y">
              <p className="font-mono">
                y = log({num(arg)}) / log({num(base)}) = {result.value.toFixed(6)}
              </p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function ExponentialModeler() {
  const [initial, setInitial] = useState("100");
  const [rate, setRate] = useState("5");
  const [time, setTime] = useState("10");

  const result = useMemo(() => {
    const p = num(initial), r = num(rate) / 100, t = num(time);
    if (![p, r, t].every(Number.isFinite)) return null;
    return {
      growth: p * Math.pow(1 + r, t),
      decay: p * Math.pow(1 - r, t),
      continuous: p * Math.exp(r * t),
      doubleTime: r > 0 ? Math.log(2) / Math.log(1 + r) : NaN,
    };
  }, [initial, rate, time]);

  return (
    <Shell
      title="Exponential Modeler"
      desc="Model growth and decay with A = P(1 ± r)^t."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Initial amount (P)", initial, setInitial],
          ["Rate % (r)", rate, setRate],
          ["Time (t)", time, setTime],
        ].map(([l, v, s]) => (
          <div key={l as string} className="space-y-1">
            <Label className="text-xs text-blue-400">{l as string}</Label>
            <Input
              value={v as string}
              onChange={(e) => (s as (x: string) => void)(e.target.value)}
              className="border-blue-900/60 bg-slate-950 text-white"
            />
          </div>
        ))}
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">Enter valid numbers.</p>
        ) : (
          <>
            <Step n={1} title="Set up the growth formula">
              <p className="font-mono">
                A = {num(initial)}(1 + {num(rate) / 100})^{num(time)}
              </p>
            </Step>
            <Step n={2} title="Compute growth">
              <p className="font-mono">A = {result.growth.toFixed(4)}</p>
            </Step>
            <Step n={3} title="Compute decay">
              <p className="font-mono">A = {result.decay.toFixed(4)}</p>
            </Step>
            <Step n={4} title="Continuous compounding (Pe^{rt})">
              <p className="font-mono">A = {result.continuous.toFixed(4)}</p>
            </Step>
            <Step n={5} title="Doubling time">
              <p className="font-mono">
                {Number.isFinite(result.doubleTime)
                  ? result.doubleTime.toFixed(4) + " periods"
                  : "n/a (rate must be positive)"}
              </p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function ConicIdentifier() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("1");
  const [c, setC] = useState("-4");

  const result = useMemo(() => {
    const A = num(a), B = num(b), C = num(c);
    if (![A, B, C].every(Number.isFinite)) return null;
    let type = "Unknown";
    if (A === 0 && B === 0) type = "Line / degenerate";
    else if (A === 0 || B === 0) type = "Parabola";
    else if (A === B) type = "Circle";
    else if (A * B > 0) type = "Ellipse";
    else type = "Hyperbola";
    return { type, A, B, C };
  }, [a, b, c]);

  return (
    <Shell
      title="Conic Identifier"
      desc="Classify Ax² + By² + C = 0 by its coefficients."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["A (x² coeff)", a, setA],
          ["B (y² coeff)", b, setB],
          ["C (constant)", c, setC],
        ].map(([l, v, s]) => (
          <div key={l as string} className="space-y-1">
            <Label className="text-xs text-blue-400">{l as string}</Label>
            <Input
              value={v as string}
              onChange={(e) => (s as (x: string) => void)(e.target.value)}
              className="border-blue-900/60 bg-slate-950 text-white"
            />
          </div>
        ))}
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">Enter valid coefficients.</p>
        ) : (
          <>
            <Step n={1} title="Write the general form">
              <p className="font-mono">
                {result.A}x² + {result.B}y² + {result.C} = 0
              </p>
            </Step>
            <Step n={2} title="Compare A and B">
              <p className="font-mono">
                A = {result.A}, B = {result.B}
              </p>
            </Step>
            <Step n={3} title="Classify the conic">
              <p className="font-mono text-base text-blue-100">
                {result.type}
              </p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function MatrixOperations() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("2");
  const [c, setC] = useState("3");
  const [d, setD] = useState("4");

  const result = useMemo(() => {
    const A = num(a), B = num(b), C = num(c), D = num(d);
    if (![A, B, C, D].every(Number.isFinite)) return null;
    const det = A * D - B * C;
    const trace = A + D;
    return {
      det,
      trace,
      inverse:
        det !== 0
          ? { a: D / det, b: -B / det, c: -C / det, d: A / det }
          : null,
    };
  }, [a, b, c, d]);

  return (
    <Shell
      title="Matrix Operations"
      desc="Determinant, trace, and inverse of a 2×2 matrix."
    >
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          ["a", a, setA],
          ["b", b, setB],
          ["c", c, setC],
          ["d", d, setD],
        ].map(([l, v, s]) => (
          <div key={l as string} className="space-y-1">
            <Label className="text-xs text-blue-400">{l as string}</Label>
            <Input
              value={v as string}
              onChange={(e) => (s as (x: string) => void)(e.target.value)}
              className="border-blue-900/60 bg-slate-950 text-white"
            />
          </div>
        ))}
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">Enter valid numbers.</p>
        ) : (
          <>
            <Step n={1} title="Write the matrix">
              <p className="font-mono">
                [ {num(a)} {num(b)} ; {num(c)} {num(d)} ]
              </p>
            </Step>
            <Step n={2} title="Determinant = ad − bc">
              <p className="font-mono">
                ({num(a)})({num(d)}) − ({num(b)})({num(c)}) = {result.det}
              </p>
            </Step>
            <Step n={3} title="Trace = a + d">
              <p className="font-mono">
                {num(a)} + {num(d)} = {result.trace}
              </p>
            </Step>
            <Step n={4} title="Inverse (if det ≠ 0)">
              {result.inverse ? (
                <p className="font-mono">
                  [ {result.inverse.a.toFixed(3)} {result.inverse.b.toFixed(3)} ;{" "}
                  {result.inverse.c.toFixed(3)} {result.inverse.d.toFixed(3)} ]
                </p>
              ) : (
                <p className="text-rose-400">
                  Determinant is 0 — the matrix is not invertible.
                </p>
              )}
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}