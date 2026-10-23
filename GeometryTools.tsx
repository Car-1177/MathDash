import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-blue-300">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="border-blue-900/60 bg-slate-950 text-white" />
    </div>
  );
}

function Result({ lines }: { lines: string[] }) {
  if (!lines.length) return null;
  return (
    <div className="rounded-xl border border-blue-900/50 bg-blue-950/30 p-4 font-mono text-sm text-blue-200">
      {lines.map((l, i) => <p key={i}>{l}</p>)}
    </div>
  );
}

function Coordinate() {
  const [x1, setX1] = useState("0");
  const [y1, setY1] = useState("0");
  const [x2, setX2] = useState("3");
  const [y2, setY2] = useState("4");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const X1 = +x1, Y1 = +y1, X2 = +x2, Y2 = +y2;
    const dist = Math.hypot(X2 - X1, Y2 - Y1);
    const mid = [(X1 + X2) / 2, (Y1 + Y2) / 2];
    const slope = (Y2 - Y1) / (X2 - X1);
    setOut([
      `Distance = ${dist.toFixed(4)}`,
      `Midpoint = (${mid[0]}, ${mid[1]})`,
      `Slope = ${isFinite(slope) ? slope.toFixed(4) : "undefined"}`,
    ]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Coordinate Geometry</CardTitle>
        <p className="text-sm text-blue-400/70">Distance, midpoint, and slope.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-4 gap-3">
          <Field label="x₁" value={x1} onChange={setX1} />
          <Field label="y₁" value={y1} onChange={setY1} />
          <Field label="x₂" value={x2} onChange={setX2} />
          <Field label="y₂" value={y2} onChange={setY2} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Calculate</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Triangles() {
  const [a, setA] = useState("3");
  const [b, setB] = useState("4");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const A = +a, B = +b;
    const hyp = Math.hypot(A, B);
    setOut([`Hypotenuse = ${hyp.toFixed(4)}`, `Area = ${((A * B) / 2).toFixed(4)}`]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Right Triangles</CardTitle>
        <p className="text-sm text-blue-400/70">Pythagorean theorem.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Leg a" value={a} onChange={setA} />
          <Field label="Leg b" value={b} onChange={setB} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Calculate</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function UnitCircle() {
  const [deg, setDeg] = useState("45");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const rad = (+deg * Math.PI) / 180;
    setOut([
      `${deg}° = ${rad.toFixed(4)} rad`,
      `sin = ${Math.sin(rad).toFixed(4)}`,
      `cos = ${Math.cos(rad).toFixed(4)}`,
      `tan = ${Math.tan(rad).toFixed(4)}`,
    ]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Unit Circle</CardTitle>
        <p className="text-sm text-blue-400/70">Trig values at any angle.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Angle (degrees)" value={deg} onChange={setDeg} />
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Calculate</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Trigonometry() {
  const [opp, setOpp] = useState("3");
  const [hyp, setHyp] = useState("5");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const O = +opp, H = +hyp;
    const theta = Math.asin(O / H);
    setOut([
      `sin θ = ${(O / H).toFixed(4)}`,
      `θ = ${((theta * 180) / Math.PI).toFixed(4)}°`,
      `cos θ = ${Math.cos(theta).toFixed(4)}`,
      `tan θ = ${Math.tan(theta).toFixed(4)}`,
    ]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Trigonometry</CardTitle>
        <p className="text-sm text-blue-400/70">Solve from opposite and hypotenuse.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Opposite" value={opp} onChange={setOpp} />
          <Field label="Hypotenuse" value={hyp} onChange={setHyp} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Calculate</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Conics() {
  const [r, setR] = useState("5");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const R = +r;
    setOut([
      `Circle: x² + y² = ${(R * R).toFixed(2)}`,
      `Area = ${(Math.PI * R * R).toFixed(4)}`,
      `Circumference = ${(2 * Math.PI * R).toFixed(4)}`,
    ]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Circles & Conics</CardTitle>
        <p className="text-sm text-blue-400/70">Circle centered at origin.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Radius" value={r} onChange={setR} />
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Calculate</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

export function GeometryTools({ tool }: { tool: string }) {
  switch (tool) {
    case "coordinate": return <Coordinate />;
    case "triangles": return <Triangles />;
    case "unitcircle": return <UnitCircle />;
    case "trigonometry": return <Trigonometry />;
    case "conics": return <Conics />;
    default: return <Coordinate />;
  }
}