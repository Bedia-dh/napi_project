import type { NapiEvent, PlannedActivity, EventHighlight, EventType } from "@/lib/types/event";

// Real past events, drawn from NAPI's event history.
export const pastEvents: NapiEvent[] = [
  {
    id: "evt-past-1",
    title: "Konrad-Adenauer-Stiftung × NAPI - Civic Engagement Workshop",
    type: "workshop",
    date: "June 14–16, 2022",
    description:
      "A three-day workshop with Konrad-Adenauer-Stiftung on civic engagement strategies for young leaders across North Africa.",
    past: true,
  },
  {
    id: "evt-past-2",
    title: "USAID × International Youth Foundation - Youth Participation in Governance",
    type: "webinar",
    date: "July 27, 2022",
    description:
      "A webinar with USAID and the International Youth Foundation on strengthening youth participation in governance processes.",
    past: true,
  },
  {
    id: "evt-past-3",
    title: "Kram Team × NAPI - Community Support Against Violent Extremism",
    type: "workshop",
    date: "June–August 2022",
    description:
      "A community-based program addressing the prevention of violent extremism and the exclusion of women, run with Kram Team.",
    past: true,
  },
  {
    id: "evt-past-4",
    title: "Emerging Trends of Violent Extremism and the Future of PVE in Libya",
    type: "conference",
    date: "October 10–12, Tunis, Tunisia",
    description:
      "NAPI presented research findings at this regional conference on preventing violent extremism in Libya.",
    past: true,
  },
  {
    id: "evt-past-5",
    title: "Insaniyyat Conference - International Forum for Humanities and Social Sciences",
    type: "conference",
    date: "September 22, 2022",
    description:
      "NAPI's participation in the Insaniyyat international forum for humanities and social sciences research.",
    past: true,
  },
  {
    id: "evt-past-6",
    title: "Hub and Spoke Panel - Beyond Covid: Avenues for Economic Development in North Africa",
    type: "conference",
    date: "March 2022",
    description:
      "A panel discussion on post-pandemic economic recovery pathways for North Africa, hosted under the Hub and Spoke program.",
    past: true,
  },
];

// What's coming — framed around ongoing programs rather than fixed dates,
// since NAPI runs periodic activities rather than a packed events calendar.
export const plannedActivities: PlannedActivity[] = [
  {
    id: "plan-ypl",
    program: "Youth Policy Lab",
    title: "Next Cohort - Applications Opening Soon",
    description:
      "We're preparing to open applications for the next Youth Policy Lab fellowship. Subscribe to our newsletter to be notified first.",
    color: "var(--ypl-color)",
  },
  {
    id: "plan-chill-chat",
    program: "Chill Chat",
    title: "Ongoing Dialogue Series",
    description:
      "Chill Chat sessions run periodically throughout the year. The next session date and topic will be announced on our channels.",
    color: "var(--chill-color)",
  },
  {
    id: "plan-youth-voices",
    program: "Youth Voices",
    title: "Submissions Open on a Rolling Basis",
    description:
      "Young writers across North Africa can submit an idea anytime and get tailored support to publish it as a blogpost, op-ed, or article.",
    color: "var(--voices-color)",
  },
];

// Homepage carousel teaser — derived automatically from pastEvents and
// plannedActivities above, so adding a new entry to either array flows
// straight into the homepage carousel without editing this file.
// Shows the 2 most recent past events + every planned activity.
const activityTypeMap: Record<string, EventType> = {
  "plan-ypl": "conference",
  "plan-chill-chat": "chill-chat",
  "plan-youth-voices": "webinar",
};

export const eventHighlights: EventHighlight[] = [
  ...pastEvents.slice(-2).map((e): EventHighlight => ({
    id: `hl-${e.id}`,
    title: e.title,
    type: e.type,
    summary: e.description,
    status: "past",
  })),
  ...plannedActivities.map((a): EventHighlight => ({
    id: `hl-${a.id}`,
    title: a.title,
    type: activityTypeMap[a.id] ?? "workshop",
    summary: a.description,
    status: "next",
  })),
];
