import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { compileFn, derivative, integral } from "@/lib/math";

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

export function CalculusTools({ tool }: { tool: string }) {
  switch (tool) {
    case "limits":
      return <LimitCalculator />;
    case "riemann":
      return <RiemannSums />;
    case "derivative":
      return <DerivativeRules />;
    case "integral":
      return <IntegralApprox />;
    case "tangent":
      return <TangentLine />;
    case "optimization":
      return <Optimization />;
    default:
      return null;
  }
}

function LimitCalculator() {
  const [expr, setExpr] = useState("(x^2 - 1) / (x - 1)");
  const [approach, setApproach] = useState("1");

  const result = useMemo(() => {
    const fn = compileFn(expr);
    const X = num(approach);
    if (!fn || !Number.isFinite(X)) return null;
    return {
      left: fn(X - 1e-4),
      right: fn(X + 1e-4),
      at: fn(X),
    };
  }, [expr, approach]);

  return (
    <Shell title="Limit Calculator" desc="Numerically estimate lim f(x) from both sides.">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">f(x) =</Label>
          <Input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="border-blue-900/60 bg-slate-950 font-mono text-white"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">x →</Label>
          <Input
            value={approach}
            onChange={(e) => setApproach(e.target.value)}
            className="border-blue-900/60 bg-slate-950 font-mono text-white"
          />
        </div>
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">Enter a valid function and point.</p>
        ) : (
          <>
            <Step n={1} title="Approach from the left">
              <p className="font-mono">
                f(x⁻) ≈ {Number.isFinite(result.left) ? result.left.toFixed(6) : "undefined"}
              </p>
            </Step>
            <Step n={2} title="Approach from the right">
              <p className="font-mono">
                f(x⁺) ≈ {Number.isFinite(result.right) ? result.right.toFixed(6) : "undefined"}
              </p>
            </Step>
            <Step n={3} title="Compare one-sided limits">
              <p className="font-mono">
                {Number.isFinite(result.left) &&
                Number.isFinite(result.right) &&
                Math.abs(result.left - result.right) < 1e-3
                  ? `Limit ≈ ${((result.left + result.right) / 2).toFixed(6)}`
                  : "One-sided limits differ — limit does not exist."}
              </p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function RiemannSums() {
  const [expr, setExpr] = useState("x^2");
  const [a, setA] = useState("0");
  const [b, setB] = useState("2");
  const [n, setN] = useState("100");

  const result = useMemo(() => {
    const fn = compileFn(expr);
    const A = num(a), B = num(b), N = parseInt(n, 10);
    if (!fn || ![A, B].every(Number.isFinite) || !Number.isFinite(N) || N < 1 || B <= A)
      return null;
    const dx = (B - A) / N;
    let left = 0, right = 0, mid = 0;
    for (let i = 0; i < N; i++) {
      left += fn(A + i * dx) * dx;
      right += fn(A + (i + 1) * dx) * dx;
      mid += fn(A + (i + 0.5) * dx) * dx;
    }
    return { left, right, mid, dx, trap: integral(fn, A, B, N) };
  }, [expr, a, b, n]);

  return (
    <Shell title="Riemann Sums" desc="Approximate the area under a curve with rectangles.">
      <div className="grid gap-3 sm:grid-cols-4">
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs text-blue-400">f(x) =</Label>
          <Input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="border-blue-900/60 bg-slate-950 font-mono text-white"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">a</Label>
          <Input value={a} onChange={(e) => setA(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">b</Label>
          <Input value={b} onChange={(e) => setB(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs text-blue-400">Subintervals n</Label>
        <Input value={n} onChange={(e) => setN(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">
            Enter a valid function with b &gt; a and n ≥ 1.
          </p>
        ) : (
          <>
            <Step n={1} title="Compute Δx = (b − a)/n">
              <p className="font-mono">{result.dx.toFixed(6)}</p>
            </Step>
            <Step n={2} title="Left Riemann sum">
              <p className="font-mono">{result.left.toFixed(6)}</p>
            </Step>
            <Step n={3} title="Right Riemann sum">
              <p className="font-mono">{result.right.toFixed(6)}</p>
            </Step>
            <Step n={4} title="Midpoint sum">
              <p className="font-mono">{result.mid.toFixed(6)}</p>
            </Step>
            <Step n={5} title="Trapezoidal approximation">
              <p className="font-mono">{result.trap.toFixed(6)}</p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function DerivativeRules() {
  const [expr, setExpr] = useState("x^3 - 2x + 1");
  const [x, setX] = useState("2");

  const result = useMemo(() => {
    const fn = compileFn(expr);
    const X = num(x);
    if (!fn || !Number.isFinite(X)) return null;
    return { slope: derivative(fn, X), value: fn(X) };
  }, [expr, x]);

  return (
    <Shell title="Derivative Rules" desc="Numerically differentiate any function at a point.">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">f(x) =</Label>
          <Input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="border-blue-900/60 bg-slate-950 font-mono text-white"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">Evaluate at x</Label>
          <Input value={x} onChange={(e) => setX(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
        </div>
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">Enter a valid function and point.</p>
        ) : (
          <>
            <Step n={1} title="Evaluate f(x)">
              <p className="font-mono">f({num(x)}) = {result.value.toFixed(6)}</p>
            </Step>
            <Step n={2} title="Central difference f'(x) ≈ [f(x+h) − f(x−h)] / 2h">
              <p className="font-mono">f'({num(x)}) ≈ {result.slope.toFixed(6)}</p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function IntegralApprox() {
  const [expr, setExpr] = useState("sin(x)");
  const [a, setA] = useState("0");
  const [b, setB] = useState("3.14159");
  const [n, setN] = useState("1000");

  const result = useMemo(() => {
    const fn = compileFn(expr);
    const A = num(a), B = num(b), N = parseInt(n, 10);
    if (!fn || ![A, B].every(Number.isFinite) || !Number.isFinite(N) || N < 1 || B <= A)
      return null;
    return { value: integral(fn, A, B, N), dx: (B - A) / N };
  }, [expr, a, b, n]);

  return (
    <Shell title="Integral Approximation" desc="Trapezoidal rule for definite integrals.">
      <div className="grid gap-3 sm:grid-cols-4">
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs text-blue-400">f(x) =</Label>
          <Input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="border-blue-900/60 bg-slate-950 font-mono text-white"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">a</Label>
          <Input value={a} onChange={(e) => setA(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">b</Label>
          <Input value={b} onChange={(e) => setB(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs text-blue-400">Subintervals n</Label>
        <Input value={n} onChange={(e) => setN(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">
            Enter a valid function with b &gt; a and n ≥ 1.
          </p>
        ) : (
          <>
            <Step n={1} title="Compute Δx">
              <p className="font-mono">{result.dx.toFixed(8)}</p>
            </Step>
            <Step n={2} title="Apply the trapezoidal rule">
              <p className="font-mono">∫ ≈ {result.value.toFixed(8)}</p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function TangentLine() {
  const [expr, setExpr] = useState("x^2");
  const [x0, setX0] = useState("1");

  const result = useMemo(() => {
    const fn = compileFn(expr);
    const X0 = num(x0);
    if (!fn || !Number.isFinite(X0)) return null;
    const slope = derivative(fn, X0);
    const y0 = fn(X0);
    return { slope, y0, intercept: y0 - slope * X0 };
  }, [expr, x0]);

  return (
    <Shell title="Tangent Line" desc="Find the tangent line to f(x) at a point.">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">f(x) =</Label>
          <Input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="border-blue-900/60 bg-slate-950 font-mono text-white"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">Point x₀</Label>
          <Input value={x0} onChange={(e) => setX0(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
        </div>
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">Enter a valid function and point.</p>
        ) : (
          <>
            <Step n={1} title="Find the point">
              <p className="font-mono">({num(x0)}, {result.y0.toFixed(4)})</p>
            </Step>
            <Step n={2} title="Find the slope f'(x₀)">
              <p className="font-mono">m = {result.slope.toFixed(4)}</p>
            </Step>
            <Step n={3} title="Point-slope form">
              <p className="font-mono">
                y = {result.slope.toFixed(4)}x + {result.intercept.toFixed(4)}
              </p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function Optimization() {
  const [expr, setExpr] = useState("-(x - 2)^2 + 5");
  const [lo, setLo] = useState("-10");
  const [hi, setHi] = useState("10");

  const result = useMemo(() => {
    const fn = compileFn(expr);
    const L = num(lo), H = num(hi);
    if (!fn || ![L, H].every(Number.isFinite) || H <= L) return null;
    let bestX = L, bestY = fn(L);
    const steps = 2000;
    for (let i = 0; i <= steps; i++) {
      const x = L + (i / steps) * (H - L);
      const y = fn(x);
      if (y > bestY) {
        bestY = y;
        bestX = x;
      }
    }
    return { bestX, bestY };
  }, [expr, lo, hi]);

  return (
    <Shell title="Optimization" desc="Find the maximum of f(x) on an interval.">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">f(x) =</Label>
          <Input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="border-blue-900/60 bg-slate-950 font-mono text-white"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">Lower bound</Label>
          <Input value={lo} onChange={(e) => setLo(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">Upper bound</Label>
          <Input value={hi} onChange={(e) => setHi(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
        </div>
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">
            Enter a valid function with upper &gt; lower bound.
          </p>
        ) : (
          <>
            <Step n={1} title="Scan the interval">
              <p className="font-mono">Evaluated 2000 sample points.</p>
            </Step>
            <Step n={2} title="Maximum found at">
              <p className="font-mono">x = {result.bestX.toFixed(4)}</p>
            </Step>
            <Step n={3} title="Maximum value">
              <p className="font-mono">f(x) = {result.bestY.toFixed(4)}</p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}