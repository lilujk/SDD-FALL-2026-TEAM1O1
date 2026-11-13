"use client";

import { useState, useEffect } from "react";
import { type FormEvent } from "react";
import { getSession, getResource, patchResource } from "../../../../lib/api.js";

import ResourceTag, { type ResourceTagProps } from "@/components/ResourceTag";
import { useParams, useRouter } from "next/navigation";

type ResourceTagData = Pick<ResourceTagProps, "name" | "type">;

export default function EditResource() {
  const [description, setDescription] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const priceOptions = ["Free", "Freemium", "Premium"];
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [mediumInput, setMediumInput] = useState("");
  const [warningInput, setWarningInput] = useState("");
  const [topicalInput, setTopicalInput] = useState("");
  const [certified, setCertified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const { resourceId } = useParams<{ resourceId: string }>();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data: session } = await getSession();

        if (!session.session) {
          router.replace("/account-management/login");
          return;
        }

        const { data: resource } = await getResource(resourceId);

        if (String(resource.userId) !== String(session.userId)) {
          router.replace("/explore");
          return;
        }

        if (cancelled) return;

        setTitle(resource.title ?? "");
        setLink(resource.link ?? "");
        setDescription(resource.description ?? "");
        setSelectedPrice(resource.price ?? "");
        setMediumInput(
          (resource.medium ?? []).map((tag: ResourceTagData) => tag.name).join(", ")
        );
        setWarningInput(
          (resource.warnings ?? []).map((tag: ResourceTagData) => tag.name).join(", ")
        );
        setTopicalInput(
          (resource.tags ?? [])
            .filter((tag: ResourceTagData) => tag.type === "topical")
            .map((tag: ResourceTagData) => tag.name)
            .join(", ")
        );
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load resource.");
        }
      } finally {
        if (!cancelled) setCheckingSession(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [resourceId, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: session } = await getSession();

      if (!session.session) {
        router.replace("/account-management/login");
        return;
      }

      const toTags = (input: string, type: ResourceTagProps["type"]) =>
        input
          .split(",")
          .map((name) => name.trim())
          .filter(Boolean)
          .map((name) => ({ name, type }));

      await patchResource(resourceId, {
        title,
        link,
        description,
        price: selectedPrice,
        medium: toTags(mediumInput, "medium"),
        warnings: toTags(warningInput, "warning"),
        tags: toTags(topicalInput, "topical"),
      });

      router.push(`/individual-resource/${resourceId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save changes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex w-150 flex-col overflow-hidden rounded-xl border border-gray-300 text-black my-10 mx-8">
        <h1 className="border-b border-gray-300 px-2 py-1 text-xl">
          Edit Resource
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col m-2 mb-5 px-2 mt-3">
            <p>Resource Title</p>
            <input
              name="Resource Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="border-1 border-black-300 rounded-md px-1 py-0.5"
            />
          </div>
          
          <div className="flex flex-col m-2 mb-5 px-2">
            <p>Resource Link</p>
            <input
              name="Resource Link"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              className="border-1 border-black-300 rounded-md px-1 py-0.5"
            />
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
            <input name="Select Topical Tags" className="border-1 border-black-300 rounded-md px-1 py-0.5"></input>
          </div>

          <div className="flex flex-row">
            <button type="submit" disabled={loading} className="bg-black text-white text-sm rounded-sm py-1 px-2 ml-3 mb-5 cursor-pointer"> 
            {loading ? "Saving..." : "Save Changes"}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}