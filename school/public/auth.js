// Sign-in panel: "Continue with Google" and a 6-digit e-mail code. Used on /login/ and /join/.
(function () {
  var G = '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
  var ERRORS = { state: "The sign-in took too long or was interrupted. Please try again.", google: "Google sign-in didn't complete. Please try again.", unverified: "That Google account's e-mail isn't verified.", google_not_configured: "Google sign-in isn't set up yet. Please use e-mail." };

  // opts: { next, title, subtitle, onDone() }
  S.authPanel = function (root, me, opts) {
    var next = opts.next || "/community/";
    root.innerHTML = "<h1 class=\"q-hero\"></h1><p class=\"mute\"></p><div class=\"au-area\"></div>";
    root.querySelector("h1").textContent = opts.title || "Log in";
    root.querySelector("p").textContent = opts.subtitle || "";
    var area = root.querySelector(".au-area"), err = new URLSearchParams(location.search).get("error");
    if (err) area.appendChild(S.el('<p class="note">' + (ERRORS[err] || "Sign-in failed. Please try again.") + "</p>"));
    if (me.methods.google) area.appendChild(S.el('<a class="btn block gbtn" href="/api/auth/google?next=' + encodeURIComponent(next) + '">' + G + "<span>Continue with Google</span></a>"));
    if (me.methods.google && me.methods.email) area.appendChild(S.el('<div class="or">or use your e-mail</div>'));
    if (me.methods.email) emailForm(); else if (!me.methods.google) area.appendChild(S.el('<p class="note">Sign-in is being set up. Please check back shortly.</p>'));

    function emailForm() {
      var f = S.el('<form><label for="au-email">E-mail</label><input id="au-email" type="email" autocomplete="email" required placeholder="you@example.com"><p class="err" role="alert"></p><button class="btn block" type="submit">E-mail me a login code</button></form>');
      area.appendChild(f);
      f.onsubmit = function (e) {
        e.preventDefault(); var email = f.querySelector("input").value.trim(), b = f.querySelector("button"); b.disabled = true;
        S.api("/api/auth/email/start", { email: email }).then(function (d) { f.remove(); codeForm(email, d.devCode); })
          .catch(function (x) { f.querySelector(".err").textContent = x.message; b.disabled = false; });
      };
    }
    function codeForm(email, devCode) {
      var f = S.el('<form><p>We sent a 6-digit code to <b></b>. It expires in 15 minutes.</p><label for="au-code">Code</label><input id="au-code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required placeholder="123456"><p class="err" role="alert"></p><button class="btn block" type="submit">Continue</button><button type="button" class="linkbtn">Use a different e-mail</button></form>');
      f.querySelector("b").textContent = email;
      if (devCode) f.insertBefore(S.el('<p class="note">Local test mode: your code is <b>' + devCode + "</b></p>"), f.firstChild);
      area.appendChild(f); var input = f.querySelector("input"); input.focus();
      f.querySelector(".linkbtn").onclick = function () { f.remove(); emailForm(); };
      f.onsubmit = function (e) {
        e.preventDefault(); var b = f.querySelector('button[type="submit"]'); b.disabled = true;
        S.api("/api/auth/email/verify", { email: email, code: input.value }).then(function () { if (opts.onDone) opts.onDone(); else location = next; })
          .catch(function (x) { f.querySelector(".err").textContent = x.message; b.disabled = false; input.select(); });
      };
    }
  };
})();
