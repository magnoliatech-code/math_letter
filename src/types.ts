export type MathCategory = 
  | 'Calculus & Analysis'
  | 'Linear Algebra'
  | 'Probability & Statistics'
  | 'Physics & Applied Math'
  | 'Number Theory & Discrete'
  | 'Geometry & Trigonometry'
  | 'Set Theory & Logic';

export interface LetterVariant {
  symbol: string;
  latex: string;
  name: string;
  note?: string;
}

export interface MathUsage {
  title: string;
  category: MathCategory;
  latexFormula: string;
  symbolRole: string; // e.g. "λ represents the eigenvalue"
  explanation: string;
  commonContext?: string; // e.g. "Characteristic Equation, PCA"
  wikiUrl?: string;
}

export interface GreekLetter {
  id: string;
  order: number;
  name: string;
  greekName: string;
  upper: {
    symbol: string;
    latex: string;
    note?: string;
  };
  lower: {
    symbol: string;
    latex: string;
    note?: string;
  };
  variants?: LetterVariant[];
  phonetics: {
    englishIPA: string;
    englishPhonetic: string;
    greekIPA: string;
  };
  speech: {
    englishName: string;
    greekName: string;
  };
  categories: MathCategory[];
  usages: MathUsage[];
  historicalNote?: string;
}
