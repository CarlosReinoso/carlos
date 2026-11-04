// Profiles (/carlos/ and /u/<handle>/): level ring, stats, follow and chat, the activity map and contributions.
(function () {
  var P = window.PAGE || {};
  var handle = P.handle || decodeURIComponent((location.pathname.match(/^\/u\/([^/]+)/) || [])[1] || "");
  var card = document.getElementById("pf-card"), heat = document.getElementById("heat"), contribs = document.getElementById("contribs");
  var ICON = {
    clock: '<svg class="i" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    cal: '<svg class="i" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    pin: '<svg class="i" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  };
  // Keep the built-in social links on /carlos/ when the card is redrawn.
  var socials = card.querySelector(".pf-social"), socialHtml = socials ? socials.outerHTML : "";

  if (!handle) { card.innerHTML = '<p class="mute">No member here.</p>'; return; }
  Promise.all([S.me, S.api("/api/profile/" + encodeURIComponent(handle))]).then(function (r) {
    var me = r[0], d = r[1];
    drawCard(d, me); drawHeat(d.heatmap);
    document.title = d.user.name + " · " + document.title.split(" · ").pop();
    if (!P.handle && d.viewerMember) {
      var since = "Member since " + new Date(d.user.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" });
      var row = function (s) { return '<div class="owned-row"><span class="owned-logo' + (s.id === "pro" ? " pro" : "") + '">' + s.logo + "</span><div><b>" + S.esc(s.name) + '</b><div class="mute small">' + S.esc(s.price) + '</div></div><a class="pillbtn sm" href="/' + s.slug + '/">View</a></div>'; };
      document.getElementById("pf-extra").innerHTML = '<h2 class="sec">Memberships</h2><div class="card owned"><p class="mute small" style="margin:0 0 10px">' + since + '</p><div class="memberships">' + row(P.spaces.free) + (d.user.pro ? row(P.spaces.pro) : "") + "</div></div>";
    }
    drawContribs(d);
  }).catch(function (x) {
    if (P.handle) { heat.innerHTML = '<p class="mute small">Activity shows up here once ' + S.esc(handle) + " starts posting.</p>"; drawHeat({}); return; }
    card.innerHTML = '<p class="mute">' + S.esc(x.message) + "</p>"; heat.innerHTML = "";
  });

  function drawCard(d, me) {
    var u = d.user, L = u.levelInfo;
    // Progress ring = share of the way from this level's threshold to the next.
    var pct = L.toNext ? Math.max(4, Math.round(100 * (u.points - AT[L.level - 1]) / (AT[L.level] - AT[L.level - 1]))) : 100;
    var big = u.avatar ? '<img src="' + S.esc(u.avatar) + '" alt="" referrerpolicy="no-referrer">' : '<span class="ini">' + S.esc(u.name.charAt(0).toUpperCase()) + "</span>";
    card.innerHTML =
      '<div class="pf-avatar" style="--p:' + pct + '">' + big + '<span class="lvl">' + L.level + "</span></div>" +
      '<p class="pf-level">Level ' + L.level + " · " + S.esc(L.name) + "</p>" +
      '<p class="pf-toup">' + (L.toNext ? "<b>" + L.toNext + "</b> points to level up" : "Max level 🏆") + "</p>" +
      '<h1 class="pf-name"></h1><p class="pf-handle">@' + S.esc(u.handle) + (u.owner ? ' <span class="owner-tag">Owner</span>' : u.pro ? ' <span class="pro-tag">PRO</span>' : "") + "</p>" +
      (u.bio ? '<p class="pf-bio"></p>' : "") +
      '<ul class="pf-meta"><li>' + ICON.clock + " " + (u.lastActiveAt && Date.now() - u.lastActiveAt < 5 * 60e3 ? "Online now" : "Active " + (u.lastActiveAt ? S.ago(u.lastActiveAt) + " ago" : "a while ago")) + "</li>" +
      "<li>" + ICON.cal + " Joined " + new Date(u.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) + "</li>" +
      (u.location ? "<li>" + ICON.pin + " " + S.esc(u.location) + "</li>" : "") + "</ul>" +
      '<div class="pf-stats"><div><b>' + S.fmt(d.stats.contributions) + "</b><span>Contributions</span></div><div><b data-followers>" + S.fmt(d.stats.followers) + "</b><span>Followers</span></div><div><b>" + S.fmt(d.stats.following) + "</b><span>Following</span></div></div>" +
      '<div class="pf-btns"></div>' + socialHtml;
    card.querySelector(".pf-name").textContent = u.name;
    if (u.bio) card.querySelector(".pf-bio").textContent = u.bio;
    var btns = card.querySelector(".pf-btns");
    if (d.isMe) btns.innerHTML = '<a class="pillbtn" href="/settings/">Edit profile</a>';
    else if (me.member) {
      btns.innerHTML = '<button class="btn" type="button" data-follow>' + (d.following ? "Following" : "Follow") + '</button><a class="pillbtn" href="/messages/?to=' + encodeURIComponent(u.handle) + '">Chat 💬</a>';
      var fb = btns.querySelector("[data-follow]");
      fb.onclick = function () {
        fb.disabled = true;
        S.api("/api/follow", { handle: u.handle }).then(function (r) { fb.textContent = r.following ? "Following" : "Follow"; card.querySelector("[data-followers]").textContent = S.fmt(r.followers); fb.disabled = false; })
          .catch(function (x) { S.toast(x.message); fb.disabled = false; });
      };
    } else btns.innerHTML = '<a class="btn" href="/join/">Join to follow & chat</a>';
  }
  var AT = P.levels; // level thresholds from src/site.mjs

  // GitHub-style map of the last 52 weeks, Monday to Sunday, in the viewer's time zone.
  function drawHeat(map) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var start = new Date(today); start.setDate(start.getDate() - 7 * 52 - ((today.getDay() + 6) % 7));
    var cells = "", months = "", lastMonth = -1, total = 0, week = 0;
    for (var d = new Date(start); week < 53; d.setDate(d.getDate() + 1)) {
      var dow = (d.getDay() + 6) % 7;
      if (dow === 0) {
        var m = d.getMonth();
        months += "<span>" + (m !== lastMonth && week < 52 ? d.toLocaleDateString(undefined, { month: "short" }) : "") + "</span>";
        lastMonth = m;
      }
      var key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      var n = map[key] || 0; total += n;
      var lv = n === 0 ? 0 : n < 2 ? 1 : n < 4 ? 2 : n < 8 ? 3 : 4;
      cells += d > today ? '<i class="future"></i>' : '<i data-l="' + lv + '" title="' + n + " contribution" + (n === 1 ? "" : "s") + " on " + d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) + '"></i>';
      if (dow === 6) week++;
    }
    heat.innerHTML = '<div class="hm"><div class="hm-days"><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span><span>Sun</span></div><div><div class="hm-months">' + months + '</div><div class="hm-grid">' + cells + "</div></div></div>" +
      '<div class="hm-foot"><span title="Posts, comments and likes, per day">' + total + ' contributions in the last year</span><span class="hm-legend">Less <i></i><i style="background:color-mix(in srgb,#2ea44f 35%,var(--heat0))"></i><i style="background:color-mix(in srgb,#2ea44f 60%,var(--heat0))"></i><i style="background:color-mix(in srgb,#2ea44f 82%,var(--heat0))"></i><i style="background:#2ea44f"></i> More</span></div>';
  }

  function drawContribs(d) {
    if (!d.viewerMember) { contribs.innerHTML = '<div class="card empty">Join the school to see ' + S.esc(d.user.name.split(" ")[0]) + "'s posts and comments.<br><br><a class=\"btn\" href=\"/join/\">Join</a></div>"; return; }
    var items = d.posts.map(function (p) { return { t: p.createdAt, p: p }; }).concat(d.comments.map(function (c) { return { t: c.createdAt, c: c }; })).sort(function (a, b) { return b.t - a.t; });
    contribs.innerHTML = '<h2 class="sec">' + S.fmt(d.stats.contributions) + " contributions</h2>";
    if (!items.length) contribs.insertAdjacentHTML("beforeend", '<div class="card empty">Nothing yet.</div>');
    items.forEach(function (it) {
      if (it.p) {
        var p = it.p, el = S.el('<a class="card post" href="/community/?post=' + p.id + '" style="display:block;text-decoration:none;color:inherit"><div class="p-head">' + S.avatar(p.author, 38, { link: false }) + '<div class="p-who"><b>' + S.esc(p.author.name) + '</b><div class="meta">' + S.ago(p.createdAt) + '</div></div></div><h3></h3><div class="p-body"></div><div class="p-foot"><span>👍 ' + p.likes + "</span><span>💬 " + p.comments + "</span></div></a>");
        el.querySelector("h3").textContent = p.title; el.querySelector(".p-body").textContent = p.body;
        contribs.appendChild(el);
      } else {
        var c = it.c, ce = S.el('<div class="card c-item"><div class="on-post">Commented on <a href="/community/?post=' + c.postId + "#c" + c.id + '"></a> · ' + S.ago(c.createdAt) + '</div><div class="t"></div></div>');
        ce.querySelector("a").textContent = c.postTitle; ce.querySelector(".t").textContent = c.body;
        contribs.appendChild(ce);
      }
    });
  }

  S.api("/api/stats").then(function (s) { document.querySelectorAll("[data-stat]").forEach(function (el) { el.textContent = S.fmt(s[el.dataset.stat]); }); }).catch(function () {});
})();
