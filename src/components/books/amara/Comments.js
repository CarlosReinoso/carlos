"use client";

import Button from "@/components/property/Button";
import supabase from "@/services/supabase/config";
import { useEffect, useState } from "react";

export default function CommentBox({ chapter }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("amara_comments")
        .select("*")
        .eq("chapter", chapter)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load comments:", error);
      } else {
        setComments(data);
      }

      setLoading(false);
    };

    fetchComments();
  }, [chapter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError(null);

    if (!name.trim() || !comment.trim()) {
      setError("Please enter your name and comment.");
      return;
    }

    const { error: insertError } = await supabase
      .from("amara_comments")
      .insert([
        {
          chapter,
          name,
          comment,
        },
      ]);

    if (insertError) {
      console.error("Error submitting comment:", insertError);
      setError("Something went wrong. Try again.");
    } else {
      setComments([
        { name, comment, created_at: new Date().toISOString() },
        ...comments,
      ]);
      setName("");
      setComment("");
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 text-white">
      <h3 className="text-xl font-bold mb-4">Comments</h3>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Your name"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Leave your comment here..."
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {submitted && (
          <p className="text-green-400 text-sm">Thanks for your comment!</p>
        )}
        <Button onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </form>

      {loading ? (
        <p className="text-gray-400">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-400">No comments yet. Be the first!</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c, i) => (
            <li key={i} className="bg-gray-900 p-4 rounded shadow">
              <p className="font-semibold">{c.name}</p>
              <p className="text-gray-300 text-sm whitespace-pre-line">
                {c.comment}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(c.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
