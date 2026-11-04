(function () {
  var next = new URLSearchParams(location.search).get("next") || "/community/";
  if (!/^\/(?!\/)/.test(next)) next = "/community/";
  S.me.then(function (me) {
    if (me.user) { location = me.member ? next : "/join/"; return; }
    S.authPanel(document.getElementById("login-root"), me, { next: next, title: "Log in", subtitle: "New here? Logging in creates your account. No passwords." });
  });
})();
