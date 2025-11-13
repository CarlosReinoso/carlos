"use client";

import useProtectedUser from "@/hooks/useProtectedUser";
import CRMDashboard from "@/components/crm/CRMDashboard";

export default function CRMPage() {
  const { user, loading } = useProtectedUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <CRMDashboard user={user} />;
}
