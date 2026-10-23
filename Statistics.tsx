import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "@/lib/math";

export function Statistics() {
  const [data, setData] = useState("12, 7, 3, 9, 15, 7, 22, 18, 7, 11");
  const nums = parseNumberList(data);

  const stats = nums.length
    ? [
        { label: "Count", value: String(nums.length) },
        { label: "Mean", value: (Math.round(mean(nums) * 1e4) / 1e4).toString() },
        { label: "Median", value: String(median(nums)) },
        { label: "Mode", value: mode(nums).join(", ") },
        { label: "Std dev", value: (Math.round(stdev(nums) * 1e4) / 1e4).toString() },
        { label: "Variance", value: (Math.round(variance(nums) * 1e4) / 1e4).toString() },
        { label: "Min", value: String(Math.min(...nums)) },
        { label: "Max", value: String(Math.max(...nums)) },
        { label: "Q1", value: String(percentile(nums, 25)) },
        { label: "Q3", value: String(percentile(nums, 75)) },
      ]
    : [];

  return (
    <div className="space-y-6">
      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-blue-100">Statistics</CardTitle>
          <p className="text-sm text-blue-400/70">
            Paste or type a data set — stats update live.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-blue-300">Data (comma or space separated)</Label>
            <Input
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="border-blue-900/60 bg-slate-950 font-mono text-white"
            />
          </div>
          {stats.length === 0 ? (
            <p className="text-sm text-blue-400/70">
              Enter at least one number to see statistics.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-blue-950 bg-blue-950/30 p-3"
                >
                  <p className="text-xs uppercase tracking-wider text-blue-400">
                    {s.label}
                  </p>
                  <p className="mt-1 truncate font-mono text-lg text-white">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}