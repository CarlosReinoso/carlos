// Shared by every page: API helper, escaping, avatars, levels, the theme toggle and the header
// (log in / join, or messages + notifications + account menu, with unread counts polled every 30s).
(function () {
  var S = (window.S = {});

  S.esc = function (s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  // Escapes user text and turns bare links into real ones.
  S.text = function (s) { return S.esc(s).replace(/https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"]/g, function (u) { return '<a href="' + u + '" target="_blank" rel="noopener nofollow ugc">' + u + "</a>"; }); };
  S.el = function (html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; };

  S.api = function (url, body, method) {
    var opts = body === undefined ? { method: method || "GET" } : { method: method || "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
    return fetch(url, opts).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) { if (!r.ok) { var e = new Error(d.error || "Something went wrong."); e.status = r.status; throw e; } return d; });
    }, function () { throw new Error("Network error. Please try again."); });
  };

  S.ago = function (t) {
    if (!t) return "";
    var s = Math.max(1, (Date.now() - t) / 1000);
    if (s < 60) return "now"; if (s < 3600) return Math.floor(s / 60) + "m"; if (s < 86400) return Math.floor(s / 3600) + "h";
    if (s < 86400 * 30) return Math.floor(s / 86400) + "d";
    return new Date(t).toLocaleDateString(undefined, { month: "short", day: "numeric", year: s > 86400 * 300 ? "numeric" : undefined });
  };
  S.fmt = function (n) { return n >= 1e4 ? (n / 1e3).toFixed(n >= 1e5 ? 0 : 1).replace(/\.0$/, "") + "k" : String(n); };

  var COLORS = ["#6b5bd6", "#2f8f83", "#c2553d", "#3b7dd8", "#a2489c", "#b7862a", "#4f7d3a", "#d0476a"];
  // An avatar with an optional level badge. user: { name, handle, avatar, level }.
  S.avatar = function (u, size, opts) {
    opts = opts || {}; size = size || 36;
    var name = (u && (u.name || u.handle)) || "?", c = COLORS[[].reduce.call(name, function (a, ch) { return a + ch.charCodeAt(0); }, 0) % COLORS.length];
    var inner = u && u.avatar ? '<img src="' + S.esc(u.avatar) + '" alt="" loading="lazy" referrerpolicy="no-referrer">' : '<span class="ini" style="--c:' + c + '">' + S.esc(name.trim().charAt(0).toUpperCase()) + "</span>";
    var lv = opts.level !== false && u && u.level ? '<span class="lv">' + u.level + "</span>" : "";
    var tag = opts.link === false || !u ? "span" : "a", href = tag === "a" ? ' href="' + S.profileUrl(u.handle) + '"' : "";
    return "<" + tag + href + ' class="av" style="width:' + size + "px;height:" + size + 'px;font-size:' + size + 'px" title="' + S.esc(name) + '">' + inner + lv + "</" + tag + ">";
  };
  S.profileUrl = function (h) { return h === "carlos" ? "/carlos/" : "/u/" + encodeURIComponent(h) + "/"; };
  S.nameHtml = function (u) { return '<a href="' + S.profileUrl(u.handle) + '">' + S.esc(u.name) + "</a>" + (u.owner ? '<span class="owner-tag">Owner</span>' : ""); };

  S.toast = function (msg) {
    var t = S.el('<div class="toast" role="status"></div>'); t.textContent = msg; document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  };

  // Theme toggle (saved per browser, like the notary site).
  var tb = document.getElementById("theme-btn");
  if (tb) tb.onclick = function () {
    var d = document.documentElement, n = d.dataset.theme === "dark" ? "light" : "dark";
    d.dataset.theme = n; try { localStorage.setItem("sc_theme", n); } catch (e) {}
  };

  // Who's signed in. Pages wait on this before drawing.
  S.me = S.api("/api/me").catch(function () { return { user: null, methods: {} }; });

  var ICON = {
    chat: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
    bell: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/></svg>',
  };
  var badge = function (n) { return n ? '<span class="badge">' + (n > 99 ? "99+" : n) + "</span>" : ""; };

  S.me.then(function (me) {
    var h = document.getElementById("hdr");
    if (!h) return;
    if (!me.user) { h.innerHTML = '<a class="pillbtn sm" href="/login/?next=' + encodeURIComponent(location.pathname + location.search) + '">Log in</a>'; return; }
    if (!me.member) { h.innerHTML = '<a class="btn sm" href="/join/">Join</a><a class="icon-btn" id="hdr-msg" href="/messages/" aria-label="Messages">' + ICON.chat + badge(me.unread.messages) + "</a>" + menuHtml(me); wireMenu(me); return; }
    h.innerHTML =
      '<a class="icon-btn" id="hdr-msg" href="/messages/" aria-label="Messages">' + ICON.chat + badge(me.unread.messages) + "</a>" +
      '<div class="drop"><button class="icon-btn" id="hdr-bell" type="button" aria-label="Notifications" aria-haspopup="true">' + ICON.bell + badge(me.unread.notifications) + "</button></div>" +
      menuHtml(me);
    wireMenu(me);
    document.getElementById("hdr-bell").onclick = function (e) { e.stopPropagation(); toggleNotifs(this.parentNode); };
    setInterval(refreshCounts, 30000);
  });

  function menuHtml(me) {
    return '<div class="drop"><button class="me-btn" id="hdr-me" type="button" aria-label="Account menu" aria-haspopup="true">' + S.avatar(me.user, 34, { link: false, level: false }) + "</button></div>";
  }
  function wireMenu(me) {
    var b = document.getElementById("hdr-me");
    b.onclick = function (e) {
      e.stopPropagation(); var wrap = b.parentNode, open = wrap.querySelector(".menu"); closeMenus(); if (open) return;
      var m = S.el('<div class="menu"><div class="who"><b></b><span class="mute small"></span></div>' +
        (me.member ? '<a href="' + S.profileUrl(me.user.handle) + '">Profile</a>' : '<a href="/join/">Finish joining</a>') +
        '<a href="/settings/">Settings</a>' + (me.member && !me.pro ? '<a href="/ai-builders-pro/">Upgrade to Pro ✨</a>' : "") + '<button type="button" data-out>Log out</button></div>');
      m.querySelector("b").textContent = me.user.name; m.querySelector(".who span").textContent = me.user.email;
      m.querySelector("[data-out]").onclick = function () { S.api("/api/auth/logout", {}).then(function () { location = "/"; }); };
      wrap.appendChild(m);
    };
  }
  function closeMenus() { document.querySelectorAll(".hdr .menu").forEach(function (m) { m.remove(); }); }
  document.addEventListener("click", function (e) { if (!e.target.closest(".menu")) closeMenus(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenus(); });

  function refreshCounts() {
    if (document.hidden) return;
    S.api("/api/me").then(function (me) {
      if (!me.unread) return;
      [["hdr-msg", me.unread.messages], ["hdr-bell", me.unread.notifications]].forEach(function (p) {
        var el = document.getElementById(p[0]); if (!el) return;
        var b = el.querySelector(".badge"); if (b) b.remove();
        if (p[1]) el.insertAdjacentHTML("beforeend", badge(p[1]));
      });
    }).catch(function () {});
  }
  S.refreshCounts = refreshCounts;

  // Notification wording, shared by the bell dropdown and /notifications/.
  S.notifText = function (n) {
    var who = n.actor ? "<b>" + S.esc(n.actor.name) + "</b>" : "Someone", on = n.postTitle ? " <b>" + S.esc(n.postTitle) + "</b>" : "";
    return {
      like_post: who + " liked your post" + on,
      like_comment: who + " liked your comment on" + on,
      comment: who + " commented on your post" + on,
      reply: who + " replied to your comment on" + on,
      follow: who + " started following you",
      announcement: who + " posted an announcement:" + on,
    }[n.type] || who + " did something";
  };
  S.notifHref = function (n) {
    if (n.type === "follow" && n.actor) return S.profileUrl(n.actor.handle);
    return n.postId ? "/community/?post=" + n.postId + (n.commentId ? "#c" + n.commentId : "") : "/notifications/";
  };
  S.notifRow = function (n) {
    return '<a class="nt' + (n.read ? "" : " unread") + '" href="' + S.notifHref(n) + '" data-id="' + n.id + '">' + S.avatar(n.actor, 40, { link: false }) +
      '<span class="n-txt">' + S.notifText(n) + (n.snippet ? "<q>" + S.esc(n.snippet) + "</q>" : "") + "<time>" + S.ago(n.createdAt) + "</time></span>" + (n.read ? "" : '<span class="dot"></span>') + "</a>";
  };
  S.markRead = function (list) {
    list.addEventListener("click", function (e) { var a = e.target.closest(".nt.unread"); if (a) S.api("/api/notifications", { id: Number(a.dataset.id) }).catch(function () {}); });
  };

  function toggleNotifs(wrap) {
    var open = wrap.querySelector(".menu"); closeMenus(); if (open) return;
    var m = S.el('<div class="menu notif-menu"><div class="nm-head"><b>Notifications</b><button class="linkbtn" type="button">Mark all read</button></div><div class="nm-list"><p class="mute pad">Loading…</p></div><a class="center" href="/notifications/">See all</a></div>');
    m.addEventListener("click", function (e) { e.stopPropagation(); });
    wrap.appendChild(m);
    var list = m.querySelector(".nm-list");
    S.api("/api/notifications").then(function (d) {
      list.innerHTML = d.notifications.length ? d.notifications.slice(0, 12).map(S.notifRow).join("") : '<p class="empty">Nothing yet. Post something and the community will find you.</p>';
    });
    S.markRead(list);
    m.querySelector(".nm-head button").onclick = function () {
      S.api("/api/notifications", { all: true }).then(function () { list.querySelectorAll(".unread").forEach(function (a) { a.classList.remove("unread"); var d = a.querySelector(".dot"); if (d) d.remove(); }); refreshCounts(); });
    };
  }
})();
