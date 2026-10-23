import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePersistentState } from "@/lib/storage";
import { Check, Plus, Trash2 } from "lucide-react";

const FORMULAS: { group: string; items: [string, string][] }[] = [
  {
    group: "Algebra",
    items: [
      ["Quadratic Formula", "x = (-b ± √(b² - 4ac)) / 2a"],
      ["Difference of Squares", "a² - b² = (a - b)(a + b)"],
      ["Perfect Square", "(a + b)² = a² + 2ab + b²"],
      ["Slope", "m = (y₂ - y₁) / (x₂ - x₁)"],
    ],
  },
  {
    group: "Geometry",
    items: [
      ["Circle Area", "A = πr²"],
      ["Circle Circumference", "C = 2πr"],
      ["Triangle Area", "A = ½bh"],
      ["Sphere Volume", "V = 4/3 πr³"],
    ],
  },
  {
    group: "Trigonometry",
    items: [
      ["Pythagorean Identity", "sin²θ + cos²θ = 1"],
      ["Law of Sines", "a/sin A = b/sin B = c/sin C"],
      ["Law of Cosines", "c² = a² + b² - 2ab cos C"],
      ["Double Angle", "sin 2θ = 2 sin θ cos θ"],
    ],
  },
  {
    group: "Statistics",
    items: [
      ["Mean", "x̄ = Σx / n"],
      ["Standard Deviation", "σ = √(Σ(x - x̄)² / n)"],
      ["Combinations", "C(n,r) = n! / (r!(n-r)!)"],
      ["Permutations", "P(n,r) = n! / (n-r)!"],
    ],
  },
];

interface Task {
  id: number;
  text: string;
  done: boolean;
}

export function Reference({ tool }: { tool: string }) {
  const [query, setQuery] = useState("");
  const [tasks, setTasks] = usePersistentState<Task[]>("planner.tasks", [
    { id: 1, text: "Review quadratic formula", done: true },
    { id: 2, text: "Practice 10 trig identities", done: false },
    { id: 3, text: "Complete SAT math section", done: false },
  ]);
  const [newTask, setNewTask] = useState("");

  if (tool === "planner") {
    const addTask = () => {
      if (!newTask.trim()) return;
      setTasks((t) => [...t, { id: Date.now(), text: newTask, done: false }]);
      setNewTask("");
    };
    const toggle = (id: number) =>
      setTasks((t) =>
        t.map((x) => (x.id === id ? { ...x, done: !x.done } : x))
      );
    const remove = (id: number) =>
      setTasks((t) => t.filter((x) => x.id !== id));
    const doneCount = tasks.filter((t) => t.done).length;

    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="border-blue-900/50 bg-slate-900/60">
          <CardHeader>
            <CardTitle className="text-blue-100">Study Planner</CardTitle>
            <p className="text-sm text-blue-400/70">
              {doneCount} of {tasks.length} tasks complete · saved automatically
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Add a study task..."
                className="border-blue-900/60 bg-slate-950 text-white"
              />
              <Button
                onClick={addTask}
                className="bg-blue-600 hover:bg-blue-500"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 rounded-xl border border-blue-900/50 bg-blue-950/30 px-4 py-3"
                >
                  <button
                    onClick={() => toggle(t.id)}
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition",
                      t.done
                        ? "border-blue-500 bg-blue-600 text-white"
                        : "border-blue-800 bg-slate-950"
                    )}
                  >
                    {t.done && <Check className="h-4 w-4" />}
                  </button>
                  <span
                    className={cn(
                      "flex-1 text-sm",
                      t.done
                        ? "text-blue-400/50 line-through"
                        : "text-blue-100"
                    )}
                  >
                    {t.text}
                  </span>
                  <button
                    onClick={() => remove(t.id)}
                    className="text-blue-500 hover:text-rose-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (tool === "reference") {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Card className="border-blue-900/50 bg-slate-900/60">
          <CardHeader>
            <CardTitle className="text-blue-100">Quick Reference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-blue-200/80">
            {[
              ["Symbol", "Meaning"],
              ["Σ", "Summation"],
              ["√", "Square root"],
              ["≈", "Approximately equal"],
              ["∈", "Element of"],
              ["∞", "Infinity"],
              ["n!", "Factorial"],
            ].map(([s, m], i) => (
              <div
                key={s}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2",
                  i === 0
                    ? "bg-blue-600/20 font-semibold text-blue-200"
                    : "border border-blue-950 bg-blue-950/30"
                )}
              >
                <span className="font-mono text-blue-300">{s}</span>
                <span className="text-xs text-blue-400/70">{m}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  const filtered = FORMULAS.map((g) => ({
    ...g,
    items: g.items.filter(
      ([name, f]) =>
        name.toLowerCase().includes(query.toLowerCase()) ||
        f.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((g) => g.items.length);

  return (
    <div className="space-y-6">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search formulas..."
        className="max-w-md border-blue-900/60 bg-slate-950 text-white"
      />
      {filtered.length === 0 && (
        <p className="text-blue-400/70">No formulas match "{query}".</p>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((g) => (
          <Card key={g.group} className="border-blue-900/50 bg-slate-900/60">
            <CardHeader>
              <CardTitle className="text-blue-100">{g.group}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {g.items.map(([name, f]) => (
                <div
                  key={name}
                  className="rounded-xl border border-blue-950 bg-blue-950/30 p-3"
                >
                  <p className="text-xs uppercase tracking-wider text-blue-400">
                    {name}
                  </p>
                  <p className="mt-1 font-mono text-sm text-blue-100">{f}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}