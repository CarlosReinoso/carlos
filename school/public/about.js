// Landing pages: live member/online numbers, the right button for who's looking, and the Pro upgrade.
(function () {
  var P = window.PAGE || {};
  S.me.then(function (me) {
    if (P.home && me.member) { location.replace("/community/"); return; }
    var btn = document.querySelector(".join-btn");
    if (P.space === "free" && me.member) { btn.textContent = "Go to the community"; btn.href = "/community/"; }
    if (P.space === "pro") {
      var err = document.querySelector(".join-card .err");
      if (me.pro) { btn.textContent = "Go to Pro"; btn.onclick = function () { location = "/community/?space=pro"; }; return; }
      btn.onclick = function () {
        // Straight to Stripe, logged in or not; a guest's account comes from the e-mail they give Stripe.
        btn.disabled = true;
        S.api("/api/upgrade", {}).then(function (d) { location = d.url; })
          .catch(function (x) { err.textContent = x.message; btn.disabled = false; });
      };
      if (new URLSearchParams(location.search).get("canceled")) err.textContent = "No problem, nothing was charged.";
    }
  });
  S.api("/api/stats").then(function (s) {
    document.querySelectorAll("[data-stat]").forEach(function (el) { var v = s[el.dataset.stat]; if (v != null) el.textContent = S.fmt(v); });
  }).catch(function () {});
})();
