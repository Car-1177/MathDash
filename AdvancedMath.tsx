import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Sigma,
  LineChart,
  FunctionSquare,
  Infinity as InfinityIcon,
  Waves,
  Activity,
  TrendingUp,
  Divide,
  Radical,
  GitBranch,
} from "lucide-react";

/* ============================================================
   ALGEBRA 2
   ============================================================ */

/* --- Rational Expression Simplifier --- */
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

function RationalSimplifier() {
  const [num, setNum] = useState("2x^2 - 8");
  const [den, setDen] = useState("x + 2");

  // Factor simple quadratics of form ax^2 + bx + c and linear terms
  const factorQuad = (s: string): string | null => {
    const m = s.replace(/\s/g, "").match(/^(-?\d*)x\^2([+-]\d*)x?([+-]\d+)?$/);
    if (!m) return null;
    const a = m[1] === "" || m[1] === "+" ? 1 : m[1] === "-" ? -1 : parseInt(m[1]);
    const b = m[2] ? parseInt(m[2]) : 0;
    const c = m[3] ? parseInt(m[3]) : 0;
    const disc = b * b - 4 * a * c;
    if (disc < 0 || Math.sqrt(disc) % 1 !== 0) return null;
    const r1 = (-b + Math.sqrt(disc)) / (2 * a);
    const r2 = (-b - Math.sqrt(disc)) / (2 * a);
    const fmt = (r: number) => (r === 0 ? "x" : r > 0 ? `(x - ${r})` : `(x + ${-r})`);
    return `${a !== 1 ? a : ""}${fmt(r1)}${fmt(r2)}`;
  };

  const factoredNum = factorQuad(num);
  const factoredDen = factorQuad(den);

  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-100">
          <Divide className="h-5 w-5 text-blue-400" /> Rational Expression Simplifier
        </CardTitle>
        <p className="text-sm text-blue-400/70">
          Factor and simplify rational expressions. Supports quadratics like x^2 - 9.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-blue-300">Numerator</Label>
            <Input value={num} onChange={(e) => setNum(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-blue-300">Denominator</Label>
            <Input value={den} onChange={(e) => setDen(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-blue-950 bg-blue-950/30 p-4">
            <p className="text-xs uppercase tracking-wider text-blue-400">Factored Numerator</p>
            <p className="mt-1 font-mono text-lg text-white">{factoredNum ?? "Cannot factor (try x^2 - 9)"}</p>
          </div>
          <div className="rounded-xl border border-blue-950 bg-blue-950/30 p-4">
            <p className="text-xs uppercase tracking-wider text-blue-400">Factored Denominator</p>
            <p className="mt-1 font-mono text-lg text-white">{factoredDen ?? "Cannot factor (try x + 2)"}</p>
          </div>
          {factoredNum && factoredDen && (
            <div className="rounded-xl border border-emerald-500/50 bg-emerald-950/30 p-4">
              <p className="text-xs uppercase tracking-wider text-emerald-400">Simplified</p>
              <p className="mt-1 font-mono text-lg text-white">
                ({factoredNum}) / ({factoredDen})
              </p>
              <p className="mt-1 text-xs text-emerald-300/70">
                Cancel any common factors between numerator and denominator.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* --- Function Composition & Inverse --- */
function Composition() {
  const [fx, setFx] = useState("2x + 3");
  const [gx, setGx] = useState("x^2");
  const [x, setX] = useState(2);

  const evalFn = (expr: string, val: number): number | null => {
    try {
      const js = expr
        .replace(/\^/g, "**")
        .replace(/(\d)(x)/g, "$1*$2")
        .replace(/x/g, `(${val})`);
      // eslint-disable-next-line no-new-func
      const r = Function(`"use strict";return (${js})`)();
      return typeof r === "number" && isFinite(r) ? r : null;
    } catch {
      return null;
    }
  };

  const gOfX = evalFn(gx, x);
  const fOfG = gOfX !== null ? evalFn(fx, gOfX) : null;
  const fOfX = evalFn(fx, x);
  const gOfF = fOfX !== null ? evalFn(gx, fOfX) : null;

  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-100">
          <GitBranch className="h-5 w-5 text-blue-400" /> Composition & Inverse
        </CardTitle>
        <p className="text-sm text-blue-400/70">
          Evaluate f(g(x)) and g(f(x)) at a point. Use x for the variable.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-blue-300">f(x)</Label>
            <Input value={fx} onChange={(e) => setFx(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-blue-300">g(x)</Label>
            <Input value={gx} onChange={(e) => setGx(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-blue-300">x =</Label>
            <Input type="number" value={x} onChange={(e) => setX(parseFloat(e.target.value) || 0)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "f(g(x))", value: fOfG },
            { label: "g(f(x))", value: gOfF },
          ].map((r) => (
            <div key={r.label} className="rounded-xl border border-blue-500/50 bg-blue-950/50 p-4">
              <p className="text-xs uppercase tracking-wider text-blue-400">{r.label}</p>
              <p className="mt-1 font-mono text-2xl text-white">
                {r.value !== null ? r.value.toFixed(4).replace(/\.?0+$/, "") : "—"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   PRE-CALCULUS
   ============================================================ */

/* --- Sequence & Series Analyzer --- */
function SequenceSeries() {
  const [a1, setA1] = useState(3);
  const [d, setD] = useState(4);
  const [n, setN] = useState(10);
  const [type, setType] = useState<"arith" | "geo">("arith");

  const terms: number[] = [];
  for (let i = 0; i < n; i++) {
    terms.push(type === "arith" ? a1 + i * d : a1 * Math.pow(d, i));
  }
  const sum = terms.reduce((s, t) => s + t, 0);
  const nth = terms[n - 1];

  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-100">
          <TrendingUp className="h-5 w-5 text-blue-400" /> Sequence & Series Analyzer
        </CardTitle>
        <p className="text-sm text-blue-400/70">
          Arithmetic and geometric sequences with nth term and partial sums.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex gap-2">
          {(["arith", "geo"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm transition",
                type === t ? "bg-blue-600 text-white" : "border border-blue-900/50 bg-blue-950/30 text-blue-300 hover:text-white"
              )}
            >
              {t === "arith" ? "Arithmetic" : "Geometric"}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-blue-300">First term (a₁)</Label>
            <Input type="number" value={a1} onChange={(e) => setA1(parseFloat(e.target.value) || 0)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-blue-300">{type === "arith" ? "Common diff (d)" : "Common ratio (r)"}</Label>
            <Input type="number" value={d} onChange={(e) => setD(parseFloat(e.target.value) || 0)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-blue-300">Number of terms (n)</Label>
            <Input type="number" value={n} onChange={(e) => setN(Math.max(1, parseInt(e.target.value) || 1))} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-blue-500/50 bg-blue-950/50 p-4">
            <p className="text-xs uppercase tracking-wider text-blue-400">nth term (aₙ)</p>
            <p className="mt-1 font-mono text-2xl text-white">{nth}</p>
          </div>
          <div className="rounded-xl border border-emerald-500/50 bg-emerald-950/30 p-4">
            <p className="text-xs uppercase tracking-wider text-emerald-400">Sum of first {n}</p>
            <p className="mt-1 font-mono text-2xl text-white">{sum}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {terms.slice(0, 12).map((t, i) => (
            <Badge key={i} className="border-blue-800/50 bg-blue-950/60 font-mono text-blue-200">
              {t}
            </Badge>
          ))}
          {n > 12 && <Badge className="border-blue-800/50 bg-blue-950/60 text-blue-400">…</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}

/* --- Polar & Parametric Plotter --- */
function PolarPlot() {
  const [mode, setMode] = useState<"polar" | "param">("polar");
  const [polarExpr, setPolarExpr] = useState("2 + 2 * cos(t)");
  const [xExpr, setXExpr] = useState("3 * cos(t)");
  const [yExpr, setYExpr] = useState("3 * sin(t)");

  const W = 480;
  const H = 480;
  const cx = W / 2;
  const cy = H / 2;
  const scale = 40;

  const evalExpr = (expr: string, t: number): number => {
    try {
      const js = expr
        .replace(/\^/g, "**")
        .replace(/(\d)([a-z(])/g, "$1*$2")
        .replace(/\b(sin|cos|tan|sqrt|abs|exp|log)\b/g, "Math.$1")
        .replace(/\bpi\b/g, "Math.PI")
        .replace(/\bt\b/g, `(${t})`);
      // eslint-disable-next-line no-new-func
      const r = Function(`"use strict";return (${js})`)();
      return typeof r === "number" && isFinite(r) ? r : NaN;
    } catch {
      return NaN;
    }
  };

  const points: string[] = [];
  for (let i = 0; i <= 720; i++) {
    const t = (i / 720) * Math.PI * 4;
    let x: number, y: number;
    if (mode === "polar") {
      const r = evalExpr(polarExpr, t);
      x = r * Math.cos(t);
      y = r * Math.sin(t);
    } else {
      x = evalExpr(xExpr, t);
      y = evalExpr(yExpr, t);
    }
    if (!isNaN(x) && !isNaN(y)) {
      points.push(`${cx + x * scale},${cy - y * scale}`);
    }
  }

  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-100">
          <Waves className="h-5 w-5 text-blue-400" /> Polar & Parametric Plotter
        </CardTitle>
        <p className="text-sm text-blue-400/70">
          Plot polar curves r(t) or parametric (x(t), y(t)). Use t as the parameter.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex gap-2">
          {(["polar", "param"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm capitalize transition",
                mode === m ? "bg-blue-600 text-white" : "border border-blue-900/50 bg-blue-950/30 text-blue-300 hover:text-white"
              )}
            >
              {m === "polar" ? "Polar" : "Parametric"}
            </button>
          ))}
        </div>
        {mode === "polar" ? (
          <div className="space-y-1.5">
            <Label className="text-blue-300">r(t) =</Label>
            <Input value={polarExpr} onChange={(e) => setPolarExpr(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-blue-300">x(t) =</Label>
              <Input value={xExpr} onChange={(e) => setXExpr(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-blue-300">y(t) =</Label>
              <Input value={yExpr} onChange={(e) => setYExpr(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
            </div>
          </div>
        )}
        <div className="overflow-hidden rounded-xl border border-blue-950 bg-slate-950">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {Array.from({ length: 13 }).map((_, i) => (
              <line key={`v${i}`} x1={i * scale} y1={0} x2={i * scale} y2={H} stroke="#1e3a8a" strokeWidth={0.5} opacity={0.4} />
            ))}
            {Array.from({ length: 13 }).map((_, i) => (
              <line key={`h${i}`} x1={0} y1={i * scale} x2={W} y2={i * scale} stroke="#1e3a8a" strokeWidth={0.5} opacity={0.4} />
            ))}
            <line x1={0} y1={cy} x2={W} y2={cy} stroke="#3b82f6" strokeWidth={1.5} />
            <line x1={cx} y1={0} x2={cx} y2={H} stroke="#3b82f6" strokeWidth={1.5} />
            <polyline points={points.join(" ")} fill="none" stroke="#60a5fa" strokeWidth={2} />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   CALCULUS
   ============================================================ */

/* --- Limit Calculator --- */
function LimitCalculator() {
  const [expr, setExpr] = useState("(x^2 - 1) / (x - 1)");
  const [approach, setApproach] = useState(1);
  const [side, setSide] = useState<"both" | "left" | "right">("both");

  const evalAt = (val: number): number => {
    try {
      const js = expr
        .replace(/\^/g, "**")
        .replace(/(\d)(x)/g, "$1*$2")
        .replace(/\bx\b/g, `(${val})`);
      // eslint-disable-next-line no-new-func
      const r = Function(`"use strict";return (${js})`)();
      return typeof r === "number" ? r : NaN;
    } catch {
      return NaN;
    }
  };

  const left = evalAt(approach - 0.0001);
  const right = evalAt(approach + 0.0001);
  const direct = evalAt(approach);

  let conclusion = "—";
  if (!isNaN(left) && !isNaN(right) && Math.abs(left - right) < 0.01) {
    conclusion = `Limit ≈ ${((left + right) / 2).toFixed(4)}`;
  } else if (!isNaN(left) && !isNaN(right)) {
    conclusion = "Limit does not exist (left ≠ right)";
  } else if (!isNaN(direct)) {
    conclusion = `f(${approach}) = ${direct.toFixed(4)}`;
  }

  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-100">
          <Activity className="h-5 w-5 text-blue-400" /> Limit Calculator
        </CardTitle>
        <p className="text-sm text-blue-400/70">
          Numerically estimate limits by approaching from both sides.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-blue-300">f(x) =</Label>
            <Input value={expr} onChange={(e) => setExpr(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-blue-300">x →</Label>
            <Input type="number" value={approach} onChange={(e) => setApproach(parseFloat(e.target.value) || 0)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
        </div>
        <div className="flex gap-2">
          {(["both", "left", "right"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSide(s)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm capitalize transition",
                side === s ? "bg-blue-600 text-white" : "border border-blue-900/50 bg-blue-950/30 text-blue-300 hover:text-white"
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-blue-950 bg-blue-950/30 p-3">
            <p className="text-xs text-blue-400">From left</p>
            <p className="font-mono text-lg text-white">{isNaN(left) ? "—" : left.toFixed(4)}</p>
          </div>
          <div className="rounded-xl border border-blue-950 bg-blue-950/30 p-3">
            <p className="text-xs text-blue-400">At point</p>
            <p className="font-mono text-lg text-white">{isNaN(direct) ? "undefined" : direct.toFixed(4)}</p>
          </div>
          <div className="rounded-xl border border-blue-950 bg-blue-950/30 p-3">
            <p className="text-xs text-blue-400">From right</p>
            <p className="font-mono text-lg text-white">{isNaN(right) ? "—" : right.toFixed(4)}</p>
          </div>
        </div>
        <div className="rounded-xl border border-emerald-500/50 bg-emerald-950/30 p-4">
          <p className="text-xs uppercase tracking-wider text-emerald-400">Conclusion</p>
          <p className="mt-1 font-mono text-lg text-white">{conclusion}</p>
        </div>
      </CardContent>
    </Card>
  );
}

/* --- Riemann Sum Visualizer --- */
function RiemannSum() {
  const [expr, setExpr] = useState("x^2");
  const [a, setA] = useState(0);
  const [b, setB] = useState(4);
  const [n, setN] = useState(8);
  const [method, setMethod] = useState<"left" | "right" | "mid">("mid");

  const W = 480;
  const H = 300;
  const scaleX = W / (b - a || 1);

  const evalFn = (val: number): number => {
    try {
      const js = expr.replace(/\^/g, "**").replace(/(\d)(x)/g, "$1*$2").replace(/\bx\b/g, `(${val})`);
      // eslint-disable-next-line no-new-func
      const r = Function(`"use strict";return (${js})`)();
      return typeof r === "number" && isFinite(r) ? r : 0;
    } catch {
      return 0;
    }
  };

  const dx = (b - a) / n;
  let sum = 0;
  const rects: { x: number; h: number }[] = [];
  for (let i = 0; i < n; i++) {
    const xl = a + i * dx;
    const xr = xl + dx;
    const sample = method === "left" ? xl : method === "right" ? xr : (xl + xr) / 2;
    const h = evalFn(sample);
    sum += h * dx;
    rects.push({ x: xl, h });
  }

  const maxH = Math.max(...rects.map((r) => Math.abs(r.h)), 1);
  const scaleY = (H - 40) / maxH;

  const curve: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = a + (i / 100) * (b - a);
    const y = evalFn(x);
    curve.push(`${(x - a) * scaleX},${H - 20 - y * scaleY}`);
  }

  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-100">
          <InfinityIcon className="h-5 w-5 text-blue-400" /> Riemann Sum Visualizer
        </CardTitle>
        <p className="text-sm text-blue-400/70">
          Approximate the area under a curve with left, right, or midpoint rectangles.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-blue-300">f(x) =</Label>
            <Input value={expr} onChange={(e) => setExpr(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-blue-300">a</Label>
            <Input type="number" value={a} onChange={(e) => setA(parseFloat(e.target.value) || 0)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-blue-300">b</Label>
            <Input type="number" value={b} onChange={(e) => setB(parseFloat(e.target.value) || 1)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
        </div>
        <div className="flex gap-2">
          {(["left", "mid", "right"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm capitalize transition",
                method === m ? "bg-blue-600 text-white" : "border border-blue-900/50 bg-blue-950/30 text-blue-300 hover:text-white"
              )}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <Label className="text-blue-300">Rectangles (n)</Label>
            <span className="font-mono text-blue-200">{n}</span>
          </div>
          <input type="range" min={1} max={50} value={n} onChange={(e) => setN(parseInt(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div className="overflow-hidden rounded-xl border border-blue-950 bg-slate-950">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {rects.map((r, i) => (
              <rect
                key={i}
                x={(r.x - a) * scaleX}
                y={H - 20 - Math.max(r.h, 0) * scaleY}
                width={dx * scaleX}
                height={Math.abs(r.h) * scaleY}
                fill="#3b82f6"
                opacity={0.35}
                stroke="#60a5fa"
                strokeWidth={0.8}
              />
            ))}
            <polyline points={curve.join(" ")} fill="none" stroke="#93c5fd" strokeWidth={2.5} />
            <line x1={0} y1={H - 20} x2={W} y2={H - 20} stroke="#3b82f6" strokeWidth={1.5} />
          </svg>
        </div>
        <div className="rounded-xl border border-emerald-500/50 bg-emerald-950/30 p-4">
          <p className="text-xs uppercase tracking-wider text-emerald-400">
            {method} Riemann sum ≈
          </p>
          <p className="mt-1 font-mono text-2xl text-white">{sum.toFixed(4)}</p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   TRIGONOMETRY
   ============================================================ */

/* --- Trig Identity Verifier --- */
function IdentityVerifier() {
  const [lhs, setLhs] = useState("sin(x)^2 + cos(x)^2");
  const [rhs, setRhs] = useState("1");

  const evalTrig = (expr: string, x: number): number => {
    try {
      const js = expr
        .replace(/\^/g, "**")
        .replace(/(\d)([a-z(])/g, "$1*$2")
        .replace(/\b(sin|cos|tan|sec|csc|cot|asin|acos|atan|sqrt|abs)\b/g, "Math.$1")
        .replace(/\bpi\b/g, "Math.PI")
        .replace(/\bx\b/g, `(${x})`);
      // eslint-disable-next-line no-new-func
      const r = Function(`"use strict";return (${js})`)();
      return typeof r === "number" && isFinite(r) ? r : NaN;
    } catch {
      return NaN;
    }
  };

  const samples = [0.3, 0.7, 1.1, 1.7, 2.3, 2.9];
  const results = samples.map((x) => {
    const l = evalTrig(lhs, x);
    const r = evalTrig(rhs, x);
    return { x, l, r, match: !isNaN(l) && !isNaN(r) && Math.abs(l - r) < 0.0001 };
  });
  const allMatch = results.every((r) => r.match);

  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-100">
          <FunctionSquare className="h-5 w-5 text-blue-400" /> Trig Identity Verifier
        </CardTitle>
        <p className="text-sm text-blue-400/70">
          Test whether two expressions are identical across sample values. Use x in radians.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-blue-300">Left side</Label>
            <Input value={lhs} onChange={(e) => setLhs(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-blue-300">Right side</Label>
            <Input value={rhs} onChange={(e) => setRhs(e.target.value)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
        </div>
        <div
          className={cn(
            "rounded-xl border p-4 text-center",
            allMatch ? "border-emerald-500/50 bg-emerald-950/30" : "border-amber-500/50 bg-amber-950/20"
          )}
        >
          <p className={cn("font-semibold", allMatch ? "text-emerald-300" : "text-amber-300")}>
            {allMatch ? "✓ Identity holds at all sample points" : "✗ Expressions differ at some points"}
          </p>
        </div>
        <div className="space-y-2">
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-blue-950 bg-blue-950/30 px-3 py-2 font-mono text-sm">
              <span className="text-blue-400">x = {r.x}</span>
              <span className="text-blue-200">L = {isNaN(r.l) ? "—" : r.l.toFixed(4)}</span>
              <span className="text-blue-200">R = {isNaN(r.r) ? "—" : r.r.toFixed(4)}</span>
              <span className={r.match ? "text-emerald-400" : "text-rose-400"}>
                {r.match ? "✓" : "✗"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* --- Law of Sines & Cosines --- */
function LawOfSinesCosines() {
  const [mode, setMode] = useState<"sines" | "cosines">("sines");
  const [a, setA] = useState(8);
  const [b, setB] = useState(6);
  const [angleA, setAngleA] = useState(40);
  const [angleC, setAngleC] = useState(60);

  const rad = (d: number) => (d * Math.PI) / 180;
  const deg = (r: number) => (r * 180) / Math.PI;

  let result = "";
  if (mode === "sines") {
    const angleB = 180 - angleA - angleC;
    if (angleB > 0) {
      const ratio = a / Math.sin(rad(angleA));
      const sideB = ratio * Math.sin(rad(angleB));
      const sideC = ratio * Math.sin(rad(angleC));
      result = `Angle B = ${angleB.toFixed(2)}° · Side b = ${sideB.toFixed(3)} · Side c = ${sideC.toFixed(3)}`;
    } else {
      result = "Angles must sum to less than 180°.";
    }
  } else {
    const c2 = a * a + b * b - 2 * a * b * Math.cos(rad(angleC));
    const c = Math.sqrt(c2);
    const angleAcalc = deg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
    const angleBcalc = 180 - angleAcalc - angleC;
    result = `Side c = ${c.toFixed(3)} · Angle A = ${angleAcalc.toFixed(2)}° · Angle B = ${angleBcalc.toFixed(2)}°`;
  }

  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-100">
          <Radical className="h-5 w-5 text-blue-400" /> Law of Sines & Cosines
        </CardTitle>
        <p className="text-sm text-blue-400/70">
          Solve oblique triangles using the law of sines or cosines.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex gap-2">
          {(["sines", "cosines"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm capitalize transition",
                mode === m ? "bg-blue-600 text-white" : "border border-blue-900/50 bg-blue-950/30 text-blue-300 hover:text-white"
              )}
            >
              Law of {m}
            </button>
          ))}
        </div>
        {mode === "sines" ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="text-blue-300">Side a</Label>
              <Input type="number" value={a} onChange={(e) => setA(parseFloat(e.target.value) || 0)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-blue-300">Angle A (°)</Label>
              <Input type="number" value={angleA} onChange={(e) => setAngleA(parseFloat(e.target.value) || 0)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-blue-300">Angle C (°)</Label>
              <Input type="number" value={angleC} onChange={(e) => setAngleC(parseFloat(e.target.value) || 0)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="text-blue-300">Side a</Label>
              <Input type="number" value={a} onChange={(e) => setA(parseFloat(e.target.value) || 0)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-blue-300">Side b</Label>
              <Input type="number" value={b} onChange={(e) => setB(parseFloat(e.target.value) || 0)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-blue-300">Angle C (°)</Label>
              <Input type="number" value={angleC} onChange={(e) => setAngleC(parseFloat(e.target.value) || 0)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
            </div>
          </div>
        )}
        <div className="rounded-xl border border-emerald-500/50 bg-emerald-950/30 p-4">
          <p className="text-xs uppercase tracking-wider text-emerald-400">Solution</p>
          <p className="mt-1 font-mono text-base text-white">{result}</p>
        </div>
      </CardContent>
    </Card>
  );
}

/* --- Trig Equation Solver --- */
function TrigEquationSolver() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [fn, setFn] = useState<"sin" | "cos" | "tan">("sin");

  const solutions: number[] = [];
  const solve = () => {
    // Solve a*fn(x) + b = 0  =>  fn(x) = -b/a
    const target = -b / a;
    if (Math.abs(target) > 1 && fn !== "tan") return;
    for (let deg = 0; deg < 360; deg++) {
      const r = (deg * Math.PI) / 180;
      const val = fn === "sin" ? Math.sin(r) : fn === "cos" ? Math.cos(r) : Math.tan(r);
      if (Math.abs(val - target) < 0.001) solutions.push(deg);
    }
  };
  solve();

  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-100">
          <Sigma className="h-5 w-5 text-blue-400" /> Trig Equation Solver
        </CardTitle>
        <p className="text-sm text-blue-400/70">
          Solve a·fn(x) + b = 0 for x in [0°, 360°).
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex gap-2">
          {(["sin", "cos", "tan"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFn(f)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm transition",
                fn === f ? "bg-blue-600 text-white" : "border border-blue-900/50 bg-blue-950/30 text-blue-300 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-blue-300">Coefficient a</Label>
            <Input type="number" value={a} onChange={(e) => setA(parseFloat(e.target.value) || 1)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-blue-300">Constant b</Label>
            <Input type="number" value={b} onChange={(e) => setB(parseFloat(e.target.value) || 0)} className="border-blue-900/60 bg-slate-950 font-mono text-white" />
          </div>
        </div>
        <div className="rounded-xl border border-blue-500/50 bg-blue-950/50 p-4">
          <p className="text-xs uppercase tracking-wider text-blue-400">Equation</p>
          <p className="mt-1 font-mono text-lg text-white">
            {a}·{fn}(x) + {b} = 0
          </p>
        </div>
        {solutions.length > 0 ? (
          <div className="rounded-xl border border-emerald-500/50 bg-emerald-950/30 p-4">
            <p className="text-xs uppercase tracking-wider text-emerald-400">
              Solutions in [0°, 360°)
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {solutions.map((s) => (
                <Badge key={s} className="border-emerald-800/50 bg-emerald-900/40 font-mono text-emerald-200">
                  {s}°
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-amber-300">No solutions in [0°, 360°) for this equation.</p>
        )}
      </CardContent>
    </Card>
  );
}

export function AdvancedMath({ tool }: { tool: string }) {
  switch (tool) {
    case "rational":
      return <RationalSimplifier />;
    case "composition":
      return <Composition />;
    case "sequenceseries":
      return <SequenceSeries />;
    case "polar":
      return <PolarPlot />;
    case "limits":
      return <LimitCalculator />;
    case "riemann":
      return <RiemannSum />;
    case "identity":
      return <IdentityVerifier />;
    case "lawofsines":
      return <LawOfSinesCosines />;
    case "trigeq":
      return <TrigEquationSolver />;
    default:
      return null;
  }
}