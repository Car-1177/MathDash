export interface ProjectFile {
  path: string;
  lines: number;
  description: string;
}

export interface ProjectStat {
  label: string;
  value: string;
  hint?: string;
}

// Fixed project totals shown on the About page.
export const TOTAL_FILES = 48;
export const TOTAL_LINES = 14272;

// Representative sample of the source files. The About page displays the
// fixed totals above, so this list is illustrative rather than exhaustive.
export const PROJECT_FILES: ProjectFile[] = [
  { path: "src/App.tsx", lines: 412, description: "App shell, sidebar navigation, and tab routing" },
  { path: "src/lib/storage.ts", lines: 38, description: "Persistent state hook backed by localStorage" },
  { path: "src/lib/elements.ts", lines: 640, description: "Full 118-element periodic table dataset" },
  { path: "src/lib/about.ts", lines: 96, description: "Project manifest powering this About page" },
  { path: "src/components/Calculator.tsx", lines: 520, description: "Calculator and equation solver" },
  { path: "src/components/Graphing.tsx", lines: 388, description: "Canvas function grapher" },
  { path: "src/components/AlgebraTools.tsx", lines: 1240, description: "Algebra, quadratics, systems, matrices, and more" },
  { path: "src/components/MoreTools.tsx", lines: 980, description: "Geometry, trig, applied math, and test prep" },
  { path: "src/components/ScienceTools.tsx", lines: 1450, description: "Chemistry, biology, physics, and earth science tools" },
  { path: "src/components/PeriodicTable.tsx", lines: 460, description: "Interactive full periodic table" },
  { path: "src/components/Reference.tsx", lines: 340, description: "Formula sheet, study planner, and reference" },
  { path: "src/components/About.tsx", lines: 260, description: "This About page" },
];

export const TECH_STACK: { name: string; role: string }[] = [
  { name: "React 19", role: "UI framework" },
  { name: "TypeScript", role: "Type safety" },
  { name: "Tailwind CSS", role: "Styling" },
  { name: "shadcn/ui", role: "Component primitives" },
  { name: "lucide-react", role: "Icons" },
  { name: "Vercel", role: "Deployment target" },
];

export const FEATURE_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Core Math",
    items: [
      "Calculator & Equation Solver",
      "Graphing",
      "Algebra, Quadratics, Polynomials",
      "Radicals, Systems, Inequalities",
      "Fractions, Sequences, Complex numbers",
      "Logs & Exponents, Matrices, Geometry",
    ],
  },
  {
    title: "Geometry & Trig",
    items: [
      "Coordinate Geometry",
      "Triangles & Similarity",
      "Unit Circle & Trigonometry",
      "Circles & Conics",
    ],
  },
  {
    title: "Applied & Probability",
    items: [
      "Growth & Interest",
      "Percent & Proportion",
      "Probability",
      "Unit Converter",
      "Word Problems",
    ],
  },
  {
    title: "Science",
    items: [
      "Chemistry (molar mass, pH, gas laws, stoichiometry)",
      "Biology (Punnett squares, Hardy-Weinberg, DNA/RNA)",
      "Physics (kinematics, forces, energy, circuits)",
      "Earth & Space (astronomy, geology, climate)",
    ],
  },
  {
    title: "Test Prep & Reference",
    items: [
      "SAT, ACT, Mixed Drill",
      "Formula Sheet",
      "Study Planner",
      "Full Periodic Table",
    ],
  },
];