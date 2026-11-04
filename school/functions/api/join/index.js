// Join AI Builders (free): saves the answers to the join questions and lets the person in.
// Upgrading to AI Builders Pro is a separate step (api/upgrade).
import { json, fail, body, guard } from "../../_lib/auth.js";
import { joinQuestions } from "../../../src/site.mjs";

export async function onRequestPost({ request, env }) {
  const { user, res } = await guard(request, env, "user");
  if (res) return res;
  if (user.member) return json({ ok: true });

  const b = await body(request), raw = b.answers || {}, answers = {};
  if (!user.name) {
    const name = String(b.name || "").trim().slice(0, 60);
    if (name.length < 2) return fail("Tell us your name.");
    await env.DB.prepare("UPDATE users SET name = ? WHERE id = ?").bind(name, user.id).run();
  }
  for (const q of joinQuestions) {
    const a = String(raw[q.id] || "").trim().slice(0, 2000);
    if (!a && !q.optional) return fail(`Please answer: ${q.label}`);
    if (q.type === "choice" && a && !q.options.includes(a)) return fail("Pick one of the options.");
    if (q.minLength && a.length < q.minLength) return fail("Tell me a little more in the first answer. A sentence or two is perfect.");
    answers[q.id] = a;
  }
  const now = Date.now();
  await env.DB.prepare(
    "INSERT INTO memberships (user_id, status, answers, applied_at, joined_at, updated_at) VALUES (?, 'active', ?, ?, ?, ?) " +
    "ON CONFLICT(user_id) DO UPDATE SET status = 'active', answers = excluded.answers, joined_at = COALESCE(memberships.joined_at, excluded.joined_at), updated_at = excluded.updated_at"
  ).bind(user.id, JSON.stringify(answers), now, now, now).run();
  return json({ ok: true });
}
