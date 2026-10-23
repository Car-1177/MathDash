export function safeEval(expr: string, scope: Record<string, number> = {}): number {
  const cleaned = expr
    .replace(/\^/g, "**")
    .replace(/π/g, "(Math.PI)")
    .replace(/√/g, "Math.sqrt")
    .replace(/\bln\b/g, "Math.log")
    .replace(/\blog\b/g, "Math.log10")
    .replace(/\bsin\b/g, "Math.sin")
    .replace(/\bcos\b/g, "Math.cos")
    .replace(/\btan\b/g, "Math.tan")
    .replace(/\basin\b/g, "Math.asin")
    .replace(/\bacos\b/g, "Math.acos")
    .replace(/\batan\b/g, "Math.atan")
    .replace(/\babs\b/g, "Math.abs")
    .replace(/\bsqrt\b/g, "Math.sqrt")
    .replace(/\be\b/g, "Math.E");

  const keys = Object.keys(scope);
  const vals = keys.map((k) => scope[k]);
  const fn = new Function(...keys, `"use strict"; return (${cleaned});`);
  const result = fn(...vals);
  if (typeof result !== "number" || !isFinite(result)) {
    throw new Error("Invalid result");
  }
  return result;
}

export function fmt(n: number, digits = 6): string {
  if (!isFinite(n)) return "undefined";
  if (Number.isInteger(n)) return String(n);
  return String(Number(n.toFixed(digits)));
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export function simplifyFraction(num: number, den: number): [number, number] {
  if (den === 0) return [num, 0];
  const g = gcd(num, den) || 1;
  let n = num / g;
  let d = den / g;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  return [n, d];
}

export function solveQuadratic(a: number, b: number, c: number) {
  const disc = b * b - 4 * a * c;
  if (disc > 0) {
    return {
      type: "two" as const,
      roots: [(-b + Math.sqrt(disc)) / (2 * a), (-b - Math.sqrt(disc)) / (2 * a)],
      disc,
    };
  }
  if (disc === 0) return { type: "one" as const, roots: [-b / (2 * a)], disc };
  return {
    type: "complex" as const,
    roots: [-b / (2 * a), Math.sqrt(-disc) / (2 * a)],
    disc,
  };
}

export function solveLinearSystem(
  a1: number, b1: number, c1: number,
  a2: number, b2: number, c2: number
) {
  const det = a1 * b2 - a2 * b1;
  if (Math.abs(det) < 1e-12) return null;
  return {
    x: (c1 * b2 - c2 * b1) / det,
    y: (a1 * c2 - a2 * c1) / det,
  };
}

export function determinant2(m: number[][]): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

export function determinant3(m: number[][]): number {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  );
}

export function multiplyMatrices(a: number[][], b: number[][]): number[][] {
  const out: number[][] = [];
  for (let i = 0; i < a.length; i++) {
    out[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < b.length; k++) sum += a[i][k] * b[k][j];
      out[i][j] = sum;
    }
  }
  return out;
}

export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

export function combinations(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

export function permutations(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return factorial(n) / factorial(n - r);
}

export function parseNumberList(s: string): number[] {
  return s
    .split(/[,\s]+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .map(Number)
    .filter((x) => !isNaN(x));
}

export function mean(nums: number[]): number {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function median(nums: number[]): number {
  if (!nums.length) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

export function stdev(nums: number[]): number {
  if (nums.length < 2) return 0;
  const m = mean(nums);
  return Math.sqrt(nums.reduce((a, b) => a + (b - m) ** 2, 0) / (nums.length - 1));
}

export function variance(nums: number[]): number {
  if (nums.length < 2) return 0;
  const m = mean(nums);
  return nums.reduce((a, b) => a + (b - m) ** 2, 0) / (nums.length - 1);
}

export function mode(nums: number[]): number[] {
  const counts = new Map<number, number>();
  nums.forEach((n) => counts.set(n, (counts.get(n) ?? 0) + 1));
  const max = Math.max(...counts.values());
  return [...counts.entries()].filter(([, c]) => c === max).map(([n]) => n);
}

export function percentile(nums: number[], p: number): number {
  if (!nums.length) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const idx = (p / 100) * (s.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return s[lo];
  return s[lo] + (s[hi] - s[lo]) * (idx - lo);
}

export function compileFn(expr: string): ((x: number) => number) | null {
  try {
    const clean = expr
      .replace(/\^/g, "**")
      .replace(/\bsin\b/g, "Math.sin")
      .replace(/\bcos\b/g, "Math.cos")
      .replace(/\btan\b/g, "Math.tan")
      .replace(/\bsqrt\b/g, "Math.sqrt")
      .replace(/\babs\b/g, "Math.abs")
      .replace(/\bln\b/g, "Math.log")
      .replace(/\blog\b/g, "Math.log10")
      .replace(/\bexp\b/g, "Math.exp")
      .replace(/\bpi\b/gi, "Math.PI")
      .replace(/\be\b/g, "Math.E");
    const fn = new Function("x", `"use strict"; return ${clean};`) as (x: number) => number;
    fn(1);
    return fn;
  } catch {
    return null;
  }
}

export function derivative(f: (x: number) => number, x: number, h = 1e-6): number {
  return (f(x + h) - f(x - h)) / (2 * h);
}

export function integral(
  f: (x: number) => number,
  a: number,
  b: number,
  n = 1000
): number {
  const dx = (b - a) / n;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += ((f(a + i * dx) + f(a + (i + 1) * dx)) / 2) * dx;
  }
  return sum;
}

export function primeFactors(n: number): number[] {
  const out: number[] = [];
  let m = Math.abs(n);
  let d = 2;
  while (d * d <= m) {
    while (m % d === 0) {
      out.push(d);
      m /= d;
    }
    d++;
  }
  if (m > 1) out.push(m);
  return out;
}

export function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}

export function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function toDegrees(rad: number): number {
  return (rad * 180) / Math.PI;
}