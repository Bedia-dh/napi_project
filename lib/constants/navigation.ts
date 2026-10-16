export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Why NAPI", href: "/about" },
      { label: "Our Story & Scope", href: "/about#our-story" },
      { label: "Team", href: "/about#team" },
    ],
  },
  { label: "Knowledge Hub", href: "/research" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Leadership: Young Policy Leaders", href: "/programs/ypl" },
      { label: "Knowledge: Training Workshops", href: "/programs/training-workshops" },
      { label: "Awareness: Policy Roundtables · Chill Chat", href: "/programs/chill-chat" },
      { label: "Publishing: Youth Voices", href: "/programs/youth-voices" },
      { label: "Civic Values: Art4Civics", href: "/programs/art4civics" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const languages = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
] as const;
