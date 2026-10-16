import type { Program } from "@/lib/types/program";

export const programs: Program[] = [
  {
    id: "ypl",
    name: "Young Policy Leaders",
    tagline: "Leadership",
    description:
      "A nine-month capacity-building and mentorship program for young people passionate about understanding and addressing public policy challenges in their community and beyond.",
    stats: [
      { label: "Policy papers", value: "35" },
      { label: "Cohort size", value: "12–25" },
      { label: "Program length", value: "9 mo." },
    ],
    color: "var(--ypl-color)",
    href: "/programs/ypl",
    imageUrl: "/media/ypl.jpg",
  },
  {
    id: "training-workshops",
    name: "Training Workshops",
    tagline: "Knowledge",
    description:
      "NAPI was founded at the intersection of academia, civil society, and governance by professional researchers, educators, and practitioners. Rooted in deep educational expertise, our team puts participatory learning at the core of our work. Over the years, we have developed dozens of training modules that equip young people with the skills to become globally aware, critical thinkers, and active citizens.",
    stats: [
      { label: "Training topics", value: "40+" },
      { label: "Languages", value: "4" },
      { label: "Categories", value: "8" },
    ],
    color: "var(--labs-color)",
    href: "/programs/training-workshops",
    objectives: [
      "Equip young people with transversal competences necessary for effective action in any kind of work, learning, or life activity.",
      "Bridge the gap between theory and practice by translating concepts into action.",
      "Draw from competences that cut across academia, public policy, and practice.",
      "Adopt a dialectic method based on opposing ideas and collective reasoning.",
    ],
    topics: [
      "Self and Social Awareness",
      "Global Awareness",
      "Thinking and Leadership",
      "Interpersonal Skills",
      "Research & Action-Oriented Skills",
      "Public Engagement",
      "Civil Society Management",
      "Pedagogy (ToT)",
    ],
  },
  {
    id: "chill-chat",
    name: "Chill-Chat",
    tagline: "Awareness & Socialization",
    description:
      "An informal, safe, and participatory space where young people exchange perspectives, challenge stereotypes, engage in democratic dialogue, and collectively reflect on issues affecting their communities.",
    stats: [
      { label: "Sessions hosted", value: "28" },
      { label: "Youth reached", value: "300+" },
      { label: "Since", value: "2022" },
    ],
    color: "var(--chill-color)",
    href: "/programs/chill-chat",
    imageUrl: "/media/training.jpg",
    objectives: [
      "Challenge representations, stigma, and stereotypes.",
      "Encourage democratic dialogue through the exchange of experiences and perspectives.",
      "Promote tolerance, openness, and pluralism.",
      "Strengthen critical thinking and freedom of thought.",
      "Develop listening, dialogue, and mutual respect.",
      "Build connections between young people from different backgrounds and sectors.",
      "Encourage active citizenship and reduce dogmatism.",
      "Create space for young people to propose solutions to challenges affecting their communities.",
    ],
    topics: [
      "Youth & Culture",
      "Youth & Artivism",
      "Youth & Migration",
      "Youth & Education",
      "Youth & Environment",
      "Youth & Employment",
      "Youth & Social Justice",
      "Youth & Climate Action",
      "Youth & Digital Activism",
      "Youth & Local Governance",
      "Youth & Civic Engagement",
    ],
    galleryPhotos: [
      "/media/training.jpg",
      "/media/training.jpg",
    ],
  },
  {
    id: "mei-roundtables",
    name: "Policy Roundtables",
    tagline: "Awareness & Socialization",
    description:
      "Online expert roundtable discussions during which youth experts present information and analysis to help participants gain a better knowledge on policy issues through the words of a peer.",
    stats: [
      { label: "Countries", value: "3" },
      { label: "Roundtables", value: "14+" },
      { label: "Since", value: "2021" },
    ],
    color: "var(--labs-color)",
    href: "/programs/mei-roundtables",
    imageUrl: "/media/roundtables.jpg",
  },
  {
    id: "youth-voices",
    name: "Youth Voices",
    tagline: "Publishing",
    description:
      "A flexible, low-intensity, and self-paced initiative that helps Mediterranean youth articulate, write, and publish their perspectives on policy-relevant issues in Arabic, English, or French.",
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
  {
    id: "art4civics",
    name: "Art4Civics",
    tagline: "Civic Values & Creativity",
    description:
      "Art 4 Civics is a project that benefits from NAPI's experience with art teaching and youth civic education. It aims at diffusing violence, teaching civic values, and fostering civic engagement among school-age youth (12-19 y.o) through art. It consists of 10 training modules, each composed of 1 to 5 two-hour sessions. Every module introduces young people to a social issue and a new art technique (e.g., collage, repurposing, drawing, painting, engraving, sculpting, etc.). The instructor teaches participants a given art technique and invites them to apply it in exploring a social theme, giving expression to their own feelings and perspectives. This approach allows young people to reflect on and discuss sensitive social issues indirectly via art and interpret them through their own unique lens.",
    stats: [
      { label: "Age range", value: "12–19" },
      { label: "Modules", value: "10" },
      { label: "Approach", value: "Art-based" },
    ],
    color: "var(--orange)",
    href: "/programs/art4civics",
  },
];
