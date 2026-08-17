export type ProgramKey = "ypl" | "chill-chat" | "youth-voices" | "mei-roundtables";

export interface Program {
  id: ProgramKey;
  name: string;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  color: string; // CSS variable or hex
  href: string;
  /** Bulleted objectives list on the program's page (Chill-Chat, Youth Voices). */
  objectives?: string[];
  /** Topic chips on the program's page (Chill-Chat). */
  topics?: string[];
  /** Eligibility criteria list (Youth Voices). */
  eligibility?: string[];
  /** Gallery photo URLs (Chill-Chat). */
  galleryPhotos?: string[];
}

export interface YplParticipant {
  id: string;
  name: string;
  bio: string;
  policyIssue: string;
  cohort: number;
  photoUrl?: string;
  paperUrl?: string;
  linkedin?: string;
}
