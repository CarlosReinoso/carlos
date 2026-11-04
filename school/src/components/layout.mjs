// Page shell: <head>, top bar (logo, search, messages, notifications, account), tabs and footer.
import { site } from "../site.mjs";
import { esc, json } from "../lib/html.mjs";
import { icons, logoMark } from "./icons.mjs";

const TABS = [["community", "Community", "/community/"], ["members", "Members", "/members/"], ["about", "About", "/ai-builders/"]];

// Runs before paint so the saved theme never flashes.
const themeBoot = `<script>try{var t=localStorage.getItem("sc_theme");document.documentElement.dataset.theme=t||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}catch(e){}</script>`;

export function layout({ path, title, desc, body, tab = "", scripts = [], noindex = false, schema = [], data = null, image = "/carlos.jpg" }) {
  const full = title === site.name ? title : `${title} · ${site.name}`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(full)}</title><meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${site.url}${path}">${noindex ? '\n<meta name="robots" content="noindex">' : ""}
<meta property="og:type" content="website"><meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${site.url}${path}"><meta property="og:image" content="${site.url}${image}"><meta name="twitter:card" content="summary">
<meta name="theme-color" content="#10131a"><link rel="icon" href="/favicon.svg" type="image/svg+xml">
${themeBoot}
<link rel="stylesheet" href="/style.css">
${schema.map((s) => `<script type="application/ld+json">${json(s)}</script>`).join("\n")}
</head><body>
<header class="top"><div class="top-in">
<a class="brand" href="/"><span class="brand-mark">${logoMark}</span><span class="brand-name">${esc(site.name)}</span></a>
<form class="search" action="/community/" role="search"><span>${icons.search}</span><input name="q" type="search" placeholder="Search" aria-label="Search posts"></form>
<div class="hdr"><div id="hdr" class="hdr-acts"></div><button class="icon-btn theme" id="theme-btn" type="button" aria-label="Toggle dark mode">${icons.moon}${icons.sun}</button></div>
</div>
<nav class="tabs" aria-label="School"><div class="tabs-in">${TABS.map(([id, label, href]) => `<a href="${href}"${tab === id ? ' class="on" aria-current="page"' : ""}>${label}</a>`).join("")}</div></nav>
</header>
<main>${body}</main>
<footer class="foot"><div class="wrap foot-in"><span>© ${new Date().getFullYear()} Carlos Reinoso · <a href="https://carlosreinoso.co.uk">carlosreinoso.co.uk</a></span><span><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></span></div></footer>
${data ? `<script>window.PAGE=${json(data)}</script>` : ""}
<script src="/app.js" defer></script>
${scripts.map((s) => `<script src="/${s}" defer></script>`).join("\n")}
</body></html>
`;
}
