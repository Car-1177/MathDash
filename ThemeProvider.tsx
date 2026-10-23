import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { loadValue, saveValue } from "@/lib/storage";

export type Accent =
  | "blue"
  | "cyan"
  | "indigo"
  | "teal"
  | "violet"
  | "emerald"
  | "amber"
  | "rose";
export type Density = "comfortable" | "compact" | "spacious";

export const ACCENT_HEX: Record<Accent, string> = {
  blue: "#3b82f6",
  cyan: "#06b6d4",
  indigo: "#6366f1",
  teal: "#14b8a6",
  violet: "#8b5cf6",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
};

export const ACCENT_LABELS: Record<Accent, string> = {
  blue: "Blue",
  cyan: "Cyan",
  indigo: "Indigo",
  teal: "Teal",
  violet: "Violet",
  emerald: "Emerald",
  amber: "Amber",
  rose: "Rose",
};

interface ThemeCtx {
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
  toggle: () => void;
  accent: Accent;
  setAccent: (a: Accent) => void;
  accentHex: string;
  accents: Record<Accent, { hex: string; label: string }>;
  fontScale: number;
  setFontScale: (n: number) => void;
  radius: number;
  setRadius: (n: number) => void;
  density: Density;
  setDensity: (d: Density) => void;
  sidebarPinned: boolean;
  setSidebarPinned: (v: boolean) => void;
  animations: boolean;
  setAnimations: (v: boolean) => void;
  gridLines: boolean;
  setGridLines: (v: boolean) => void;
  spaceScale: number;
  setSpaceScale: (n: number) => void;
  dirty: boolean;
  save: () => void;
  reset: () => void;
}

const DEFAULTS = {
  theme: "dark" as const,
  accent: "blue" as Accent,
  fontScale: 100,
  radius: 12,
  density: "comfortable" as Density,
  sidebarPinned: true,
  animations: true,
  gridLines: true,
  spaceScale: 1,
};

const STORAGE_KEY = "settings";

const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(() =>
    loadValue(STORAGE_KEY, DEFAULTS)
  );

  const {
    theme,
    accent,
    fontScale,
    radius,
    density,
    sidebarPinned,
    animations,
    gridLines,
    spaceScale,
  } = settings;

  const update = <K extends keyof typeof DEFAULTS>(
    key: K,
    value: (typeof DEFAULTS)[K]
  ) => setSettings((s) => ({ ...s, [key]: value }));

  const current = settings;

  const dirty = useMemo(
    () => JSON.stringify(current) !== JSON.stringify(settings),
    [current, settings]
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.setProperty("--accent", ACCENT_HEX[accent]);
    root.style.setProperty("--accent-soft", "#1e3a8a");
    root.style.setProperty("--radius", `${radius}px`);
    root.style.setProperty("--space-scale", String(spaceScale));
    root.style.fontSize = `${fontScale}%`;
    root.dataset.animations = animations ? "on" : "off";
    root.dataset.density = density;
  }, [theme, accent, radius, spaceScale, fontScale, animations, density]);

  // Persist settings on every change.
  useEffect(() => {
    saveValue(STORAGE_KEY, settings);
  }, [settings]);

  const accents = useMemo(
    () =>
      (Object.keys(ACCENT_HEX) as Accent[]).reduce(
        (acc, key) => {
          acc[key] = { hex: ACCENT_HEX[key], label: ACCENT_LABELS[key] };
          return acc;
        },
        {} as Record<Accent, { hex: string; label: string }>
      ),
    []
  );

  const value = useMemo<ThemeCtx>(
    () => ({
      theme,
      setTheme: (t) => update("theme", t),
      toggle: () => update("theme", theme === "dark" ? "light" : "dark"),
      accent,
      setAccent: (a) => update("accent", a),
      accentHex: ACCENT_HEX[accent],
      accents,
      fontScale,
      setFontScale: (n) => update("fontScale", n),
      radius,
      setRadius: (n) => update("radius", n),
      density,
      setDensity: (d) => update("density", d),
      sidebarPinned,
      setSidebarPinned: (v) => update("sidebarPinned", v),
      animations,
      setAnimations: (v) => update("animations", v),
      gridLines,
      setGridLines: (v) => update("gridLines", v),
      spaceScale,
      setSpaceScale: (n) => update("spaceScale", n),
      dirty,
      save: () => saveValue(STORAGE_KEY, settings),
      reset: () => setSettings(DEFAULTS),
    }),
    [
      theme,
      accent,
      accents,
      fontScale,
      radius,
      density,
      sidebarPinned,
      animations,
      gridLines,
      spaceScale,
      dirty,
      settings,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}