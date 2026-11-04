// Joining AI Builders (free): 1) log in or create an account, 2) answer the join questions.
// ?pro=1 goes straight to Stripe for AI Builders Pro (no account or questions first); Stripe returns here with ?session_id= to confirm the payment.
(function () {
  var root = document.getElementById("join-root"), P = window.PAGE, qs = new URLSearchParams(location.search), wantsPro = !!qs.get("pro");
  var steps = function (n) { return '<div class="steps" aria-hidden="true"><i class="on"></i><i' + (n > 1 ? ' class="on"' : "") + "></i>" + (wantsPro || qs.get("session_id") ? "<i" + (n > 2 ? ' class="on"' : "") + "></i>" : "") + "</div>"; };

  S.me.then(function (me) {
    if (qs.get("session_id")) return confirm(qs.get("session_id"));
    if (wantsPro && !me.pro) return upgrade();
    if (me.member) { location = "/community/"; return; }
    if (!me.user) {
      root.innerHTML = steps(1) + '<div id="au"></div>';
      return S.authPanel(root.querySelector("#au"), me, {
        next: location.pathname + location.search, title: "Join " + (wantsPro ? P.pro.name : P.name),
        subtitle: "First, create your free account. It takes 20 seconds, no password.", onDone: function () { location.reload(); },
      });
    }
    questions(me);
  });

  function questions(me) {
    root.innerHTML = steps(2) + '<form id="jq"></form>';
    var f = root.querySelector("form"), label = wantsPro ? "Continue to payment · " + P.pro.price : "Join " + P.name + " · Free";
    f.innerHTML =
      (me.needsName ? '<p class="mute small">👋 Before you come in, a couple of quick questions so I know how to help you.</p><label for="q-name">Your name</label><input id="q-name" name="name" maxlength="60" required autocomplete="name">'
        : '<p class="mute small">Hi ' + S.esc(me.user.name.split(" ")[0]) + " 👋 Before you come in, a couple of quick questions so I know how to help you.</p>") +
      P.questions.map(function (q, i) {
        if (q.type === "choice") return '<fieldset style="border:0;padding:0;margin:0"><legend style="font-weight:600;margin:18px 0 8px">' + S.esc(q.label) + '</legend><div class="choices">' +
          q.options.map(function (o) { return '<label class="choice"><input type="radio" name="' + q.id + '" value="' + S.esc(o) + '" required> ' + S.esc(o) + "</label>"; }).join("") + "</div></fieldset>";
        var lab = '<label for="q-' + q.id + '"' + (i === 0 ? ' class="q-hero"' : "") + ">" + S.esc(q.label) + "</label>", req = q.optional ? "" : "required ";
        if (i === 0) return lab + '<textarea id="q-' + q.id + '" name="' + q.id + '" rows="4" ' + req + 'placeholder="' + S.esc(q.placeholder || "") + '"></textarea>';
        return lab + '<input id="q-' + q.id + '" name="' + q.id + '" ' + req + 'placeholder="' + S.esc(q.placeholder || "") + '">';
      }).join("") +
      '<p class="err" role="alert"></p><button class="btn block" type="submit"></button>' + (wantsPro ? '<p class="mute small center">' + S.esc(P.pro.priceNote) + "</p>" : "");
    var b = f.querySelector('button[type="submit"]'); b.textContent = label;
    f.onsubmit = function (e) {
      e.preventDefault();
      var answers = {}; new FormData(f).forEach(function (v, k) { answers[k] = v; });
      var name = answers.name; delete answers.name;
      b.disabled = true; b.textContent = "One moment…";
      S.api("/api/join", { answers: answers, name: name }).then(function () {
        if (wantsPro) return upgrade();
        location = "/community/?welcome=1";
      }).catch(function (x) { f.querySelector(".err").textContent = x.message; b.disabled = false; b.textContent = label; });
    };
  }

  function upgrade() {
    root.innerHTML = steps(3) + '<h1 class="q-hero">Taking you to checkout…</h1>';
    S.api("/api/upgrade", {}).then(function (d) { location = d.url; }).catch(function (x) {
      root.innerHTML = '<h1 class="q-hero">We couldn\'t open checkout</h1><p class="mute"></p><a class="pillbtn" href="/' + P.pro.slug + '/">Back</a>';
      root.querySelector("p").textContent = x.message;
    });
  }

  function confirm(id) {
    root.innerHTML = steps(3) + '<h1 class="q-hero">Confirming your payment…</h1><p class="mute">This takes a second.</p>';
    var tries = 0;
    (function attempt() {
      S.api("/api/join/confirm", { session_id: id }).then(function (d) {
        if (d.login) {
          root.innerHTML = steps(3) + '<h1 class="q-hero">Payment done 🎉</h1><p></p><a class="btn" href="/login/?next=%2Fcommunity%2F%3Fspace%3Dpro">Log in</a>';
          root.querySelector("p").textContent = "You already have an account with " + d.email + ". Log in with it to get into " + P.pro.name + ".";
          return;
        }
        root.innerHTML = steps(3) + '<h1 class="q-hero">Welcome to ' + S.esc(P.pro.name) + '! 🎉</h1><p>You now have the Pro feed, courses and weekly Q&amp;A. Say hi and tell everyone what you\'re building.</p><a class="btn" href="/community/?space=pro&amp;welcome=1">Go to Pro</a>';
      }).catch(function (x) {
        // The payment can take a moment to settle; try a few times before giving up.
        if (x.status === 402 && ++tries < 5) return setTimeout(attempt, 1500);
        root.innerHTML = '<h1 class="q-hero">We couldn\'t confirm that payment</h1><p class="mute"></p><a class="pillbtn" href="/' + P.pro.slug + '/">Back</a>';
        root.querySelector("p").textContent = x.message + " If you were charged, message Carlos and it will be sorted right away.";
      });
    })();
  }
})();
