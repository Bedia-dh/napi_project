import type { Program } from "@/lib/types/program";

export const programs: Program[] = [
  {
    id: "ypl",
    name: "Young Policy Leaders",
    tagline: "9-month research & advocacy fellowship",
    description:
      "Builds the research, writing, and advocacy capacity of youth tackling a public issue, with training, mentorship, and cross-national networks. 2021 cohort: 9 fellows.",
    stats: [
      { label: "Fellows (2021 cohort)", value: "9" },
      { label: "Policy papers", value: "9" },
      { label: "Program length", value: "9 mo." },
    ],
    color: "var(--ypl-color)",
    href: "/programs/ypl",
  },
  {
    id: "chill-chat",
    name: "Chill-Chat",
    tagline: "Open discussion & coffee-talk series",
    description:
      "An ongoing series of open discussions launched in September 2022, inviting youth to freely share ideas and debate relevant topics.",
    stats: [
      { label: "Sessions convened", value: "20+" },
      { label: "With FES Libya (2023–24)", value: "15" },
      { label: "Since", value: "2022" },
    ],
    color: "var(--chill-color)",
    href: "/programs/chill-chat",
    objectives: [
      "Change representations and break the stigma and stereotypes.",
      "Evolve people in a democratic debate, by exchanging experiences and creating connections between different actors.",
      "Promote tolerance, openness, and pluralism.",
      "Enhance critical thought and freedom, promoting vigilance and lucidity.",
      "Develop the principles of listening and mutual respect that a debate requires.",
      "Promote citizenship and reduce dogmatism.",
    ],
    topics: [
      "Youth and culture",
      "Youth and artivism",
      "Youth and migration",
      "Youth and education",
      "Youth and environment",
      "Youth and employment",
      "Youth and social justice",
      "Youth and climate action",
      "Youth and digital activism",
      "Youth and local governance",
      "Youth and civic engagement",
    ],
    galleryPhotos: [
      "https://napipolicy.org/wp-content/uploads/2024/02/379465073_640617284868838_1147682275153398996_n.jpg",
      "https://napipolicy.org/wp-content/uploads/2024/02/387759223_651166563813910_4584524682583189327_n.jpg",
    ],
  },
  {
    id: "mei-roundtables",
    name: "NAPI-MEI Roundtables",
    tagline: "North African Youth Perspectives",
    description:
      "With the Middle East Institute, a series of roundtables giving young leaders in Libya, Tunisia, and Morocco a platform to share policy perspectives and recommendations.",
    stats: [
      { label: "Countries", value: "3" },
      { label: "Roundtables", value: "14+" },
      { label: "Since", value: "2021" },
    ],
    color: "var(--labs-color)",
    href: "/programs/mei-roundtables",
  },
  {
    id: "youth-voices",
    name: "Youth Voices",
    tagline: "Open publishing platform",
    description:
      "A rolling opportunity for youth to write and publish policy-relevant blogposts, op-eds, or articles, with tailored support from idea to publication.",
    stats: [
      { label: "Age range", value: "15–35" },
      { label: "Languages", value: "3" },
      { label: "Format", value: "Rolling" },
    ],
    color: "var(--voices-color)",
    href: "/programs/youth-voices",
    objectives: [
      "Build the capacity of youth to write and publish.",
      "Share youth perspectives with a broader audience.",
      "Foster youth participation in public life.",
    ],
    eligibility: [
      "Age between 15 and 35.",
      "Resident of North Africa, or a citizen of a North African country.",
      "Writing is published under your name - a pseudonym may be considered case-by-case.",
      "Submissions accepted in Arabic, English, or French.",
      "The writing must address a policy issue relevant to the region.",
      "The writing must be original, evidence-driven, and include links to sources quoted.",
    ],
  },
];
