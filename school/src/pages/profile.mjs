// Profiles. /carlos/ is built with the owner's details so it ranks and previews well; every other member's
// profile is /u/<handle>, served by the /profile/ shell (see public/_redirects). profile.js fills both in.
import { site, spaces, owner, levels } from "../site.mjs";
import { esc } from "../lib/html.mjs";
import { icons } from "../components/icons.mjs";
import { layout } from "../components/layout.mjs";

const socials = Object.entries(owner.socials).filter(([, url]) => url)
  .map(([k, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener me" aria-label="${k}">${icons[k]}</a>`).join("");

const shell = (card, data) => `
<div class="wrap profile">
  <section class="pf-main">
    <h2 class="sec">Activity</h2>
    <div class="card heat" id="heat"><p class="mute small">Loading activity…</p></div>
    <div id="pf-extra">${data.owner ? ownedBy : ""}</div>
    <div id="contribs"></div>
  </section>
  <aside class="pf-side"><div class="card pf-card" id="pf-card">${card}</div></aside>
</div>`;

// Like Skool's "Owned by": one row per community, linking to its landing page.
const ownedBy = `<h2 class="sec">Owned by ${esc(owner.name.split(" ")[0])}</h2>
<div class="card owned">${Object.values(spaces).map((s) => `<div class="owned-item">
<div class="owned-row"><span class="owned-logo${s.id === "pro" ? " pro" : ""}">${s.logo}</span><div><b>${esc(s.name)}</b><div class="mute small">${icons.users} <span data-stat="${s.id === "pro" ? "pro" : "members"}">–</span> members · ${esc(s.price)}</div></div><a class="btn sm" href="/${s.slug}/">View</a></div>
<p class="mute">${esc(s.tagline)}</p></div>`).join("")}</div>`;

const ownerCard = `<div class="pf-avatar"><img src="${owner.avatar}" alt="${esc(owner.name)}" width="180" height="180"></div>
<h1 class="pf-name">${esc(owner.name)}</h1><p class="pf-handle">@${owner.handle}</p><p class="pf-bio">${esc(owner.bio)}</p>
<ul class="pf-meta"><li>${icons.pin} ${esc(owner.location)}</li></ul><div class="pf-social">${socials}</div>`;

export default () => [
  {
    path: "/carlos/",
    html: layout({
      path: "/carlos/", title: owner.name, desc: `${owner.name} (@${owner.handle}): ${owner.bio}`, image: owner.avatar,
      body: shell(ownerCard, { owner: true }), scripts: ["profile.js"], data: { handle: owner.handle, spaces, levels: levels.map((l) => l.at) },
      schema: [{ "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: { "@type": "Person", name: owner.name, alternateName: "@" + owner.handle, description: owner.bio, image: site.url + owner.avatar, sameAs: Object.values(owner.socials).filter(Boolean) } }],
    }),
  },
  {
    path: "/profile/",
    html: layout({ path: "/profile/", title: "Profile", desc: `A member of ${site.name}.`, body: shell('<p class="mute">Loading…</p>', {}), scripts: ["profile.js"], noindex: true, data: { spaces, levels: levels.map((l) => l.at) } }),
  },
];
