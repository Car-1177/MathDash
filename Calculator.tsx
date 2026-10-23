import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePersistentState } from "@/lib/storage";
import { safeEval, fmt } from "@/lib/math";

const KEYS = [
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "(", "+",
  ")", "^", "√", "%",
];

export function Calculator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = usePersistentState<
    { expr: string; result: string }[]
  >("calc.history", []);

  const press = (k: string) => {
    if (k === "√") setExpr((e) => e + "√(");
    else setExpr((e) => e + k);
  };

  const evaluate = () => {
    try {
      const value = safeEval(expr);
      const out = fmt(value);
      setResult(out);
      setHistory((h) => [{ expr, result: out }, ...h].slice(0, 20));
    } catch {
      setResult("Error");
    }
  };

  const clear = () => {
    setExpr("");
    setResult("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="border-blue-900/50 bg-slate-900/60 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-blue-100">Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border border-blue-900/50 bg-slate-950 p-4 text-right">
            <p className="min-h-6 break-all font-mono text-sm text-blue-400/70">
              {expr || "0"}
            </p>
            <p className="mt-1 break-all font-mono text-3xl font-bold text-white">
              {result || "—"}
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {KEYS.map((k) => (
              <Button
                key={k}
                onClick={() => press(k)}
                variant="outline"
                className="border-blue-900/60 bg-blue-950/40 font-mono text-lg text-blue-100 hover:bg-blue-900/50"
              >
                {k}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={clear}
              variant="outline"
              className="border-rose-900/60 bg-rose-950/30 text-rose-200 hover:bg-rose-900/40"
            >
              Clear
            </Button>
            <Button
              onClick={() => setExpr((e) => e.slice(0, -1))}
              variant="outline"
              className="border-blue-900/60 bg-blue-950/40 text-blue-100 hover:bg-blue-900/50"
            >
              ⌫
            </Button>
            <Button
              onClick={evaluate}
              className="bg-blue-600 font-semibold hover:bg-blue-500"
            >
              =
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-blue-100">History</CardTitle>
          <p className="text-sm text-blue-400/70">Saved automatically</p>
        </CardHeader>
        <CardContent className="space-y-2">
          {history.length === 0 ? (
            <p className="text-sm text-blue-400/60">
              No calculations yet. Your history will appear here.
            </p>
          ) : (
            history.map((h, i) => (
              <button
                key={i}
                onClick={() => setExpr(h.expr)}
                className={cn(
                  "w-full rounded-lg border border-blue-950 bg-blue-950/30 px-3 py-2 text-left transition hover:border-blue-700"
                )}
              >
                <p className="truncate font-mono text-xs text-blue-400/70">
                  {h.expr}
                </p>
                <p className="truncate font-mono text-sm text-blue-100">
                  = {h.result}
                </p>
              </button>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}