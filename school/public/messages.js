// Direct messages: inbox on the left, the open conversation on the right (?to=<handle>). New messages are
// fetched every 5 seconds while a conversation is open.
(function () {
  var root = document.getElementById("chat-root"), to = new URLSearchParams(location.search).get("to"), ME, timer;

  S.me.then(function (me) {
    if (!me.user) { location = "/login/?next=" + encodeURIComponent(location.pathname + location.search); return; }
    if (!me.member) { location = "/join/"; return; }
    ME = me;
    root.innerHTML = '<div class="conv-list"><h2>Chats</h2><div id="convs"><p class="mute pad">Loading…</p></div></div><div class="thread" id="thread"><div class="empty" style="margin:auto">Pick a chat, or press <b>Chat</b> on someone\'s profile to start one.</div></div>';
    inbox();
    if (to) open(to);
  });

  function inbox() {
    S.api("/api/messages").then(function (d) {
      var box = document.getElementById("convs");
      box.innerHTML = d.conversations.length ? d.conversations.map(function (c) {
        return '<a class="conv' + (c.user.handle === to ? " on" : "") + '" href="?to=' + encodeURIComponent(c.user.handle) + '" data-h="' + S.esc(c.user.handle) + '">' + S.avatar(c.user, 40, { link: false }) +
          '<span class="c-txt"><b>' + S.esc(c.user.name) + "</b><span>" + S.esc(c.lastBody) + "</span></span>" + (c.unread && c.user.handle !== to ? '<span class="unread">' + c.unread + "</span>" : '<span class="mute small">' + S.ago(c.lastAt) + "</span>") + "</a>";
      }).join("") : '<p class="mute pad small">No chats yet.</p>';
      box.querySelectorAll(".conv").forEach(function (a) {
        a.onclick = function (e) { e.preventDefault(); history.pushState(null, "", a.getAttribute("href")); open(a.dataset.h); };
      });
    });
  }

  function open(handle) {
    to = handle; clearInterval(timer);
    root.classList.add("has-thread");
    document.querySelectorAll(".conv").forEach(function (a) { a.classList.toggle("on", a.dataset.h === handle); });
    var th = document.getElementById("thread");
    th.innerHTML = '<p class="mute pad">Loading…</p>';
    var last = 0;
    S.api("/api/messages/" + encodeURIComponent(handle)).then(function (d) {
      var u = d.user;
      th.innerHTML = '<div class="th-head"><button class="linkbtn back" type="button" aria-label="Back to chats">←</button>' + S.avatar(u, 36) + '<div><a class="th-name" href="' + S.profileUrl(u.handle) + '"></a><div class="mute small">' + (u.lastActiveAt && Date.now() - u.lastActiveAt < 5 * 60e3 ? "Online now" : "Active " + (u.lastActiveAt ? S.ago(u.lastActiveAt) + " ago" : "a while ago")) + '</div></div></div><div class="th-body"></div><form class="th-form"><textarea placeholder="Message ' + S.esc(u.name.split(" ")[0]) + '…" required aria-label="Message"></textarea><button class="btn" type="submit">Send</button></form>';
      th.querySelector(".th-name").textContent = u.name;
      th.querySelector(".back").onclick = function () { root.classList.remove("has-thread"); history.pushState(null, "", "/messages/"); clearInterval(timer); };
      var body = th.querySelector(".th-body"), f = th.querySelector("form"), ta = f.querySelector("textarea");
      var add = function (m) { body.appendChild(msg(m)); last = Math.max(last, m.createdAt); };
      if (!d.messages.length) body.innerHTML = '<p class="mute center small">Say hi 👋</p>';
      d.messages.forEach(add); body.scrollTop = body.scrollHeight;
      S.refreshCounts(); inbox();
      ta.focus();
      ta.onkeydown = function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); f.requestSubmit(); } };
      f.onsubmit = function (e) {
        e.preventDefault(); var text = ta.value.trim(); if (!text) return;
        var b = f.querySelector("button"); b.disabled = true;
        S.api("/api/messages/" + encodeURIComponent(handle), { body: text }).then(function (r) {
          var hint = body.querySelector("p"); if (hint) hint.remove();
          ta.value = ""; add(r.message); body.scrollTop = body.scrollHeight; b.disabled = false; inbox();
        }).catch(function (x) { S.toast(x.message); b.disabled = false; });
      };
      timer = setInterval(function () {
        if (document.hidden) return;
        S.api("/api/messages/" + encodeURIComponent(handle) + "?since=" + last).then(function (r) {
          var fresh = r.messages.filter(function (m) { return !m.mine && m.createdAt > last; });
          if (!fresh.length) return;
          var hint = body.querySelector("p"); if (hint) hint.remove();
          var atBottom = body.scrollHeight - body.scrollTop - body.clientHeight < 80;
          fresh.forEach(add); if (atBottom) body.scrollTop = body.scrollHeight;
          inbox();
        }).catch(function () {});
      }, 5000);
    }).catch(function (x) { th.innerHTML = '<div class="empty" style="margin:auto">' + S.esc(x.message) + "</div>"; });
  }

  function msg(m) {
    var el = S.el('<div class="msg' + (m.mine ? " mine" : "") + '"><span></span><time>' + new Date(m.createdAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) + "</time></div>");
    el.querySelector("span").innerHTML = S.text(m.body);
    return el;
  }

  window.addEventListener("popstate", function () { var h = new URLSearchParams(location.search).get("to"); if (h) open(h); else { root.classList.remove("has-thread"); clearInterval(timer); } });
})();
