import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { compileFn } from "@/lib/math";
import { usePersistentState } from "@/lib/storage";
import { Plus, Trash2, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface Fn {
  id: number;
  expr: string;
  color: string;
}

const COLORS = ["#3b82f6", "#22d3ee", "#a78bfa", "#f472b6", "#34d399", "#fbbf24"];

export function Graphing() {
  const { gridLines, accentHex } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fns, setFns] = usePersistentState<Fn[]>("graph.fns", [
    { id: 1, expr: "sin(x)", color: COLORS[0] },
    { id: 2, expr: "x^2 / 4 - 2", color: COLORS[1] },
  ]);
  const [zoom, setZoom] = usePersistentState("graph.zoom", 40);
  const [pan, setPan] = usePersistentState("graph.pan", { x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2 + pan.x;
    const cy = h / 2 + pan.y;
    const toY = (y: number) => cy - y * zoom;

    if (gridLines) {
      ctx.strokeStyle = "rgba(59,130,246,0.12)";
      ctx.lineWidth = 1;
      for (let x = cx % zoom; x < w; x += zoom) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = cy % zoom; y < h; y += zoom) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    ctx.strokeStyle = "rgba(148,163,184,0.6)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, h);
    ctx.stroke();

    fns.forEach((f) => {
      const fn = compileFn(f.expr);
      if (!fn) return;
      ctx.strokeStyle = f.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      let started = false;
      for (let px = 0; px <= w; px += 1) {
        const x = (px - cx) / zoom;
        const y = fn(x);
        if (!isFinite(y)) {
          started = false;
          continue;
        }
        const py = toY(y);
        if (py < -h || py > h * 2) {
          started = false;
          continue;
        }
        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
    });
  }, [fns, zoom, gridLines, pan]);

  const addFn = () =>
    setFns((f) => [
      ...f,
      { id: Date.now(), expr: "", color: COLORS[f.length % COLORS.length] },
    ]);
  const update = (id: number, expr: string) =>
    setFns((f) => f.map((x) => (x.id === id ? { ...x, expr } : x)));
  const remove = (id: number) => setFns((f) => f.filter((x) => x.id !== id));

  return (
    <div className="space-y-6">
      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-blue-100">Functions</CardTitle>
          <p className="text-sm text-blue-400/70">
            Drag the graph to pan. Use the buttons to zoom. Your functions are
            saved automatically.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {fns.map((f) => (
            <div key={f.id} className="flex items-center gap-3">
              <span
                className="h-4 w-4 shrink-0 rounded-full"
                style={{ backgroundColor: f.color }}
              />
              <span className="text-sm text-blue-400/70">y =</span>
              <Input
                value={f.expr}
                onChange={(e) => update(f.id, e.target.value)}
                placeholder="e.g. sin(x), x^2 - 3"
                className="border-blue-900/60 bg-slate-950 font-mono text-white"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => remove(f.id)}
                className="text-blue-400 hover:text-rose-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={addFn}
              variant="outline"
              className="border-blue-800 bg-blue-950/40 text-blue-200 hover:bg-blue-900/50"
            >
              <Plus className="h-4 w-4" /> Add function
            </Button>
            <Button
              onClick={() => setZoom((z) => Math.min(z * 1.25, 400))}
              variant="outline"
              className="border-blue-800 bg-blue-950/40 text-blue-200 hover:bg-blue-900/50"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setZoom((z) => Math.max(z / 1.25, 4))}
              variant="outline"
              className="border-blue-800 bg-blue-950/40 text-blue-200 hover:bg-blue-900/50"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                setZoom(40);
                setPan({ x: 0, y: 0 });
              }}
              variant="outline"
              className="border-blue-800 bg-blue-950/40 text-blue-200 hover:bg-blue-900/50"
            >
              <RotateCcw className="h-4 w-4" /> Reset view
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-900/50 bg-slate-900/60">
        <CardContent className="p-0">
          <canvas
            ref={canvasRef}
            className="h-96 w-full cursor-grab rounded-xl active:cursor-grabbing"
            style={{ backgroundColor: "rgba(2,6,23,0.6)" }}
            onMouseDown={(e) => {
              dragRef.current = {
                x: e.clientX - pan.x,
                y: e.clientY - pan.y,
              };
            }}
            onMouseMove={(e) => {
              if (dragRef.current) {
                setPan({
                  x: e.clientX - dragRef.current.x,
                  y: e.clientY - dragRef.current.y,
                });
              }
            }}
            onMouseUp={() => (dragRef.current = null)}
            onMouseLeave={() => (dragRef.current = null)}
          />
        </CardContent>
      </Card>
      <p className="text-center text-xs text-blue-400/60">
        Grid lines {gridLines ? "on" : "off"} · accent{" "}
        <span style={{ color: accentHex }}>{accentHex}</span>
      </p>
    </div>
  );
}