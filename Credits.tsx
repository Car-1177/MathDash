import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Code, Palette, Sigma } from "lucide-react";

export function Credits() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card className="border-blue-900/50 bg-gradient-to-br from-blue-950/60 to-slate-900/60">
        <CardHeader>
          <CardTitle className="text-blue-100">Credits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-blue-600/50">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-900 text-lg font-bold text-white">
                CH
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-serif text-xl font-bold text-white">Carson Hicks</p>
              <p className="text-sm text-blue-400/70">Creator & Developer</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { icon: Code, label: "Built with React, TypeScript & Tailwind CSS" },
              { icon: Sigma, label: "MathDash — a complete math workspace" },
              { icon: Palette, label: "Dark blue theme with customizable accents" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-blue-950 bg-blue-950/30 px-4 py-3"
              >
                <Icon className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-200/80">{label}</span>
              </div>
            ))}
          </div>
          <p className="flex items-center gap-2 text-sm text-blue-400/70">
            Made with <Heart className="h-4 w-4 text-rose-400" /> for math learners everywhere.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}