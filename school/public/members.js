// Members directory. ?sort=points is the leaderboard, ?tier=pro shows Pro members. Carlos also sees join answers.
(function () {
  var root = document.getElementById("members-root"), qs = new URLSearchParams(location.search);
  var LABELS = { putting_off: "Putting off", level: "AI level", source: "Found me via" };
  S.me.then(function (me) {
    if (!me.user) { location = "/about/"; return; }
    if (!me.member) { location = "/join/"; return; }
    var sort = qs.get("sort") || "new", tier = qs.get("tier") || "";
    S.api("/api/members?" + new URLSearchParams({ sort: sort, tier: tier })).then(function (d) {
      var tab = function (href, label, on) { return '<a class="pillbtn sm' + (on ? " on" : "") + '" href="' + href + '">' + label + "</a>"; };
      root.innerHTML = '<div class="m-head"><h1>' + (tier ? "Pro members" : "Members") + ' <span class="mute">' + d.members.length + '</span></h1><div class="cats" style="margin:0">' +
        tab("/members/", "Newest", sort === "new" && !tier) + tab("/members/?sort=points", "🏆 Leaderboard", sort === "points") + tab("/members/?tier=pro", "Pro", !!tier) + "</div></div>" +
        (d.members.length ? "" : '<div class="card empty">Nobody here yet.</div>');
      d.members.forEach(function (m, i) {
        var el = S.el('<div class="card member">' + S.avatar(m, 52) + '<div class="m-info"><a class="n" href="' + S.profileUrl(m.handle) + '"></a>' + (m.owner ? '<span class="owner-tag">Owner</span>' : m.pro ? '<span class="pro-tag">PRO</span>' : "") +
          '<div class="h">@' + S.esc(m.handle) + " · Level " + m.level + " " + S.esc(m.levelName) + (m.location ? " · " + S.esc(m.location) : "") + "</div>" + (m.bio ? "<p></p>" : "") +
          (m.email ? '<div class="mute small">' + S.esc(m.email) + " · " + (m.owner ? "owner" : m.pro ? "Pro" : "free") + "</div>" : "") +
          (m.answers ? '<dl class="answers">' + Object.keys(m.answers).filter(function (k) { return m.answers[k]; }).map(function (k) { return "<dt>" + S.esc(LABELS[k] || k) + "</dt><dd>" + S.esc(m.answers[k]) + "</dd>"; }).join("") + "</dl>" : "") +
          '</div><div class="m-side">' + (sort === "points" ? "<b>#" + (i + 1) + '</b><span class="mute small">' + m.points + " pts</span>" : '<span class="mute small">Joined ' + S.ago(m.joinedAt) + "</span>") +
          (m.handle !== me.user.handle ? '<a class="pillbtn sm" href="/messages/?to=' + encodeURIComponent(m.handle) + '">Chat</a>' : "") + "</div></div>");
        el.querySelector("a.n").textContent = m.name;
        if (m.bio) el.querySelector("p").textContent = m.bio;
        root.appendChild(el);
      });
    }).catch(function (x) { root.innerHTML = '<p class="err">' + S.esc(x.message) + "</p>"; });
  });
})();
