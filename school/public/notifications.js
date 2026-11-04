(function () {
  var root = document.getElementById("notif-root");
  S.me.then(function (me) {
    if (!me.user) { location = "/login/?next=/notifications/"; return; }
    S.api("/api/notifications").then(function (d) {
      root.innerHTML = '<div class="nt-head"><h1>Notifications</h1><button class="pillbtn sm" type="button">Mark all read</button></div><div class="nt-list">' +
        (d.notifications.length ? d.notifications.map(S.notifRow).join("") : '<p class="empty">Nothing yet. When people like, comment on or reply to your posts, or follow you, it shows up here.</p>') + "</div>";
      var list = root.querySelector(".nt-list"); S.markRead(list);
      root.querySelector(".nt-head button").onclick = function () {
        S.api("/api/notifications", { all: true }).then(function () { list.querySelectorAll(".unread").forEach(function (a) { a.classList.remove("unread"); var x = a.querySelector(".dot"); if (x) x.remove(); }); S.refreshCounts(); });
      };
    });
  });
})();
