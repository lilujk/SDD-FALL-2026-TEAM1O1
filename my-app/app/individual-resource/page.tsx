"use client";

import Link from "next/link";
import { useState } from "react";

import ResourceTag from "@/components/ResourceTag";
import Comment from "@/components/Comment";
import ResourceListing from "@/components/ResourceListing";

/* TEMP: delete once backend is connected */
const tags = [
  { name: "Color", type: "topical" },
  { name: "Palettes", type: "topical" },
  { name: "Hues", type: "topical" },
  { name: "Web Tool", type: "medium" },
  { name: "Free", type: "price" },
] as const;
const comments = [
  { author: "Elijah J.", comment: "This resource has so many cool features, def try it out if you need to find a color palette for your project!!", likecount: 20 },
  { author: "Lucy D.", comment: "This is my favorite website. Totally recommend!", likecount: 8 },
  { author: "Sheloine C.", comment: "Great for coming up with ideas for my friend's three marker challenge 👻🟡🖍️", likecount: 6 },
] as const;
const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London.";
const link = "meodai.github.io/poline/";
const redirect = "https://meodai.github.io/poline/";
const sharedBy = "NOTJohnCola";
const numReviews = 59;
const title = "Poline — Esoteric Color Palette Generation Library";

export default function IndividualResource() {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(372);

  return <div className="mx-auto max-w-5xl px-4 py-6">
  <Link href="/explore" className="text-black py-2 px-5 border-1 border-solid rounded-sm">← Back to search</Link>

  <div className="mt-6 h-64 rounded-xl overflow-hidden bg-neutral-900">
    <img src="header-example.png" alt="Poline" className="h-full w-full object-cover"/>
  </div>

  <div className="mt-4 flex items-center gap-4 text-black">
    <h1 className="text-3xl mt-2">{title}</h1>
    <button
      type="button"
      onClick={() => setIsSaved((current) => !current)}
      aria-label={isSaved ? "Unsave resource" : "Save resource"}
      className="shrink-0 cursor-pointer mt-2"
    >
      <img src={isSaved ? "/bookmark-fill.png" : "/bookmark-empty.png"} alt="Save Resource" className="h-8 w-8 object-contain" />
    </button>
  </div>

  <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[280px_minmax(0,1fr)]">
    <div className="space-y-8">
      <div>
        <h2 className="text-black font-bold">TAGS</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <ResourceTag key={tag.name} name={tag.name} type={tag.type} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-black font-bold">RATING</h2>
        <div className="flex flex-row mt-2">
          <button
            type="button"
            onClick={() => {
              setIsLiked((current) => !current);
              setLikeCount((count) => count + (isLiked ? -1 : 1));
            }}
            aria-label={isLiked ? "Unlike resource" : "Like resource"}
            className="shrink-0 cursor-pointer"
          >
          <img src={isLiked ? "/like-fill.png" : "/like-empty.png"} alt="Like Resource" className="h-8 w-8 object-contain"/>
          </button>
          <p className="text-black mt-1 ml-1">{likeCount}</p>
        </div>
      </div>

      <div>
        <h2 className="text-black font-bold">SHARED BY</h2>
        <p className="text-black mt-1">@{sharedBy}</p>
      </div>
    </div>

    <div className="space-y-8">
      <div>
        <h2 className="text-black font-bold">DESCRIPTION</h2>
        <p className="text-black mt-2">{description}</p>
      </div>

      <div>
        <h2 className="text-black font-bold">URL</h2>
        <div className="mt-1 flex flex-row">
          <img src="/link.png" alt="Link" className="h-6 w-6 object-contain mt-2"/>
          <Link href={redirect} className="text-sky-500 p-2">{link}</Link>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-black font-bold">WHAT PEOPLE ARE SAYING</h2>
        <div className="my-4 flex flex-row justify-between align-items">
          <p className="underline text-black mt-1">{numReviews} reviews</p>
            <button className="text-black py-2 px-6 border-1 border-solid rounded-sm cursor-pointer">Leave a review 🖉</button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {comments.map((comment) => (
            <Comment key={comment.author} author={comment.author} comment={comment.comment} likecount={comment.likecount}/>
          ))}
        </div>
        <button className="w-fit self-center mt-4 text-black py-2 px-8 border-1 border-solid rounded-sm cursor-pointer">Load more reviews</button>
      </div>
    </div>
  </div>
</div>
}