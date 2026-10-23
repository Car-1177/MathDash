import { cn } from "@/lib/utils";
import { SCIENCE_GROUPS } from "@/lib/scienceTools";
import {
  FlaskConical,
  Dna,
  Atom,
  Globe2,
  Beaker,
  Home as HomeIcon,
  Wrench,
} from "lucide-react";

const GROUP_ICONS: Record<string, React.ReactNode> = {
  Home: <HomeIcon className="h-4 w-4" />,
  Chemistry: <FlaskConical className="h-4 w-4" />,
  Biology: <Dna className="h-4 w-4" />,
  Physics: <Atom className="h-4 w-4" />,
  "Earth & Space": <Globe2 className="h-4 w-4" />,
  "Lab & Reference": <Beaker className="h-4 w-4" />,
  Support: <Wrench className="h-4 w-4" />,
};

export function ScienceSidebar({
  active,
  onSelect,
  openGroups,
  toggleGroup,
}: {
  active: string;
  onSelect: (id: string) => void;
  openGroups: Record<string, boolean>;
  toggleGroup: (name: string) => void;
}) {
  return (
    <nav className="space-y-1">
      {SCIENCE_GROUPS.map((g) => {
        const open = openGroups[g.name];
        return (
          <div key={g.name}>
            <button
              onClick={() => toggleGroup(g.name)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-400/80 transition hover:bg-cyan-900/40 hover:text-cyan-200"
            >
              {GROUP_ICONS[g.name]}
              <span className="flex-1 text-left">{g.name}</span>
              <span className="text-cyan-500">{open ? "−" : "+"}</span>
            </button>
            {open && (
              <div className="mt-1 space-y-0.5">
                {g.tools.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onSelect(t.id)}
                    className={cn(
                      "w-full rounded-lg py-2 pl-8 pr-2 text-left text-sm transition",
                      active === t.id
                        ? "bg-cyan-600/25 font-medium text-cyan-100 ring-1 ring-cyan-700/50"
                        : "text-cyan-300/70 hover:bg-cyan-950/40 hover:text-cyan-100"
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}