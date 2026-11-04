// The signed-in screens. Each is a small HTML shell; its script in public/ does the work.
import { site, spaces, joinQuestions } from "../site.mjs";
import { esc } from "../lib/html.mjs";
import { layout } from "../components/layout.mjs";

const page = (path, title, tab, body, scripts, data) =>
  ({ path, html: layout({ path, title, desc: `${title} · ${site.name}`, body, tab, scripts, data, noindex: true }) });

export default () => [
  page("/login/", "Log in", "", `<div class="wrap narrow"><div class="card pad" id="login-root"></div></div>`, ["auth.js", "login.js"]),

  page("/join/", "Join", "about", `<div class="wrap narrow"><div class="card pad" id="join-root"><p class="mute">Loading…</p></div></div>`,
    ["auth.js", "join.js"], { questions: joinQuestions, name: site.name, pro: spaces.pro }),

  page("/community/", "Community", "community", `
<div class="wrap community">
  <section class="feed-col">
    <div id="composer"></div>
    <div class="cats" id="cats"></div>
    <div id="feed"><p class="mute">Loading…</p></div>
  </section>
  <aside class="side-col" id="side"></aside>
</div>`, ["community.js"], { categories: site.categories, name: site.name, spaces }),

  page("/members/", "Members", "members", `<div class="wrap narrow-wide"><div id="members-root"><p class="mute">Loading…</p></div></div>`, ["members.js"]),

  page("/messages/", "Messages", "", `<div class="wrap"><div class="card chat" id="chat-root"><p class="mute pad">Loading…</p></div></div>`, ["messages.js"]),

  page("/notifications/", "Notifications", "", `<div class="wrap narrow"><div class="card" id="notif-root"><p class="mute pad">Loading…</p></div></div>`, ["notifications.js"]),

  page("/settings/", "Settings", "", `<div class="wrap narrow"><div class="card pad" id="settings-root"><p class="mute">Loading…</p></div></div>`, ["settings.js"]),

  ...[
    ["/privacy/", "Privacy Policy", `<p class="mute">Last updated 4 November 2026. This policy covers AI Builders and AI Builders Pro at school.carlosreinoso.co.uk, run by Carlos Reinoso (United Kingdom).</p>
<h2>What we collect</h2><ul>
<li><b>Account details:</b> your e-mail address and, if you sign in with Google, your name and profile photo from your Google account.</li>
<li><b>What you add:</b> your answers to the join questions, profile details (bio, location), posts, comments, likes, follows and direct messages.</li>
<li><b>Payments:</b> if you join Pro, Stripe processes your payment. We store your Stripe customer and subscription IDs; we never see or store your card details.</li>
<li><b>Basic activity:</b> when you were last active, so the site can show "online" and your activity map.</li></ul>
<h2>Google user data</h2><p>"Sign in with Google" asks only for your name, e-mail address and profile photo (the openid, email and profile scopes). We use them only to create your account, sign you in and show your name and photo on your profile and posts. We do not use Google user data for advertising, we do not sell it, and we do not share it with anyone except as needed to run the site (our hosting provider, Cloudflare). We do not access any other Google data such as Gmail, Drive or contacts. Our use of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
<h2>How we use it</h2><p>To run the community: your profile, posts and messages are visible to other members as the site shows them; your join answers and e-mail address are visible only to Carlos. We send e-mails only for login codes. We use a single sign-in cookie and no advertising or tracking cookies.</p>
<h2>Who processes it</h2><p>Cloudflare (hosting and database), Stripe (payments), Resend (login e-mails) and Google (if you choose Google sign-in).</p>
<h2>Keeping and deleting your data</h2><p>We keep your data while you have an account. To delete your account and everything linked to it, or to get a copy of your data, e-mail <a href="mailto:hello@carlosreinoso.co.uk">hello@carlosreinoso.co.uk</a> or message Carlos in the school; we do it within 30 days. You can also remove this site's access to your Google account at any time at <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>.</p>
<h2>Contact</h2><p>Questions about this policy: <a href="mailto:hello@carlosreinoso.co.uk">hello@carlosreinoso.co.uk</a>.</p>`],
    ["/terms/", "Terms of Service", `<p class="mute">Last updated 4 November 2026. By using AI Builders (school.carlosreinoso.co.uk), run by Carlos Reinoso, you agree to these terms.</p><p>AI Builders is free. AI Builders Pro is billed through Stripe and you can cancel any time from Settings; Pro access continues to the end of the period you've paid for. Be kind: no spam, no selling in the community without permission, and no sharing other members' private messages. Accounts that break these rules can be removed.</p><p>Course content is for your own use; please don't republish it. The site is provided as is; we may change or end features, and we're not liable for indirect losses. These terms are governed by the laws of England and Wales. Contact: <a href=\"mailto:hello@carlosreinoso.co.uk\">hello@carlosreinoso.co.uk</a>.</p>`],
  ].map(([path, title, text]) => ({ path, html: layout({ path, title, desc: `${title} · ${site.name}`, body: `<div class="wrap narrow"><div class="card pad prose"><h1>${title}</h1>${text}</div></div>` }) })),
];
