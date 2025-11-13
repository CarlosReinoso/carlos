"use client";

import { useEffect, useMemo, useState } from "react";

const defaultPlatforms = [
  { id: "instagram_feed", label: "Instagram Feed" },
  { id: "instagram_story", label: "Instagram Story" },
  { id: "instagram_reel", label: "Instagram Reel" },
  { id: "threads_post", label: "Threads Post" },
];

function getNextMonday() {
  const date = new Date();
  const day = date.getDay();
  const diff = (8 - day) % 7 || 7; // days until next Monday
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatFriendlyDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function generateWeekDays(startDate) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return {
      iso: formatDateKey(date),
      label: formatFriendlyDate(date),
      raw: date,
    };
  });
}

export default function SchedulingDashboard({
  models: incomingModels,
  loading,
  error,
}) {
  const models = incomingModels ?? [];
  const [weekStart, setWeekStart] = useState(getNextMonday);
  const [selectedModels, setSelectedModels] = useState(
    models.map((model) => model.id)
  );
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [notes, setNotes] = useState(
    "Generate reels from latest RunPod batch; refresh token Sunday night if needed."
  );

  const weekDays = useMemo(() => generateWeekDays(weekStart), [weekStart]);

  const [formState, setFormState] = useState(() => ({
    day: weekDays[0]?.iso ?? "",
    time: "13:00",
    platform: defaultPlatforms[0].id,
    caption: "",
    assets: "",
    modelIds: models[0] ? [models[0].id] : [],
  }));

  useEffect(() => {
    setSelectedModels(models.map((model) => model.id));
    setFormState((prev) => ({
      ...prev,
      modelIds: models[0] ? [models[0].id] : [],
    }));
  }, [models]);

  const handleModelToggle = (modelId) => {
    setSelectedModels((prev) =>
      prev.includes(modelId)
        ? prev.filter((id) => id !== modelId)
        : [...prev, modelId]
    );

    setFormState((prev) => {
      const isSelected = prev.modelIds.includes(modelId);
      return {
        ...prev,
        modelIds: isSelected
          ? prev.modelIds.filter((id) => id !== modelId)
          : [...prev.modelIds, modelId],
      };
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSchedulePost = (event) => {
    event.preventDefault();

    if (!formState.modelIds.length) {
      alert("Select at least one model for this drop.");
      return;
    }

    const newPost = {
      id: crypto.randomUUID(),
      ...formState,
    };

    setScheduledPosts((prev) => [...prev, newPost]);
    setFormState((prev) => ({
      ...prev,
      caption: "",
      assets: "",
    }));
  };

  const handleWeekShift = (direction) => {
    setWeekStart((current) => {
      const next = new Date(current);
      next.setDate(current.getDate() + direction * 7);
      return next;
    });
  };

  const groupedPosts = useMemo(() => {
    return weekDays.reduce((acc, day) => {
      acc[day.iso] = scheduledPosts.filter((post) => post.day === day.iso);
      return acc;
    }, {});
  }, [scheduledPosts, weekDays]);

  const renderModelPill = (modelId) => {
    const model = models.find((item) => item.id === modelId);
    if (!model) return null;

    return (
      <span
        key={model.id}
        className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${
          model.colorFrom || "from-purple-500"
        } ${
          model.colorTo || "to-pink-500"
        } px-3 py-1 text-xs font-semibold text-white shadow-md`}
      >
        <span>●</span>
        {model.name}
      </span>
    );
  };

  const noModels = !loading && models.length === 0;

  return (
    <div className="space-y-8">
      {loading && (
        <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 px-4 py-3 text-sm text-blue-200">
          Syncing models from Supabase...
        </div>
      )}
      {error && (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error.message || "Failed to load models."}
        </div>
      )}
      {noModels && (
        <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
          No active models found. Add records to `neo_models` in Supabase to
          start scheduling.
        </div>
      )}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Instagram Scheduler
          </h1>
          <p className="text-sm text-gray-400">
            Plan the upcoming week for your AI models. Pull final assets from
            RunPod/ComfyUI exports and attach prompts for regeneration.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleWeekShift(-1)}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            ← Previous Week
          </button>
          <div className="rounded-lg border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
            Starting {formatFriendlyDate(weekStart)}
          </div>
          <button
            onClick={() => handleWeekShift(1)}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Next Week →
          </button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[320px,1fr]">
        <aside className="space-y-6 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
          <div>
            <h2 className="font-semibold uppercase tracking-wide text-gray-300">
              Model Roster
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Toggle to include/exclude from this week's content cycle.
            </p>
          </div>

          <ul className="space-y-3">
            {models.map((model) => {
              const isActive = selectedModels.includes(model.id);
              return (
                <li
                  key={model.id}
                  className={`rounded-xl border p-4 transition-colors ${
                    isActive
                      ? "border-transparent bg-gradient-to-r " +
                        `${model.colorFrom} ${model.colorTo}`
                      : "border-gray-800 bg-gray-900"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {model.name}
                      </p>
                      <p className="text-xs text-gray-200/80">{model.handle}</p>
                      <p className="text-xs text-gray-300/70 mt-1">
                        {model.niche}
                      </p>
                    </div>
                    <label className="inline-flex cursor-pointer items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300"
                        checked={selectedModels.includes(model.id)}
                        onChange={() => handleModelToggle(model.id)}
                      />
                      <span className="text-gray-100">Active</span>
                    </label>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <button
                      onClick={() =>
                        alert(`Trigger IG token refresh for ${model.name}`)
                      }
                      className="rounded-lg border border-white/30 bg-white/10 px-3 py-1 font-medium text-white hover:bg-white/20"
                    >
                      Regenerate Token
                    </button>
                    <button
                      onClick={() =>
                        navigator?.clipboard?.writeText(
                          `https://graph.facebook.com/${model.handle.replace(
                            "@",
                            ""
                          )}/refresh_token`
                        )
                      }
                      className="rounded-lg border border-white/10 bg-black/40 px-3 py-1 text-gray-200 hover:border-white/20"
                    >
                      Copy API Endpoint
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="rounded-xl border border-dashed border-gray-700 p-4">
            <p className="text-sm font-semibold text-gray-300">
              Future Analytics Slot
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Hook in IG insights or a custom metrics service here. Track reach,
              saves, and growth per model.
            </p>
          </div>
        </aside>

        <div className="space-y-6">
          <form
            onSubmit={handleSchedulePost}
            className="grid gap-4 rounded-2xl border border-gray-800 bg-gray-900/40 p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Day
                </label>
                <select
                  name="day"
                  value={formState.day}
                  onChange={handleFormChange}
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
                >
                  {weekDays.map((day) => (
                    <option key={day.iso} value={day.iso}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-40">
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Drop Time (24h)
                </label>
                <input
                  type="time"
                  name="time"
                  value={formState.time}
                  onChange={handleFormChange}
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Format
                </label>
                <select
                  name="platform"
                  value={formState.platform}
                  onChange={handleFormChange}
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
                >
                  {defaultPlatforms.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                      {platform.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                Assign Models
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {models.map((model) => {
                  const active = formState.modelIds.includes(model.id);
                  return (
                    <button
                      type="button"
                      key={model.id}
                      onClick={() => handleModelToggle(model.id)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                        active
                          ? `border-transparent bg-gradient-to-r ${model.colorFrom} ${model.colorTo} text-white`
                          : "border-gray-700 bg-gray-950 text-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {model.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                Caption / Prompt Notes
              </label>
              <textarea
                name="caption"
                value={formState.caption}
                onChange={handleFormChange}
                rows={3}
                placeholder="Hook + CTA + hashtags. Drop your prompt tweaks for ComfyUI here."
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                Asset Checklist / RunPod tasks
              </label>
              <textarea
                name="assets"
                value={formState.assets}
                onChange={handleFormChange}
                rows={2}
                placeholder="e.g. Render 3x 15s reels, export cover PNG, prep carousel copy"
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
              />
            </div>

            <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500"
              >
                Schedule Drop
              </button>
              <p className="text-xs text-gray-500">
                Need automation? Wire this form to a Supabase edge function or
                Zapier to push content into Meta's Publishing API.
              </p>
            </div>
          </form>

          <section className="space-y-4 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-xl font-semibold text-white">
                Week at a Glance
              </h2>
              <span className="text-xs uppercase tracking-wide text-gray-500">
                {scheduledPosts.length} scheduled drops
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {weekDays.map((day) => (
                <article
                  key={day.iso}
                  className="rounded-xl border border-gray-800 bg-gray-950/60 p-4"
                >
                  <header className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {day.label}
                      </p>
                      <p className="text-xs text-gray-500">{day.iso}</p>
                    </div>
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
                      {groupedPosts[day.iso]?.length ?? 0} drops
                    </span>
                  </header>

                  <div className="mt-3 space-y-3">
                    {groupedPosts[day.iso]?.map((post) => (
                      <div
                        key={post.id}
                        className="rounded-lg border border-gray-800 bg-black/40 p-3"
                      >
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{post.time}</span>
                          <span className="uppercase tracking-wide text-gray-500">
                            {
                              defaultPlatforms.find(
                                (item) => item.id === post.platform
                              )?.label
                            }
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {post.modelIds.map((modelId) =>
                            renderModelPill(modelId)
                          )}
                        </div>
                        {post.caption && (
                          <p className="mt-2 text-xs text-gray-300 line-clamp-3">
                            {post.caption}
                          </p>
                        )}
                        {post.assets && (
                          <p className="mt-2 text-[11px] text-gray-500">
                            Assets: {post.assets}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
            <h2 className="text-lg font-semibold text-white">
              Operational Notes
            </h2>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="mt-3 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
              rows={3}
            />
            <p className="mt-2 text-xs text-gray-500">
              Use this space for reminders (e.g. refresh access tokens,
              coordinate giveaways, or queue assets from RunPod's latest
              renders).
            </p>
          </section>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">
          Next Steps & Integrations
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-300">
          <li>
            To auto-publish, connect this scheduler to Meta's Graph API — you'll
            need to store long-lived IG tokens per model (refresh every 60
            days).
          </li>
          <li>
            Consider Supabase tables for{" "}
            <code className="rounded bg-black/60 px-2 py-0.5">models</code>,
            <code className="rounded bg-black/60 px-2 py-0.5">
              scheduled_posts
            </code>
            , and
            <code className="rounded bg-black/60 px-2 py-0.5">assets</code> once
            you wire in persistence.
          </li>
          <li>
            Analytics hook: combine IG Insights (reach, saves, follower delta)
            with campaign IDs for each model so you can score performance per
            creative prompt.
          </li>
          <li>
            When generating content via RunPod/ComfyUI, tag outputs with the
            model ID so you can auto-surface suggested posts here.
          </li>
        </ul>
      </section>
    </div>
  );
}
