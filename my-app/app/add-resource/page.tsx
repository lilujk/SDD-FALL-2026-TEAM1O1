"use client";

import { useEffect, useState, type FormEvent } from "react";

import ResourceTag, { type ResourceTagProps } from "@/components/ResourceTag";

import { useRouter } from "next/navigation";
import { getSession, postResource } from "../lib/api.js";

export default function AddResource() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [mediumInput, setMediumInput] = useState("");
  const [warningInput, setWarningInput] = useState("");
  const [topicalInput, setTopicalInput] = useState("");
  const [certified, setCertified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);

  const priceOptions = ["Free", "Freemium", "Premium"];

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
      }
  
      setCheckingSession(false);
    })();
  
    return () => {
      cancelled = true;
    };
  }, [router]);
  
  if (checkingSession) return null;  

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setError("");

  if (!certified) {
    setError("Please check the certification box.");
    return;
  }

  setLoading(true);
  try {
    const { data: session } = await getSession();

    if (!session.session || !session.userId) {
      router.push("/account/login");
      return;
    }

    await postResource(session.userId, {
      title,
      userId: session.userId,
      description,
      link: link,
      approved: true,
      access: 0,
    });

    router.push("/explore");
  } catch (err) {
    setError(err instanceof Error ? err.message : "Could not submit resource.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex justify-center">
      <div className="flex w-150 flex-col overflow-hidden rounded-xl border border-gray-300 text-black my-10 mx-8">
        <h1 className="border-b border-gray-300 px-2 py-1 text-xl">
          Add Resource
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col m-2 mb-5 px-2 mt-3">
            <p>Resource Title</p>
            <input 
            name="Resource Title" 
            className="border-1 border-black-300 rounded-md px-1 py-0.5"
            onChange={(event) => setTitle(event.target.value)}>
            </input>
          </div>
          
          <div className="flex flex-col m-2 mb-5 px-2">
            <p>Resource Link</p>
            <input 
            name="Resource Link" 
            className="border-1 border-black-300 rounded-md px-1 py-0.5"
            onChange={(event) => setLink(event.target.value)}>
            </input>
          </div>

          <div className="flex flex-col m-2 px-2">
            <p>Resource Description</p>
            <textarea
              name="Resource Description"
              className="border-1 border-black-300 rounded-md px-1 py-0.5 text-base leading-6 h-[100px]"
              maxLength={1000}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <p className="self-end text-sm text-gray-500" aria-live="polite">
              {1000 - description.length} characters remaining
            </p>
          </div>

          <div className="m-2 mt-0 mb-5 px-2">
            <p>Select Pricing Tag</p>
            <div className="flex gap-2">
              {priceOptions.map((price) => (
                <ResourceTag
                  key={price}
                  name={price}
                  type="price"
                  selected={selectedPrice === price}
                  onClick={() => setSelectedPrice(price)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col m-2 mb-5 px-2">
            <p>Select Medium Tags</p>
            <input name="Select Medium Tags" className="border-1 border-black-300 rounded-md px-1 py-0.5"></input>
          </div>

          <div className="flex flex-col m-2 mb-5 px-2">
            <p>Select Warning Tags</p>
            <input name="Select Warning Tags" className="border-1 border-black-300 rounded-md px-1 py-0.5"></input>
          </div>

          <div className="flex flex-col m-2 mb-5 px-2">
            <p>Select Topical Tags</p>
            <input 
            name="Select Topical Tags" 
            className="border-1 border-black-300 rounded-md px-1 py-0.5"
            onChange={(event) => setTopicalInput(event.target.value)}>
            </input>
          </div>

          <div className="flex flex-row m-2 mb-5 px-2 gap-2">
            <input name="I certify statement" type="checkbox" onChange={(event) => setCertified(event.target.checked)}></input>
            <p className="text-sm">I assert that, to my knowledge, the content I am sharing is not AI-generated or stolen. </p>
          </div>

          <div className="flex flex-row">
            <button className="bg-black text-white text-sm rounded-sm py-1 px-2 ml-3 mb-5 cursor-pointer">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}