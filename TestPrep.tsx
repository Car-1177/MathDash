import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Q {
  q: string;
  choices: string[];
  answer: number;
}

const BANKS: Record<string, Q[]> = {
  sat: [
    { q: "If 3x + 5 = 20, what is x?", choices: ["3", "5", "7", "15"], answer: 1 },
    { q: "What is the slope of y = 2x - 3?", choices: ["-3", "2", "3", "1/2"], answer: 1 },
    { q: "If x² = 49, what is the positive value of x?", choices: ["6", "7", "8", "9"], answer: 1 },
  ],
  act: [
    { q: "What is 15% of 200?", choices: ["15", "20", "30", "45"], answer: 2 },
    { q: "Simplify: (x³)(x⁴)", choices: ["x⁷", "x¹²", "x", "2x⁷"], answer: 0 },
    { q: "The average of 4, 8, and 12 is:", choices: ["6", "8", "10", "12"], answer: 1 },
  ],
  psat: [
    { q: "If f(x) = x² + 1, what is f(3)?", choices: ["7", "9", "10", "12"], answer: 2 },
    { q: "What is √144?", choices: ["11", "12", "13", "14"], answer: 1 },
    { q: "Solve: 2(x - 3) = 10", choices: ["5", "6", "8", "11"], answer: 2 },
  ],
  drill: [
    { q: "What is 7 × 8?", choices: ["48", "54", "56", "64"], answer: 2 },
    { q: "What is the derivative of x²?", choices: ["x", "2x", "x²", "2"], answer: 1 },
    { q: "sin(90°) =", choices: ["0", "1/2", "1", "undefined"], answer: 2 },
    { q: "What is log₁₀(1000)?", choices: ["2", "3", "10", "100"], answer: 1 },
  ],
};

export function TestPrep({ tool }: { tool: string }) {
  const bank = BANKS[tool] ?? BANKS.drill;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = bank[idx];

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === current.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= bank.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const title = tool === "drill" ? "Mixed Drill" : tool.toUpperCase();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-blue-100">{title} Practice</CardTitle>
          <p className="text-sm text-blue-400/70">
            {done ? "Complete!" : `Question ${idx + 1} of ${bank.length}`}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {done ? (
            <div className="space-y-4 text-center">
              <p className="font-serif text-3xl font-bold text-white">
                {score} / {bank.length}
              </p>
              <p className="text-blue-300">
                {score === bank.length ? "Perfect score!" : "Keep practicing!"}
              </p>
              <Button onClick={restart} className="bg-blue-600 hover:bg-blue-500">
                Try again
              </Button>
            </div>
          ) : (
            <>
              <p className="text-lg font-medium text-blue-100">{current.q}</p>
              <div className="space-y-2">
                {current.choices.map((c, i) => {
                  const isAnswer = i === current.answer;
                  const isPicked = i === picked;
                  return (
                    <button
                      key={i}
                      onClick={() => choose(i)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition",
                        picked === null
                          ? "border-blue-900/50 bg-blue-950/30 text-blue-200 hover:border-blue-600"
                          : isAnswer
                          ? "border-emerald-600 bg-emerald-950/40 text-emerald-200"
                          : isPicked
                          ? "border-rose-600 bg-rose-950/40 text-rose-200"
                          : "border-blue-900/50 bg-blue-950/20 text-blue-400/60"
                      )}
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-950 text-xs font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {c}
                    </button>
                  );
                })}
              </div>
              {picked !== null && (
                <Button onClick={next} className="w-full bg-blue-600 hover:bg-blue-500">
                  {idx + 1 >= bank.length ? "See results" : "Next question"}
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}