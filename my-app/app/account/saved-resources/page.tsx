"use client"

import { useEffect, useState, type FormEvent} from "react";
import { useRouter } from "next/navigation";
import { postLogout, getSession, getUser } from "../../lib/api.js";
import AccountNavBar from "@/components/AccountNavBar";

export default function Account() {
  const router = useRouter();

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
        <div className="ml-5 mb-5 border-1 border-black border-solid w-225 h-75">
            <a className="flex flex-row gap-5 items-center mb-5 border-1 border-black border-solid m-5 p-5" href="./resource-history">
               <img src="/folder.png" className="h-8 w-8 object-contain"></img>
               <p className="text-black">Resource History</p>
            </a>
        </div>
      </div>
    </div>
  );
}