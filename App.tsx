import { useMemo, useState } from "react";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { Home } from "@/components/Home";
import { Calculator } from "@/components/Calculator";
import { Graphing } from "@/components/Graphing";
import { AlgebraTools } from "@/components/AlgebraTools";
import { GeometryTools } from "@/components/GeometryTools";
import { AppliedTools } from "@/components/AppliedTools";
import { TestPrep } from "@/components/TestPrep";
import { Reference } from "@/components/Reference";
import { Settings } from "@/components/Settings";
import { Credits } from "@/components/Credits";
import { Feedback } from "@/components/Feedback";
import { WordProblemSolver } from "@/components/WordProblemSolver";
import { About } from "@/components/About";
import { RecommendedTools } from "@/components/RecommendedTools";
import { AdvancedMath } from "@/components/AdvancedMath";
import { TriangleSolver } from "@/components/TriangleSolver";
import { RadicalSimplifier } from "@/components/RadicalSimplifier";
import { Algebra2Tools } from "@/components/Algebra2Tools";
import { TrigTools } from "@/components/TrigTools";
import { CalculusTools } from "@/components/CalculusTools";
import { ScienceHome } from "@/components/ScienceHome";
import { ScienceAbout } from "@/components/ScienceAbout";
import { ScienceTools } from "@/components/ScienceTools";
import { ScienceSidebar } from "@/components/ScienceSidebar";
import { SCIENCE_GROUPS, SCIENCE_TOOL_COUNT } from "@/lib/scienceTools";
import { cn } from "@/lib/utils";
import {
  Calculator as CalcIcon,
  Sigma,
  Shapes,
  Briefcase,
  GraduationCap,
  BookOpen,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  Sun,
  Moon,
  X,
  User,
  Wrench,
  Search,
  Home as HomeIcon,
  Sparkles,
  Brain,
  TrendingUp,
  Infinity as InfinityIcon,
  Waves,
  FlaskConical,
} from "lucide-react";

interface Tool {
  id: string;
  label: string;
  short: string;
}
interface Group {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tools: Tool[];
}

const GROUPS: Group[] = [
  { name: "Home", icon: HomeIcon, tools: [{ id: "home", label: "Home", short: "Ho" }] },
  {
    name: "Core",
    icon: CalcIcon,
    tools: [
      { id: "calculator", label: "Calculator", short: "Ca" },
      { id: "solver", label: "Equation Solver", short: "Eq" },
      { id: "graphing", label: "Graphing", short: "Gr" },
    ],
  },
  {
    name: "Algebra",
    icon: Sigma,
    tools: [
      { id: "algebra", label: "Algebra", short: "Al" },
      { id: "quadratics", label: "Quadratics", short: "Qu" },
      { id: "polynomials", label: "Polynomials", short: "Po" },
      { id: "radicals", label: "Radicals", short: "Ra" },
      { id: "radicalsimplifier", label: "Radical Simplifier", short: "Rs" },
      { id: "systems", label: "Systems", short: "Sy" },
      { id: "inequalities", label: "Inequalities", short: "In" },
      { id: "fractions", label: "Fractions", short: "Fr" },
      { id: "sequences", label: "Sequences", short: "Se" },
      { id: "complex", label: "Complex", short: "Co" },
      { id: "logs", label: "Logs & Exponents", short: "Lo" },
      { id: "matrices", label: "Matrices", short: "Ma" },
      { id: "geometry", label: "Geometry", short: "Ge" },
    ],
  },
  {
    name: "Geometry & Trig",
    icon: Shapes,
    tools: [
      { id: "coordinate", label: "Coordinate Geometry", short: "Cd" },
      { id: "triangles", label: "Triangles", short: "Tr" },
      { id: "trianglesolver", label: "Triangle Solver", short: "Ts" },
      { id: "similarity", label: "Similarity", short: "Si" },
      { id: "unitcircle", label: "Unit Circle", short: "UC" },
      { id: "trigonometry", label: "Trigonometry", short: "Tg" },
      { id: "conics", label: "Circles & Conics", short: "Cn" },
    ],
  },
  {
    name: "Applied",
    icon: Briefcase,
    tools: [
      { id: "growth", label: "Growth & Interest", short: "Gi" },
      { id: "percent", label: "Percent & Proportion", short: "Pc" },
      { id: "probability", label: "Probability", short: "Pr" },
      { id: "converter", label: "Unit Converter", short: "Un" },
      { id: "wordproblems", label: "Word Problems", short: "Wp" },
      { id: "wordsolver", label: "Word Problem Solver", short: "Ws" },
    ],
  },
  {
    name: "Advanced",
    icon: Sparkles,
    tools: [
      { id: "calculus", label: "Derivative & Integral", short: "Dx" },
      { id: "transformations", label: "Transformations Lab", short: "Tf" },
      { id: "rearranger", label: "Formula Rearranger", short: "Rr" },
      { id: "distribution", label: "Distribution Explorer", short: "Di" },
      { id: "unitcirclesprint", label: "Unit Circle Sprint", short: "Us" },
    ],
  },
  {
    name: "Algebra 2",
    icon: Brain,
    tools: [
      { id: "rational", label: "Rational Expressions", short: "Rx" },
      { id: "composition", label: "Composition & Inverse", short: "Ci" },
      { id: "logsolve", label: "Log Equation Solver", short: "Ls" },
      { id: "exponential", label: "Exponential Modeler", short: "Ex" },
      { id: "conics2", label: "Conic Identifier", short: "Cn" },
      { id: "matrixops", label: "Matrix Operations", short: "Mo" },
    ],
  },
  {
    name: "Pre-Calculus",
    icon: TrendingUp,
    tools: [
      { id: "sequenceseries", label: "Sequence & Series", short: "Ss" },
      { id: "polar", label: "Polar & Parametric", short: "Pp" },
    ],
  },
  {
    name: "Calculus",
    icon: InfinityIcon,
    tools: [
      { id: "limits", label: "Limit Calculator", short: "Li" },
      { id: "riemann", label: "Riemann Sums", short: "Rs" },
      { id: "derivative", label: "Derivative Rules", short: "Dv" },
      { id: "integral", label: "Integral Approximation", short: "Ia" },
      { id: "tangent", label: "Tangent Line", short: "Tl" },
      { id: "optimization", label: "Optimization", short: "Op" },
    ],
  },
  {
    name: "Trigonometry",
    icon: Waves,
    tools: [
      { id: "identity", label: "Identity Verifier", short: "Iv" },
      { id: "lawofsines", label: "Law of Sines & Cosines", short: "Ls" },
      { id: "trigeq", label: "Trig Equation Solver", short: "Te" },
      { id: "unitcircle2", label: "Unit Circle Explorer", short: "Ue" },
      { id: "graphingtrig", label: "Trig Grapher", short: "Tg" },
    ],
  },
  {
    name: "Test Prep",
    icon: GraduationCap,
    tools: [
      { id: "sat", label: "SAT", short: "SA" },
      { id: "act", label: "ACT", short: "AC" },
      { id: "psat", label: "PSAT", short: "PS" },
      { id: "drill", label: "Mixed Drill", short: "MD" },
    ],
  },
  {
    name: "Reference",
    icon: BookOpen,
    tools: [
      { id: "formulas", label: "Formula Sheet", short: "Fs" },
      { id: "planner", label: "Study Planner", short: "Sp" },
      { id: "reference", label: "Reference", short: "Re" },
    ],
  },
  {
    name: "Support",
    icon: Wrench,
    tools: [
      { id: "settings", label: "Settings", short: "St" },
      { id: "feedback", label: "Bugs & Feedback", short: "Fb" },
      { id: "about", label: "About Us", short: "Ab" },
      { id: "credits", label: "Credits", short: "Cr" },
    ],
  },
];

const ALL_TOOLS = GROUPS.flatMap((g) => g.tools);
const TOOL_COUNT = ALL_TOOLS.length;

function renderMathTool(tool: string, navigate: (id: string) => void) {
  switch (tool) {
    case "home":
      return <Home onNavigate={navigate} toolCount={TOOL_COUNT} />;
    case "calculator":
    case "solver":
      return <Calculator tool={tool} />;
    case "graphing":
      return <Graphing />;
    case "radicalsimplifier":
      return <RadicalSimplifier />;
    case "algebra":
    case "quadratics":
    case "polynomials":
    case "radicals":
    case "systems":
    case "inequalities":
    case "fractions":
    case "sequences":
    case "complex":
    case "logs":
    case "matrices":
    case "geometry":
      return <AlgebraTools tool={tool} />;
    case "coordinate":
    case "triangles":
    case "unitcircle":
    case "trigonometry":
    case "conics":
      return <GeometryTools tool={tool} />;
    case "trianglesolver":
    case "similarity":
      return <TriangleSolver tool={tool} />;
    case "growth":
    case "percent":
    case "probability":
    case "converter":
    case "wordproblems":
      return <AppliedTools tool={tool} />;
    case "wordsolver":
      return <WordProblemSolver />;
    case "calculus":
    case "transformations":
    case "rearranger":
    case "distribution":
    case "unitcirclesprint":
      return <RecommendedTools tool={tool} />;
    case "rational":
    case "composition":
    case "logsolve":
    case "exponential":
    case "conics2":
    case "matrixops":
      return <Algebra2Tools tool={tool} />;
    case "sequenceseries":
    case "polar":
      return <AdvancedMath tool={tool} />;
    case "limits":
    case "riemann":
    case "derivative":
    case "integral":
    case "tangent":
    case "optimization":
      return <CalculusTools tool={tool} />;
    case "identity":
    case "lawofsines":
    case "trigeq":
    case "unitcircle2":
    case "graphingtrig":
      return <TrigTools tool={tool} />;
    case "sat":
    case "act":
    case "psat":
    case "drill":
      return <TestPrep tool={tool} />;
    case "formulas":
    case "planner":
    case "reference":
      return <Reference tool={tool} />;
    case "settings":
      return <Settings />;
    case "feedback":
      return <Feedback />;
    case "about":
      return <About />;
    case "credits":
      return <Credits />;
    default:
      return null;
  }
}

function renderScienceTool(tool: string, navigate: (id: string) => void) {
  switch (tool) {
    case "sci-home":
      return <ScienceHome onNavigate={navigate} toolCount={SCIENCE_TOOL_COUNT} />;
    case "sci-about":
      return <ScienceAbout />;
    default:
      return <ScienceTools tool={tool} />;
  }
}

function MathSidebar({
  collapsed,
  mobile,
  active,
  select,
  openGroups,
  toggleGroup,
  theme,
  toggle,
  closeMobile,
}: {
  collapsed: boolean;
  mobile?: boolean;
  active: string;
  select: (id: string) => void;
  openGroups: Record<string, boolean>;
  toggleGroup: (name: string) => void;
  theme: string;
  toggle: () => void;
  closeMobile: () => void;
}) {
  const { accentHex } = useTheme();
  const showText = !collapsed || mobile;
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-blue-900/50 bg-gradient-to-br from-blue-950/60 to-slate-900/40 px-4 py-4">
        <button
          onClick={() => select("home")}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-lg"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${accentHex}, #1e3a8a)`,
            }}
          >
            <Sigma className="h-5 w-5 text-white" />
          </div>
          {showText && (
            <div className="min-w-0">
              <p className="truncate font-serif text-lg font-bold text-white">
                MathDash
              </p>
              <p className="truncate text-xs text-blue-400/70">
                Complete math suite
              </p>
            </div>
          )}
        </button>
        {mobile && (
          <button
            onClick={closeMobile}
            className="text-blue-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
        {GROUPS.map((g) => {
          const Icon = g.icon;
          const open = openGroups[g.name];
          return (
            <div key={g.name}>
              <button
                onClick={() => toggleGroup(g.name)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold uppercase tracking-wider text-blue-400/80 transition hover:bg-blue-900/40 hover:text-blue-200",
                  !showText && "justify-center"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {showText && (
                  <>
                    <span className="flex-1 text-left">{g.name}</span>
                    <span className="text-blue-500">{open ? "−" : "+"}</span>
                  </>
                )}
              </button>
              {open && (
                <div className="mt-1 space-y-0.5">
                  {g.tools.map((t) => {
                    const isActive = active === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => select(t.id)}
                        title={t.label}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm transition",
                          !showText ? "justify-center" : "pl-8",
                          isActive
                            ? "font-medium text-white"
                            : "text-blue-300/80 hover:bg-blue-900/40 hover:text-white"
                        )}
                        style={
                          isActive
                            ? { backgroundColor: `${accentHex}33` }
                            : undefined
                        }
                      >
                        {!showText ? (
                          <span className="text-xs font-bold">{t.short}</span>
                        ) : (
                          <span className="truncate">{t.label}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-blue-900/50 p-2">
        <button
          onClick={() => select("credits")}
          className={cn(
            "mb-1 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-blue-300/80 transition hover:bg-blue-900/40 hover:text-white",
            !showText && "justify-center"
          )}
          title="Credits — Carson Hicks"
        >
          <User className="h-4 w-4 shrink-0" />
          {showText && (
            <span className="truncate">
              by <span className="font-semibold text-blue-200">Carson Hicks</span>
            </span>
          )}
        </button>
        <button
          onClick={toggle}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-blue-300/80 transition hover:bg-blue-900/40 hover:text-white",
            !showText && "justify-center"
          )}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 shrink-0" />
          ) : (
            <Moon className="h-4 w-4 shrink-0" />
          )}
          {showText && (
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          )}
        </button>
      </div>
    </div>
  );
}

function ScienceSidebarShell({
  collapsed,
  mobile,
  active,
  select,
  openGroups,
  toggleGroup,
  theme,
  toggle,
  closeMobile,
  onSwitch,
}: {
  collapsed: boolean;
  mobile?: boolean;
  active: string;
  select: (id: string) => void;
  openGroups: Record<string, boolean>;
  toggleGroup: (name: string) => void;
  theme: string;
  toggle: () => void;
  closeMobile: () => void;
  onSwitch: () => void;
}) {
  const showText = !collapsed || mobile;
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-cyan-900/50 bg-gradient-to-br from-cyan-950/60 to-slate-900/40 px-4 py-4">
        <button
          onClick={() => select("sci-home")}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-900 shadow-lg">
            <FlaskConical className="h-5 w-5 text-white" />
          </div>
          {showText && (
            <div className="min-w-0">
              <p className="truncate font-serif text-lg font-bold text-white">
                ScienceDash
              </p>
              <p className="truncate text-xs text-cyan-400/70">
                Complete science suite
              </p>
            </div>
          )}
        </button>
        {mobile && (
          <button
            onClick={closeMobile}
            className="text-cyan-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        <ScienceSidebar
          active={active}
          onSelect={select}
          openGroups={openGroups}
          toggleGroup={toggleGroup}
        />
      </div>

      <div className="border-t border-cyan-900/50 p-2">
        <button
          onClick={onSwitch}
          className={cn(
            "mb-1 flex w-full items-center gap-2 rounded-lg border border-blue-500/40 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 px-2 py-2 text-sm font-semibold text-blue-100 transition hover:from-blue-600/50 hover:to-cyan-600/50",
            !showText && "justify-center"
          )}
          title="Switch to Math"
        >
          <Sigma className="h-4 w-4 shrink-0" />
          {showText && <span className="truncate">Switch to Math</span>}
        </button>
        <button
          onClick={toggle}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-cyan-300/80 transition hover:bg-cyan-900/40 hover:text-white",
            !showText && "justify-center"
          )}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 shrink-0" />
          ) : (
            <Moon className="h-4 w-4 shrink-0" />
          )}
          {showText && (
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          )}
        </button>
      </div>
    </div>
  );
}

function Shell() {
  const { theme, toggle, accentHex, spaceScale } = useTheme();
  const [mode, setMode] = useState<"math" | "science">("math");
  const [active, setActive] = useState("home");
  const [sciActive, setSciActive] = useState("sci-home");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(GROUPS.map((g) => [g.name, true]))
  );
  const [sciOpenGroups, setSciOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(SCIENCE_GROUPS.map((g) => [g.name, true]))
  );

  const isMath = mode === "math";

  const activeLabel = isMath
    ? ALL_TOOLS.find((t) => t.id === active)?.label ?? ""
    : SCIENCE_GROUPS.flatMap((g) => g.tools).find((t) => t.id === sciActive)
        ?.label ?? "";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const pool = isMath ? ALL_TOOLS : SCIENCE_GROUPS.flatMap((g) => g.tools);
    return pool.filter(
      (t) =>
        t.label.toLowerCase().includes(q) || t.short.toLowerCase().includes(q)
    );
  }, [query, isMath]);

  const select = (id: string) => {
    if (isMath) setActive(id);
    else setSciActive(id);
    setMobileOpen(false);
    setQuery("");
  };
  const toggleGroup = (name: string) =>
    setOpenGroups((o) => ({ ...o, [name]: !o[name] }));
  const toggleSciGroup = (name: string) =>
    setSciOpenGroups((o) => ({ ...o, [name]: !o[name] }));

  const switchMode = (next: "math" | "science") => {
    setMode(next);
    setQuery("");
    setMobileOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950 text-white">
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-r bg-slate-900/70 backdrop-blur transition-all duration-200 lg:block",
          isMath ? "border-blue-900/50" : "border-cyan-900/50",
          collapsed ? "w-20" : "w-72"
        )}
      >
        {isMath ? (
          <MathSidebar
            collapsed={collapsed}
            active={active}
            select={select}
            openGroups={openGroups}
            toggleGroup={toggleGroup}
            theme={theme}
            toggle={toggle}
            closeMobile={() => setMobileOpen(false)}
          />
        ) : (
          <ScienceSidebarShell
            collapsed={collapsed}
            active={sciActive}
            select={select}
            openGroups={sciOpenGroups}
            toggleGroup={toggleSciGroup}
            theme={theme}
            toggle={toggle}
            closeMobile={() => setMobileOpen(false)}
            onSwitch={() => switchMode("math")}
          />
        )}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-72 border-r bg-slate-900",
              isMath ? "border-blue-900/50" : "border-cyan-900/50"
            )}
          >
            {isMath ? (
              <MathSidebar
                collapsed={false}
                mobile
                active={active}
                select={select}
                openGroups={openGroups}
                toggleGroup={toggleGroup}
                theme={theme}
                toggle={toggle}
                closeMobile={() => setMobileOpen(false)}
              />
            ) : (
              <ScienceSidebarShell
                collapsed={false}
                mobile
                active={sciActive}
                select={select}
                openGroups={sciOpenGroups}
                toggleGroup={toggleSciGroup}
                theme={theme}
                toggle={toggle}
                closeMobile={() => setMobileOpen(false)}
                onSwitch={() => switchMode("math")}
              />
            )}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className={cn(
            "sticky top-0 z-30 border-b bg-slate-950/70 px-4 py-3 backdrop-blur sm:px-6",
            isMath ? "border-blue-900/50" : "border-cyan-900/50"
          )}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className={cn(
                "hover:text-white lg:hidden",
                isMath ? "text-blue-300" : "text-cyan-300"
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCollapsed((c) => !c)}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={cn(
                "hidden hover:text-white lg:block",
                isMath ? "text-blue-300" : "text-cyan-300"
              )}
            >
              {collapsed ? (
                <PanelLeftOpen className="h-5 w-5" />
              ) : (
                <PanelLeftClose className="h-5 w-5" />
              )}
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-serif text-xl font-bold text-white">
                {activeLabel}
              </h1>
              <button
                onClick={() => select(isMath ? "credits" : "sci-about")}
                className={cn(
                  "truncate text-xs transition",
                  isMath
                    ? "text-blue-400/70 hover:text-blue-300"
                    : "text-cyan-400/70 hover:text-cyan-300"
                )}
              >
                {isMath ? "by Carson Hicks" : "Science workspace"}
              </button>
            </div>

            <button
              onClick={() => switchMode(isMath ? "science" : "math")}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
                isMath
                  ? "border-cyan-500/60 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 text-cyan-100 hover:from-cyan-600/50 hover:to-blue-600/50"
                  : "border-blue-500/60 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-100 hover:from-blue-600/50 hover:to-cyan-600/50"
              )}
            >
              {isMath ? (
                <>
                  <FlaskConical className="h-4 w-4" />
                  <span className="hidden sm:inline">Switch to Science</span>
                  <span className="sm:hidden">Science</span>
                </>
              ) : (
                <>
                  <Sigma className="h-4 w-4" />
                  <span className="hidden sm:inline">Switch to Math</span>
                  <span className="sm:hidden">Math</span>
                </>
              )}
            </button>

            <div
              className={cn(
                "hidden items-center gap-2 rounded-full border px-3 py-1.5 sm:flex",
                isMath
                  ? "border-blue-900/50 bg-blue-950/40"
                  : "border-cyan-900/50 bg-cyan-950/40"
              )}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: isMath ? accentHex : "#06b6d4" }}
              />
              <span
                className={cn(
                  "text-xs",
                  isMath ? "text-blue-300/80" : "text-cyan-300/80"
                )}
              >
                {isMath ? TOOL_COUNT : SCIENCE_TOOL_COUNT} tools
              </span>
            </div>
          </div>

          <div className="relative mt-3">
            <Search
              className={cn(
                "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
                isMath ? "text-blue-400/60" : "text-cyan-400/60"
              )}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isMath
                  ? "Search math tools… (e.g. limits, polar, PSAT)"
                  : "Search science tools… (e.g. molar mass, pH, circuits)"
              }
              className={cn(
                "w-full rounded-xl border py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-blue-400/50 focus:outline-none",
                isMath
                  ? "border-blue-900/50 bg-blue-950/30 focus:border-blue-600"
                  : "border-cyan-900/50 bg-cyan-950/30 placeholder:text-cyan-400/50 focus:border-cyan-600"
              )}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 hover:text-white",
                  isMath ? "text-blue-400" : "text-cyan-400"
                )}
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {query && (
              <div
                className={cn(
                  "absolute left-0 right-0 top-full z-40 mt-2 max-h-80 overflow-y-auto rounded-xl border bg-slate-900 shadow-xl",
                  isMath
                    ? "border-blue-900/50 shadow-blue-950/50"
                    : "border-cyan-900/50 shadow-cyan-950/50"
                )}
              >
                {results.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-blue-400/70">
                    No tools match "{query}".
                  </p>
                ) : (
                  results.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => select(t.id)}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition",
                        isMath
                          ? "text-blue-200 hover:bg-blue-900/50"
                          : "text-cyan-200 hover:bg-cyan-900/50"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold",
                          isMath
                            ? "bg-blue-950 text-blue-300"
                            : "bg-cyan-950 text-cyan-300"
                        )}
                      >
                        {t.short}
                      </span>
                      {t.label}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1" style={{ padding: `${1.5 * spaceScale}rem` }}>
          <div className="mx-auto max-w-5xl">
            {isMath
              ? renderMathTool(active, select)
              : renderScienceTool(sciActive, select)}
          </div>
        </main>

        <footer
          className={cn(
            "border-t px-4 py-4 text-center text-xs sm:px-6",
            isMath
              ? "border-blue-900/50 text-blue-400/60"
              : "border-cyan-900/50 text-cyan-400/60"
          )}
        >
          {isMath ? (
            <>
              MathDash — built by{" "}
              <span className="font-semibold text-blue-300">Carson Hicks</span> ·{" "}
              {TOOL_COUNT} tools · runs entirely in your browser
            </>
          ) : (
            <>
              ScienceDash — built by{" "}
              <span className="font-semibold text-cyan-300">Carson Hicks</span> ·{" "}
              {SCIENCE_TOOL_COUNT} tools · runs entirely in your browser
            </>
          )}
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  );
}