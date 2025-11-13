"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import useProtectedUser from "@/hooks/useProtectedUser";
import SchedulingDashboard from "@/components/neo/SchedulingDashboard";
import useNeoModels from "@/hooks/useNeoModels";

const menuItems = [
  {
    id: "insta",
    label: "Insta",
    description: "Plan Instagram drops, manage tokens, and organise prompts.",
  },
  {
    id: "overview",
    label: "Overview",
    description: "High-level summary of agency ops (coming soon).",
    disabled: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Performance insights & growth tracking (roadmap).",
    disabled: true,
  },
];

export default function NeoPage() {
  const { user, loading } = useProtectedUser();
  const [activeMenu, setActiveMenu] = useState("insta");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { models, loading: modelsLoading, error: modelsError } = useNeoModels();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 lg:flex-row">
        {!sidebarCollapsed ? (
          <aside className="lg:w-64 shrink-0">
            <div className="rounded-3xl border border-purple-500/40 bg-purple-500/10 p-6 shadow-lg shadow-purple-500/10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.35em] text-purple-200">
                    Neo Control Room
                  </p>

                  <p className="text-sm text-purple-100/80">{user.email}</p>
                  <p className="mt-4 text-xs text-purple-100/70">
                    Craft weekly drops, regenerate tokens, and keep every model
                    aligned with upcoming campaigns.
                  </p>
                  <Link
                    href="/neo/playground"
                    className="mt-4 inline-flex items-center justify-center rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-purple-200 transition hover:border-purple-400"
                  >
                    Open Playground →
                  </Link>
                </div>
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-purple-500/40 bg-purple-500/20 text-purple-200 transition hover:border-purple-400 hover:bg-purple-500/30"
                  title="Collapse sidebar"
                >
                  &lt;&lt;
                </button>
              </div>
            </div>

            <nav className="mt-6 space-y-2">
              {menuItems.map((item) => {
                const isActive = item.id === activeMenu;
                return (
                  <button
                    key={item.id}
                    onClick={() => !item.disabled && setActiveMenu(item.id)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-purple-500 bg-purple-500/20 text-white shadow-lg shadow-purple-500/20"
                        : "border-gray-800 bg-gray-900 text-gray-300 hover:border-purple-500/40 hover:text-white"
                    } ${item.disabled ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-wide">
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="text-xs text-purple-200">active</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-900/60 p-4 text-xs text-gray-500">
              <p>
                Need automation? Connect this workspace to Supabase Edge
                Functions or a Meta app to ship schedules directly to Instagram.
                Add analytics later to close the loop.
              </p>
            </div>
          </aside>
        ) : (
          <div className="shrink-0 lg:w-[60px]">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="sticky top-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/40 bg-purple-500/20 text-white shadow-lg shadow-purple-500/20 hover:border-purple-400 transition"
              title="Expand sidebar"
            >
              &gt;&gt;
            </button>
          </div>
        )}

        <main className="flex-1">
          {activeMenu === "insta" ? (
            <SchedulingDashboard
              models={models}
              loading={modelsLoading}
              error={modelsError}
            />
          ) : (
            <div className="rounded-3xl border border-gray-800 bg-gray-900/40 p-12 text-center text-gray-500">
              Coming soon — build analytics and overview dashboards here.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
