// In-app notifications. Nobody is notified about their own actions.
export const notify = (env, { to, actor, type, postId = null, commentId = null }) =>
  to === actor ? null : env.DB.prepare("INSERT INTO notifications (user_id, actor_id, type, post_id, comment_id, created_at) VALUES (?, ?, ?, ?, ?, ?)").bind(to, actor, type, postId, commentId, Date.now());
