import { useState } from "react";
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

function Quadratics() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("-3");
  const [c, setC] = useState("2");
  const [out, setOut] = useState<string[]>([]);
  const solve = () => {
    const A = +a, B = +b, C = +c;
    const disc = B * B - 4 * A * C;
    if (disc >= 0) {
      const r1 = (-B + Math.sqrt(disc)) / (2 * A);
      const r2 = (-B - Math.sqrt(disc)) / (2 * A);
      setOut([
        `Discriminant: ${disc}`,
        `Roots: x₁ = ${r1.toFixed(4)}, x₂ = ${r2.toFixed(4)}`,
        `Vertex: (${(-B / (2 * A)).toFixed(3)}, ${(C - (B * B) / (4 * A)).toFixed(3)})`,
      ]);
    } else {
      setOut([`Discriminant: ${disc} (complex roots)`, `x = ${(-B / (2 * A)).toFixed(3)} ± ${(Math.sqrt(-disc) / (2 * A)).toFixed(3)}i`]);
    }
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Quadratics</CardTitle>
        <p className="text-sm text-blue-400/70">Roots, discriminant, and vertex.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="a" value={a} onChange={setA} />
          <Field label="b" value={b} onChange={setB} />
          <Field label="c" value={c} onChange={setC} />
        </div>
        <Button onClick={solve} className="bg-blue-600 hover:bg-blue-500">Solve</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Polynomials() {
  const [coeffs, setCoeffs] = useState("1,-3,2");
  const [x, setX] = useState("2");
  const [out, setOut] = useState<string[]>([]);
  const evalPoly = () => {
    const cs = coeffs.split(",").map((s) => parseFloat(s.trim()));
    const xv = parseFloat(x);
    if (cs.some(isNaN) || isNaN(xv)) {
      setOut(["Enter comma-separated coefficients."]);
      return;
    }
    let val = 0;
    cs.forEach((c, i) => (val += c * Math.pow(xv, cs.length - 1 - i)));
    setOut([`Degree: ${cs.length - 1}`, `P(${xv}) = ${val}`]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Polynomials</CardTitle>
        <p className="text-sm text-blue-400/70">Evaluate from highest to lowest degree.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Coefficients (comma-separated)" value={coeffs} onChange={setCoeffs} />
        <Field label="x value" value={x} onChange={setX} />
        <Button onClick={evalPoly} className="bg-blue-600 hover:bg-blue-500">Evaluate</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Radicals() {
  const [n, setN] = useState("72");
  const [out, setOut] = useState<string[]>([]);
  const simplify = () => {
    let num = parseInt(n);
    if (isNaN(num) || num < 0) {
      setOut(["Enter a non-negative integer."]);
      return;
    }
    let outside = 1;
    for (let i = 2; i * i <= num; i++) {
      while (num % (i * i) === 0) {
        outside *= i;
        num /= i * i;
      }
    }
    setOut([`√${n} = ${outside}√${num}`]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Radicals</CardTitle>
        <p className="text-sm text-blue-400/70">Simplify square roots.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Number under radical" value={n} onChange={setN} />
        <Button onClick={simplify} className="bg-blue-600 hover:bg-blue-500">Simplify</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Systems() {
  const [a1, setA1] = useState("2");
  const [b1, setB1] = useState("1");
  const [c1, setC1] = useState("5");
  const [a2, setA2] = useState("1");
  const [b2, setB2] = useState("-1");
  const [c2, setC2] = useState("1");
  const [out, setOut] = useState<string[]>([]);
  const solve = () => {
    const A1 = +a1, B1 = +b1, C1 = +c1, A2 = +a2, B2 = +b2, C2 = +c2;
    const det = A1 * B2 - A2 * B1;
    if (det === 0) {
      setOut(["No unique solution (parallel or coincident)."]);
      return;
    }
    const x = (C1 * B2 - C2 * B1) / det;
    const y = (A1 * C2 - A2 * C1) / det;
    setOut([`x = ${x.toFixed(4)}`, `y = ${y.toFixed(4)}`]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Systems of Equations</CardTitle>
        <p className="text-sm text-blue-400/70">Solve two linear equations.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="a₁" value={a1} onChange={setA1} />
          <Field label="b₁" value={b1} onChange={setB1} />
          <Field label="c₁" value={c1} onChange={setC1} />
          <Field label="a₂" value={a2} onChange={setA2} />
          <Field label="b₂" value={b2} onChange={setB2} />
          <Field label="c₂" value={c2} onChange={setC2} />
        </div>
        <Button onClick={solve} className="bg-blue-600 hover:bg-blue-500">Solve</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Inequalities() {
  const [a, setA] = useState("2");
  const [b, setB] = useState("3");
  const [op, setOp] = useState(">");
  const [out, setOut] = useState<string[]>([]);
  const solve = () => {
    const A = +a, B = +b;
    if (A === 0) {
      setOut(["Coefficient of x cannot be 0."]);
      return;
    }
    const bound = -B / A;
    const flip = A < 0;
    const ops: Record<string, string> = { ">": "<", "<": ">", ">=": "<=", "<=": ">=" };
    const finalOp = flip ? ops[op] : op;
    setOut([`${a}x + ${b} ${op} 0`, `x ${finalOp} ${bound.toFixed(4)}`]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Inequalities</CardTitle>
        <p className="text-sm text-blue-400/70">Solve ax + b (op) 0.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="a" value={a} onChange={setA} />
          <Field label="b" value={b} onChange={setB} />
          <div className="space-y-1.5">
            <Label className="text-blue-300">Operator</Label>
            <select
              value={op}
              onChange={(e) => setOp(e.target.value)}
              className="w-full rounded-lg border border-blue-900/60 bg-slate-950 px-3 py-2 text-white"
            >
              {[">", "<", ">=", "<="].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
        <Button onClick={solve} className="bg-blue-600 hover:bg-blue-500">Solve</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Fractions() {
  const [n1, setN1] = useState("1");
  const [d1, setD1] = useState("2");
  const [n2, setN2] = useState("1");
  const [d2, setD2] = useState("3");
  const [op, setOp] = useState("+");
  const [out, setOut] = useState<string[]>([]);
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
  const calc = () => {
    const N1 = +n1, D1 = +d1, N2 = +n2, D2 = +d2;
    let num = 0, den = 1;
    if (op === "+") { num = N1 * D2 + N2 * D1; den = D1 * D2; }
    else if (op === "-") { num = N1 * D2 - N2 * D1; den = D1 * D2; }
    else if (op === "*") { num = N1 * N2; den = D1 * D2; }
    else { num = N1 * D2; den = D1 * N2; }
    const g = gcd(num, den) || 1;
    setOut([`${num / g}/${den / g}`, `Decimal: ${(num / den).toFixed(4)}`]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Fractions</CardTitle>
        <p className="text-sm text-blue-400/70">Add, subtract, multiply, divide.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-5 items-end gap-2">
          <Field label="n₁" value={n1} onChange={setN1} />
          <Field label="d₁" value={d1} onChange={setD1} />
          <div className="space-y-1.5">
            <Label className="text-blue-300">Op</Label>
            <select
              value={op}
              onChange={(e) => setOp(e.target.value)}
              className="w-full rounded-lg border border-blue-900/60 bg-slate-950 px-2 py-2 text-white"
            >
              {["+", "-", "*", "/"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <Field label="n₂" value={n2} onChange={setN2} />
          <Field label="d₂" value={d2} onChange={setD2} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Calculate</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Sequences() {
  const [a1, setA1] = useState("2");
  const [d, setD] = useState("3");
  const [n, setN] = useState("10");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const A1 = +a1, D = +d, N = +n;
    const an = A1 + (N - 1) * D;
    const sum = (N * (A1 + an)) / 2;
    setOut([`aₙ = ${an}`, `Sum of first ${N} terms = ${sum}`]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Sequences</CardTitle>
        <p className="text-sm text-blue-400/70">Arithmetic sequence nth term and sum.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="First term a₁" value={a1} onChange={setA1} />
          <Field label="Common diff d" value={d} onChange={setD} />
          <Field label="n" value={n} onChange={setN} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Calculate</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Complex() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("2");
  const [c, setC] = useState("3");
  const [d, setD] = useState("-1");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const A = +a, B = +b, C = +c, D = +d;
    const re = A * C - B * D;
    const im = A * D + B * C;
    const mag = Math.sqrt(re * re + im * im);
    setOut([
      `(${a}+${b}i) × (${c}+${d}i)`,
      `= ${re} + ${im}i`,
      `Magnitude = ${mag.toFixed(4)}`,
    ]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Complex Numbers</CardTitle>
        <p className="text-sm text-blue-400/70">Multiply (a+bi)(c+di).</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-4 gap-3">
          <Field label="a" value={a} onChange={setA} />
          <Field label="b" value={b} onChange={setB} />
          <Field label="c" value={c} onChange={setC} />
          <Field label="d" value={d} onChange={setD} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Multiply</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Logs() {
  const [base, setBase] = useState("2");
  const [arg, setArg] = useState("8");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const B = +base, A = +arg;
    if (B <= 0 || B === 1 || A <= 0) {
      setOut(["Base must be > 0 and ≠ 1; argument > 0."]);
      return;
    }
    const val = Math.log(A) / Math.log(B);
    setOut([`log_${base}(${arg}) = ${val.toFixed(6)}`, `Check: ${base}^${val.toFixed(4)} = ${Math.pow(B, val).toFixed(4)}`]);
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Logs & Exponents</CardTitle>
        <p className="text-sm text-blue-400/70">Evaluate logarithms in any base.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Base" value={base} onChange={setBase} />
          <Field label="Argument" value={arg} onChange={setArg} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Evaluate</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Matrices() {
  const [m, setM] = useState("1,2;3,4");
  const [out, setOut] = useState<string[]>([]);
  const parse = (s: string) =>
    s.split(";").map((row) => row.split(",").map((v) => parseFloat(v.trim())));
  const calc = () => {
    const M = parse(m);
    if (M.length === 2 && M[0].length === 2) {
      const det = M[0][0] * M[1][1] - M[0][1] * M[1][0];
      const trace = M[0][0] + M[1][1];
      setOut([`Determinant = ${det}`, `Trace = ${trace}`]);
    } else {
      setOut([`Matrix is ${M.length}×${M[0]?.length ?? 0}. Determinant shown for 2×2 only.`]);
    }
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Matrices</CardTitle>
        <p className="text-sm text-blue-400/70">Rows separated by ; columns by ,</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Matrix" value={m} onChange={setM} />
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Analyze</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

function Geometry() {
  const [shape, setShape] = useState("circle");
  const [v1, setV1] = useState("5");
  const [v2, setV2] = useState("3");
  const [out, setOut] = useState<string[]>([]);
  const calc = () => {
    const A = +v1, B = +v2;
    if (shape === "circle") {
      setOut([`Area = ${(Math.PI * A * A).toFixed(4)}`, `Circumference = ${(2 * Math.PI * A).toFixed(4)}`]);
    } else if (shape === "rectangle") {
      setOut([`Area = ${(A * B).toFixed(4)}`, `Perimeter = ${(2 * (A + B)).toFixed(4)}`]);
    } else {
      setOut([`Area = ${(0.5 * A * B).toFixed(4)}`]);
    }
  };
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-blue-100">Geometry</CardTitle>
        <p className="text-sm text-blue-400/70">Area and perimeter for basic shapes.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-blue-300">Shape</Label>
          <select
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            className="w-full rounded-lg border border-blue-900/60 bg-slate-950 px-3 py-2 text-white"
          >
            <option value="circle">Circle (r)</option>
            <option value="rectangle">Rectangle (w, h)</option>
            <option value="triangle">Triangle (b, h)</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Value 1" value={v1} onChange={setV1} />
          <Field label="Value 2" value={v2} onChange={setV2} />
        </div>
        <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">Calculate</Button>
        <Result lines={out} />
      </CardContent>
    </Card>
  );
}

const TITLES: Record<string, string> = {
  algebra: "Algebra",
  quadratics: "Quadratics",
  polynomials: "Polynomials",
  radicals: "Radicals",
  systems: "Systems",
  inequalities: "Inequalities",
  fractions: "Fractions",
  sequences: "Sequences",
  complex: "Complex",
  logs: "Logs & Exponents",
  matrices: "Matrices",
  geometry: "Geometry",
};

export function AlgebraTools({ tool }: { tool: string }) {
  switch (tool) {
    case "quadratics": return <Quadratics />;
    case "polynomials": return <Polynomials />;
    case "radicals": return <Radicals />;
    case "systems": return <Systems />;
    case "inequalities": return <Inequalities />;
    case "fractions": return <Fractions />;
    case "sequences": return <Sequences />;
    case "complex": return <Complex />;
    case "logs": return <Logs />;
    case "matrices": return <Matrices />;
    case "geometry": return <Geometry />;
    default:
      return (
        <Card className="border-blue-900/50 bg-slate-900/60">
          <CardHeader>
            <CardTitle className="text-blue-100">{TITLES[tool] ?? "Algebra"}</CardTitle>
            <p className="text-sm text-blue-400/70">
              Pick a specific algebra tool from the sidebar to get started.
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-blue-200/80">
              This section covers {TITLES[tool] ?? "algebraic"} concepts. Use the
              sidebar to open Quadratics, Polynomials, Systems, and more.
            </p>
          </CardContent>
        </Card>
      );
  }
}