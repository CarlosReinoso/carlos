// Free lessons: /learn/ (every course) and /learn/<course>/ (its contents: modules, lessons, what's coming).
// The lesson pages themselves are static files in public/learn/, listed in `courses` (src/site.mjs).
import { site, spaces, courses, publishedOf, lessonUrl } from "../site.mjs";
import { esc } from "../lib/html.mjs";
import { layout } from "../components/layout.mjs";

const count = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
const total = (c) => c.modules.reduce((n, m) => n + (m.lessons ? m.lessons.length : m.soon), 0);

const join = `<div class="card pad toc-join"><div><b>Learn it with other builders</b><p class="mute">Ask questions, share what you build and get new lessons first in ${esc(site.name)}. It's free.</p></div>
<a class="btn" href="/${spaces.free.slug}/">Join free</a></div>`;

const crumbs = (items) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: site.url + path })),
});

function lessonRow(c, l, n) {
  const num = `<span class="toc-n">${n}</span>`;
  if (!l.slug) return `<li class="toc-l soon">${num}<div><b>${esc(l.title)}</b></div><span class="toc-tag">Coming soon</span></li>`;
  return `<li class="toc-l"><a href="${lessonUrl(c, l)}">${num}<div><b>${esc(l.title)}</b>${l.desc ? `<span class="mute">${esc(l.desc)}</span>` : ""}</div><span class="toc-tag live">Start →</span></a></li>`;
}

function contents(c) {
  let n = 0;
  return c.modules.map((m, i) => {
    const lessons = m.lessons || [];
    const head = `<div class="toc-mh"><span class="toc-mn">Module ${i + 1}</span><h2>${esc(m.title)}</h2><span class="mute small">${count(lessons.length || m.soon, "lesson")}</span></div>`;
    const body = lessons.length ? `<ol class="toc-ls">${lessons.map((l) => lessonRow(c, l, ++n)).join("")}</ol>`
      : `<p class="mute toc-soon">Lessons coming soon. ${(n += m.soon, "")}</p>`;
    return `<section class="card toc-m">${head}${body}</section>`;
  }).join("");
}

function coursePage(c) {
  const first = publishedOf(c)[0];
  return `<div class="wrap narrow-wide toc">
<p class="small"><a href="/learn/">← All lessons</a></p>
<header class="toc-hero"><p class="toc-eye">Free course</p><h1>${esc(c.title)}</h1><p class="mute">${esc(c.desc)}</p>
<ul class="toc-stats"><li><b>${c.modules.length}</b> modules</li><li><b>${total(c)}</b> lessons</li><li><b>${publishedOf(c).length}</b> available now</li></ul>
${first ? `<a class="btn" href="${lessonUrl(c, first)}">Start lesson 1: ${esc(first.title)}</a>` : ""}</header>
<h2 class="sec">Course contents</h2>
${contents(c)}
${join}
</div>`;
}

export default () => [
  {
    path: "/learn/",
    html: layout({
      path: "/learn/", title: "Free AI lessons", tab: "learn",
      desc: "Free visual lessons on AI for beginners and builders, from Carlos Reinoso.",
      body: `<div class="wrap narrow-wide toc"><header class="toc-hero"><p class="toc-eye">Learn</p><h1>Free AI lessons</h1><p class="mute">Short, visual lessons you can work through at your own pace.</p></header>
${courses.map((c) => `<a class="card toc-m toc-course" href="/learn/${c.slug}/"><div class="toc-mh"><h2>${esc(c.title)}</h2><span class="mute small">${count(c.modules.length, "module")} · ${count(total(c), "lesson")} · ${publishedOf(c).length} available now</span></div><p class="mute">${esc(c.desc)}</p></a>`).join("")}
${join}</div>`,
      schema: [crumbs([["Learn", "/learn/"]])],
    }),
  },
  ...courses.map((c) => ({
    path: `/learn/${c.slug}/`,
    html: layout({
      path: `/learn/${c.slug}/`, title: `${c.title}: free course`, desc: c.desc, tab: "learn",
      body: coursePage(c),
      schema: [
        crumbs([["Learn", "/learn/"], [c.title, `/learn/${c.slug}/`]]),
        {
          "@context": "https://schema.org", "@type": "Course", name: c.title, description: c.desc, url: `${site.url}/learn/${c.slug}/`,
          isAccessibleForFree: true, provider: { "@type": "Person", name: "Carlos Reinoso", url: site.url + "/carlos/" },
          hasPart: publishedOf(c).map((l) => ({ "@type": "LearningResource", name: l.title, url: site.url + lessonUrl(c, l) })),
        },
      ],
    }),
  })),
];
