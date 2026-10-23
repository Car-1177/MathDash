import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-blue-300">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-blue-900/60 bg-slate-950 text-white"
      />
    </div>
  );
}

function Result({ lines }: { lines: string[] }) {
  if (!lines.length) return null;
  return (
    <div className="rounded-xl border border-blue-900/50 bg-blue-950/30 p-4 font-mono text-sm text-blue-200">
      {lines.map((l, i) => (
        <p key={i}>{l}</p>
      ))}
    </div>
  );
}

function Transformations() {
  const [a, setA] = useState("1");
  const [h, setH] = useState("0");
  const [k, setK] = useState("0");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    setOut([
      `y = ${a}(x - ${h})² + ${k}`,
      `Vertical stretch: ${a}`,
      `Shifted right ${h}, up ${k}`,
      `Vertex: (${h}, ${k})`,
    ]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Transformations Lab</CardTitle>
        <p className="text-sm text-blue-400/70">Vertex form y = a(x-h)² + k</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="a" value={a} onChange={setA} />
          <Field label="h" value={h} onChange={setH} />
          <Field label="k" value={k} onChange={setK} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
          Describe
        </Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Rearranger() {
  const [a, setA] = useState("2");
  const [b, setB] = useState("6");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const A = +a, B = +b;
    setOut([`Given ${a}x + ${b} = 0`, `x = ${(-B / A).toFixed(4)}`]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Formula Rearranger</CardTitle>
        <p className="text-sm text-blue-400/70">Solve ax + b = 0 for x.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="a" value={a} onChange={setA} />
          <Field label="b" value={b} onChange={setB} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
          Rearrange
        </Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Distribution() {
  const [mean, setMean] = useState("0");
  const [sd, setSd] = useState("1");
  const [x, setX] = useState("1");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const M = +mean, S = +sd, X = +x;
    const z = (X - M) / S;
    const pdf = (1 / (S * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
    setOut([`z-score = ${z.toFixed(4)}`, `Normal PDF = ${pdf.toFixed(6)}`]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Distribution Explorer</CardTitle>
        <p className="text-sm text-blue-400/70">Normal distribution z-score and PDF.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Mean" value={mean} onChange={setMean} />
          <Field label="Std dev" value={sd} onChange={setSd} />
          <Field label="x" value={x} onChange={setX} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
          Calculate
        </Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function UnitCircleSprint() {
  const [deg, setDeg] = useState("30");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const rad = (+deg * Math.PI) / 180;
    setOut([
      `${deg}° → sin = ${Math.sin(rad).toFixed(4)}, cos = ${Math.cos(rad).toFixed(4)}`,
      `tan = ${Math.tan(rad).toFixed(4)}`,
    ]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Unit Circle Sprint</CardTitle>
        <p className="text-sm text-blue-400/70">Rapid trig value recall.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Angle (degrees)" value={deg} onChange={setDeg} />
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
          Reveal
        </Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Calculus() {
  const [a, setA] = useState("3");
  const [b, setB] = useState("2");
  const [c, setC] = useState("1");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const A = +a, B = +b, C = +c;
    setOut([
      `f(x) = ${a}x² + ${b}x + ${c}`,
      `f'(x) = ${2 * A}x + ${B}`,
      `∫f(x)dx = ${(A / 3).toFixed(3)}x³ + ${(B / 2).toFixed(3)}x² + ${C}x + C`,
    ]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Derivative & Integral</CardTitle>
        <p className="text-sm text-blue-400/70">Symbolic rules for polynomials.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="a" value={a} onChange={setA} />
          <Field label="b" value={b} onChange={setB} />
          <Field label="c" value={c} onChange={setC} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
          Compute
        </Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

const TABS: { id: string; label: string }[] = [
  { id: "transformations", label: "Transformations" },
  { id: "rearranger", label: "Rearranger" },
  { id: "distribution", label: "Distribution" },
  { id: "unitcirclesprint", label: "Unit Circle" },
  { id: "calculus", label: "Calculus" },
];

export function RecommendedTools({ tool }: { tool?: string }) {
  const [active, setActive] = useState(tool ?? "transformations");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition",
              active === t.id
                ? "border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-900/40"
                : "border-blue-900/60 bg-slate-900/60 text-blue-300 hover:border-blue-700 hover:text-blue-100"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {active === "calculus" && <Calculus />}
      {active === "transformations" && <Transformations />}
      {active === "rearranger" && <Rearranger />}
      {active === "distribution" && <Distribution />}
      {active === "unitcirclesprint" && <UnitCircleSprint />}
    </div>
  );
}

export default RecommendedTools;