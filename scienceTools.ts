export interface ScienceTool {
  id: string;
  label: string;
  short: string;
}

export interface ScienceGroup {
  name: string;
  tools: ScienceTool[];
}

export const SCIENCE_GROUPS: ScienceGroup[] = [
  {
    name: "Home",
    tools: [{ id: "sci-home", label: "Home", short: "Ho" }],
  },
  {
    name: "Chemistry",
    tools: [
      { id: "molar-mass", label: "Molar Mass", short: "Mm" },
      { id: "stoichiometry", label: "Stoichiometry", short: "St" },
      { id: "ph-calc", label: "pH & pOH", short: "pH" },
      { id: "gas-laws", label: "Gas Laws", short: "Gl" },
      { id: "dilution", label: "Dilution", short: "Di" },
      { id: "periodic", label: "Periodic Table", short: "Pt" },
      { id: "balancer", label: "Equation Balancer", short: "Eb" },
      { id: "empirical", label: "Empirical Formula", short: "Ef" },
      { id: "percent-yield", label: "Percent Yield", short: "Py" },
      { id: "molarity", label: "Molarity", short: "Mo" },
      { id: "calorimetry", label: "Calorimetry", short: "Cy" },
    ],
  },
  {
    name: "Biology",
    tools: [
      { id: "punnett", label: "Punnett Square", short: "Pu" },
      { id: "dna", label: "DNA & RNA", short: "Dn" },
      { id: "population", label: "Population Growth", short: "Pg" },
      { id: "hardy-weinberg", label: "Hardy-Weinberg", short: "Hw" },
      { id: "cell", label: "Cell Explorer", short: "Ce" },
      { id: "genetics", label: "Genetics Tools", short: "Ge" },
      { id: "codon", label: "Codon Translator", short: "Ct" },
      { id: "dihybrid", label: "Dihybrid Cross", short: "Dh" },
      { id: "enzyme", label: "Enzyme Kinetics", short: "Ek" },
    ],
  },
  {
    name: "Physics",
    tools: [
      { id: "kinematics", label: "Kinematics", short: "Ki" },
      { id: "forces", label: "Forces & Newton", short: "Fo" },
      { id: "energy", label: "Energy & Work", short: "En" },
      { id: "circuits", label: "Circuits", short: "Ci" },
      { id: "waves", label: "Waves & Optics", short: "Wa" },
      { id: "thermo", label: "Thermodynamics", short: "Th" },
      { id: "projectile", label: "Projectile Motion", short: "Pj" },
      { id: "momentum", label: "Momentum", short: "Mn" },
      { id: "gravitation", label: "Gravitation", short: "Gv" },
      { id: "electric-field", label: "Electric Fields", short: "Ef" },
      { id: "magnetism", label: "Magnetism", short: "Mg" },
    ],
  },
  {
    name: "Earth & Space",
    tools: [
      { id: "astronomy", label: "Astronomy", short: "As" },
      { id: "geology", label: "Geology", short: "Gy" },
      { id: "climate", label: "Climate Data", short: "Cl" },
      { id: "plate-tectonics", label: "Plate Tectonics", short: "Pt" },
      { id: "moon-phase", label: "Moon Phases", short: "Mp" },
    ],
  },
  {
    name: "Lab & Reference",
    tools: [
      { id: "unit-conv-sci", label: "Unit Converter", short: "Uc" },
      { id: "sig-figs", label: "Sig Figs", short: "Sf" },
      { id: "constants", label: "Constants", short: "Co" },
      { id: "sci-notation", label: "Scientific Notation", short: "Sn" },
      { id: "density", label: "Density", short: "De" },
      { id: "error-analysis", label: "Error Analysis", short: "Ea" },
      { id: "dilution-series", label: "Serial Dilution", short: "Sd" },
    ],
  },
  {
    name: "Support",
    tools: [{ id: "sci-about", label: "About Science", short: "Ab" }],
  },
];

export const SCIENCE_TOOLS: ScienceTool[] = SCIENCE_GROUPS.flatMap(
  (g) => g.tools
);

export const SCIENCE_TOOL_COUNT = SCIENCE_TOOLS.length;