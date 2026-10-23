import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}

export function Sidebar({
  groups,
  active,
  onSelect,
}: {
  groups: NavGroup[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-blue-900/50 bg-slate-950">
      <div className="border-b border-blue-900/50 px-5 py-4">
        <h1 className="font-serif text-lg font-bold text-blue-100">MathDash</h1>
        <p className="text-xs text-blue-400/70">Math workspace</p>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {groups.map((g) => (
          <div key={g.group}>
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-blue-500/70">
              {g.group}
            </p>
            <div className="space-y-1">
              {g.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                    active === item.id
                      ? "bg-blue-600 font-medium text-white shadow-sm"
                      : "text-blue-300/80 hover:bg-blue-950/60 hover:text-blue-100"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}