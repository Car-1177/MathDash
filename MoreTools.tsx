import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  parseNumberList,
  mean,
  median,
  stdev,
  variance,
  mode,
  percentile,
  combinations,
  permutations,
  primeFactors,
  isPrime,
  gcd,
  lcm,
  toRadians,
  toDegrees,
} from "@/lib/math";

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
    <div className="rounded-xl border border-blue-900/50 bg-blue-950/30 p-4">
      {lines.map((l, i) => (
        <p key={i} className="font-mono text-sm text-blue-200">
          {l}
        </p>
      ))}
    </div>
  );
}

function Geometry() {
  const [shape, setShape] = useState("circle");
  const [a, setA] = useState("5");
  const [b, setB] = useState("3");
  const [out, setOut] = useState<string[]>([]);

  const calc = () => {
    const A = Number(a), B = Number(b);
    if (isNaN(A)) return setOut(["Enter a valid number."]);
    if (shape === "circle") {
      setOut([
        `Area = ${Math.round(Math.PI * A * A * 1e4) / 1e4}`,
        `Circumference = ${Math.round(2 * Math.PI * A * 1e4) / 1e4}`,
      ]);
    } else if (shape === "rectangle") {
      if (isNaN(B)) return setOut(["Enter width."]);
      setOut([`Area = ${A * B}`, `Perimeter = ${2 * (A + B)}`]);
    } else {
      if (isNaN(B)) return setOut(["Enter height."]);
      setOut([
        `Area = ${Math.round(0.5 * A * B * 1e4) / 1e4}`,
        `Hypotenuse = ${Math.round(Math.sqrt(A * A + B * B) * 1e4) / 1e4}`,
      ]);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex gap-2">
        {["circle", "rectangle", "triangle"].map((s) => (
          <button
            key={s}
            onClick={() => setShape(s)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm capitalize transition",
              shape === s
                ? "border-blue-500 bg-blue-600/25 text-white"
                : "border-blue-900/50 bg-blue-950/30 text-blue-300 hover:border-blue-700"
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label={shape === "circle" ? "radius" : "base / length"} value={a} onChange={setA} />
        {shape !== "circle" && (
          <Field label={shape === "rectangle" ? "width" : "height"} value={b} onChange={setB} />
        )}
      </div>
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Compute
      </Button>
      <Result lines={out} />
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
    const X1 = Number(x1), Y1 = Number(y1), X2 = Number(x2), Y2 = Number(y2);
    if ([X1, Y1, X2, Y2].some(isNaN)) return setOut(["Enter valid numbers."]);
    const dist = Math.sqrt((X2 - X1) ** 2 + (Y2 - Y1) ** 2);
    const mid = [(X1 + X2) / 2, (Y1 + Y2) / 2];
    const slope = X2 === X1 ? "undefined" : String((Y2 - Y1) / (X2 - X1));
    setOut([
      `Distance = ${Math.round(dist * 1e6) / 1e6}`,
      `Midpoint = (${mid[0]}, ${mid[1]})`,
      `Slope = ${slope}`,
    ]);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <Field label="x₁" value={x1} onChange={setX1} />
        <Field label="y₁" value={y1} onChange={setY1} />
        <Field label="x₂" value={x2} onChange={setX2} />
        <Field label="y₂" value={y2} onChange={setY2} />
      </div>
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Compute
      </Button>
      <Result lines={out} />
    </div>
  );
}

function Triangles() {
  const [a, setA] = useState("3");
  const [b, setB] = useState("4");
  const [out, setOut] = useState<string[]>([]);

  const calc = () => {
    const A = Number(a), B = Number(b);
    if ([A, B].some(isNaN) || A <= 0 || B <= 0) return setOut(["Enter positive numbers."]);
    const c = Math.sqrt(A * A + B * B);
    setOut([
      `Hypotenuse = ${Math.round(c * 1e6) / 1e6}`,
      `Angle A = ${Math.round(toDegrees(Math.atan2(A, B)) * 1e4) / 1e4}°`,
      `Angle B = ${Math.round(toDegrees(Math.atan2(B, A)) * 1e4) / 1e4}°`,
    ]);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <p className="text-sm text-blue-400/70">Right triangle with legs a and b.</p>
      <div className="grid grid-cols-2 gap-3">
        <Field label="leg a" value={a} onChange={setA} />
        <Field label="leg b" value={b} onChange={setB} />
      </div>
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Compute
      </Button>
      <Result lines={out} />
    </div>
  );
}

function Similarity() {
  const [s1, setS1] = useState("3");
  const [s2, setS2] = useState("6");
  const [out, setOut] = useState<string[]>([]);

  const calc = () => {
    const S1 = Number(s1), S2 = Number(s2);
    if ([S1, S2].some(isNaN) || S1 === 0) return setOut(["Enter valid numbers."]);
    const ratio = S2 / S1;
    setOut([
      `Scale factor = ${Math.round(ratio * 1e6) / 1e6}`,
      `Area ratio = ${Math.round(ratio * ratio * 1e6) / 1e6}`,
    ]);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="side (figure 1)" value={s1} onChange={setS1} />
        <Field label="side (figure 2)" value={s2} onChange={setS2} />
      </div>
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Compute
      </Button>
      <Result lines={out} />
    </div>
  );
}

function UnitCircle() {
  const [deg, setDeg] = useState("30");
  const [out, setOut] = useState<string[]>([]);

  const calc = () => {
    const D = Number(deg);
    if (isNaN(D)) return setOut(["Enter an angle in degrees."]);
    const rad = toRadians(D);
    setOut([
      `sin = ${Math.round(Math.sin(rad) * 1e6) / 1e6}`,
      `cos = ${Math.round(Math.cos(rad) * 1e6) / 1e6}`,
      `tan = ${Math.round(Math.tan(rad) * 1e6) / 1e6}`,
    ]);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <Field label="Angle (degrees)" value={deg} onChange={setDeg} />
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Compute
      </Button>
      <Result lines={out} />
    </div>
  );
}

function Trigonometry() {
  const [fn, setFn] = useState("sin");
  const [val, setVal] = useState("30");
  const [out, setOut] = useState<string[]>([]);

  const calc = () => {
    const V = Number(val);
    if (isNaN(V)) return setOut(["Enter a valid number."]);
    const rad = toRadians(V);
    const fns: Record<string, number> = {
      sin: Math.sin(rad),
      cos: Math.cos(rad),
      tan: Math.tan(rad),
    };
    setOut([`${fn}(${V}°) = ${Math.round(fns[fn] * 1e6) / 1e6}`]);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex gap-2">
        {["sin", "cos", "tan"].map((f) => (
          <button
            key={f}
            onClick={() => setFn(f)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm transition",
              fn === f
                ? "border-blue-500 bg-blue-600/25 text-white"
                : "border-blue-900/50 bg-blue-950/30 text-blue-300 hover:border-blue-700"
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <Field label="Angle (degrees)" value={val} onChange={setVal} />
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Compute
      </Button>
      <Result lines={out} />
    </div>
  );
}

function Conics() {
  const [r, setR] = useState("5");
  const [out, setOut] = useState<string[]>([]);

  const calc = () => {
    const R = Number(r);
    if (isNaN(R) || R <= 0) return setOut(["Enter a positive radius."]);
    setOut([
      `Circle: x² + y² = ${R * R}`,
      `Area = ${Math.round(Math.PI * R * R * 1e4) / 1e4}`,
      `Circumference = ${Math.round(2 * Math.PI * R * 1e4) / 1e4}`,
    ]);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <Field label="Radius" value={r} onChange={setR} />
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Compute
      </Button>
      <Result lines={out} />
    </div>
  );
}

function Statistics() {
  const [data, setData] = useState("2,4,4,4,5,5,7,9");
  const [out, setOut] = useState<string[]>([]);

  const calc = () => {
    const nums = parseNumberList(data);
    if (!nums.length) return setOut(["Enter comma-separated numbers."]);
    setOut([
      `Count = ${nums.length}`,
      `Mean = ${Math.round(mean(nums) * 1e6) / 1e6}`,
      `Median = ${median(nums)}`,
      `Mode = ${mode(nums).join(", ")}`,
      `Std dev = ${Math.round(stdev(nums) * 1e6) / 1e6}`,
      `Variance = ${Math.round(variance(nums) * 1e6) / 1e6}`,
      `Q1 = ${percentile(nums, 25)}, Q3 = ${percentile(nums, 75)}`,
      `Min = ${Math.min(...nums)}, Max = ${Math.max(...nums)}`,
    ]);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <Field label="Data (comma-separated)" value={data} onChange={setData} />
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Compute
      </Button>
      <Result lines={out} />
    </div>
  );
}

function Growth() {
  const [p, setP] = useState("1000");
  const [r, setR] = useState("5");
  const [t, setT] = useState("10");
  const [out, setOut] = useState<string[]>([]);

  const calc = () => {
    const P = Number(p), R = Number(r) / 100, T = Number(t);
    if ([P, R, T].some(isNaN)) return setOut(["Enter valid numbers."]);
    setOut([
      `Simple interest total = ${Math.round(P * (1 + R * T) * 100) / 100}`,
      `Compound total = ${Math.round(P * Math.pow(1 + R, T) * 100) / 100}`,
      `Continuous total = ${Math.round(P * Math.exp(R * T) * 100) / 100}`,
    ]);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Field label="principal" value={p} onChange={setP} />
        <Field label="rate %" value={r} onChange={setR} />
        <Field label="years" value={t} onChange={setT} />
      </div>
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Compute
      </Button>
      <Result lines={out} />
    </div>
  );
}

function Percent() {
  const [part, setPart] = useState("25");
  const [whole, setWhole] = useState("200");
  const [out, setOut] = useState<string[]>([]);

  const calc = () => {
    const P = Number(part), W = Number(whole);
    if ([P, W].some(isNaN) || W === 0) return setOut(["Enter valid numbers."]);
    setOut([
      `${P} is ${Math.round((P / W) * 1e6) / 1e4}% of ${W}`,
      `${P}% of ${W} = ${Math.round((P / 100) * W * 1e4) / 1e4}`,
    ]);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="part" value={part} onChange={setPart} />
        <Field label="whole" value={whole} onChange={setWhole} />
      </div>
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Compute
      </Button>
      <Result lines={out} />
    </div>
  );
}

function Probability() {
  const [n, setN] = useState("5");
  const [r, setR] = useState("2");
  const [out, setOut] = useState<string[]>([]);

  const calc = () => {
    const N = Number(n), R = Number(r);
    if ([N, R].some(isNaN) || N < 0 || R < 0 || R > N)
      return setOut(["Ensure 0 ≤ r ≤ n."]);
    setOut([
      `C(${N},${R}) = ${combinations(N, R)}`,
      `P(${N},${R}) = ${permutations(N, R)}`,
    ]);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="n" value={n} onChange={setN} />
        <Field label="r" value={r} onChange={setR} />
      </div>
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Compute
      </Button>
      <Result lines={out} />
    </div>
  );
}

function Converter() {
  const [val, setVal] = useState("1");
  const [kind, setKind] = useState("length");
  const [out, setOut] = useState<string[]>([]);

  const calc = () => {
    const V = Number(val);
    if (isNaN(V)) return setOut(["Enter a valid number."]);
    if (kind === "length") {
      setOut([
        `${V} m = ${Math.round(V * 3.28084 * 1e4) / 1e4} ft`,
        `${V} m = ${Math.round(V * 39.3701 * 1e4) / 1e4} in`,
        `${V} m = ${Math.round((V / 1000) * 1e6) / 1e6} km`,
      ]);
    } else if (kind === "mass") {
      setOut([
        `${V} kg = ${Math.round(V * 2.20462 * 1e4) / 1e4} lb`,
        `${V} kg = ${Math.round(V * 1000 * 1e4) / 1e4} g`,
      ]);
    } else {
      setOut([
        `${V} °C = ${Math.round((V * 9 / 5 + 32) * 1e4) / 1e4} °F`,
        `${V} °C = ${Math.round((V + 273.15) * 1e4) / 1e4} K`,
      ]);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex gap-2">
        {["length", "mass", "temp"].map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm capitalize transition",
              kind === k
                ? "border-blue-500 bg-blue-600/25 text-white"
                : "border-blue-900/50 bg-blue-950/30 text-blue-300 hover:border-blue-700"
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <Field label="Value" value={val} onChange={setVal} />
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Convert
      </Button>
      <Result lines={out} />
    </div>
  );
}

function WordProblems() {
  const [a, setA] = useState("15");
  const [b, setB] = useState("25");
  const [out, setOut] = useState<string[]>([]);

  const calc = () => {
    const A = Number(a), B = Number(b);
    if ([A, B].some(isNaN)) return setOut(["Enter valid numbers."]);
    setOut([
      `Sum = ${A + B}`,
      `Difference = ${A - B}`,
      `Product = ${A * B}`,
      `Average = ${Math.round(((A + B) / 2) * 1e6) / 1e6}`,
    ]);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <p className="text-sm text-blue-400/70">
        Enter two quantities to see common relationships.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Field label="value 1" value={a} onChange={setA} />
        <Field label="value 2" value={b} onChange={setB} />
      </div>
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Compute
      </Button>
      <Result lines={out} />
    </div>
  );
}

function NumberTheory() {
  const [n, setN] = useState("84");
  const [m, setM] = useState("36");
  const [out, setOut] = useState<string[]>([]);

  const calc = () => {
    const N = Number(n), M = Number(m);
    if ([N, M].some(isNaN)) return setOut(["Enter valid integers."]);
    setOut([
      `GCD(${N}, ${M}) = ${gcd(N, M)}`,
      `LCM(${N}, ${M}) = ${lcm(N, M)}`,
      `Prime factors of ${N} = ${primeFactors(N).join(" × ") || "—"}`,
      `${N} is ${isPrime(N) ? "prime" : "not prime"}`,
    ]);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="number n" value={n} onChange={setN} />
        <Field label="number m" value={m} onChange={setM} />
      </div>
      <Button onClick={calc} className="bg-blue-600 hover:bg-blue-500">
        Compute
      </Button>
      <Result lines={out} />
    </div>
  );
}

function TestPrep({ tool }: { tool: string }) {
  const [out, setOut] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);

  const questions: Record<string, { q: string; a: string }[]> = {
    sat: [
      { q: "If 3x + 6 = 18, what is x?", a: "4" },
      { q: "What is the slope of y = 2x − 5?", a: "2" },
      { q: "Simplify: (x²)(x³)", a: "x⁵" },
    ],
    act: [
      { q: "What is 15% of 80?", a: "12" },
      { q: "Solve: x² = 49", a: "±7" },
      { q: "Area of circle with r = 3?", a: "9π" },
    ],
    psat: [
      { q: "If f(x) = x² + 1, what is f(3)?", a: "10" },
      { q: "What is √144?", a: "12" },
      { q: "Solve: 2(x − 3) = 10", a: "8" },
    ],
    drill: [
      { q: "Factor: x² − 9", a: "(x−3)(x+3)" },
      { q: "log₂(8) = ?", a: "3" },
      { q: "sin(90°) = ?", a: "1" },
    ],
  };

  const list = questions[tool] ?? questions.drill;
  const current = list[idx % list.length];

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="rounded-xl border border-blue-900/50 bg-blue-950/30 p-6">
        <p className="text-xs uppercase tracking-wider text-blue-400">
          Question {(idx % list.length) + 1} of {list.length}
        </p>
        <p className="mt-2 text-lg font-medium text-blue-100">{current.q}</p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => setOut([`Answer: ${current.a}`])}
          className="bg-blue-600 hover:bg-blue-500"
        >
          Show answer
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setIdx((i) => i + 1);
            setOut([]);
          }}
          className="border-blue-900/60 bg-blue-950/30 text-blue-100"
        >
          Next question
        </Button>
      </div>
      <Result lines={out} />
    </div>
  );
}

const MAP: Record<string, () => React.ReactElement> = {
  geometry: Geometry,
  coordinate: Coordinate,
  triangles: Triangles,
  similarity: Similarity,
  unitcircle: UnitCircle,
  trigonometry: Trigonometry,
  conics: Conics,
  statistics: Statistics,
  growth: Growth,
  percent: Percent,
  probability: Probability,
  converter: Converter,
  wordproblems: WordProblems,
  numbertheory: NumberTheory,
};

export function MoreTools({ tool }: { tool: string }) {
  if (["sat", "act", "psat", "drill"].includes(tool)) {
    return (
      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="uppercase text-blue-100">{tool} Practice</CardTitle>
          <p className="text-sm text-blue-400/70">Work through practice questions.</p>
        </CardHeader>
        <CardContent>
          <TestPrep tool={tool} />
        </CardContent>
      </Card>
    );
  }

  const Comp = MAP[tool] ?? Geometry;
  return (
    <Card className="border-blue-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="capitalize text-blue-100">{tool}</CardTitle>
        <p className="text-sm text-blue-400/70">Enter values and compute.</p>
      </CardHeader>
      <CardContent>
        <Comp />
      </CardContent>
    </Card>
  );
}