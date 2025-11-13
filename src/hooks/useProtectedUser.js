"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/services/supabase/config";

/**
 * Hook to enforce authentication on client-side routes.
 * Returns the authenticated user (if any) and a loading state.
 * If the user is not authenticated, they are redirected to the login page.
 */
export default function useProtectedUser(redirectTo = "/login") {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let isMounted = true;

    const determineRedirect = () => {
      const currentPath = window.location.pathname + window.location.search;
      const loginRedirect = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`;
      return loginRedirect;
    };

    const handleRedirect = () => {
      const loginPath = determineRedirect();
      router.replace(loginPath);
    };

    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!isMounted) return;

        if (user) {
          setUser(user);
        } else {
          handleRedirect();
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;

      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        handleRedirect();
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [redirectTo, router, searchParams]);

  return { user, loading };
}
