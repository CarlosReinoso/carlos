// Everything about the school that you'd want to change in one place. Used by the page build
// (build.mjs) and by the API (functions/), so the two never disagree.
export const site = {
  url: "https://school.carlosreinoso.co.uk",
  name: "AI Builders",
  // Paste a YouTube video ID here to replace the placeholder (e.g. "dQw4w9WgXcQ").
  introVideoId: "",
  categories: [
    { id: "announcements", label: "Announcements", icon: "📣", ownerOnly: true },
    { id: "general", label: "General", icon: "💬" },
    { id: "wins", label: "Wins", icon: "🏆" },
    { id: "questions", label: "Questions", icon: "🙋" },
    { id: "resources", label: "Resources", icon: "📚" },
  ],
};

// Two communities in one school: everyone who joins is in AI Builders (free); AI Builders Pro is the paid space
// with its own feed. Set the real Pro amount in Stripe (STRIPE_PRICE_ID); `price` here is only the label.
export const spaces = {
  free: {
    id: "free", slug: "ai-builders", name: "AI Builders", price: "Free", logo: "AB",
    tagline: "Learn Claude Code, AI agents & automation by building real projects. Free.",
  },
  pro: {
    id: "pro", slug: "ai-builders-pro", name: "AI Builders Pro", price: "£10/month", logo: "PRO",
    priceNote: "Cancel any time from your settings.",
    tagline: "The full courses, build-along projects, templates and weekly Q&A with me. Ship your first AI product.",
  },
};

export const owner = {
  name: "Carlos Reinoso",
  handle: "carlos",
  bio: "I teach people to build real things with AI: websites, tools and automations that actually ship. Web developer in the UK.",
  location: "United Kingdom",
  avatar: "/carlos.jpg",
  socials: {
    instagram: "https://instagram.com/carlos.reinoso_/",
    youtube: "",
    linkedin: "https://linkedin.com/in/carlos-reinoso-bless/",
    x: "",
  },
};

// Points come from likes on your posts and comments (one like = one point). Same curve as Skool.
export const levels = [
  { at: 0, name: "Curious" },
  { at: 5, name: "Prompter" },
  { at: 20, name: "Tinkerer" },
  { at: 65, name: "Builder" },
  { at: 155, name: "Automator" },
  { at: 515, name: "Agent Wrangler" },
  { at: 2015, name: "Specialist" },
  { at: 8015, name: "Architect" },
  { at: 33015, name: "AI Master" },
];

// Asked once, when someone joins. Answers are visible to you on the Members page.
export const joinQuestions = [
  {
    id: "putting_off",
    type: "text",
    label: "Be honest: what's one thing you keep putting off because it feels like too much work, and how would your week change if AI did it for you? (optional)",
    placeholder: "e.g. Writing proposals for clients. I'd get my Sunday evenings back and probably close more deals.",
    optional: true,
  },
  {
    id: "level",
    type: "choice",
    label: "Where are you with AI right now?",
    options: [
      "I've barely used it",
      "I use ChatGPT/Claude for chat",
      "I've built a few automations or prompts",
      "I build software with AI agents (Claude Code, Codex…)",
    ],
  },
  { id: "source", type: "text", label: "Where did you find me? (optional)", placeholder: "YouTube, Instagram, a friend…", optional: true },
];

// Free public lessons under /learn/. A lesson with a `slug` is published: a self-contained page at
// public/learn/<course>/<lesson>/index.html. Lessons without one show as "Coming soon". This list builds the
// /learn/ index, the course contents pages and the sitemap.
export const courses = [
  {
    slug: "ai-fundamentals",
    title: "AI Fundamentals",
    desc: "A visual, beginner-friendly introduction to artificial intelligence: what it is, how it works and where it shows up in everyday life.",
    modules: [
      {
        title: "Introduction to AI",
        lessons: [
          { slug: "what-is-ai", title: "What is AI?", desc: "What artificial intelligence actually is, why it's an umbrella term, and how AI systems perceive, reason, act and learn." },
          { title: "AI in everyday life" },
          { title: "Narrow vs general AI" },
          { title: "Quiz: check what you know" },
        ],
      },
      { title: "History and evolution", soon: 4 },
      { title: "Core concepts", soon: 4 },
      { title: "Practical tools and platforms", soon: 5 },
      { title: "Build and share your AI project", soon: 2 },
    ],
  },
];

export const lessonsOf = (c) => c.modules.flatMap((m) => m.lessons || []);
export const publishedOf = (c) => lessonsOf(c).filter((l) => l.slug);
