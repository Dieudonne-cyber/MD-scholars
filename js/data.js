/* ==========================================================
   MD Scholars — shared content data
   Used by: home, opportunities listing, opportunity detail
   ========================================================== */

const OPPORTUNITIES = [
  {
    id: "global-horizons-italy",
    code: "IT",
    country: "Italy",
    tag: "Scholarship",
    title: "Global Horizons Graduate Scholarship — Italy",
    blurb: "Full tuition and stipend for Master's study at partner universities across Italy, open to international applicants.",
    deadline: "2026-08-14",
    deadlineLabel: "14 Aug 2026",
    level: "Master's",
    description: "The Global Horizons Graduate Scholarship funds one academic year of Master's study at a partner university in Italy, covering full tuition, a monthly stipend, and one return flight. The programme is open to applicants from any country who have completed an undergraduate degree with strong academic standing.",
    requirements: [
      "Bachelor's degree completed or in final year",
      "Academic transcripts (official, translated)",
      "Personal statement (max 800 words)",
      "Two academic recommendation letters",
      "Proof of English or Italian language proficiency"
    ]
  },
  {
    id: "ministry-youth-careers-rwanda",
    code: "RW",
    country: "Rwanda",
    tag: "Careers",
    title: "Ministry of Youth Careers Programme",
    blurb: "Entry-level government placements for recent graduates across finance, ICT and public administration tracks.",
    deadline: "2026-09-02",
    deadlineLabel: "02 Sep 2026",
    level: "Entry-level",
    description: "A one-year structured placement programme for recent graduates, rotating across finance, ICT and public administration departments within participating ministries. Strong performers are considered for permanent roles at the end of the placement.",
    requirements: [
      "Bachelor's degree in a related field",
      "Graduated within the last 3 years",
      "National ID or valid work permit",
      "Updated CV",
      "Motivation letter (max 500 words)"
    ]
  },
  {
    id: "nordic-future-leaders-sweden",
    code: "SE",
    country: "Sweden",
    tag: "Fellowship",
    title: "Nordic Future Leaders Fellowship",
    blurb: "Fully funded undergraduate and Master's fellowship with a leadership residency in Stockholm each summer.",
    deadline: "2026-09-20",
    deadlineLabel: "20 Sep 2026",
    level: "Undergraduate / Master's",
    description: "The Nordic Future Leaders Fellowship funds tuition and living costs for the full length of an undergraduate or Master's degree, and includes an annual two-week leadership residency in Stockholm with fellows from across the world.",
    requirements: [
      "Confirmed or pending admission to a partner university",
      "Leadership or community involvement (any form)",
      "Personal statement (max 1000 words)",
      "One reference letter",
      "Interview (video call)"
    ]
  },
  {
    id: "greenpath-conservation-kenya",
    code: "KE",
    country: "Kenya",
    tag: "Careers",
    title: "GreenPath Conservation Careers",
    blurb: "Field and policy roles with conservation NGOs operating across East Africa, open to early-career professionals.",
    deadline: "2026-08-30",
    deadlineLabel: "30 Aug 2026",
    level: "Early-career",
    description: "GreenPath partners with conservation NGOs across East Africa to place early-career professionals into field research, community engagement, and policy roles. Placements run 6–18 months with a stipend and housing support.",
    requirements: [
      "Degree or diploma in environmental science, biology or related field",
      "Willingness to relocate to a field site",
      "Basic first-aid certification (or willingness to obtain)",
      "CV and cover letter",
      "Two references"
    ]
  },
  {
    id: "sakura-bridge-japan",
    code: "JP",
    country: "Japan",
    tag: "Scholarship",
    title: "Sakura Bridge Scholarship",
    blurb: "Language year plus Bachelor's funding for students admitted to partner universities across Japan.",
    deadline: "2026-10-11",
    deadlineLabel: "11 Oct 2026",
    level: "Bachelor's",
    description: "Covers one year of intensive Japanese language study followed by full Bachelor's tuition at a partner university in Japan. Includes a monthly living allowance and dormitory housing for the language year.",
    requirements: [
      "Secondary school diploma with strong grades",
      "Under 22 years old at time of application",
      "Statement of purpose (max 600 words)",
      "Health certificate",
      "Basic Japanese not required — beginner track available"
    ]
  },
  {
    id: "atlas-business-canada",
    code: "CA",
    country: "Canada",
    tag: "Fellowship",
    title: "Atlas Business Fellowship",
    blurb: "MBA funding and a summer placement with a partner employer for candidates with 2+ years of work experience.",
    deadline: "2026-09-05",
    deadlineLabel: "05 Sep 2026",
    level: "MBA",
    description: "Funds full MBA tuition at a partner business school in Canada and guarantees a paid summer placement with one of Atlas's partner employers between the first and second year of study.",
    requirements: [
      "Minimum 2 years of full-time work experience",
      "GMAT or GRE score (waivers considered case-by-case)",
      "Two professional recommendation letters",
      "Resume / CV",
      "Essay: \"A decision you'd make differently\" (max 700 words)"
    ]
  },
  {
    id: "riverlight-teaching-uganda",
    code: "UG",
    country: "Uganda",
    tag: "Careers",
    title: "Riverlight Teaching Fellows",
    blurb: "A two-year paid teaching placement in rural secondary schools, with a leadership certificate on completion.",
    deadline: "2026-08-22",
    deadlineLabel: "22 Aug 2026",
    level: "Entry-level",
    description: "Riverlight places recent graduates as subject teachers in under-resourced secondary schools for a two-year term, with housing, a monthly salary, and structured mentoring from experienced teachers.",
    requirements: [
      "Bachelor's degree (any subject)",
      "Willingness to relocate to a rural placement",
      "Basic teaching demonstration during interview",
      "CV and cover letter",
      "Clean background check"
    ]
  },
  {
    id: "harborview-public-health-uk",
    code: "GB",
    country: "United Kingdom",
    tag: "Scholarship",
    title: "Harborview Public Health Scholarship",
    blurb: "Master of Public Health funding for candidates planning to return to work in their home health system.",
    deadline: "2026-11-03",
    deadlineLabel: "03 Nov 2026",
    level: "Master's",
    description: "Funds a one-year Master of Public Health degree in the United Kingdom for candidates who commit to returning to work in a public health role in their home country for at least two years after graduation.",
    requirements: [
      "Degree in a health-related field, or 2+ years in public health work",
      "Letter of intent describing planned return to home health system",
      "Two references (one professional)",
      "Academic transcripts",
      "English proficiency test score"
    ]
  },
  {
    id: "meridian-fintech-southafrica",
    code: "ZA",
    country: "South Africa",
    tag: "Careers",
    title: "Meridian Fintech Graduate Programme",
    blurb: "A 12-month rotational graduate programme across product, data and operations at a pan-African fintech.",
    deadline: "2026-08-28",
    deadlineLabel: "28 Aug 2026",
    level: "Entry-level",
    description: "Graduates rotate through three departments — product, data analytics, and operations — over 12 months, with mentoring and a strong track record of converting fellows into permanent roles.",
    requirements: [
      "Degree in a numerate field (finance, engineering, computer science, economics)",
      "Graduated within the last 2 years",
      "Online assessment (logic and numeracy)",
      "CV",
      "Panel interview"
    ]
  }
];

const TESTIMONIALS = [
  {
    initial: "A",
    name: "Aline U.",
    dest: "Master's in Environmental Engineering, Netherlands",
    quote: "I'd rewritten my personal statement four times and still felt lost. One session with the writing desk and it finally sounded like me — just the clearer version."
  },
  {
    initial: "E",
    name: "Eric N.",
    dest: "Business Fellowship, Canada",
    quote: "I found the fellowship listing on a Tuesday and had my recommendation letters ready by Friday. Having a checklist to follow made the whole thing feel possible."
  },
  {
    initial: "D",
    name: "Divine M.",
    dest: "Conservation Careers Placement, Kenya",
    quote: "I wasn't sure I was even eligible. Turns out I was — I just didn't know how to say it on paper. Now I'm three months into the programme."
  },
  {
    initial: "S",
    name: "Samuel K.",
    dest: "MPH Scholarship, United Kingdom",
    quote: "The requirements list on the listing page saved me weeks — I knew exactly what to gather before I even started the application."
  },
  {
    initial: "J",
    name: "Jeanne C.",
    dest: "Teaching Fellowship, Uganda",
    quote: "My interview prep session was blunt in the best way. They told me what wasn't working and we fixed it two days before the real thing."
  },
  {
    initial: "T",
    name: "Thierry B.",
    dest: "Graduate Programme, South Africa",
    quote: "I applied to three programmes at once using the same base documents, lightly rewritten each time. That system alone was worth it."
  }
];

const FAQS = [
  {
    q: "Is MD Scholars free to use?",
    a: "Browsing and reading every opportunity listing is free. Some writing-desk services (essay editing, interview coaching) are paid — pricing is shown before you book anything, and there's never a hidden charge."
  },
  {
    q: "Do you guarantee I'll be accepted?",
    a: "No one can guarantee an admission or hiring decision — that's always up to the institution or employer. What we guarantee is that your paperwork will be complete, well-written, and submitted on time."
  },
  {
    q: "How do you choose which opportunities to list?",
    a: "Every listing is checked against the original source (university, ministry, or employer page) before it goes up, and we note the direct deadline so you're never working from stale information."
  },
  {
    q: "I'm not a student — can I still use this?",
    a: "Yes. Alongside scholarships, we list graduate programmes, fellowships, and entry-level jobs, so recent graduates and early-career professionals use MD Scholars just as often as current students."
  },
  {
    q: "What if I miss a deadline?",
    a: "Subscribe to departure alerts from the homepage — we send a reminder before each deadline you've shown interest in, so nothing closes without you noticing."
  },
  {
    q: "Can I get help with more than one application at a time?",
    a: "Yes — many students apply to several opportunities in the same season. Let your writing-desk editor know upfront so your core documents can be adapted efficiently across applications."
  }
];
