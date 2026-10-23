import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePersistentState } from "@/lib/storage";

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-cyan-300/80">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-cyan-900/60 bg-slate-950 font-mono text-white"
      />
    </div>
  );
}

function Result({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-cyan-900/50 bg-cyan-950/40 p-4 font-mono text-sm text-cyan-100">
      {children}
    </div>
  );
}

const num = (s: string) => {
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
};

/* ---------- Chemistry ---------- */

const ATOMIC_MASS: Record<string, number> = {
  H: 1.008, He: 4.003, Li: 6.94, Be: 9.012, B: 10.81, C: 12.011,
  N: 14.007, O: 15.999, F: 18.998, Ne: 20.18, Na: 22.99, Mg: 24.305,
  Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948,
  K: 39.098, Ca: 40.078, Fe: 55.845, Cu: 63.546, Zn: 65.38, Ag: 107.87,
  I: 126.9, Au: 196.97, Hg: 200.59, Pb: 207.2,
};

function MolarMass() {
  const [formula, setFormula] = usePersistentState("sci.molar.formula", "H2O");

  const compute = () => {
    const tokens = formula.match(/([A-Z][a-z]?)(\d*)/g) || [];
    let total = 0;
    const parts: string[] = [];
    for (const t of tokens) {
      const m = t.match(/([A-Z][a-z]?)(\d*)/);
      if (!m) continue;
      const el = m[1];
      const count = m[2] ? parseInt(m[2]) : 1;
      const mass = ATOMIC_MASS[el];
      if (mass === undefined) return { total: NaN, parts: [`Unknown: ${el}`] };
      total += mass * count;
      parts.push(`${el}×${count} = ${(mass * count).toFixed(3)}`);
    }
    return { total, parts };
  };

  const { total, parts } = compute();

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Molar Mass</CardTitle>
        <p className="text-sm text-cyan-400/70">
          Enter a chemical formula (e.g. H2O, C6H12O6, NaCl)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Formula" value={formula} onChange={setFormula} />
        <Result>
          {isNaN(total) ? (
            <span className="text-rose-300">{parts.join(", ")}</span>
          ) : (
            <>
              <p className="text-lg font-bold text-white">
                {total.toFixed(3)} g/mol
              </p>
              <div className="mt-2 space-y-0.5 text-xs text-cyan-400/70">
                {parts.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </>
          )}
        </Result>
      </CardContent>
    </Card>
  );
}

function PhCalc() {
  const [conc, setConc] = usePersistentState("sci.ph.conc", "0.01");
  const [mode, setMode] = usePersistentState<"acid" | "base">(
    "sci.ph.mode",
    "acid"
  );
  const c = num(conc);
  const h = mode === "acid" ? c : 1e-14 / c;
  const ph = -Math.log10(h);
  const poh = 14 - ph;

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">pH & pOH</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {(["acid", "base"] as const).map((m) => (
            <Button
              key={m}
              onClick={() => setMode(m)}
              variant="outline"
              className={cn(
                "flex-1 capitalize",
                mode === m
                  ? "border-cyan-600 bg-cyan-600/20 text-cyan-100"
                  : "border-cyan-900/60 bg-cyan-950/40 text-cyan-300"
              )}
            >
              {m}
            </Button>
          ))}
        </div>
        <Field
          label={mode === "acid" ? "[H⁺] concentration (M)" : "[OH⁻] concentration (M)"}
          value={conc}
          onChange={setConc}
        />
        <Result>
          <p className="text-lg font-bold text-white">pH = {ph.toFixed(3)}</p>
          <p className="text-cyan-300">pOH = {poh.toFixed(3)}</p>
          <p className="mt-1 text-xs text-cyan-400/70">
            {ph < 7 ? "Acidic" : ph > 7 ? "Basic" : "Neutral"}
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

function GasLaws() {
  const [p1, setP1] = usePersistentState("sci.gas.p1", "1");
  const [v1, setV1] = usePersistentState("sci.gas.v1", "2");
  const [t1, setT1] = usePersistentState("sci.gas.t1", "273");
  const [p2, setP2] = usePersistentState("sci.gas.p2", "2");
  const [v2, setV2] = usePersistentState("sci.gas.v2", "1");
  const [t2, setT2] = usePersistentState("sci.gas.t2", "273");

  const lhs = (num(p1) * num(v1)) / num(t1);
  const rhs = (num(p2) * num(v2)) / num(t2);

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Combined Gas Law</CardTitle>
        <p className="text-sm text-cyan-400/70">P₁V₁/T₁ = P₂V₂/T₂</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="P₁" value={p1} onChange={setP1} />
          <Field label="V₁" value={v1} onChange={setV1} />
          <Field label="T₁ (K)" value={t1} onChange={setT1} />
          <Field label="P₂" value={p2} onChange={setP2} />
          <Field label="V₂" value={v2} onChange={setV2} />
          <Field label="T₂ (K)" value={t2} onChange={setT2} />
        </div>
        <Result>
          <p className="text-cyan-300">Left side = {lhs.toFixed(4)}</p>
          <p className="text-cyan-300">Right side = {rhs.toFixed(4)}</p>
          <p
            className={cn(
              "mt-1 font-bold",
              Math.abs(lhs - rhs) < 0.01 ? "text-emerald-300" : "text-amber-300"
            )}
          >
            {Math.abs(lhs - rhs) < 0.01 ? "Balanced ✓" : "Not balanced"}
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

function Dilution() {
  const [m1, setM1] = usePersistentState("sci.dil.m1", "2");
  const [v1, setV1] = usePersistentState("sci.dil.v1", "50");
  const [m2, setM2] = usePersistentState("sci.dil.m2", "0.5");
  const v2 = num(m2) === 0 ? 0 : (num(m1) * num(v1)) / num(m2);

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Dilution</CardTitle>
        <p className="text-sm text-cyan-400/70">M₁V₁ = M₂V₂ — solve for V₂</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="M₁ (M)" value={m1} onChange={setM1} />
          <Field label="V₁ (mL)" value={v1} onChange={setV1} />
          <Field label="M₂ (M)" value={m2} onChange={setM2} />
        </div>
        <Result>
          <p className="text-lg font-bold text-white">
            V₂ = {v2.toFixed(2)} mL
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

function Stoichiometry() {
  const [mass, setMass] = usePersistentState("sci.stoich.mass", "10");
  const [mm, setMm] = usePersistentState("sci.stoich.mm", "18.015");
  const [ratio, setRatio] = usePersistentState("sci.stoich.ratio", "1");
  const moles = num(mm) === 0 ? 0 : num(mass) / num(mm);
  const product = moles * num(ratio);

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Stoichiometry</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Mass (g)" value={mass} onChange={setMass} />
          <Field label="Molar mass (g/mol)" value={mm} onChange={setMm} />
          <Field label="Mole ratio" value={ratio} onChange={setRatio} />
        </div>
        <Result>
          <p className="text-cyan-300">Moles = {moles.toFixed(4)} mol</p>
          <p className="text-lg font-bold text-white">
            Product = {product.toFixed(4)} mol
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

const PERIODIC: { sym: string; name: string; num: number; mass: number }[] = [
  { sym: "H", name: "Hydrogen", num: 1, mass: 1.008 },
  { sym: "He", name: "Helium", num: 2, mass: 4.003 },
  { sym: "Li", name: "Lithium", num: 3, mass: 6.94 },
  { sym: "C", name: "Carbon", num: 6, mass: 12.011 },
  { sym: "N", name: "Nitrogen", num: 7, mass: 14.007 },
  { sym: "O", name: "Oxygen", num: 8, mass: 15.999 },
  { sym: "Na", name: "Sodium", num: 11, mass: 22.99 },
  { sym: "Mg", name: "Magnesium", num: 12, mass: 24.305 },
  { sym: "Al", name: "Aluminum", num: 13, mass: 26.982 },
  { sym: "Si", name: "Silicon", num: 14, mass: 28.085 },
  { sym: "P", name: "Phosphorus", num: 15, mass: 30.974 },
  { sym: "S", name: "Sulfur", num: 16, mass: 32.06 },
  { sym: "Cl", name: "Chlorine", num: 17, mass: 35.45 },
  { sym: "K", name: "Potassium", num: 19, mass: 39.098 },
  { sym: "Ca", name: "Calcium", num: 20, mass: 40.078 },
  { sym: "Fe", name: "Iron", num: 26, mass: 55.845 },
  { sym: "Cu", name: "Copper", num: 29, mass: 63.546 },
  { sym: "Zn", name: "Zinc", num: 30, mass: 65.38 },
  { sym: "Ag", name: "Silver", num: 47, mass: 107.87 },
  { sym: "Au", name: "Gold", num: 79, mass: 196.97 },
];

function PeriodicTable() {
  const [query, setQuery] = useState("");
  const filtered = PERIODIC.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.sym.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Periodic Table</CardTitle>
        <p className="text-sm text-cyan-400/70">Common elements reference</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search elements..."
          className="border-cyan-900/60 bg-slate-950 text-white"
        />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((e) => (
            <div
              key={e.sym}
              className="rounded-xl border border-cyan-900/50 bg-cyan-950/30 p-3 transition hover:border-cyan-700"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-lg font-bold text-cyan-100">
                  {e.sym}
                </span>
                <span className="text-xs text-cyan-400/60">{e.num}</span>
              </div>
              <p className="truncate text-xs text-cyan-300/80">{e.name}</p>
              <p className="font-mono text-xs text-cyan-400/70">
                {e.mass} g/mol
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Balancer() {
  const [eq, setEq] = usePersistentState("sci.bal.eq", "H2 + O2 -> H2O");
  const [left, right] = eq.split(/->|=/).map((s) => s.trim());
  const countAtoms = (side: string) => {
    const counts: Record<string, number> = {};
    (side || "").split("+").forEach((term) => {
      const tokens = term.trim().match(/([A-Z][a-z]?)(\d*)/g) || [];
      tokens.forEach((t) => {
        const m = t.match(/([A-Z][a-z]?)(\d*)/);
        if (!m) return;
        counts[m[1]] = (counts[m[1]] || 0) + (m[2] ? parseInt(m[2]) : 1);
      });
    });
    return counts;
  };
  const l = countAtoms(left);
  const r = countAtoms(right);
  const all = Array.from(new Set([...Object.keys(l), ...Object.keys(r)]));
  const balanced = all.every((k) => (l[k] || 0) === (r[k] || 0));

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Equation Balancer</CardTitle>
        <p className="text-sm text-cyan-400/70">
          Check atom counts (use -&gt; or = to separate sides)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Equation" value={eq} onChange={setEq} />
        <Result>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-xs uppercase text-cyan-400/70">
                Reactants
              </p>
              {all.map((k) => (
                <p key={k} className="text-cyan-200">
                  {k}: {l[k] || 0}
                </p>
              ))}
            </div>
            <div>
              <p className="mb-1 text-xs uppercase text-cyan-400/70">
                Products
              </p>
              {all.map((k) => (
                <p key={k} className="text-cyan-200">
                  {k}: {r[k] || 0}
                </p>
              ))}
            </div>
          </div>
          <p
            className={cn(
              "mt-3 font-bold",
              balanced ? "text-emerald-300" : "text-amber-300"
            )}
          >
            {balanced ? "Balanced ✓" : "Not balanced"}
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

/* ---------- Biology ---------- */

function Punnett() {
  const [p1, setP1] = usePersistentState("sci.pun.p1", "Aa");
  const [p2, setP2] = usePersistentState("sci.pun.p2", "Aa");
  const a1 = p1.split("");
  const a2 = p2.split("");
  const grid = a1.map((x) => a2.map((y) => [x, y].sort().join("")));
  const flat = grid.flat();
  const counts = flat.reduce<Record<string, number>>((acc, g) => {
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {});

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Punnett Square</CardTitle>
        <p className="text-sm text-cyan-400/70">
          Enter two alleles per parent (e.g. Aa)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Parent 1" value={p1} onChange={setP1} />
          <Field label="Parent 2" value={p2} onChange={setP2} />
        </div>
        <div className="mx-auto grid w-48 grid-cols-2 gap-2">
          {grid.flat().map((g, i) => (
            <div
              key={i}
              className="flex h-16 items-center justify-center rounded-xl border border-cyan-900/50 bg-cyan-950/40 font-mono text-xl font-bold text-cyan-100"
            >
              {g}
            </div>
          ))}
        </div>
        <Result>
          {Object.entries(counts).map(([g, c]) => (
            <p key={g} className="text-cyan-200">
              {g}: {((c / flat.length) * 100).toFixed(0)}%
            </p>
          ))}
        </Result>
      </CardContent>
    </Card>
  );
}

function HardyWeinberg() {
  const [q, setQ] = usePersistentState("sci.hw.q", "0.3");
  const qv = num(q);
  const p = 1 - qv;
  const aa = qv * qv;
  const ab = 2 * p * qv;
  const bb = p * p;

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Hardy-Weinberg</CardTitle>
        <p className="text-sm text-cyan-400/70">p² + 2pq + q² = 1</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Recessive allele freq (q)" value={q} onChange={setQ} />
        <Result>
          <p className="text-cyan-300">p = {p.toFixed(3)}</p>
          <p className="text-cyan-200">p² (homozygous dom) = {bb.toFixed(4)}</p>
          <p className="text-cyan-200">2pq (heterozygous) = {ab.toFixed(4)}</p>
          <p className="text-cyan-200">q² (homozygous rec) = {aa.toFixed(4)}</p>
        </Result>
      </CardContent>
    </Card>
  );
}

function PopulationGrowth() {
  const [n0, setN0] = usePersistentState("sci.pop.n0", "100");
  const [r, setR] = usePersistentState("sci.pop.r", "0.05");
  const [t, setT] = usePersistentState("sci.pop.t", "10");
  const n = num(n0) * Math.exp(num(r) * num(t));

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Population Growth</CardTitle>
        <p className="text-sm text-cyan-400/70">N = N₀ · e^(rt)</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="N₀" value={n0} onChange={setN0} />
          <Field label="Rate (r)" value={r} onChange={setR} />
          <Field label="Time (t)" value={t} onChange={setT} />
        </div>
        <Result>
          <p className="text-lg font-bold text-white">N = {n.toFixed(2)}</p>
        </Result>
      </CardContent>
    </Card>
  );
}

function DnaTools() {
  const [seq, setSeq] = usePersistentState("sci.dna.seq", "ATGCGTACG");
  const complement = seq
    .toUpperCase()
    .split("")
    .map((b) => ({ A: "T", T: "A", G: "C", C: "G" }[b] || "?"))
    .join("");
  const rna = seq
    .toUpperCase()
    .split("")
    .map((b) => (b === "T" ? "U" : b))
    .join("");

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">DNA & RNA</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="DNA sequence" value={seq} onChange={setSeq} />
        <Result>
          <p className="text-cyan-300">Complement: {complement}</p>
          <p className="text-cyan-300">mRNA: {rna}</p>
          <p className="text-xs text-cyan-400/70">Length: {seq.length} bases</p>
        </Result>
      </CardContent>
    </Card>
  );
}

/* ---------- Physics ---------- */

function Kinematics() {
  const [u, setU] = usePersistentState("sci.kin.u", "0");
  const [a, setA] = usePersistentState("sci.kin.a", "9.8");
  const [t, setT] = usePersistentState("sci.kin.t", "3");
  const v = num(u) + num(a) * num(t);
  const s = num(u) * num(t) + 0.5 * num(a) * num(t) * num(t);

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Kinematics</CardTitle>
        <p className="text-sm text-cyan-400/70">v = u + at · s = ut + ½at²</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="u (m/s)" value={u} onChange={setU} />
          <Field label="a (m/s²)" value={a} onChange={setA} />
          <Field label="t (s)" value={t} onChange={setT} />
        </div>
        <Result>
          <p className="text-cyan-300">Final velocity v = {v.toFixed(3)} m/s</p>
          <p className="text-lg font-bold text-white">
            Displacement s = {s.toFixed(3)} m
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

function Forces() {
  const [m, setM] = usePersistentState("sci.for.m", "5");
  const [a, setA] = usePersistentState("sci.for.a", "2");
  const f = num(m) * num(a);

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Forces & Newton</CardTitle>
        <p className="text-sm text-cyan-400/70">F = ma</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Mass (kg)" value={m} onChange={setM} />
          <Field label="Accel (m/s²)" value={a} onChange={setA} />
        </div>
        <Result>
          <p className="text-lg font-bold text-white">F = {f.toFixed(3)} N</p>
        </Result>
      </CardContent>
    </Card>
  );
}

function Energy() {
  const [m, setM] = usePersistentState("sci.eng.m", "2");
  const [h, setH] = usePersistentState("sci.eng.h", "10");
  const [v, setV] = usePersistentState("sci.eng.v", "5");
  const pe = num(m) * 9.8 * num(h);
  const ke = 0.5 * num(m) * num(v) * num(v);

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Energy & Work</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Mass (kg)" value={m} onChange={setM} />
          <Field label="Height (m)" value={h} onChange={setH} />
          <Field label="Velocity (m/s)" value={v} onChange={setV} />
        </div>
        <Result>
          <p className="text-cyan-300">PE = mgh = {pe.toFixed(2)} J</p>
          <p className="text-cyan-300">KE = ½mv² = {ke.toFixed(2)} J</p>
          <p className="text-lg font-bold text-white">
            Total = {(pe + ke).toFixed(2)} J
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

function Circuits() {
  const [v, setV] = usePersistentState("sci.cir.v", "12");
  const [r, setR] = usePersistentState("sci.cir.r", "4");
  const i = num(r) === 0 ? 0 : num(v) / num(r);
  const p = num(v) * i;

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Circuits (Ohm's Law)</CardTitle>
        <p className="text-sm text-cyan-400/70">V = IR · P = VI</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Voltage (V)" value={v} onChange={setV} />
          <Field label="Resistance (Ω)" value={r} onChange={setR} />
        </div>
        <Result>
          <p className="text-cyan-300">Current I = {i.toFixed(4)} A</p>
          <p className="text-lg font-bold text-white">
            Power P = {p.toFixed(3)} W
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

function Waves() {
  const [f, setF] = usePersistentState("sci.wav.f", "440");
  const [l, setL] = usePersistentState("sci.wav.l", "0.78");
  const speed = num(f) * num(l);

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Waves & Optics</CardTitle>
        <p className="text-sm text-cyan-400/70">v = fλ</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Frequency (Hz)" value={f} onChange={setF} />
          <Field label="Wavelength (m)" value={l} onChange={setL} />
        </div>
        <Result>
          <p className="text-lg font-bold text-white">
            Speed = {speed.toFixed(3)} m/s
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

function Thermo() {
  const [m, setM] = usePersistentState("sci.th.m", "1");
  const [c, setC] = usePersistentState("sci.th.c", "4.186");
  const [dt, setDt] = usePersistentState("sci.th.dt", "25");
  const q = num(m) * num(c) * num(dt);

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Thermodynamics</CardTitle>
        <p className="text-sm text-cyan-400/70">Q = mcΔT</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Mass (kg)" value={m} onChange={setM} />
          <Field label="c (J/g°C)" value={c} onChange={setC} />
          <Field label="ΔT (°C)" value={dt} onChange={setDt} />
        </div>
        <Result>
          <p className="text-lg font-bold text-white">Q = {q.toFixed(2)} J</p>
        </Result>
      </CardContent>
    </Card>
  );
}

/* ---------- Earth & Space ---------- */

function Astronomy() {
  const [d, setD] = usePersistentState("sci.ast.d", "1");
  const [m, setM] = usePersistentState("sci.ast.m", "1.989e30");
  const g = (6.674e-11 * num(m)) / (num(d) * num(d));

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Astronomy</CardTitle>
        <p className="text-sm text-cyan-400/70">
          Gravitational field strength g = GM/r²
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Distance r (m)" value={d} onChange={setD} />
          <Field label="Mass M (kg)" value={m} onChange={setM} />
        </div>
        <Result>
          <p className="text-lg font-bold text-white">
            g = {g.toExponential(4)} m/s²
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

function Geology() {
  const [half, setHalf] = usePersistentState("sci.geo.half", "5730");
  const [elapsed, setElapsed] = usePersistentState("sci.geo.elapsed", "11460");
  const remaining = Math.pow(0.5, num(elapsed) / num(half)) * 100;

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">
          Geology — Radiometric Dating
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Half-life (years)" value={half} onChange={setHalf} />
          <Field label="Elapsed (years)" value={elapsed} onChange={setElapsed} />
        </div>
        <Result>
          <p className="text-lg font-bold text-white">
            {remaining.toFixed(3)}% remaining
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

function Climate() {
  const [co2, setCo2] = usePersistentState("sci.cli.co2", "420");
  const baseline = 280;
  const increase = num(co2) - baseline;

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Climate Data</CardTitle>
        <p className="text-sm text-cyan-400/70">
          CO₂ vs pre-industrial baseline (280 ppm)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="CO₂ (ppm)" value={co2} onChange={setCo2} />
        <Result>
          <p className="text-lg font-bold text-white">
            +{increase.toFixed(1)} ppm
          </p>
          <p className="text-cyan-300">
            {((increase / baseline) * 100).toFixed(1)}% above baseline
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

/* ---------- Lab & Reference ---------- */

function SigFigs() {
  const [val, setVal] = usePersistentState("sci.sig.val", "0.004560");
  const count = (() => {
    const s = val.replace(/^-/, "").replace(/\./, "");
    const trimmed = s.replace(/^0+/, "");
    if (trimmed === "") return 0;
    return trimmed.length;
  })();

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Significant Figures</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Value" value={val} onChange={setVal} />
        <Result>
          <p className="text-lg font-bold text-white">
            {count} significant figures
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

function SciNotation() {
  const [val, setVal] = usePersistentState("sci.not.val", "0.00042");
  const n = num(val);

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Scientific Notation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Value" value={val} onChange={setVal} />
        <Result>
          <p className="text-lg font-bold text-white">
            {n === 0 ? "0" : n.toExponential(4)}
          </p>
        </Result>
      </CardContent>
    </Card>
  );
}

const CONSTANTS: [string, string, string][] = [
  ["Speed of light", "c", "2.998 × 10⁸ m/s"],
  ["Gravitational constant", "G", "6.674 × 10⁻¹¹ N·m²/kg²"],
  ["Planck's constant", "h", "6.626 × 10⁻³⁴ J·s"],
  ["Avogadro's number", "Nₐ", "6.022 × 10²³ mol⁻¹"],
  ["Boltzmann constant", "k", "1.381 × 10⁻²³ J/K"],
  ["Gas constant", "R", "8.314 J/(mol·K)"],
  ["Electron charge", "e", "1.602 × 10⁻¹⁹ C"],
];

function Constants() {
  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Physical Constants</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {CONSTANTS.map(([name, sym, val]) => (
          <div
            key={sym}
            className="flex items-center justify-between rounded-lg border border-cyan-950 bg-cyan-950/30 px-3 py-2"
          >
            <div>
              <p className="text-sm text-cyan-100">{name}</p>
              <p className="font-mono text-xs text-cyan-400/70">{sym}</p>
            </div>
            <span className="font-mono text-sm text-cyan-300">{val}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function UnitConverterSci() {
  const [val, setVal] = usePersistentState("sci.uc.val", "1000");
  const [unit, setUnit] = usePersistentState("sci.uc.unit", "m->km");
  const factors: Record<string, number> = {
    "m->km": 0.001,
    "km->m": 1000,
    "g->kg": 0.001,
    "kg->g": 1000,
    "mL->L": 0.001,
    "L->mL": 1000,
    "J->kJ": 0.001,
    "kJ->J": 1000,
  };
  const out = num(val) * (factors[unit] || 1);

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Unit Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Value" value={val} onChange={setVal} />
          <div className="space-y-1.5">
            <Label className="text-cyan-300/80">Conversion</Label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-md border border-cyan-900/60 bg-slate-950 px-3 py-2 font-mono text-sm text-white"
            >
              {Object.keys(factors).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Result>
          <p className="text-lg font-bold text-white">{out.toFixed(4)}</p>
        </Result>
      </CardContent>
    </Card>
  );
}

/* ---------- router ---------- */

const RENDERERS: Record<string, () => JSX.Element> = {
  "molar-mass": MolarMass,
  "ph-calc": PhCalc,
  "gas-laws": GasLaws,
  dilution: Dilution,
  stoichiometry: Stoichiometry,
  periodic: PeriodicTable,
  balancer: Balancer,
  punnett: Punnett,
  "hardy-weinberg": HardyWeinberg,
  population: PopulationGrowth,
  dna: DnaTools,
  genetics: DnaTools,
  cell: DnaTools,
  kinematics: Kinematics,
  forces: Forces,
  energy: Energy,
  circuits: Circuits,
  waves: Waves,
  thermo: Thermo,
  astronomy: Astronomy,
  geology: Geology,
  climate: Climate,
  "sig-figs": SigFigs,
  "sci-notation": SciNotation,
  constants: Constants,
  "unit-conv-sci": UnitConverterSci,
};

export function ScienceTools({ tool }: { tool: string }) {
  const Renderer = RENDERERS[tool];
  if (!Renderer) {
    return (
      <Card className="border-cyan-900/50 bg-slate-900/60">
        <CardContent className="p-8 text-center text-cyan-400/70">
          This science tool is coming soon.
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="mx-auto max-w-3xl">
      <Renderer />
    </div>
  );
}