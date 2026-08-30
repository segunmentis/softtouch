// The studio's answers, supplied by the owner verbatim.
//
// Ids are stable and human-readable so a single answer can be linked directly,
// e.g. /faq#hair-length in a reply to a client. The homepage shows the first
// three; /faq shows all of them and emits them as FAQPage structured data.

export type Faq = { id: string; question: string; answer: string };

export const FAQS: Faq[] = [
  {
    id: "hair-length",
    question: "How long should my hair be before sugaring?",
    answer: "About ¼ inch — roughly the length of a grain of rice, which is usually two to three weeks of growth after shaving. Sugar paste can lift shorter hair than wax, so if you are unsure, book in and we will take a look together.",
  },
  {
    id: "how-long-results-last",
    question: "How long do sugaring results last?",
    answer: "Most clients stay smooth for four to six weeks. It depends on your own growth cycle, and results tend to last longer the more regularly you come, as hair grows back finer over time.",
  },
  {
    id: "sensitive-skin",
    question: "Is sugaring suitable for sensitive skin?",
    answer: "Yes. Sugaring is often preferred for sensitive skin because it is made from natural ingredients and is less likely to irritate the skin than traditional waxing. The paste is applied at body temperature, so there is no risk of a hot wax burn.",
  },
  {
    id: "brazilian-frequency",
    question: "How often should I book Brazilian sugaring?",
    answer: "Every four to six weeks suits most clients. Keeping to a regular cycle means hair grows back on the same schedule, which makes each appointment quicker and more comfortable than leaving longer gaps.",
  },
  {
    id: "first-brazilian",
    question: "What should I do before my first Brazilian sugaring appointment?",
    answer: "Let hair grow to about ¼ inch, exfoliate gently 24 to 48 hours beforehand, and skip lotions and oils on the day. Wear something loose and comfortable. If it is your first time, say so when you arrive — we will talk you through every step before we begin.",
  },
  {
    id: "after-sugaring",
    question: "What should I avoid after sugaring?",
    answer: "For the first 24 to 48 hours, avoid hot tubs and saunas, swimming, heavy exercise, tight clothing and direct sun exposure. After a few days, gentle exfoliation helps keep ingrown hairs away.",
  },
  {
    id: "waxing-vs-sugaring",
    question: "What is the difference between waxing and sugaring?",
    answer: "Sugar paste is made from sugar, water and lemon, applied at body temperature and removed in the natural direction of hair growth. Wax is applied hot and pulled against the growth. Because the paste grips hair rather than skin, sugaring tends to be gentler and causes less breakage.",
  },
  {
    id: "location",
    question: "Where is Soft Touch Aesthetics Studio located?",
    answer: "We are at 410 Duchess Street, M2, in Saskatoon. The studio is private — one client at a time, with no shared waiting room.",
  },
  {
    id: "mens-sugaring",
    question: "Do you offer men's body sugaring?",
    answer: "Yes. We offer select men's sugaring services in the same private studio. The current list and availability are on our booking page.",
  },
];
