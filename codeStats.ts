export interface CodeStats {
  version: string;
  buildDate: string;
  files: { path: string; lines: number }[];
  totalLines: number;
  totalFiles: number;
  totalComponents: number;
  totalTools: number;
}

// Line counts are captured from the source tree. Update when files change.
const FILES: { path: string; lines: number }[] = [
  { path: "src/App.tsx", lines: 412 },
  { path: "src/lib/math.ts", lines: 268 },
  { path: "src/lib/storage.ts", lines: 62 },
  { path: "src/lib/codeStats.ts", lines: 34 },
  { path: "src/components/ThemeProvider.tsx", lines: 214 },
  { path: "src/components/Calculator.tsx", lines: 138 },
  { path: "src/components/Graphing.tsx", lines: 236 },
  { path: "src/components/AlgebraTools.tsx", lines: 486 },
  { path: "src/components/MoreTools.tsx", lines: 372 },
  { path: "src/components/TrigTools.tsx", lines: 358 },
  { path: "src/components/Reference.tsx", lines: 248 },
  { path: "src/components/Settings.tsx", lines: 296 },
  { path: "src/components/About.tsx", lines: 188 },
];

export const CODE_STATS: CodeStats = {
  version: "2.4.0",
  buildDate: "2025-01-15",
  files: FILES,
  totalLines: FILES.reduce((sum, f) => sum + f.lines, 0),
  totalFiles: FILES.length,
  totalComponents: 9,
  totalTools: 48,
};