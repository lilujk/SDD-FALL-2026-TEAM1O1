"use client"

import { useEffect, useState, type FormEvent} from "react";
import { useRouter } from "next/navigation";
import { postLogin, getSession } from "../../lib/api.js";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const checkSession = async(): Promise<boolean> => {
    try {
      const { data } = await getSession();
      return data.session === true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const hasSession = await checkSession();
      if (cancelled) return;

      if (hasSession) {
        router.replace("/account/profile");
      } else {
        setCheckingSession(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log({ username, password })

    try {
      await postLogin(username, password);
      const session = await getSession();

      console.log(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) return null;

  return (
      <div className="flex justify-center">
        
        <form 
          onSubmit={handleSubmit}
          className="flex w-150 flex-col overflow-hidden rounded-xl border border-gray-300 text-black my-10 mx-8"
        >
          <h1 className="border-b border-gray-300 px-2 py-1 text-xl">
            Account Log In
          </h1>
  
          <div>
            <div className="flex flex-col m-2 mb-5 px-2 mt-3">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="border-1 border-black-300 rounded-md px-1 py-0.5"
              />
            </div>
            
            <div className="flex flex-col m-2 mb-3 px-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="border-1 border-black-300 rounded-md px-1 py-0.5"
              />
            </div>

            {error && <p className="text-sm text-red-600 mx-4 mb-2">{error}</p>}

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col m-2 mb-5 px-2">
                <p className="text-sm">
                    No account?{" "}
                  <a href="./signup" className="underline text-blue-600">
                    Create one
                  </a>
                </p>
              </div>

              <div className="flex flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white text-md rounded-sm py-1 px-2 ml-3 mb-5 mr-4 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }