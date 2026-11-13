"use client"

import { useEffect, useState, type FormEvent} from "react";
import { useRouter } from "next/navigation";
import { postLogout, getSession, getUser } from "../../lib/api.js";
import AccountNavBar from "@/components/AccountNavBar";

export default function Account() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const checkSession = async (): Promise<{ session: boolean; userId?: string }> => {
    try {
      const { data } = await getSession();
      return { session: data.session === true, userId: data.userId };
    } catch {
      return { session: false };
    }
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { session, userId } = await checkSession();
      if (cancelled) return;

      if (!session) {
        router.replace("/account-management/login");
        return;
      }

      if (!userId) {
        setError("Could not determine your user ID");
        setCheckingSession(false);
        return;
      }
      
      try {
        const { data } = await getUser(userId);
        if (cancelled) return;

        console.log(data);

        setUsername(data.username);
        setBio(data.bio);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        if (!cancelled) setCheckingSession(false);
      }
    })();

    return () => {
      cancelled = true;
    };

  }, [router]);

  const handleLogout = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await postLogout();
      router.replace("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
    } finally {
      setLoading(false);
    }

  }

  if (checkingSession) return null;

  return (
    <div className="flex flex-row">
      <AccountNavBar />
      <div className="ml-3">
        <div className="mb-5">
          <h1 className="text-2xl font-semibold">{username}</h1>
          <p className="text-gray-600 mt-1">{bio || "No bio yet."}</p>
        </div>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <form onSubmit={handleLogout}>
          <div className="flex flex-row">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-300 text-red-700 text-md rounded-sm py-1 px-2 mb-5 mr-4 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Logging out..." : "Log Out"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}