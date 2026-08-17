export type PublicationType = "brief" | "paper" | "report" | "proceedings";
export type LanguageCode = "en" | "fr" | "ar";
export type PolicyTheme =
  | "health-equity"
  | "governance"
  | "climate"
  | "education"
  | "gender"
  | "economy";

export interface Publication {
  id: string;
  title: string;
  type: PublicationType;
  theme: PolicyTheme;
  program: string | null;
  authors: string[];
  year: number;
  pages: number;
  languages: LanguageCode[];
  abstract: string;
  pdfUrl: string;
  featured?: boolean;
  /** Extra search terms editors attach in the CMS — synonyms, acronyms, topics not in the title/abstract. */
  keywords?: string[];
}
