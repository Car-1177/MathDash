import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";

export function Feedback() {
  const [type, setType] = useState("bug");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!title.trim() || !details.trim()) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-md">
        <Card className="border-blue-900/50 bg-slate-900/60">
          <CardContent className="space-y-4 py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/20">
              <Check className="h-7 w-7 text-emerald-400" />
            </div>
            <p className="font-serif text-xl font-bold text-white">Thanks!</p>
            <p className="text-sm text-blue-400/70">
              Your {type} report has been recorded locally.
            </p>
            <Button
              onClick={() => {
                setSent(false);
                setTitle("");
                setDetails("");
              }}
              variant="outline"
              className="border-blue-800 text-blue-200"
            >
              Submit another
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-blue-100">Bugs & Feedback</CardTitle>
          <p className="text-sm text-blue-400/70">
            Report a bug or share an idea to improve MathDash.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-blue-300">Type</Label>
            <div className="grid grid-cols-3 gap-2">
              {["bug", "idea", "other"].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={
                    "rounded-lg border px-3 py-2 text-sm capitalize transition " +
                    (type === t
                      ? "border-blue-500 bg-blue-600/25 text-white"
                      : "border-blue-900/50 bg-blue-950/30 text-blue-300 hover:border-blue-700")
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-blue-300">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short summary"
              className="border-blue-900/60 bg-slate-950 text-white"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-blue-300">Details</Label>
            <Textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe what happened..."
              rows={5}
              className="border-blue-900/60 bg-slate-950 text-white"
            />
          </div>
          <Button onClick={submit} className="bg-blue-600 hover:bg-blue-500">
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}