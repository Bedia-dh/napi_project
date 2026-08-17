export interface Roundtable {
  title: string;
  url: string;
}

export interface RoundtableSeries {
  country: string;
  period: string;
  intro: string;
  roundtables: Roundtable[];
}

// Real roundtable series with the Middle East Institute, sourced from
// napipolicy.org/napi-mei-roundtables-north-african-youth-perspectives.
export const roundtableSeries: RoundtableSeries[] = [
  {
    country: "Libya",
    period: "May – October 2021",
    intro:
      "The first series, inviting engaged Libyan youth, including NAPI's Young Policy Leaders fellows and affiliates, to share their perspective on the key issues facing their country's future.",
    roundtables: [
      { title: "Migration and Displacement in Libya: Converging Challenges and Pathways Forward", url: "https://www.mei.edu/events/mei-napi-youth-roundtable-migration-and-displacement-libya-converging-challenges-and" },
      { title: "The Role of Libyan Youth in Promoting Social Cohesion", url: "https://www.mei.edu/events/role-libyan-youth-promoting-social-cohesion" },
      { title: "Developing Libya's Economy: Challenges and Opportunities", url: "https://www.mei.edu/events/developing-libyas-economy-challenges-and-opportunities" },
      { title: "Climate Change and Environmental Protection", url: "https://www.mei.edu/events/mei-napi-youth-roundtable-climate-change-and-environmental-protection" },
      { title: "Challenges and Opportunities Facing Women in Libya", url: "https://www.mei.edu/events/mei-napi-youth-roundtable-challenges-and-opportunities-facing-women-libya" },
    ],
  },
  {
    country: "Tunisia",
    period: "April – December 2022",
    intro:
      "A six-part series examining Tunisian society, politics, and current affairs, bringing together young experts on Tunisian matters to suggest recommendations and public policies.",
    roundtables: [
      { title: "Education in Tunisia: Current Challenges and Opportunities", url: "https://www.mei.edu/events/education-tunisia-current-challenges-and-opportunities" },
      { title: "Tunisia's Economic Crisis: Possible Paths Forward?", url: "https://www.mei.edu/events/tunisias-economic-crisis-possible-paths-forward" },
      { title: "The Environment in Tunisia: A Youth Perspective on Challenges & Opportunities", url: "https://www.mei.edu/events/mei-napi-roundtable-environment-tunisia-youth-perspective-challenges-opportunities" },
      { title: "Local Governance in Tunisia", url: "https://www.mei.edu/events/napi-mei-youth-roundtable-local-governance-tunisia" },
      { title: "Women's Rights in Tunisia", url: "https://www.youtube.com/live/lceKNWn5tJ4?feature=share" },
    ],
  },
  {
    country: "Morocco",
    period: "April – December 2023",
    intro:
      "Extending the series' success in Tunisia and Libya, six roundtables convening young experts and thought leaders in Moroccan affairs to propose recommendations for a more prosperous and sustainable future.",
    roundtables: [
      { title: "Migration in Morocco", url: "https://www.youtube.com/watch?v=1QFA-wm7xIo" },
      { title: "Climate Change in Morocco", url: "https://www.youtube.com/watch?v=4e7GbCvHMGA" },
      { title: "Youth Participation in Public Life in Morocco", url: "https://www.youtube.com/watch?v=9vu8nB73sGA" },
      { title: "Gender in Morocco", url: "https://mei.edu/events/mei-napi-youth-roundtable-gender-morocco" },
    ],
  },
];
