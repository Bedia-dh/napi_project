export type PublicationType =
  | "edited-volume"
  | "book-chapter"
  | "research-brief"
  | "policy-briefing"
  | "journal-article"
  | "policy-paper"
  | "research-report";

export type LanguageCode = "en" | "fr" | "ar" | "it";

export type PolicyTheme =
  | "health-equity"
  | "governance"
  | "climate"
  | "education"
  | "gender"
  | "economy"
  | "migration"
  | "security";

export interface Publication {
  id: string;
  title: string;
  type: PublicationType;
  theme: PolicyTheme;
  program: string | null;
  authors: string[];
  year: number;
  pages?: number;
  languages: LanguageCode[];
  abstract: string;
  pdfUrl: string;
  featured?: boolean;
  /** Extra search terms editors attach in the CMS — synonyms, acronyms, topics not in the title/abstract. */
  keywords?: string[];
  /** Semicolon-separated policy issues from the original spreadsheet */
  policyIssue?: string;
}
