// Free lessons: /learn/ (every course) and /learn/<course>/ (its lessons). The lesson pages themselves are
// static files in public/learn/, listed in `courses` (src/site.mjs).
import { site, spaces, courses } from "../site.mjs";
import { esc } from "../lib/html.mjs";
import { layout } from "../components/layout.mjs";

const lessonList = (c) => `<ol class="card pad" style="margin:0;padding-left:44px">${c.lessons.map((l) =>
  `<li style="margin:6px 0"><a href="/learn/${c.slug}/${l.slug}/"><b>${esc(l.title)}</b></a><br><span class="mute">${esc(l.desc)}</span></li>`).join("")}</ol>`;

const join = `<p class="center" style="margin:28px 0"><a class="btn" href="/${spaces.free.slug}/">Join ${esc(site.name)} free</a></p>`;

const crumbs = (items) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: site.url + path })),
});

export default () => [
  {
    path: "/learn/",
    html: layout({
      path: "/learn/", title: "Free AI lessons", tab: "about",
      desc: "Free visual lessons on AI for beginners and builders, from Carlos Reinoso.",
      body: `<div class="wrap narrow"><h1>Free AI lessons</h1><p class="mute">Short, visual lessons you can work through at your own pace.</p>
${courses.map((c) => `<h2 class="sec"><a href="/learn/${c.slug}/">${esc(c.title)}</a></h2><p class="mute">${esc(c.desc)}</p>${lessonList(c)}`).join("")}${join}</div>`,
      schema: [crumbs([["Learn", "/learn/"]])],
    }),
  },
  ...courses.map((c) => ({
    path: `/learn/${c.slug}/`,
    html: layout({
      path: `/learn/${c.slug}/`, title: c.title, desc: c.desc, tab: "about",
      body: `<div class="wrap narrow"><p class="small"><a href="/learn/">← All lessons</a></p><h1>${esc(c.title)}</h1><p class="mute">${esc(c.desc)}</p>${lessonList(c)}${join}</div>`,
      schema: [
        crumbs([["Learn", "/learn/"], [c.title, `/learn/${c.slug}/`]]),
        { "@context": "https://schema.org", "@type": "Course", name: c.title, description: c.desc, provider: { "@type": "Person", name: "Carlos Reinoso", url: site.url + "/carlos/" } },
      ],
    }),
  })),
];
