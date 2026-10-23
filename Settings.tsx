import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme, ACCENT_HEX } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import {
  Type,
  RotateCcw,
  Moon,
  Sun,
  Zap,
  Grid3x3,
  Palette,
  Square,
  Rows3,
  Pin,
  Save,
  Check,
} from "lucide-react";

const ACCENTS = Object.keys(ACCENT_HEX) as (keyof typeof ACCENT_HEX)[];

const DENSITIES = [
  { id: "comfortable", label: "Comfortable" },
  { id: "compact", label: "Compact" },
  { id: "spacious", label: "Spacious" },
] as const;

export function Settings() {
  const t = useTheme();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-900/50 bg-slate-900/60 px-5 py-4">
        <div>
          <p className="font-serif text-lg font-bold text-white">
            Dashboard settings
          </p>
          <p className="text-xs text-blue-400/70">
            Changes preview live. Click Save to keep them.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={t.reset}
            variant="outline"
            className="border-blue-800 bg-blue-950/40 text-blue-200 hover:bg-blue-900/50"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
          <Button
            onClick={t.save}
            disabled={!t.dirty}
            className="accent-bg text-white disabled:opacity-50"
          >
            {t.dirty ? (
              <>
                <Save className="h-4 w-4" /> Save changes
              </>
            ) : (
              <>
                <Check className="h-4 w-4" /> Saved
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-100">
            <Palette className="h-5 w-5" style={{ color: t.accentHex }} />{" "}
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-blue-200">Theme</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "dark", label: "Dark", icon: Moon },
                { id: "light", label: "Light", icon: Sun },
              ].map((opt) => {
                const Icon = opt.icon;
                const active = t.theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => t.setTheme(opt.id as "dark" | "light")}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-4 text-left transition",
                      active
                        ? "border-transparent"
                        : "border-blue-900/50 bg-blue-950/30 hover:border-blue-700"
                    )}
                    style={
                      active
                        ? {
                            backgroundColor: `${t.accentHex}22`,
                            borderColor: t.accentHex,
                          }
                        : undefined
                    }
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                      style={{
                        backgroundColor: active ? t.accentHex : "#172554",
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-blue-100">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-blue-200">Accent color</Label>
            <div className="flex flex-wrap gap-3">
              {ACCENTS.map((a) => (
                <button
                  key={a}
                  onClick={() => t.setAccent(a)}
                  title={a}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition",
                    t.accent === a
                      ? "scale-110 border-white"
                      : "border-transparent hover:scale-105"
                  )}
                >
                  <span
                    className="h-7 w-7 rounded-full"
                    style={{ backgroundColor: ACCENT_HEX[a] }}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-blue-400/60">
              Selected:{" "}
              <span className="capitalize" style={{ color: t.accentHex }}>
                {t.accent}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-100">
            <Type className="h-5 w-5" style={{ color: t.accentHex }} /> Text &
            layout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-blue-200">Font scale</Label>
              <span className="font-mono text-sm" style={{ color: t.accentHex }}>
                {t.fontScale}%
              </span>
            </div>
            <Slider
              value={[t.fontScale]}
              min={80}
              max={150}
              step={5}
              onValueChange={(v) => t.setFontScale(Array.isArray(v) ? v[0] : v)}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-blue-200">
                <Square className="h-4 w-4" style={{ color: t.accentHex }} />{" "}
                Corner radius
              </Label>
              <span className="font-mono text-sm" style={{ color: t.accentHex }}>
                {t.radius}px
              </span>
            </div>
            <Slider
              value={[t.radius]}
              min={0}
              max={24}
              step={1}
              onValueChange={(v) => t.setRadius(Array.isArray(v) ? v[0] : v)}
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-blue-200">
              <Rows3 className="h-4 w-4" style={{ color: t.accentHex }} />{" "}
              Density
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {DENSITIES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => t.setDensity(d.id)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm transition",
                    t.density === d.id
                      ? "text-white"
                      : "border-blue-900/50 bg-blue-950/30 text-blue-300 hover:border-blue-700"
                  )}
                  style={
                    t.density === d.id
                      ? {
                          backgroundColor: `${t.accentHex}33`,
                          borderColor: t.accentHex,
                        }
                      : undefined
                  }
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-100">
            <Zap className="h-5 w-5" style={{ color: t.accentHex }} /> Interface
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              icon: Pin,
              label: "Pin sidebar",
              desc: "Keep the sidebar open instead of collapsing it",
              value: t.sidebarPinned,
              set: t.setSidebarPinned,
            },
            {
              icon: Zap,
              label: "Animations",
              desc: "Motion and transitions across the dashboard",
              value: t.animations,
              set: t.setAnimations,
            },
            {
              icon: Grid3x3,
              label: "Graph grid lines",
              desc: "Show grid lines on the graphing canvas",
              value: t.gridLines,
              set: t.setGridLines,
            },
          ].map((row) => {
            const Icon = row.icon;
            return (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-xl border border-blue-950 bg-blue-950/30 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" style={{ color: t.accentHex }} />
                  <div>
                    <p className="text-sm font-medium text-blue-100">
                      {row.label}
                    </p>
                    <p className="text-xs text-blue-400/60">{row.desc}</p>
                  </div>
                </div>
                <Switch
                  checked={row.value}
                  onCheckedChange={(v) => row.set(v)}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}