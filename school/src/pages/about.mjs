// The two landing pages: /ai-builders/ (free, also the home page) and /ai-builders-pro/ (paid).
// Video, what's inside, who it's from, and the join card. Copy lives in `copy` below.
import { site, spaces, owner } from "../site.mjs";
import { esc } from "../lib/html.mjs";
import { icons } from "../components/icons.mjs";
import { layout } from "../components/layout.mjs";

const intro = `<p>If you're new: hi 👋 I'm Carlos. I'm a web developer in the UK. I've been building with AI every day: this very school, and a full exam-prep site with accounts, Stripe payments and an AI tutor, shipped in days instead of months.</p>`;

const copy = {
  free: `
    <p><b>AI Builders</b> is the free home for people who use AI every day and want to go from using it to building with it. If you've done a bit of coding and don't want to be left behind, this is for you.</p>
    <p>What's inside ⬇️</p>
    <p>✅ Free visual lessons in a clear order, so you always know what to learn next<br>
    ✅ The AI Product Teardown: four questions for working out what any AI tool really does and where it breaks<br>
    ✅ A place to ask questions, share what you're building and get unstuck, with replies from me<br>
    ✅ My prompts, workflows and tool picks, shared as I use them<br>
    ✅ Levels and a leaderboard, so showing up and helping others gets noticed</p>
    <p>Founding members 🎁</p>
    <p>🎁 The first 20 members get a 20-minute call with me to plan their first steps<br>
    🎁 A say in what I teach next: I'm learning in public, mistakes included<br>
    🎁 Direct messages with me and other members<br>
    🎁 Not a glorified sales funnel: the free group is genuinely useful on its own<br>
    🎁 Heavily moderated and spam-free</p>
    ${intro}
    <p>I also post free lessons on <a href="https://www.youtube.com/@carlos.reinoso" target="_blank" rel="noopener">my YouTube channel</a>.</p>
    <p>Want to go all in? <a href="/${spaces.pro.slug}/">AI Builders Pro</a> adds weekly Q&amp;A, reviews of what you're building and new build-alongs as they ship.</p>
    <p>Welcome aboard. Let's build. 🚀</p>`,
  pro: `
    <p><b>AI Builders Pro</b> is where we go from "I've tried AI" to shipping your first real AI product, with me in your corner. It's new and I'm building it in the open, so founding members decide what comes first.</p>
    <p>What you get now ⬇️</p>
    <p>✅ Weekly Q&amp;A posts where I answer your questions and review what you're building<br>
    ✅ A private Pro feed, separate from the free group<br>
    ✅ My templates, prompts and project starters, added as I make them</p>
    <p>On the way, included as each one ships 🛠️</p>
    <p>🛠️ Build-along projects: a full website with accounts and Stripe payments, AI tools, scrapers<br>
    🛠️ Courses: Claude Code, AI agents, automations, deploying and getting paid</p>
    <p>Bonuses 🎁</p>
    <p>🎁 Everything in AI Builders (free) too<br>
    🎁 Priority replies to your DMs<br>
    🎁 ${esc(spaces.pro.priceNote)}</p>
    ${intro}
    <p>I'm putting everything I learn in one place, so you can skip the months of trial and error.</p>
    <p>See you inside. 🚀</p>`,
};

const video = site.introVideoUrl
  ? `<div class="video"><video src="${esc(site.introVideoUrl)}" poster="${esc(site.introVideoPoster)}" controls playsinline preload="metadata" aria-label="Welcome to ${esc(site.name)}"></video></div>`
  : site.introVideoId
  ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${esc(site.introVideoId)}" title="Welcome to ${esc(site.name)}" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
  : `<div class="video placeholder" role="img" aria-label="Intro video coming soon"><div class="vp-grid"></div><span class="vp-play">${icons.play}</span><span class="vp-cap">Intro video coming soon</span></div>`;

const thumbs = [["Welcome", "👋"], ["Course map", "🗺️"], ["Lessons", "📚"], ["Teardown", "🧰"], ["Wins", "🏆"]];

function body(s) {
  const pro = s.id === "pro", stat = pro ? "pro" : "members";
  return `
<div class="wrap about">
  <article class="card about-main">
    <h1 class="about-title">${esc(s.name)}</h1>
    ${video}
    <div class="thumbs">${thumbs.map(([t, e], i) => `<div class="thumb${i === 0 ? " on" : ""}"><span>${e}</span><small>${t}</small></div>`).join("")}</div>
    <ul class="facts">
      <li>${icons.lock} Private</li>
      <li>${icons.users} <span data-stat="${stat}">–</span>&nbsp;members</li>
      <li>${icons.tag} ${esc(s.price)}</li>
      <li><a class="by" href="/carlos/"><img src="${owner.avatar}" alt="" width="24" height="24"> By ${esc(owner.name)}</a></li>
    </ul>
    <div class="prose">${copy[s.id]}</div>
  </article>
  <aside class="about-side">
    <div class="card join-card">
      <div class="jc-banner${pro ? " pro" : ""}"><img src="${owner.avatar}" alt="${esc(owner.name)}"><div><b>${esc(s.name)}</b><span>Learn AI · Build with it</span></div></div>
      <div class="jc-body">
        <h2>${esc(s.name)}${pro ? ' <span class="pro-tag">PRO</span>' : ""}</h2>
        <p class="mute small">school.carlosreinoso.co.uk/${s.slug}</p>
        <p>${esc(s.tagline)}</p>
        <div class="jc-stats"><div><b data-stat="${stat}">–</b><span>Members</span></div><div><b data-stat="online">–</b><span>Online</span></div><div><b data-stat="admins">1</b><span>Admins</span></div></div>
        ${pro
          ? `<button class="btn block join-btn" type="button" data-upgrade>Join Pro · ${esc(s.price)}</button><p class="mute small center">${esc(s.priceNote)}</p><p class="err center" role="alert"></p>`
          : `<a class="btn block join-btn" href="/join/">Join group · Free</a><p class="mute small center">Want everything? <a href="/${spaces.pro.slug}/">See Pro</a></p>`}
      </div>
    </div>
  </aside>
</div>`;
}

const page = (s, path, data) => {
  const desc = `${s.tagline} A private community by ${owner.name}.`;
  const schema = [{ "@context": "https://schema.org", "@type": "Course", name: s.name, description: desc, url: `${site.url}/${s.slug}/`, provider: { "@type": "Person", name: owner.name, url: `${site.url}/carlos/` } }];
  return { path, html: layout({ path: `/${s.slug}/`, title: s.name, desc, body: body(s), tab: "about", scripts: ["about.js"], schema, data: { space: s.id, proSlug: spaces.pro.slug, ...data } }) };
};

export default () => [
  page(spaces.free, `/${spaces.free.slug}/`),
  page(spaces.pro, `/${spaces.pro.slug}/`),
  // The home page is the free landing; members are sent on to the community by about.js.
  page(spaces.free, "/", { home: true }),
];
