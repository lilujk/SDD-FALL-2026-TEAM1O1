"use client";
import { FormEvent, useMemo, useState } from "react";
import SearchPane from "@/components/SearchPane";
import ResourceListing from "@/components/ResourceListing";
import ResourceTag, { type ResourceTagProps } from "@/components/ResourceTag";
import Link from 'next/link';

import {getTagResources, getAuthorResources, getResource}  from "../lib/api.js";
import FormCheckboxInput from "@/components/FormCheckbox.js";

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


type Id = number | string;

export default function Explore({}) {
  const [tagName, setTagName] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [resourceIds, setResourceIds] = useState([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const tag = tagName.trim();
    const authorQ = author.trim();
    const titleQ = title.trim();
    if (!tag && !author! && !title!) return;

    setLoading(true);
    setError("");

    try {
      const ids: Id[] = [];

      if (tag) {
        const {data } = await getTagResources(tag);
        ids.push(...(data.resourceIds ?? []));
      }

      if (authorQ) {
        const { data } = await getAuthorResources(authorQ);
        ids.push(...(data.resourceIds ?? []));
      }

      const uniqueIds = Array.from(new Set(ids.map(String)));

      // if (titleQ) {
      //   const { data } = await getTitleResources(titleQ);
      //   ids.push(...(data.resourceIds ?? []));
      // }

      const fetchedResources = await Promise.all(
        uniqueIds.map(async (id: number | string) => {
          const { data } = await getResource(id);
          return { ...data, id: data.id ?? id };
        })
      );

      setResources(fetchedResources);

    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching.");
      setResourceIds([]);
    } finally {
      setSearched(true);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end">
      <div className="flex flex-col m-2 mt-5">
        <div className="relative">
          <input
            name="Search"
            type="search"
            placeholder="Explore Resources"
            className="border border-black text-black placeholder:text-black rounded-sm px-2 py-0.5 pr-9 min-w-175"
          />
          <img
            src="/search.png"
            alt=""
            aria-hidden="true"
            className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 object-contain"
          />
        </div>
      </div>

      <div className="flex w-full flex-row items-start gap-5">
        <div className="ml-5 mt-2 shrink-0">
          <form
            onSubmit={handleSearch}
            className="flex min-w-75 flex-col overflow-hidden rounded-xl border border-gray-300 text-black mb-10"
          >
            {/* <h1 className="border-b border-gray-300 px-2 py-1 text-xl">
              Advanced Search
            </h1> */}

            <div>
              <div className="flex flex-col m-2">
                <p>Resource Title</p>
                <input
                  name="Resource Title"
                  value = {title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-1 border-black-300 rounded-md px-1 py-0.5"
                />
              </div>

              <div className="flex flex-col m-2">
                <p>Resource Author</p>
                <input
                  name="Resource Author"
                  value = {author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="border-1 border-black-300 rounded-md px-1 py-0.5"
                />
              </div>

              <div className="flex flex-col m-2">
                <p>Include Tag(s)</p>
                <input
                  name="Include Tag(s)"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  className="border-1 border-black-300 rounded-md px-1 py-0.5"
                />
              </div>

              <div className="flex flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white text-sm rounded-sm py-1 px-2 ml-3 mt-3 mb-5 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mb-10 flex min-w-0 flex-1 flex-col gap-2">
          {error && <p className="text-red-600">{error}</p>}

          {searched && !loading && !error && resources.length === 0 && (
            <p className="text-black">No resources found.</p>
          )}

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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


// const title = "Poline — Esoteric Color Palette Generation Library";
// const description =
//   "Poline is an interactive color palette generator that helps you explore and create distinctive color combinations. Adjust colors and their positions to shape a palette that fits your project.";
// const tags = [
//   { name: "Color", type: "topical" },
//   { name: "Palettes", type: "topical" },
//   { name: "Hues", type: "topical" },
//   { name: "Web Tool", type: "medium" },
//   { name: "Free", type: "price" },
// ] as const;

// const title2 = "Google Fonts";
// const description2 =
//   "Google Fonts is a library where you can browse, preview, and download open-source fonts for your projects. It makes it easy to explore different type styles and find one that fits your design.";
// const tags2 = [
//   { name: "Fonts", type: "topical" },
//   { name: "Typography", type: "topical" },
//   { name: "Web Tool", type: "medium" },
//   { name: "Free", type: "price" },
// ] as const;

// const title3 = "Line of Action";
// const description3 =
//   "Line of Action provides timed photo references to help artists practice figure drawing, gesture, proportions, and movement.";
// const tags3 = [
//   { name: "Figure Drawing", type: "topical" },
//   { name: "Anatomy", type: "topical" },
//   { name: "Sketching", type: "topical" },
//   { name: "Web Tool", type: "medium" },
//   { name: "Free", type: "price" },
//   { name: "Nudity", type: "warning" },
// ] as const;

// const title4 = "Krita";
// const description4 =
//   "Krita is a free, open-source digital painting program for creating illustrations, concept art, comics, and animations.";
// const tags4 = [
//   { name: "Digital Art", type: "topical" },
//   { name: "Sketching", type: "topical" },
//   { name: "Drawing", type: "topical" },
//   { name: "Application", type: "medium" },
//   { name: "Free", type: "price" },
// ] as const;