"use client"

import { useEffect, useState, type FormEvent} from "react";
import { useRouter } from "next/navigation";
import { postLogout, getSession, getResource, getUserResources } from "../../lib/api.js";
import AccountNavBar from "@/components/AccountNavBar";
import ResourceListing from "@/components/ResourceListing";
import ResourceTag, { type ResourceTagProps } from "@/components/ResourceTag";
import Link from 'next/link';

type Resource = {
  id: number | string;
  title: string;
  description: string;
  link: string;
  tags?: ResourceTagProps[];
  medium?: ResourceTagProps[];
  warnings?: ResourceTagProps[];
  price?: string;
};

export default function YourResources() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [resources, setResources] = useState<Resource[]>([]);

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
      try {
         const { session, userId } = await checkSession();
         if (cancelled) return;

         if (!session) {
         router.replace("/account-management/login");
         return;
         }

         if (!userId) {
         setError("Could not determine your user ID");
         return;
         }

         const { data: resourceIds } = await getUserResources(userId);
         const fetchedResources = await Promise.all(
         resourceIds.map(async (id: number | string) => {
            const { data } = await getResource(id);
            return { ...data, id: data.id ?? id };
         })
         );

         if (!cancelled) setResources(fetchedResources);
      } catch (err) {
         if (!cancelled) {
         setError(err instanceof Error ? err.message : "Failed to load resources");
         }
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
         <h1 className="text-black text-3xl ml-5 mb-2">Your Shared Resources</h1>
        <div className="ml-5 mb-5 border border-black w-225 min-h-[18.75rem] p-2 flex flex-col gap-2">
            {resources.map((resource) => {
            const tags = [
               ...(resource.tags ?? []),
               ...(resource.medium ?? []),
               ...(resource.price
                  ? [{ name: resource.price, type: "price" as const }]
                  : []),
               ...(resource.warnings ?? []),
            ];

            return (
            <div key={resource.id} className="flex items-center gap-3">
               <div className="min-w-0 flex-1">
                  <ResourceListing
                  title={resource.title}
                  description={resource.description}
                  tags={tags}
                  link={`/individual-resource/${resource.id}`}
                  />
               </div>

               <Link
                  href={`/account/your-resources/edit-resource/${resource.id}`}
                  aria-label={`Edit ${resource.title}`}
                  className="flex h-10 w-10 mr-5 shrink-0 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
               >
                  <img src="/pencil.png" alt="" className="h-5 w-5 object-contain" />
               </Link>
            </div>
            );
            })}
        </div>
      </div>
    </div>
  );
}