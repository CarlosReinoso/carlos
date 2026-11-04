// Static site build. Run: node build.mjs -> ./dist
// Each file in src/pages/ returns a list of { path, html }; this writes them out next to public/.
import { mkdirSync, writeFileSync, rmSync, cpSync } from "node:fs";
import about from "./src/pages/about.mjs";
import profile from "./src/pages/profile.mjs";
import app from "./src/pages/app.mjs";
import { site } from "./src/site.mjs";

rmSync("dist", { recursive: true, force: true });
cpSync("public", "dist", { recursive: true });

const pages = [...about(), ...profile(), ...app()];
for (const { path, html } of pages) {
  mkdirSync("dist" + path, { recursive: true });
  writeFileSync("dist" + path + "index.html", html);
}

const indexed = ["/ai-builders/", "/ai-builders-pro/", "/carlos/"];
writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${indexed.map((p) => `<url><loc>${site.url}${p}</loc></url>`).join("")}</urlset>\n`);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${site.url}/sitemap.xml\n`);
console.log(`Built ${pages.length} pages into dist/`);
