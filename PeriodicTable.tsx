import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ELEMENTS, CATEGORY_COLORS, type Element } from "@/lib/elements";

const LEGEND = [
  "alkali metal",
  "alkaline earth",
  "transition metal",
  "post-transition",
  "metalloid",
  "nonmetal",
  "halogen",
  "noble gas",
  "lanthanide",
  "actinide",
];

function Cell({
  el,
  active,
  onClick,
}: {
  el: Element;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center rounded-md border p-1 transition hover:scale-105 hover:border-cyan-400",
        CATEGORY_COLORS[el.category] || CATEGORY_COLORS.unknown,
        active && "ring-2 ring-cyan-400"
      )}
      style={{ gridColumn: el.group, gridRow: el.period }}
    >
      <span className="text-[9px] leading-none opacity-70">{el.num}</span>
      <span className="font-mono text-sm font-bold leading-tight">
        {el.sym}
      </span>
      <span className="hidden text-[8px] leading-none opacity-70 sm:block">
        {el.mass.toFixed(1)}
      </span>
    </button>
  );
}

export function PeriodicTable() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Element | null>(null);

  const q = query.trim().toLowerCase();
  const matches = (el: Element) =>
    !q ||
    el.name.toLowerCase().includes(q) ||
    el.sym.toLowerCase().includes(q) ||
    String(el.num) === q;

  const main = ELEMENTS.filter((e) => e.category !== "lanthanide" && e.category !== "actinide");
  const lanthanides = ELEMENTS.filter((e) => e.category === "lanthanide");
  const actinides = ELEMENTS.filter((e) => e.category === "actinide");

  return (
    <Card className="border-cyan-900/50 bg-slate-900/60">
      <CardHeader>
        <CardTitle className="text-cyan-100">Periodic Table</CardTitle>
        <p className="text-sm text-cyan-400/70">
          All 118 elements — search by name, symbol, or atomic number
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search elements..."
          className="border-cyan-900/60 bg-slate-950 text-white"
        />

        <div className="overflow-x-auto pb-2">
          <div
            className="grid min-w-[720px] gap-1"
            style={{
              gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
              gridTemplateRows: "repeat(7, minmax(0, 1fr))",
            }}
          >
            {main.map((el) => (
              <Cell
                key={el.num}
                el={el}
                active={selected?.num === el.num}
                onClick={() => setSelected(el)}
              />
            ))}
          </div>

          <div className="mt-3 grid min-w-[720px] gap-1">
            <div className="grid grid-cols-18 gap-1" style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}>
              {lanthanides.map((el) => (
                <Cell
                  key={el.num}
                  el={el}
                  active={selected?.num === el.num}
                  onClick={() => setSelected(el)}
                />
              ))}
            </div>
            <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}>
              {actinides.map((el) => (
                <Cell
                  key={el.num}
                  el={el}
                  active={selected?.num === el.num}
                  onClick={() => setSelected(el)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {LEGEND.map((c) => (
            <span
              key={c}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[10px] capitalize",
                CATEGORY_COLORS[c]
              )}
            >
              {c}
            </span>
          ))}
        </div>

        {selected && (
          <div className="rounded-xl border border-cyan-900/50 bg-cyan-950/40 p-4">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-3xl font-bold text-cyan-100">
                {selected.sym}
              </span>
              <span className="text-lg text-cyan-200">{selected.name}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              <div>
                <p className="text-xs uppercase text-cyan-400/70">Number</p>
                <p className="font-mono text-cyan-100">{selected.num}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-cyan-400/70">Mass</p>
                <p className="font-mono text-cyan-100">
                  {selected.mass} g/mol
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-cyan-400/70">Group</p>
                <p className="font-mono text-cyan-100">{selected.group}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-cyan-400/70">Period</p>
                <p className="font-mono text-cyan-100">{selected.period}</p>
              </div>
            </div>
            <p className="mt-3 text-xs capitalize text-cyan-400/70">
              Category: {selected.category}
            </p>
          </div>
        )}

        {q && (
          <div className="space-y-1">
            <p className="text-xs uppercase text-cyan-400/70">
              {ELEMENTS.filter(matches).length} match(es)
            </p>
            {ELEMENTS.filter(matches).map((el) => (
              <button
                key={el.num}
                onClick={() => setSelected(el)}
                className="flex w-full items-center justify-between rounded-lg border border-cyan-950 bg-blue-950/30 px-3 py-2 text-left text-sm text-cyan-200 transition hover:border-cyan-700"
              >
                <span>
                  <span className="font-mono font-bold text-cyan-100">
                    {el.sym}
                  </span>{" "}
                  {el.name}
                </span>
                <span className="font-mono text-xs text-cyan-400/70">
                  {el.mass} g/mol
                </span>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}