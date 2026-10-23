import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toRadians, toDegrees } from "@/lib/math";

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

export function TrigTools({ tool }: { tool: string }) {
  switch (tool) {
    case "identity":
      return <IdentityVerifier />;
    case "lawofsines":
      return <LawOfSinesCosines />;
    case "trigeq":
      return <TrigEquationSolver />;
    case "unitcircle2":
      return <UnitCircleExplorer />;
    case "graphingtrig":
      return <TrigGrapher />;
    default:
      return null;
  }
}

function IdentityVerifier() {
  const [angle, setAngle] = useState("30");

  const result = useMemo(() => {
    const deg = num(angle);
    if (!Number.isFinite(deg)) return null;
    const r = toRadians(deg);
    const s = Math.sin(r), c = Math.cos(r);
    return {
      pyth: s * s + c * c,
      double: 2 * s * c,
      sin2: Math.sin(2 * r),
      half: (1 - c) / 2,
    };
  }, [angle]);

  return (
    <Shell
      title="Identity Verifier"
      desc="Check trig identities numerically at any angle."
    >
      <div className="space-y-1 sm:max-w-xs">
        <Label className="text-xs text-blue-400">Angle (degrees)</Label>
        <Input
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
          className="border-blue-900/60 bg-slate-950 text-white"
        />
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">Enter a valid angle.</p>
        ) : (
          <>
            <Step n={1} title="Pythagorean identity: sin²θ + cos²θ">
              <p className="font-mono">= {result.pyth.toFixed(6)} ≈ 1 ✓</p>
            </Step>
            <Step n={2} title="Double angle: sin 2θ = 2 sin θ cos θ">
              <p className="font-mono">
                2 sinθ cosθ = {result.double.toFixed(6)}
              </p>
              <p className="font-mono">sin(2θ) = {result.sin2.toFixed(6)} ✓</p>
            </Step>
            <Step n={3} title="Half angle: sin²(θ/2) = (1 − cos θ)/2">
              <p className="font-mono">= {result.half.toFixed(6)}</p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function LawOfSinesCosines() {
  const [a, setA] = useState("8");
  const [b, setB] = useState("6");
  const [angleC, setAngleC] = useState("60");

  const result = useMemo(() => {
    const A = num(a), B = num(b), C = num(angleC);
    if (![A, B, C].every(Number.isFinite) || A <= 0 || B <= 0) return null;
    const r = toRadians(C);
    const c = Math.sqrt(A * A + B * B - 2 * A * B * Math.cos(r));
    const angleA = toDegrees(Math.asin((A * Math.sin(r)) / c));
    const angleB = 180 - angleA - C;
    return { c, angleA, angleB, area: 0.5 * A * B * Math.sin(r) };
  }, [a, b, angleC]);

  return (
    <Shell
      title="Law of Sines & Cosines"
      desc="Solve a triangle given two sides and the included angle (SAS)."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Side a", a, setA],
          ["Side b", b, setB],
          ["Included angle C (°)", angleC, setAngleC],
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
          <p className="text-sm text-blue-400/70">Enter valid positive values.</p>
        ) : (
          <>
            <Step n={1} title="Law of Cosines for side c">
              <p className="font-mono">c² = a² + b² − 2ab·cos C</p>
              <p className="font-mono">c = {result.c.toFixed(4)}</p>
            </Step>
            <Step n={2} title="Law of Sines for angle A">
              <p className="font-mono">
                sin A / a = sin C / c → A = {result.angleA.toFixed(3)}°
              </p>
            </Step>
            <Step n={3} title="Find angle B">
              <p className="font-mono">
                B = 180° − A − C = {result.angleB.toFixed(3)}°
              </p>
            </Step>
            <Step n={4} title="Area = ½ab·sin C">
              <p className="font-mono">{result.area.toFixed(4)}</p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function TrigEquationSolver() {
  const [amp, setAmp] = useState("1");
  const [freq, setFreq] = useState("1");

  const result = useMemo(() => {
    const A = num(amp), B = num(freq);
    if (![A, B].every(Number.isFinite) || B === 0) return null;
    return {
      period: (2 * Math.PI) / Math.abs(B),
      periodDeg: 360 / Math.abs(B),
      amplitude: Math.abs(A),
    };
  }, [amp, freq]);

  return (
    <Shell
      title="Trig Equation Solver"
      desc="Analyze y = A·sin(Bx): amplitude and period."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">Amplitude A</Label>
          <Input
            value={amp}
            onChange={(e) => setAmp(e.target.value)}
            className="border-blue-900/60 bg-slate-950 text-white"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-blue-400">Frequency B</Label>
          <Input
            value={freq}
            onChange={(e) => setFreq(e.target.value)}
            className="border-blue-900/60 bg-slate-950 text-white"
          />
        </div>
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">Enter valid numbers (B ≠ 0).</p>
        ) : (
          <>
            <Step n={1} title="Write the function">
              <p className="font-mono">
                y = {num(amp)}·sin({num(freq)}x)
              </p>
            </Step>
            <Step n={2} title="Amplitude = |A|">
              <p className="font-mono">{result.amplitude}</p>
            </Step>
            <Step n={3} title="Period = 2π / |B|">
              <p className="font-mono">
                {result.period.toFixed(4)} rad = {result.periodDeg.toFixed(2)}°
              </p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function UnitCircleExplorer() {
  const [angle, setAngle] = useState("45");

  const result = useMemo(() => {
    const deg = num(angle);
    if (!Number.isFinite(deg)) return null;
    const r = toRadians(deg);
    return {
      sin: Math.sin(r),
      cos: Math.cos(r),
      tan: Math.tan(r),
      deg,
    };
  }, [angle]);

  return (
    <Shell
      title="Unit Circle Explorer"
      desc="Find sin, cos, and tan for any angle on the unit circle."
    >
      <div className="space-y-1 sm:max-w-xs">
        <Label className="text-xs text-blue-400">Angle (degrees)</Label>
        <Input
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
          className="border-blue-900/60 bg-slate-950 text-white"
        />
      </div>
      <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Step-by-step
        </p>
        {!result ? (
          <p className="text-sm text-blue-400/70">Enter a valid angle.</p>
        ) : (
          <>
            <Step n={1} title="Convert to radians">
              <p className="font-mono">
                {result.deg}° × π/180 = {toRadians(result.deg).toFixed(4)} rad
              </p>
            </Step>
            <Step n={2} title="Coordinates (cos θ, sin θ)">
              <p className="font-mono">
                ({result.cos.toFixed(4)}, {result.sin.toFixed(4)})
              </p>
            </Step>
            <Step n={3} title="Tangent = sin / cos">
              <p className="font-mono">{result.tan.toFixed(4)}</p>
            </Step>
          </>
        )}
      </div>
    </Shell>
  );
}

function TrigGrapher() {
  const [amp, setAmp] = useState("1");
  const [freq, setFreq] = useState("1");
  const [phase, setPhase] = useState("0");

  const points = useMemo(() => {
    const A = num(amp), B = num(freq), P = num(phase);
    if (![A, B, P].every(Number.isFinite)) return [];
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i <= 120; i++) {
      const x = (i / 120) * 4 * Math.PI;
      pts.push({ x, y: A * Math.sin(B * x + P) });
    }
    return pts;
  }, [amp, freq, phase]);

  const path = points
    .map((p, i) => {
      const px = (p.x / (4 * Math.PI)) * 100;
      const py = 50 - (p.y / 3) * 45;
      return `${i === 0 ? "M" : "L"} ${px.toFixed(2)} ${py.toFixed(2)}`;
    })
    .join(" ");

  return (
    <Shell
      title="Trig Grapher"
      desc="Plot y = A·sin(Bx + C) with live parameters."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Amplitude A", amp, setAmp],
          ["Frequency B", freq, setFreq],
          ["Phase C", phase, setPhase],
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
      <div className="rounded-xl border border-blue-900/50 bg-slate-950 p-4">
        <svg viewBox="0 0 100 100" className="h-64 w-full">
          <line x1="0" y1="50" x2="100" y2="50" stroke="#1e3a8a" strokeWidth="0.4" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#1e3a8a" strokeWidth="0.4" />
          <path d={path} fill="none" stroke="#60a5fa" strokeWidth="1.2" />
        </svg>
      </div>
    </Shell>
  );
}