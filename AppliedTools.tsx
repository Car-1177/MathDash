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

function Growth() {
  const [p, setP] = useState("1000");
  const [r, setR] = useState("5");
  const [t, setT] = useState("10");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const P = +p, R = +r / 100, T = +t;
    setOut([
      `Simple interest: $${(P * R * T).toFixed(2)}`,
      `Compound (annual): $${(P * Math.pow(1 + R, T)).toFixed(2)}`,
      `Continuous: $${(P * Math.exp(R * T)).toFixed(2)}`,
    ]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Growth & Interest</CardTitle>
        <p className="text-sm text-blue-400/70">Simple, compound, and continuous.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Principal" value={p} onChange={setP} />
          <Field label="Rate %" value={r} onChange={setR} />
          <Field label="Years" value={t} onChange={setT} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Calculate</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Percent() {
  const [part, setPart] = useState("25");
  const [whole, setWhole] = useState("200");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const P = +part, W = +whole;
    setOut([`${P} is ${((P / W) * 100).toFixed(2)}% of ${W}`, `${P}% of ${W} = ${((P / 100) * W).toFixed(2)}`]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Percent & Proportion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Part" value={part} onChange={setPart} />
          <Field label="Whole" value={whole} onChange={setWhole} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Calculate</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Probability() {
  const [n, setN] = useState("5");
  const [r, setR] = useState("2");
  const [out, setOut] = useState<string[]>([]);
  const fact = (x: number): number => (x <= 1 ? 1 : x * fact(x - 1));
  const calc = () => {
    const N = +n, R = +r;
    const comb = fact(N) / (fact(R) * fact(N - R));
    const perm = fact(N) / fact(N - R);
    setOut([`C(${N},${R}) = ${comb}`, `P(${N},${R}) = ${perm}`]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Probability</CardTitle>
        <p className="text-sm text-blue-400/70">Combinations and permutations.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="n" value={n} onChange={setN} />
          <Field label="r" value={r} onChange={setR} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Calculate</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Converter() {
  const [val, setVal] = useState("1");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [out, setOut] = useState<string[]>([]);
  const toMeters: Record<string, number> = { m: 1, km: 1000, cm: 0.01, ft: 0.3048, in: 0.0254, mi: 1609.34 };
  const calc = () => {
    const V = +val;
    const meters = V * toMeters[from];
    const result = meters / toMeters[to];
    setOut([`${V} ${from} = ${result.toFixed(6)} ${to}`]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Unit Converter</CardTitle>
        <p className="text-sm text-blue-400/70">Length conversions.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Value" value={val} onChange={setVal} />
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-blue-300">From</Label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-lg border border-blue-900/60 bg-slate-950 px-3 py-2 text-white">
              {Object.keys(toMeters).map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-blue-300">To</Label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-lg border border-blue-900/60 bg-slate-950 px-3 py-2 text-white">
              {Object.keys(toMeters).map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Convert</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function WordProblems() {
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Word Problems</CardTitle>
        <p className="text-sm text-blue-400/70">Common problem templates.</p>
      </CardHeader>
      <CardContent className="space-y-3 text-blue-200/80">
        <p>• <strong className="text-blue-100">Distance:</strong> d = rt</p>
        <p>• <strong className="text-blue-100">Work:</strong> 1/t = 1/a + 1/b</p>
        <p>• <strong className="text-blue-100">Mixture:</strong> c₁v₁ + c₂v₂ = c(v₁+v₂)</p>
        <p>• <strong className="text-blue-100">Interest:</strong> I = Prt</p>
        <p className="text-sm text-blue-400/70">Use the Word Problem Solver for guided steps.</p>
      </CardContent>
    </Card>
  );
}

export function AppliedTools({ tool }: { tool: string }) {
  switch (tool) {
    case "growth": return <Growth />;
    case "percent": return <Percent />;
    case "probability": return <Probability />;
    case "converter": return <Converter />;
    case "wordproblems": return <WordProblems />;
    default: return <Growth />;
  }
}