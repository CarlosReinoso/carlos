"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import supabase from "@/services/supabase/config";

const colorPalette = {
  milamonreo: { from: "from-pink-500", to: "to-rose-500" },
  "neo-monroe": { from: "from-purple-500", to: "to-indigo-500" },
  "aria-nova": { from: "from-pink-500", to: "to-rose-500" },
  "kai-spectra": { from: "from-blue-500", to: "to-cyan-500" },
  "luna-void": { from: "from-purple-500", to: "to-indigo-500" },
  "milo-tone": { from: "from-emerald-500", to: "to-teal-500" },
};

function mapRecordToModel(record) {
  const handle = record.handle
    ? record.handle.startsWith("@")
      ? record.handle
      : `@${record.handle}`
    : "";

  const palette = colorPalette[record.model_id] || {
    from: "from-purple-500",
    to: "to-pink-500",
  };

  return {
    id: record.model_id,
    uuid: record.id,
    name: record.name || record.model_id,
    handle,
    niche: record.niche || "",
    igUserId: record.ig_user_id || "",
    accessToken: record.ig_access_token || null,
    tokenExpiresAt: record.token_expires_at || null,
    colorFrom: palette.from,
    colorTo: palette.to,
    isActive: record.is_active ?? true,
  };
}

export default function useNeoModels({ activeOnly = true } = {}) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchModels = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("neo_models")
        .select(
          "id, model_id, name, handle, niche, ig_user_id, ig_access_token, token_expires_at, is_active"
        )
        .order("name", { ascending: true });

      if (activeOnly) {
        query = query.eq("is_active", true);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      const mapped = (data ?? []).map(mapRecordToModel);

      setModels(mapped);
    } catch (err) {
      console.error("useNeoModels", err);
      setModels([]);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const lookup = useMemo(() => {
    return models.reduce((acc, model) => {
      acc[model.id] = model;
      return acc;
    }, {});
  }, [models]);

  return {
    models,
    modelsMap: lookup,
    loading,
    error,
    refresh: fetchModels,
  };
}
