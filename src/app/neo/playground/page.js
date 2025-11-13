"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useProtectedUser from "@/hooks/useProtectedUser";
import useNeoModels from "@/hooks/useNeoModels";

export default function NeoPlaygroundPage() {
  const { user, loading } = useProtectedUser();
  const {
    models,
    loading: modelsLoading,
    error: modelsError,
    refresh: refreshModels,
  } = useNeoModels();
  const [selectedModel, setSelectedModel] = useState("");
  const [caption, setCaption] = useState("here_is_my_post");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [igUserId, setIgUserId] = useState("");
  const [accessToken, setAccessToken] = useState(
    "EAAMGDBqBDs4BP0K9K1slBJPno4RScBCj7VyYJP7yMw1ZAGFABIRO2cXgDXepAKLZB99o8ubw5vJtnky1cnDB35xF1oNYZALgiOwNGBZBhpCp2rKYfBcOgjN78tk0uEKjwWyxifirk1QU7AmAICGqRMIhiZC6HG2GYi5wpO3TpFWtmCegd2ZC5iCptBOnOZA4nkhswQdAtztqLfZCmLyIXbuMpoici3NotGUIcFmJWIyswLyr792AVc9ZAgewcRAZDZD"
  );
  const [status, setStatus] = useState({ type: "idle", message: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [libraryAssets, setLibraryAssets] = useState([]);
  const [libraryLoading, setLibraryLoading] = useState(true);
  const [selectedLibraryPath, setSelectedLibraryPath] = useState(null);

  const trimmedImageUrl = useMemo(() => imageUrl.trim(), [imageUrl]);

  useEffect(() => {
    if (models.length) {
      setSelectedModel(models[0].id);
      setIgUserId(models[0].igUserId || "");
    }
  }, [models]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result || null);
    };
    reader.readAsDataURL(imageFile);

    return () => reader.abort();
  }, [imageFile]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLibraryLoading(true);
        const response = await fetch("/api/neo/assets");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load assets");
        }
        setLibraryAssets(data.assets ?? []);
      } catch (error) {
        console.error("Asset load error", error);
      } finally {
        setLibraryLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const selectedModelInfo = useMemo(() => {
    return models.find((model) => model.id === selectedModel);
  }, [models, selectedModel]);

  useEffect(() => {
    if (selectedModelInfo?.igUserId) {
      setIgUserId(selectedModelInfo.igUserId);
    }
  }, [selectedModelInfo]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!modelsLoading && modelsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 px-6 py-10">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-2xl font-semibold text-red-300">
            Unable to load models
          </h1>
          <p className="text-sm text-red-200">
            {modelsError.message ||
              "Check your Supabase configuration and try again."}
          </p>
          <button
            onClick={refreshModels}
            className="rounded-2xl border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-purple-200 transition hover:border-purple-400"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const noModels = !modelsLoading && models.length === 0;

  if (noModels) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 px-6 py-10">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-2xl font-semibold text-yellow-200">
            No models available
          </h1>
          <p className="text-sm text-gray-300">
            Add records to the `neo_models` table in Supabase to enable
            publishing.
          </p>
          <button
            onClick={refreshModels}
            className="rounded-2xl border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-purple-200 transition hover:border-purple-400"
          >
            Check again
          </button>
        </div>
      </div>
    );
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImageFile(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setStatus({ type: "error", message: "Please select an image file" });
      setImageFile(null);
      return;
    }

    setStatus({ type: "idle", message: null });
    setImageFile(file);
    setSelectedLibraryPath(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!igUserId || !accessToken) {
      setStatus({
        type: "error",
        message: "Enter both the Instagram user ID and access token.",
      });
      return;
    }

    if (!imageFile && !imageUrl) {
      setStatus({
        type: "error",
        message:
          "Upload an image or provide an externally hosted image URL accessible to Instagram.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "loading", message: "Publishing to Instagram..." });

    try {
      const body = new FormData();
      body.append("igUserId", igUserId.trim());
      body.append("accessToken", accessToken.trim());
      body.append("caption", caption);
      body.append("modelId", selectedModel);

      if (trimmedImageUrl) {
        body.append("imageUrl", trimmedImageUrl);
      } else if (imagePreview) {
        body.append("imageData", imagePreview);
      }

      const response = await fetch("/api/instagram/publish", {
        method: "POST",
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to publish to Instagram");
      }

      setStatus({
        type: "success",
        message: `Published! Container ${data.creationId}.`,
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to publish",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectAsset = (asset) => {
    setSelectedLibraryPath(asset.path);
    setImageUrl(asset.publicUrl);
    setImageFile(null);
    setImagePreview(null);
    setStatus({ type: "idle", message: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-purple-500/40 bg-purple-500/10 p-6 shadow-lg shadow-purple-500/10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-purple-200">
              Neo Playground
            </p>
            <h4 className="mt-2 font-semibold text-white">
              Quick Instagram Drop
            </h4>
            <p className="mt-1 text-sm text-purple-100/80">
              Compose a one-off post, choose the model, and push straight to
              Instagram.
            </p>
          </div>
          <div className="flex flex-row gap-3 text-sm">
            <Link
              href="/neo"
              className="rounded-2xl border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-purple-200 transition hover:border-purple-400"
            >
              ← Back to scheduler
            </Link>
            <button
              type="button"
              onClick={refreshModels}
              className="rounded-2xl border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-purple-200 transition hover:border-purple-400"
            >
              Refresh models
            </button>
            <button
              type="button"
              onClick={async () => {
                try {
                  setLibraryLoading(true);
                  const response = await fetch("/api/neo/assets");
                  const data = await response.json();
                  if (!response.ok) {
                    throw new Error(data?.error || "Failed to refresh assets");
                  }
                  setLibraryAssets(data.assets ?? []);
                } catch (error) {
                  console.error("Refresh assets error", error);
                } finally {
                  setLibraryLoading(false);
                }
              }}
              className="rounded-2xl border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-purple-200 transition hover:border-purple-400"
            >
              Refresh library
            </button>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 rounded-3xl border border-gray-800 bg-gray-900/50 p-6"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(event) => setSelectedModel(event.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
                  disabled={modelsLoading || !models.length}
                >
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
                {selectedModelInfo && (
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedModelInfo.handle} • {selectedModelInfo.niche}
                  </p>
                )}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex flex-col text-xs font-semibold uppercase tracking-wide text-gray-400">
                  IG User ID
                  <input
                    value={igUserId}
                    onChange={(event) => setIgUserId(event.target.value)}
                    placeholder="e.g. 17841400000000000"
                    className="mt-1 rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
                    required
                  />
                </label>
                <label className="flex flex-col text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Access Token
                  <input
                    value={accessToken}
                    onChange={(event) => setAccessToken(event.target.value)}
                    placeholder="Paste long-lived token"
                    className="mt-1 rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
                    required
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Caption
                </label>
                <textarea
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                  rows={5}
                  placeholder="Write the hook, CTA, hashtags or prompt notes..."
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Instagram enforces 2,200 character limit. Keep image ratio
                  close to 4:5.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Image Upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 w-full text-sm text-gray-200 file:mr-4 file:rounded-lg file:border-0 file:bg-purple-500/20 file:px-4 file:py-2 file:text-purple-100 hover:file:bg-purple-500/30"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Images must be reachable by Instagram. Provide an external
                  image URL if posting directly from localhost fails.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Alternate Image URL (optional)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                  placeholder="https://your-cdn.com/render.jpg"
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
                />
                <p className="mt-1 text-xs text-gray-500">
                  If supplied, this overrides the local upload and is sent to
                  Instagram's API.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Library Assets
                </label>
                <div className="mt-2 max-h-64 overflow-y-auto rounded-xl border border-gray-800 bg-gray-950/80">
                  {libraryLoading ? (
                    <div className="flex items-center justify-center py-6 text-xs text-gray-500">
                      Loading assets...
                    </div>
                  ) : libraryAssets.length === 0 ? (
                    <div className="flex items-center justify-center py-6 text-xs text-gray-500">
                      Upload to the `images/neo` bucket to see files here.
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-800 text-sm">
                      {libraryAssets.map((asset) => (
                        <li key={asset.path}>
                          <button
                            type="button"
                            onClick={() => handleSelectAsset(asset)}
                            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-800/60 ${
                              selectedLibraryPath === asset.path
                                ? "bg-gray-800/70"
                                : ""
                            }`}
                          >
                            <div className="h-12 w-12 overflow-hidden rounded-lg border border-gray-800 bg-black/40">
                              <img
                                src={asset.publicUrl}
                                alt={asset.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-100">
                                {asset.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {asset.createdAt
                                  ? new Date(asset.createdAt).toLocaleString()
                                  : ""}
                              </p>
                            </div>
                            <span className="text-xs text-blue-300">Use</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-gray-800 bg-black/40 p-4 text-sm text-gray-300">
                <h2 className="text-lg font-semibold text-white">Preview</h2>
                <div className="mt-3 grid gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <div>
                      <p className="text-sm font-semibold">
                        {selectedModelInfo?.name || "Model"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {selectedModelInfo?.handle || "@model"}
                      </p>
                    </div>
                  </div>
                  <div className="aspect-square w-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900/60">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : trimmedImageUrl ? (
                      <img
                        src={trimmedImageUrl}
                        alt="Remote preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-500">
                        Choose an image to preview
                      </div>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {caption || "Your caption will appear here."}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-4 text-xs text-gray-500">
                <p>
                  Meta's Content Publishing API expects business/creator IG
                  users with long-lived tokens. Token refresh cadence: 60 days.
                  Keep prompts and output stored alongside the published post ID
                  for analytics down the line.
                </p>
              </div>
            </div>
          </div>

          {status.message && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                  : status.type === "error"
                  ? "border-red-500/40 bg-red-500/10 text-red-200"
                  : "border-blue-500/40 bg-blue-500/10 text-blue-200"
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Publishing..." : "Publish to Instagram"}
            </button>
            <p className="text-xs text-gray-500">
              This calls the `/api/instagram/publish` endpoint with your token.
              Ensure the token has the `instagram_content_publish` scope.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
