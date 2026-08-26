export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Overview", href: "/programs" },
      { label: "Youth Policy Lab", href: "/programs/ypl" },
      { label: "Chill Chat", href: "/programs/chill-chat" },
      { label: "NAPI-MEI Roundtables", href: "/programs/mei-roundtables" },
      { label: "Youth Voices", href: "/programs/youth-voices" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const languages = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
] as const;
