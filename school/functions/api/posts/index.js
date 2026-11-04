// GET: a space's feed (?space=free|pro; Pro needs a Pro membership). Filters: ?cat=, ?q= (search), ?before=<createdAt>.
// POST: create a post in a space. Announcements are owner-only and notify everyone in that space.
import { json, fail, body, guard, canUse } from "../../_lib/auth.js";
import { AUTHOR, shapePosts } from "../../_lib/feed.js";
import { site } from "../../../src/site.mjs";

const PAGE = 20;

export async function onRequestGet({ request, env }) {
  const { user, res } = await guard(request, env);
  if (res) return res;
  const p = new URL(request.url).searchParams, space = p.get("space") === "pro" ? "pro" : "free";
  if (!canUse(user, space)) return fail("That's in AI Builders Pro.", 403);
  const where = ["p.space = ?"], args = [space];
  if (p.get("cat")) { where.push("p.category = ?"); args.push(p.get("cat")); }
  if (p.get("q")) { where.push("(p.title LIKE ? OR p.body LIKE ?)"); args.push(`%${p.get("q")}%`, `%${p.get("q")}%`); }
  const before = Number(p.get("before"));
  if (before) { where.push("p.created_at < ? AND p.pinned = 0"); args.push(before); }
  const rows = await env.DB.prepare(
    `SELECT p.*, ${AUTHOR} FROM posts p JOIN users u ON u.id = p.user_id WHERE ${where.join(" AND ")} ORDER BY ${before ? "" : "p.pinned DESC, "}p.created_at DESC LIMIT ${PAGE + 1}`
  ).bind(...args).all();
  const more = rows.results.length > PAGE;
  return json({ posts: await shapePosts(env, rows.results.slice(0, PAGE), user), more });
}

export async function onRequestPost({ request, env }) {
  const { user, res } = await guard(request, env);
  if (res) return res;
  const b = await body(request);
  const title = String(b.title || "").trim().slice(0, 200), text = String(b.body || "").trim().slice(0, 20000);
  const space = b.space === "pro" ? "pro" : "free";
  if (!canUse(user, space)) return fail("That's in AI Builders Pro.", 403);
  const cat = site.categories.find((c) => c.id === b.category);
  if (!cat) return fail("Pick a category.");
  if (cat.ownerOnly && !user.owner) return fail("Only Carlos can post announcements.", 403);
  if (title.length < 3) return fail("Give your post a title.");
  if (text.length < 2) return fail("Write something in your post.");
  const now = Date.now();
  const r = await env.DB.prepare("INSERT INTO posts (user_id, space, category, title, body, created_at) VALUES (?, ?, ?, ?, ?, ?) RETURNING id").bind(user.id, space, cat.id, title, text, now).first();
  if (cat.id === "announcements") {
    await env.DB.prepare("INSERT INTO notifications (user_id, actor_id, type, post_id, created_at) SELECT user_id, ?, 'announcement', ?, ? FROM memberships WHERE status = 'active' AND user_id != ?" + (space === "pro" ? " AND tier = 'pro'" : ""))
      .bind(user.id, r.id, now, user.id).run();
  }
  return json({ id: r.id });
}
