import { useEffect, useRef, useState } from "react";

const PREFIX = "mathdash:";

export function loadValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveValue<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — ignore */
  }
}

export function clearAll(): void {
  if (typeof window === "undefined") return;
  try {
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => window.localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
}

/**
 * useState that persists to localStorage under a namespaced key.
 * Reads once on mount, writes on every change.
 */
export function usePersistentState<T>(
  key: string,
  initial: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => loadValue(key, initial));
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    saveValue(key, state);
  }, [key, state]);

  return [state, setState];
}