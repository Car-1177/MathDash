import { About } from "@/components/About";

// Drop-in renderer: add `{ id: "about", label: "About", group: "Reference" }`
// to your nav list in App.tsx, then map that id to this component.
export function AboutView() {
  return <About />;
}