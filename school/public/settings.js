// Edit your profile and manage billing.
(function () {
  var root = document.getElementById("settings-root");
  S.me.then(function (me) {
    if (!me.user) { location = "/login/?next=/settings/"; return; }
    var u = me.user;
    root.innerHTML = '<h1 class="q-hero">Settings</h1><form id="pf">' +
      '<label for="s-name">Name</label><input id="s-name" name="name" maxlength="60" required>' +
      '<label for="s-handle">Handle</label><input id="s-handle" name="handle" maxlength="30" ' + (me.owner ? "disabled" : "") + '><p class="mute small">Your profile: <span id="s-url"></span></p>' +
      '<label for="s-bio">Bio</label><textarea id="s-bio" name="bio" maxlength="300" rows="3" placeholder="What are you building with AI?"></textarea>' +
      '<label for="s-loc">Location</label><input id="s-loc" name="location" maxlength="60" placeholder="City, Country">' +
      '<label for="s-av">Photo URL</label><input id="s-av" name="avatar" type="url" placeholder="https://…"><p class="mute small">Paste a link to a square photo. Google sign-ins use your Google photo.</p>' +
      '<p class="err" role="alert"></p><button class="btn" type="submit">Save</button></form>' +
      '<h2 class="sec" style="margin-top:32px">Membership</h2><p class="mute">' + (me.owner ? "You own AI Builders and AI Builders Pro." : me.pro ? "You're in AI Builders Pro. 🚀" : me.member ? 'You\'re in AI Builders (free). <a href="/ai-builders-pro/">Upgrade to Pro</a>' : 'You haven\'t joined yet. <a href="/join/">Join AI Builders</a>') + "</p>" +
      (me.membership && !me.owner ? '<button class="pillbtn" type="button" id="billing">Manage billing / cancel Pro</button>' : "") +
      '<h2 class="sec" style="margin-top:32px">Account</h2><p class="mute small">Signed in as ' + S.esc(u.email) + '</p><button class="pillbtn" type="button" id="logout">Log out</button>';
    var f = root.querySelector("#pf");
    f.name.value = u.name || ""; f.handle.value = u.handle; f.bio.value = u.bio || ""; f.location.value = u.location || ""; f.avatar.value = u.avatar || "";
    var url = function () { root.querySelector("#s-url").textContent = location.origin + S.profileUrl(f.handle.value || u.handle); };
    url(); f.handle.oninput = url;
    f.onsubmit = function (e) {
      e.preventDefault(); var b = f.querySelector("button"); b.disabled = true; f.querySelector(".err").textContent = "";
      S.api("/api/settings", { name: f.name.value, handle: f.handle.value, bio: f.bio.value, location: f.location.value, avatar: f.avatar.value })
        .then(function () { S.toast("Saved"); b.disabled = false; }).catch(function (x) { f.querySelector(".err").textContent = x.message; b.disabled = false; });
    };
    var bb = root.querySelector("#billing");
    if (bb) bb.onclick = function () { bb.disabled = true; S.api("/api/billing", {}).then(function (d) { location = d.url; }).catch(function (x) { S.toast(x.message); bb.disabled = false; }); };
    root.querySelector("#logout").onclick = function () { S.api("/api/auth/logout", {}).then(function () { location = "/"; }); };
  });
})();
