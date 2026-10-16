import type { NapiEvent, PlannedActivity, EventHighlight, EventType } from "@/lib/types/event";

// Real events sourced from NAPI's official event spreadsheet.
export const pastEvents: NapiEvent[] = [
  {
    id: "evt-01",
    slug: "konrad-adenauer-stiftung-napi-civic-engagement-workshop",
    title: "Konrad Adenauer Stiftung – NAPI Civic Engagement Workshop",
    type: "workshop",
    date: "14–16 June 2022",
    location: "Tunisia",
    description:
      "Training for emerging young leaders in democratic participation through civil society organisations and political parties, participatory governance, policymaking, local governance and civic engagement.",
    partners: "Konrad-Adenauer-Stiftung",
    past: true,
  },
  {
    id: "evt-02",
    slug: "youth-participation-in-governance-webinar",
    title: "Youth Participation in Governance Webinar",
    type: "webinar",
    date: "27 July 2022",
    description:
      "International webinar inviting young participants to explore participatory governance and public policy, the value of engaging in local governance, and practical pathways to influence policy decisions. Included discussions and interactive group exercises.",
    partners: "USAID/ESC; International Youth Foundation",
    past: true,
  },
  {
    id: "evt-03",
    slug: "kram-team-napi-community-support-pve",
    title: "Kram Team & NAPI — Community Support for the Prevention of Violent Extremism and Women's Exclusion",
    type: "workshop-series",
    date: "June–August 2022",
    location: "Goulette Kram Team Headquarters, Tunisia",
    description:
      "Community workshop series combining social inclusion, sports and civic engagement. Workshop 3, held on 29 July 2022, brought together children, young people and parents for dialogue on inclusive youth participation.",
    partners: "Goulette Kram Team; Swiss Embassy in Tunis; ATAM",
    past: true,
  },
  {
    id: "evt-04",
    slug: "emerging-trends-violent-extremism-pve-libya",
    title: "Emerging Trends of Violent Extremism and Future of PVE in Libya Conference — NAPI Participation",
    type: "conference",
    date: "10–12 October 2022",
    location: "Tunis, Tunisia",
    description:
      "NAPI participated in a conference on prevention of violent extremism in Libya, alongside policymakers, practitioners, researchers and partners. Discussions considered local and national ownership, civil society, women's participation, peace education and municipal prevention strategies.",
    partners: "UNDP Libya; Libyan Counter Terrorism Centre",
    past: true,
  },
  {
    id: "evt-05",
    slug: "insaniyyat-international-forum-humanities-social-sciences",
    title: "Insaniyyat — International Forum for Humanities and Social Sciences — NAPI Participation",
    type: "conference",
    date: "22 September 2022",
    location: "ESCT Business School, University of Manouba, Tunisia",
    description:
      "NAPI participated in the first Insaniyyat forum, contributing to discussions on crises of models and relations between states and civil society in the Maghreb and wider MENA region.",
    past: true,
  },
  {
    id: "evt-06",
    slug: "beyond-covid-economic-development-north-africa",
    title: "Beyond Covid: Avenues for Economic Development in North Africa",
    type: "panel",
    date: "16 March 2022",
    description:
      "Hub and Spoke panel discussion on regional economic development following the COVID-19 pandemic. Speakers included Hela Ben Hassine, Alec Hansen and Hamza Mighri, with young participants from Morocco, Algeria, Tunisia and Libya.",
    partners: "Hub and Spoke",
    past: true,
  },
  {
    id: "evt-07",
    slug: "democratic-governance-civil-society-theory-practice",
    title: "Democratic Governance and Civil Society in Theory and Practice",
    type: "workshop",
    date: "28 October 2022",
    description:
      "Hub and Spoke workshop open to young participants in Morocco, Algeria, Tunisia and Libya. A joint session on democratic governance and civil society was followed by country-focused breakout discussions.",
    partners: "Hub and Spoke",
    past: true,
  },
  {
    id: "evt-08",
    slug: "panel-series-education-tunisia",
    title: "Panel Series: Education in Tunisia",
    type: "panel",
    date: "2 February 2022",
    description:
      "Panel discussion series examining education in Tunisia.",
    past: true,
  },
  {
    id: "evt-09",
    slug: "napi-team-rtci-interview",
    title: "NAPI Team on RTCI",
    type: "media",
    date: "14 January 2022",
    description:
      "NAPI team interview with RTCI presenter Haithem Bourial about NAPI's main programmes and activities.",
    past: true,
  },
  {
    id: "evt-10",
    slug: "libya-policy-forum-2021",
    title: "Libya Policy Forum 2021",
    type: "policy-forum",
    date: "30–31 January 2021",
    description:
      "Two-day policy forum featuring Young Policy Leaders participants presenting policy briefs and recommendations to experts, ambassadors, policymakers, practitioners and academics.",
    past: true,
  },
  {
    id: "evt-11",
    slug: "undp-regional-youth-leadership-programme-ylp7",
    title: "UNDP Regional Youth Leadership Programme (YLP7) — NAPI Contribution",
    type: "conference",
    date: "25 May – 2 June 2021",
    description:
      "NAPI contributed to the virtual regional Youth Leadership Programme, presenting on participatory governance, reimagining governance and identifying local barriers to meaningful youth participation.",
    partners: "UNDP",
    past: true,
  },
  {
    id: "evt-12",
    slug: "public-policy-how-to-influence-it",
    title: "Public Policy and How to Influence It",
    type: "workshop",
    date: "16 March 2021",
    description:
      "Event focused on public policy and pathways for influencing it.",
    past: true,
  },
  {
    id: "evt-13",
    slug: "civil-society-civic-engagement",
    title: "Civil Society and Civic Engagement",
    type: "workshop",
    date: "17 April 2021",
    description:
      "Event on civil society and civic engagement.",
    past: true,
  },
  {
    id: "evt-14",
    slug: "mei-napi-roundtable-women-libya",
    title: "MEI–NAPI Youth Roundtable: Challenges and Opportunities Facing Women in Libya",
    type: "roundtable",
    date: "18 October 2021",
    description:
      "Discussion on the challenges faced by women in Libya and avenues for greater participation and opportunity.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
  {
    id: "evt-15",
    slug: "mei-napi-roundtable-climate-libya",
    title: "MEI–NAPI Youth Roundtable: Climate Change and Environmental Protection",
    type: "roundtable",
    date: "17 June 2021",
    description:
      "Youth roundtable on climate change and environmental protection in Libya.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
  {
    id: "evt-16",
    slug: "mei-napi-roundtable-social-cohesion-libya",
    title: "MEI–NAPI Youth Roundtable: The Role of Libyan Youth in Promoting Social Cohesion",
    type: "roundtable",
    date: "22 July 2021",
    description:
      "Discussion examining how young Libyans can promote social cohesion.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
  {
    id: "evt-17",
    slug: "mei-napi-roundtable-migration-libya",
    title: "MEI–NAPI Youth Roundtable: Migration and Displacement in Libya",
    type: "roundtable",
    date: "18 May 2021",
    description:
      "Policy dialogue on converging challenges and possible solutions relating to migration and displacement in Libya.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
  {
    id: "evt-18",
    slug: "mei-napi-roundtable-economy-libya",
    title: "MEI–NAPI Youth Roundtable: Developing Libya's Economy",
    type: "roundtable",
    date: "14 September 2021",
    description:
      "Youth discussion of Libya's economic challenges and development opportunities.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
  {
    id: "evt-19",
    slug: "mei-napi-roundtable-migration-morocco",
    title: "MEI–NAPI Youth Roundtable: Migration in Morocco",
    type: "roundtable",
    date: "April–December 2023",
    description:
      "Roundtable exploring migration issues in Morocco and youth-informed policy responses.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
  {
    id: "evt-20",
    slug: "mei-napi-roundtable-climate-morocco",
    title: "MEI–NAPI Youth Roundtable: Climate Change in Morocco",
    type: "roundtable",
    date: "April–December 2023",
    description:
      "Discussion on climate change in Morocco and potential policy recommendations.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
  {
    id: "evt-21",
    slug: "mei-napi-roundtable-youth-participation-morocco",
    title: "MEI–NAPI Youth Roundtable: Youth Participation in Public Life in Morocco",
    type: "roundtable",
    date: "April–December 2023",
    description:
      "Young participants discuss opportunities and barriers to youth participation in public life and decision-making in Morocco.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
  {
    id: "evt-22",
    slug: "mei-napi-roundtable-gender-morocco",
    title: "MEI–NAPI Youth Roundtable: Gender in Morocco",
    type: "roundtable",
    date: "April–December 2023",
    description:
      "Policy dialogue considering gender issues in Morocco through young people's perspectives.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
  {
    id: "evt-23",
    slug: "mediterranean-heatwaves-community-resilience",
    title: "Mediterranean Heatwaves: Community Resilience and Policy Responses",
    type: "online-discussion",
    date: "30 September 2026",
    time: "17:30–18:45 (Tunis)",
    description:
      "Online policy discussion on how Mediterranean communities can respond to more frequent and intense heatwaves, exploring implications for public health, cities, livelihoods and vulnerable groups, and practical policy-oriented solutions.",
    partners: "Resilient Futures",
    past: false,
  },
  {
    id: "evt-24",
    slug: "napi-mei-roundtable-education-tunisia",
    title: "NAPI–MEI Youth Roundtable: Education in Tunisia: Current Challenges and Opportunities",
    type: "roundtable",
    date: "26 April 2022",
    description:
      "Youth-led roundtable examining challenges in Tunisia's education system, inequalities in access and quality, and opportunities for education reform.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
  {
    id: "evt-25",
    slug: "napi-mei-roundtable-economic-crisis-tunisia",
    title: "NAPI–MEI Youth Roundtable: Tunisia's Economic Crisis: Possible Paths Forward?",
    type: "roundtable",
    date: "April–December 2022",
    description:
      "Young Tunisian experts discuss economic challenges and potential policy pathways for recovery and development.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
  {
    id: "evt-26",
    slug: "napi-mei-roundtable-environment-tunisia",
    title: "NAPI–MEI Youth Roundtable: Environment in Tunisia: A Youth Perspective on Challenges & Opportunities",
    type: "roundtable",
    date: "April–December 2022",
    description:
      "Policy roundtable exploring environmental challenges and possible youth-informed policy responses in Tunisia.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
  {
    id: "evt-27",
    slug: "napi-mei-roundtable-local-governance-tunisia",
    title: "NAPI–MEI Youth Roundtable: Local Governance in Tunisia",
    type: "roundtable",
    date: "April–December 2022",
    description:
      "Youth roundtable discussing local governance, participation and opportunities for strengthening civic decision-making in Tunisia.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
  {
    id: "evt-28",
    slug: "napi-mei-roundtable-womens-rights-tunisia",
    title: "NAPI–MEI Youth Roundtable: Women's Rights in Tunisia",
    type: "roundtable",
    date: "April–December 2022",
    description:
      "Policy discussion on women's rights and challenges in Tunisia from young people's perspectives.",
    partners: "Middle East Institute (MEI)",
    past: true,
  },
];

// What's coming -- framed around ongoing programs rather than fixed dates,
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

// Homepage carousel teaser -- derived automatically from pastEvents and
// plannedActivities above.
const activityTypeMap: Record<string, EventType> = {
  "plan-ypl": "conference",
  "plan-chill-chat": "chill-chat",
  "plan-youth-voices": "webinar",
};

export const eventHighlights: EventHighlight[] = [
  ...pastEvents.filter((e) => !e.past || e.past).slice(-2).map((e): EventHighlight => ({
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
