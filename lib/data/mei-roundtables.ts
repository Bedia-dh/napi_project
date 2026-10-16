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
// YouTube recording links extracted from the old website where available.
export const roundtableSeries: RoundtableSeries[] = [
  {
    country: "Libya",
    period: "May – October 2021",
    intro:
      "The first series, inviting engaged Libyan youth, including NAPI's Young Policy Leaders fellows and affiliates, to share their perspective on the key issues facing their country's future.",
    roundtables: [
      { title: "Migration and Displacement in Libya: Converging Challenges and Pathways Forward", url: "https://www.youtube.com/watch?v=GhwEn3KETxc" },
      { title: "The Role of Libyan Youth in Promoting Social Cohesion", url: "https://www.youtube.com/watch?v=3WiKKd1741o" },
      { title: "Developing Libya's Economy: Challenges and Opportunities", url: "https://www.youtube.com/watch?v=28vOSS28q4Y" },
      { title: "Climate Change and Environmental Protection", url: "https://www.youtube.com/watch?v=Rg1Qxjs7ksY" },
      { title: "Challenges and Opportunities Facing Women in Libya", url: "https://www.youtube.com/watch?v=39PAeZVpLrY" },
    ],
  },
  {
    country: "Tunisia",
    period: "April – December 2022",
    intro:
      "A six-part series examining Tunisian society, politics, and current affairs, bringing together young experts on Tunisian matters to suggest recommendations and public policies.",
    roundtables: [
      { title: "Education in Tunisia: Current Challenges and Opportunities", url: "https://www.youtube.com/watch?v=IqSXFNCRYTQ" },
      { title: "Tunisia's Economic Crisis: Possible Paths Forward?", url: "https://www.youtube.com/watch?v=FD-dapSRvtY" },
      { title: "The Environment in Tunisia: A Youth Perspective on Challenges & Opportunities", url: "https://www.youtube.com/watch?v=GDbr6h-zkV0" },
      { title: "Local Governance in Tunisia", url: "https://www.youtube.com/watch?v=TlebM1chHFs" },
      { title: "Women's Rights in Tunisia", url: "https://www.youtube.com/watch?v=lceKNWn5tJ4" },
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
