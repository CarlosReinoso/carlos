// The community: AI Builders (free) and AI Builders Pro (?space=pro) feeds. Write a post, filter by category or
// search, like and comment. ?post=<id> opens one post.
(function () {
  var P = window.PAGE, qs = new URLSearchParams(location.search), feed = document.getElementById("feed"), ME;
  var space = qs.get("space") === "pro" ? "pro" : "free", SP = P.spaces[space];
  // Keeps the current space in links: href("?cat=wins") -> "/community/?space=pro&cat=wins"
  var href = function (q) { var u = new URLSearchParams(q || ""); if (space === "pro") u.set("space", "pro"); var s = u.toString(); return "/community/" + (s ? "?" + s : ""); };
  var cats = {}; P.categories.forEach(function (c) { cats[c.id] = c; });
  var LIKE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10v11H3V10zM7 10l4-8a3 3 0 0 1 3 3v4h6a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 18.6 21H7"/></svg>';
  var CMT = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>';

  S.me.then(function (me) {
    if (!me.user) { location = "/ai-builders/"; return; }
    if (!me.member) { location = "/join/"; return; }
    ME = me;
    if (qs.get("post")) return openPost(qs.get("post"));
    switcher(); sidebar();
    if (space === "pro" && !me.pro) return locked();
    if (qs.get("welcome")) feed.insertAdjacentHTML("beforebegin", '<div class="card welcome"><h2>Welcome' + (space === "pro" ? " to Pro" : "") + ", " + S.esc(me.user.name.split(" ")[0]) + '! 🎉</h2><p class="mute" style="margin:0">Start by introducing yourself: who you are, and the one thing you want AI to do for you. Pick <b>General</b> and say hi.</p>' + (P.lessons.length ? '<p class="mute" style="margin:10px 0 0">New to AI? Start with the free course: <a href="' + P.lessons[0].url + '">' + S.esc(P.lessons[0].title) + " →</a></p>" : "") + "</div>");
    if (space === "free") course();
    composer(); categories(); load();
  });

  // ---- feed
  var before = 0;
  function load(more) {
    var url = "/api/posts?" + new URLSearchParams(Object.assign({ space: space }, qs.get("cat") && { cat: qs.get("cat") }, qs.get("q") && { q: qs.get("q") }, more && { before: before }));
    if (!more) feed.innerHTML = '<p class="mute">Loading…</p>';
    S.api(url).then(function (d) {
      if (!more) feed.innerHTML = qs.get("q") ? '<p class="mute">Results for “' + S.esc(qs.get("q")) + '” · <a href="' + href() + '">clear</a></p>' + lessonHits(qs.get("q")) : "";
      var old = feed.querySelector(".more"); if (old) old.remove();
      if (!d.posts.length && !more) feed.insertAdjacentHTML("beforeend", '<div class="card empty">' + (qs.get("q") || qs.get("cat") ? "No posts here yet." : "No posts yet. Be the first! 👋") + "</div>");
      d.posts.forEach(function (p) { feed.appendChild(postCard(p)); before = p.createdAt; });
      if (d.more) { var b = S.el('<button class="pillbtn more" type="button" style="display:flex;margin:10px auto">Load more</button>'); b.onclick = function () { load(true); }; feed.appendChild(b); }
    }).catch(function (x) { feed.innerHTML = '<p class="err">' + S.esc(x.message) + "</p>"; });
  }

  function catLabel(id) { var c = cats[id]; return c ? c.icon + " " + c.label : id; }

  function postCard(p) {
    var el = S.el('<article class="card post">' +
      '<div class="p-head">' + S.avatar(p.author, 40) + '<div class="p-who">' + S.nameHtml(p.author) + '<div class="meta">' + S.ago(p.createdAt) + " · " + S.esc(catLabel(p.category)) + (p.pinned ? ' · <span class="pin-tag">📌 Pinned</span>' : "") + "</div></div></div>" +
      "<h3></h3><div class=\"p-body\"></div>" +
      '<div class="p-foot">' + likeBtn("post", p) + '<span class="act">' + CMT + " " + p.comments + "</span>" +
      (p.commenters.length ? '<span class="faces">' + p.commenters.map(function (u) { return S.avatar(u, 26, { level: false }); }).join("") + "</span>" : "") +
      (p.lastCommentAt ? '<span class="newc">' + (Date.now() - p.lastCommentAt < 864e5 ? "New comment " : "Last comment ") + S.ago(p.lastCommentAt) + " ago</span>" : "") +
      "</div></article>");
    el.querySelector("h3").textContent = p.title;
    el.querySelector(".p-body").textContent = p.body;
    el.addEventListener("click", function (e) { if (!e.target.closest("a,button")) go("?post=" + p.id); });
    wireLike(el.querySelector("[data-like]"));
    return el;
  }

  function likeBtn(type, x) { return '<button type="button" class="act' + (x.liked ? " on" : "") + '" data-like="' + type + ":" + x.id + '" aria-pressed="' + x.liked + '" aria-label="Like">' + LIKE + " <span>" + x.likes + "</span></button>"; }
  function wireLike(b) {
    if (!b) return;
    b.onclick = function (e) {
      e.stopPropagation(); var t = b.dataset.like.split(":");
      S.api("/api/like", { type: t[0], id: Number(t[1]) }).then(function (d) {
        b.classList.toggle("on", d.liked); b.setAttribute("aria-pressed", d.liked); b.querySelector("span").textContent = d.likes;
      }).catch(function (x) { S.toast(x.message); });
    };
  }
  function go(q) { location.search = q; }

  // ---- composer
  function composer() {
    var root = document.getElementById("composer");
    var closed = function () {
      root.innerHTML = '<div class="card composer" role="button" tabindex="0">' + S.avatar(ME.user, 38, { link: false }) + '<span class="fake">Write something in ' + S.esc(SP.name) + '…</span></div>';
      var c = root.firstChild; c.onclick = open; c.onkeydown = function (e) { if (e.key === "Enter") open(); };
    };
    function open() {
      var opts = P.categories.filter(function (c) { return !c.ownerOnly || ME.owner; });
      root.innerHTML = '<form class="card composer-open"><input name="title" placeholder="Title" maxlength="200" required aria-label="Title"><textarea name="body" placeholder="Write something…" rows="5" required aria-label="Post"></textarea>' +
        '<div class="row"><select name="category" aria-label="Category">' + opts.map(function (c) { return '<option value="' + c.id + '"' + (c.id === (qs.get("cat") || "general") ? " selected" : "") + ">" + c.icon + " " + S.esc(c.label) + "</option>"; }).join("") + "</select>" +
        '<span><button type="button" class="linkbtn">Cancel</button> <button class="btn sm" type="submit">Post</button></span></div><p class="err" role="alert"></p></form>';
      var f = root.firstChild; f.title.focus();
      f.querySelector(".linkbtn").onclick = closed;
      f.onsubmit = function (e) {
        e.preventDefault(); var b = f.querySelector('[type="submit"]'); b.disabled = true;
        S.api("/api/posts", { space: space, title: f.title.value, body: f.body.value, category: f.category.value }).then(function () { closed(); load(); })
          .catch(function (x) { f.querySelector(".err").textContent = x.message; b.disabled = false; });
      };
    }
    closed();
  }

  function categories() {
    var root = document.getElementById("cats"), cur = qs.get("cat") || "";
    root.innerHTML = '<a class="pillbtn sm' + (cur ? "" : " on") + '" href="' + href() + '">All</a>' + P.categories.map(function (c) {
      return '<a class="pillbtn sm' + (cur === c.id ? " on" : "") + '" href="' + href("cat=" + c.id) + '">' + c.icon + " " + S.esc(c.label) + "</a>";
    }).join("");
  }

  // ---- one post
  function openPost(id) {
    feed.innerHTML = '<p class="mute">Loading…</p>';
    S.api("/api/posts/" + encodeURIComponent(id)).then(function (d) {
      space = d.post.space; SP = P.spaces[space];
      document.getElementById("cats").innerHTML = '<a class="pillbtn sm" href="' + href() + '">← Back to ' + S.esc(SP.name) + "</a>";
      sidebar(); renderPost(d.post);
    }).catch(function (x) { feed.innerHTML = '<div class="card empty">' + S.esc(x.message) + "</div>"; });
  }

  function renderPost(p) {
    var canDel = p.mine || ME.owner;
    var el = S.el('<article class="card post post-full">' +
      '<div class="p-head">' + S.avatar(p.author, 44) + '<div class="p-who">' + S.nameHtml(p.author) + '<div class="meta">' + S.ago(p.createdAt) + " · " + S.esc(catLabel(p.category)) + (p.pinned ? ' · <span class="pin-tag">📌 Pinned</span>' : "") + "</div></div></div>" +
      '<h1></h1><div class="p-text">' + S.text(p.body) + "</div>" +
      '<div class="p-foot">' + likeBtn("post", p) + '<span class="act">' + CMT + " " + p.comments + "</span>" +
      (ME.owner ? '<button class="linkbtn" data-pin>' + (p.pinned ? "Unpin" : "📌 Pin") + "</button>" : "") + (canDel ? '<button class="linkbtn danger" data-del>Delete</button>' : "") + "</div>" +
      '<div class="comments"></div></article>');
    el.querySelector("h1").textContent = p.title;
    wireLike(el.querySelector("[data-like]"));
    var pin = el.querySelector("[data-pin]"); if (pin) pin.onclick = function () { S.api("/api/posts/" + p.id, { pinned: !p.pinned }, "PATCH").then(function () { openPost(p.id); }); };
    var del = el.querySelector("[data-del]"); if (del) del.onclick = function () {
      if (del.dataset.sure) return S.api("/api/posts/" + p.id, undefined, "DELETE").then(function () { location = href(); });
      del.dataset.sure = 1; del.textContent = "Click again to delete";
    };
    feed.innerHTML = ""; feed.appendChild(el);
    document.title = p.title + " · " + P.name;

    var box = el.querySelector(".comments"), top = p.commentList.filter(function (c) { return !c.parentId; });
    top.forEach(function (c) {
      box.appendChild(comment(c, p));
      p.commentList.filter(function (r) { return r.parentId === c.id; }).forEach(function (r) { box.appendChild(comment(r, p, true)); });
    });
    box.appendChild(commentForm(p));
    if (location.hash) { var t = document.querySelector(location.hash); if (t) t.scrollIntoView({ block: "center" }); }
  }

  function comment(c, p, reply) {
    var el = S.el('<div class="cmt' + (reply ? " reply" : "") + '" id="c' + c.id + '">' + S.avatar(c.author, reply ? 30 : 36) + '<div class="bubble"><div class="bubble-in"><a class="n" href="' + S.profileUrl(c.author.handle) + '"></a>' + (c.author.owner ? '<span class="owner-tag">Owner</span>' : "") + '<div class="t">' + S.text(c.body) + "</div></div>" +
      '<div class="c-acts"><span>' + S.ago(c.createdAt) + '</span><button type="button" data-like="comment:' + c.id + '" class="' + (c.liked ? "on" : "") + '">Like <span>' + c.likes + "</span></button>" +
      (reply ? "" : '<button type="button" data-reply>Reply</button>') + (c.mine || ME.owner ? '<button type="button" data-del>Delete</button>' : "") + "</div></div></div>");
    el.querySelector("a.n").textContent = c.author.name;
    var lb = el.querySelector("[data-like]");
    lb.onclick = function () { var t = lb.dataset.like.split(":"); S.api("/api/like", { type: "comment", id: Number(t[1]) }).then(function (d) { lb.classList.toggle("on", d.liked); lb.querySelector("span").textContent = d.likes; }).catch(function (x) { S.toast(x.message); }); };
    var rb = el.querySelector("[data-reply]");
    if (rb) rb.onclick = function () {
      if (el.querySelector("form")) return;
      var f = commentForm(p, c); el.querySelector(".bubble").appendChild(f); f.querySelector("textarea").focus();
    };
    var db = el.querySelector("[data-del]");
    if (db) db.onclick = function () {
      if (!db.dataset.sure) { db.dataset.sure = 1; db.textContent = "Sure?"; return; }
      S.api("/api/comments/" + c.id, undefined, "DELETE").then(function () { openPost(p.id); });
    };
    return el;
  }

  function commentForm(p, parent) {
    var f = S.el('<form class="cform">' + S.avatar(ME.user, 34, { link: false }) + '<textarea placeholder="' + (parent ? "Write a reply…" : "Your comment") + '" required aria-label="Comment"></textarea><button class="btn sm" type="submit">' + (parent ? "Reply" : "Comment") + "</button></form>");
    var ta = f.querySelector("textarea");
    ta.oninput = function () { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 240) + "px"; };
    f.onsubmit = function (e) {
      e.preventDefault(); var b = f.querySelector("button"); b.disabled = true;
      S.api("/api/posts/" + p.id + "/comments", { body: ta.value, parentId: parent ? parent.id : null }).then(function (d) { history.replaceState(null, "", "#c" + d.id); openPost(p.id); })
        .catch(function (x) { S.toast(x.message); b.disabled = false; });
    };
    return f;
  }

  // ---- the switcher between the two communities, and the locked Pro teaser
  function switcher() {
    var tab = function (s) { var sp = P.spaces[s], lock = s === "pro" && !ME.pro ? " 🔒" : "";
      return '<a class="space-tab' + (s === space ? " on" : "") + '" href="/community/' + (s === "pro" ? "?space=pro" : "") + '"><span class="owned-logo sm' + (s === "pro" ? " pro" : "") + '">' + sp.logo + "</span>" + S.esc(sp.name) + lock + "</a>"; };
    document.getElementById("composer").insertAdjacentHTML("beforebegin", '<nav class="spaces" aria-label="Communities">' + tab("free") + tab("pro") + "</nav>");
  }
  function locked() {
    var pro = P.spaces.pro;
    feed.innerHTML = '<div class="card locked"><span class="owned-logo pro">' + pro.logo + '</span><h2>' + S.esc(pro.name) + '</h2><p class="mute">' + S.esc(pro.tagline) + '</p>' +
      '<div class="blur-posts" aria-hidden="true"><i></i><i></i><i></i></div><button class="btn" type="button">Upgrade · ' + S.esc(pro.price) + '</button><p class="mute small">' + S.esc(pro.priceNote) + ' <a href="/' + pro.slug + '/">What\'s inside?</a></p><p class="err" role="alert"></p></div>';
    var b = feed.querySelector("button");
    b.onclick = function () { b.disabled = true; S.api("/api/upgrade", {}).then(function (d) { location = d.url; }).catch(function (x) { feed.querySelector(".err").textContent = x.message; b.disabled = false; }); };
  }

  // ---- the free course: a card above the composer with progress (lessons mark themselves done in localStorage)
  function done() { try { return JSON.parse(localStorage.getItem("sc_lessons") || "[]"); } catch (e) { return []; } }
  function course() {
    var L = P.lessons; if (!L.length) return;
    var d = done(), n = L.filter(function (l) { return d.indexOf(l.url) >= 0; }).length, next = L.filter(function (l) { return d.indexOf(l.url) < 0; })[0];
    document.getElementById("composer").insertAdjacentHTML("beforebegin", '<div class="card course-card"><div class="cc-text"><span class="cc-eye">📚 Free course · ' + S.esc(L[0].course) + '</span>' +
      (next ? "<b>" + (n ? "Continue: " : "Start here: ") + S.esc(next.title) + "</b>" : "<b>You're all caught up 🎉</b>") +
      '<div class="cc-bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + L.length + '" aria-valuenow="' + n + '"><i style="width:' + (100 * n / L.length) + '%"></i></div><span class="mute small">' + n + " of " + L.length + " available lessons done</span></div>" +
      '<a class="' + (next ? "btn" : "pillbtn") + ' sm" href="' + (next ? next.url : L[0].courseUrl) + '">' + (next ? (n ? "Continue" : "Start") + " →" : "See the course") + "</a></div>");
  }
  // Lessons whose title or description match the search, shown above the matching posts.
  function lessonHits(q) {
    q = q.toLowerCase();
    var hits = P.lessons.filter(function (l) { return (l.title + " " + l.desc + " " + l.course).toLowerCase().indexOf(q) >= 0; });
    return hits.map(function (l) { return '<a class="card course-card cc-hit" href="' + l.url + '"><div class="cc-text"><span class="cc-eye">📚 Lesson · ' + S.esc(l.course) + "</span><b>" + S.esc(l.title) + '</b><span class="mute small">' + S.esc(l.desc) + '</span></div><span class="cc-go">Open →</span></a>'; }).join("");
  }

  // ---- sidebar: the community card and the leaderboard
  function sidebar() {
    var side = document.getElementById("side");
    side.innerHTML = '<div class="card side-card"><div class="jc-banner' + (space === "pro" ? " pro" : "") + '"><img src="/carlos.jpg" alt=""><div><b>' + S.esc(SP.name) + "</b><span>" + S.esc(SP.price) + " · Private community</span></div></div><div class=\"jc-body\"><p>" + S.esc(SP.tagline) + '</p><div class="jc-stats"><div><b data-stat="' + (space === "pro" ? "pro" : "members") + '">–</b><span>Members</span></div><div><b data-stat="online">–</b><span>Online</span></div><div><b>1</b><span>Admins</span></div></div><a class="pillbtn sm" href="/members/?sort=points">Leaderboard</a></div></div>' +
      '<div class="card side-card"><div class="jc-body" style="padding-bottom:4px"><b>Top members</b></div><div id="lb"><p class="mute small" style="padding:0 16px">Loading…</p></div></div>';
    S.api("/api/stats").then(function (s) { side.querySelectorAll("[data-stat]").forEach(function (el) { el.textContent = S.fmt(s[el.dataset.stat]); }); });
    S.api("/api/members?sort=points" + (space === "pro" ? "&tier=pro" : "")).then(function (d) {
      document.getElementById("lb").innerHTML = d.members.slice(0, 5).map(function (m, i) {
        return '<a class="lb-row" href="' + S.profileUrl(m.handle) + '"><span class="rk">' + (i + 1) + "</span>" + S.avatar(m, 30, { link: false }) + "<span>" + S.esc(m.name) + '</span><span class="pts">+' + m.points + "</span></a>";
      }).join("") + '<div style="height:10px"></div>';
    });
  }
})();
