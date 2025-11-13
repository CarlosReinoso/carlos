"use client";

import { useState } from "react";
import supabase from "@/services/supabase/config";
import { useRouter } from "next/navigation";
import Typography from "@/components/common/Typography";
import SpreadsheetTable from "./SpreadsheetTable";

export default function CRMDashboard({ user }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/web-dev/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Typography
                variant="h2"
                className="text-white text-2xl font-bold"
              >
                CRM Dashboard
              </Typography>
              <span className="text-gray-400 text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/web-dev"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                ← Back to Web Dev
              </a>
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-700">
          <div className="mb-6">
            <Typography
              variant="h3"
              className="text-white text-xl font-semibold mb-2"
            >
              Contacts
            </Typography>
            <Typography variant="body1" className="text-gray-400 text-sm">
              Manage your contacts in a spreadsheet-like interface. Click any
              cell to edit.
            </Typography>
          </div>

          <SpreadsheetTable />
        </div>

        {/* Stats Cards
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <Typography variant="body2" className="text-gray-400 text-sm mb-1">
              Total Contacts
            </Typography>
            <Typography variant="h3" className="text-white text-2xl font-bold">
              -
            </Typography>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <Typography variant="body2" className="text-gray-400 text-sm mb-1">
              New Leads
            </Typography>
            <Typography variant="h3" className="text-white text-2xl font-bold">
              -
            </Typography>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <Typography variant="body2" className="text-gray-400 text-sm mb-1">
              Qualified
            </Typography>
            <Typography variant="h3" className="text-white text-2xl font-bold">
              -
            </Typography>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <Typography variant="body2" className="text-gray-400 text-sm mb-1">
              Won Deals
            </Typography>
            <Typography variant="h3" className="text-white text-2xl font-bold">
              -
            </Typography>
          </div>
        </div> */}
      </main>
    </div>
  );
}
