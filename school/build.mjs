// Static site build. Run: node build.mjs -> ./dist
// Each file in src/pages/ returns a list of { path, html }; this writes them out next to public/.
import { mkdirSync, writeFileSync, readFileSync, rmSync, cpSync } from "node:fs";
import about from "./src/pages/about.mjs";
import profile from "./src/pages/profile.mjs";
import app from "./src/pages/app.mjs";
import learn from "./src/pages/learn.mjs";
import { site, courses, lessonsOf, publishedOf, lessonUrl } from "./src/site.mjs";
import { esc } from "./src/lib/html.mjs";

rmSync("dist", { recursive: true, force: true });
cpSync("public", "dist", { recursive: true });

const pages = [...about(), ...profile(), ...app(), ...learn()];
for (const { path, html } of pages) {
  mkdirSync("dist" + path, { recursive: true });
  writeFileSync("dist" + path + "index.html", html);
}

// Lesson pages are hand-made, self-contained files. Add a footer to each one: back to the course, the next
// lesson, the community. Reaching it marks the lesson done in localStorage (the community course card reads it).
const lessonNavCss = `<style>.lesson-nav{max-width:860px;margin:40px auto 60px;padding:0 16px;display:grid;gap:12px}
.lesson-nav .ln{display:flex;gap:12px;flex-wrap:wrap;justify-content:space-between;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:18px 20px}
.lesson-nav .ln small{display:block;color:var(--muted);font-size:12px;letter-spacing:.12em;text-transform:uppercase}.lesson-nav .ln b{font-size:18px;color:var(--text)}
.lesson-nav .ln-next{text-decoration:none;border-color:color-mix(in srgb,var(--accent) 45%,var(--line))}.lesson-nav .ln-next:hover{background:color-mix(in srgb,var(--accent) 10%,var(--panel))}
.lesson-nav .ln-go{color:var(--accent);font-weight:650;white-space:nowrap}.lesson-nav .ln-links{display:flex;gap:18px;flex-wrap:wrap;justify-content:center;font-size:15px}</style>`;
const markDone = `<script>new IntersectionObserver(function(e,o){if(!e[0].isIntersecting)return;o.disconnect();try{var k="sc_lessons",d=JSON.parse(localStorage.getItem(k)||"[]");if(d.indexOf(location.pathname)<0){d.push(location.pathname);localStorage.setItem(k,JSON.stringify(d))}}catch(x){}}).observe(document.querySelector(".lesson-nav"))</script>`;
for (const c of courses) {
  const all = lessonsOf(c);
  for (const l of publishedOf(c)) {
    const file = `dist${lessonUrl(c, l)}index.html`, next = all[all.indexOf(l) + 1];
    const nextHtml = !next ? `<div class="ln"><div><small>Course complete</small><b>You've finished ${esc(c.title)} 🎉</b></div></div>`
      : next.slug ? `<a class="ln ln-next" href="${lessonUrl(c, next)}"><div><small>Next lesson</small><b>${esc(next.title)}</b></div><span class="ln-go">Continue →</span></a>`
      : `<div class="ln"><div><small>Next lesson · coming soon</small><b>${esc(next.title)}</b></div><a class="ln-go" href="/community/">Get notified in the community →</a></div>`;
    const nav = `<nav class="lesson-nav" aria-label="Lesson">${nextHtml}<div class="ln-links"><a href="/learn/${c.slug}/">← ${esc(c.title)} contents</a><a href="/learn/">All lessons</a><a href="/community/">Discuss in the community</a></div></nav>`;
    writeFileSync(file, readFileSync(file, "utf8").replace("</main>", `${nav}\n</main>`).replace("</head>", `${lessonNavCss}</head>`).replace("</body>", `${markDone}\n</body>`));
  }
}

const indexed =["/ai-builders/", "/ai-builders-pro/", "/carlos/", "/learn/",
  ...courses.flatMap((c) => [`/learn/${c.slug}/`, ...publishedOf(c).map((l) => `/learn/${c.slug}/${l.slug}/`)])];
writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${indexed.map((p) => `<url><loc>${site.url}${p}</loc></url>`).join("")}</urlset>\n`);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${site.url}/sitemap.xml\n`);
console.log(`Built ${pages.length} pages into dist/`);
