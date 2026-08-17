export type EventType = "webinar" | "workshop" | "conference" | "chill-chat";

export interface NapiEvent {
  id: string;
  title: string;
  type: EventType;
  date: string; // display string — not always full ISO, some past events only have partial dates
  time?: string;
  location?: string;
  audience?: string;
  description: string;
  registrationUrl?: string;
  sourceUrl?: string;
  imageUrl?: string;
  past?: boolean;
}

export interface PlannedActivity {
  id: string;
  program: string;
  title: string;
  description: string;
  color: string;
}

// Lightweight teaser used on the homepage carousel. Full detail (photos,
// recaps, program links) lives on the dedicated /events page.
export interface EventHighlight {
  id: string;
  title: string;
  type: EventType;
  summary: string;
  status: "past" | "next";
}
