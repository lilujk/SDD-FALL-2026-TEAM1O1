"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import ResourceTag, { type ResourceTagProps } from "@/components/ResourceTag";

import Comment from "@/components/Comment";

import WriteCommentModal from "@/components/WriteCommentModal";

import { useParams, useRouter } from "next/navigation";
import { getResource, getUser, getSession, putLike, deleteResource } from "../../lib/api.js";

type ResourceTagData = Pick<ResourceTagProps, "name" | "type">;

type Review = {
  author: string;
  comment: string;
  likecount: number;
};

const comments = [
  { author: "Elijah J.", comment: "This resource has so many cool features, def try it out if you need to find a color palette for your project!!", likecount: 20 },
  { author: "Lucy D.", comment: "This is my favorite website. Totally recommend!", likecount: 8 },
  { author: "Sheloine C.", comment: "Great for coming up with ideas for my friend's three marker challenge 👻🟡🖍️", likecount: 6 },
] as const;

const numReviews = 59;

export default function IndividualResource() {
  const { resourceId } = useParams<{ resourceId: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [link, setLink] = useState("");
  const [thumnail, setThumbnail] = useState("");
  const [tags, setTags] = useState<ResourceTagData[]>([]);
  const [warnings, setWarnings] = useState<ResourceTagData[]>([]);
  const [medium, setMedium] = useState<ResourceTagData[]>([]);
  const [likes, setLikes] = useState(0);
  const [price, setPrice] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewCount, setReviewCount] = useState(numReviews);
  const [visibleComments, setVisibleComments] = useState<Review[]>([...comments]);

  function addReview(comment: string) {
    setVisibleComments((current) => [
      ...current,
      { author: "You", comment, likecount: 0 },
    ]);
    setReviewCount((count) => count + 1);
    setReviewModalOpen(false);
  }

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
        const { data: resource } = await getResource(resourceId);
        const { data: user } = await getUser(resource.userId);
        if (cancelled) return;

        console.log(resource);
        console.log(user);

        setTitle(resource.title);
        setDescription(resource.description);
        setAuthor(user.username);
        setLink(resource.link);
        setThumbnail(resource.thumnail);
        setTags(resource.tags ?? []);
        setWarnings(resource.warnings ?? []);
        setMedium(resource.medium ?? []);
        setTitle(resource.title);
        setPrice(resource.price);

      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load resource");
      } finally {
        if (!cancelled) setCheckingSession(false);
      }
    })();

    return () => {
      cancelled = true;
    };

  }, [resourceId]);

  const handleLike = async () => {
  if (loading) return;

  const nextLiked = !isLiked;
  let updatedOptimistically = false;

  setError("");
  setLoading(true);

  try {
    const { session } = await checkSession();

    if (!session) {
      router.push("/account-management/login");
      return;
    }

    setIsLiked(nextLiked);
    setLikes((count) => count + (nextLiked ? 1 : -1));
    updatedOptimistically = true;

    const { data: newLikeCount } = await putLike(resourceId, nextLiked);
    setLikes(newLikeCount);
  } catch (err) {
    console.error("Like request failed:", err);

    if (updatedOptimistically) {
      setIsLiked(!nextLiked);
      setLikes((count) => count + (nextLiked ? -1 : 1));
    }

    setError(err instanceof Error ? err.message : "Could not update like.");
  } finally {
    setLoading(false);
  }
};

const handleDelete = async () => {
  setError("");
  setLoading(true);

  try {
    const { session } = await checkSession();

    if (!session) {
      router.push("/account-management/login");
      return;
    }

    await deleteResource(resourceId);
    router.replace("/explore");
  } catch (err) {
    setError(err instanceof Error ? err.message : "Could not delete resource.");
  } finally {
    setLoading(false);
  }
};

  return <div className="mx-auto max-w-5xl px-4 py-6">
  
  <div className="flex flex-row justify-between">
    <Link href="/explore" className="text-black py-2 px-5 border-1 border-solid rounded-sm">← Back to search</Link>
    {error && <p className="text-red-600">{error}</p>}
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      aria-label="Delete resource"
      className="h-8 w-8 cursor-pointer disabled:opacity-50"
    >
      <img src="/trash.png" alt="" className="h-full w-full object-contain" />
    </button>
  </div>

  <div className="mt-6 h-64 rounded-xl overflow-hidden bg-neutral-900">
    <img src="/zentangle.jpg" alt="Poline" className="h-full w-full object-cover"/> {/* temporarily set manually */}
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
            <ResourceTag key={`tag-${tag.name}`} name={tag.name} type={tag.type} />
          ))}

          {medium.map((medium) => (
            <ResourceTag
              key={`media-${medium.name}`}
              name={medium.name}
              type={medium.type}
            />
          ))}

          {price && (
            <ResourceTag key="price" name={price} type="price" />
          )}

          {warnings.map((warning) => (
            <ResourceTag
              key={`warning-${warning.name}`}
              name={warning.name}
              type={warning.type}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-black font-bold">RATING</h2>
        <div className="flex flex-row mt-2">
          <button
            type="button"
            onClick={handleLike}
            aria-label={isLiked ? "Unlike resource" : "Like resource"}
            className="shrink-0 cursor-pointer"
          >
          <img src={isLiked ? "/like-fill.png" : "/like-empty.png"} alt="Like Resource" className="h-8 w-8 object-contain"/>
          </button>
          <p className="text-black mt-1 ml-1">{likes}</p>
        </div>
      </div>

      <div>
        <h2 className="text-black font-bold">SHARED BY</h2>
        <p className="text-black mt-1">@{author}</p>
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
          <Link href={link} className="text-sky-500 p-2">{link}</Link>
        </div>
      </div>

      <div className="flex flex-col mb-10">
        <h2 className="text-black font-bold">WHAT PEOPLE ARE SAYING</h2>
        <div className="my-4 flex flex-row justify-between align-items">
          <p className="underline text-black mt-1">{numReviews} reviews</p>
          <button
            type="button"
            onClick={() => setReviewModalOpen(true)}
            className="cursor-pointer rounded-sm border border-solid px-6 py-2 text-black"
            >
            Leave a review 🖉
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {visibleComments.map((comment, index) => (
            <Comment
              key={`${comment.author}-${index}`}
              author={comment.author}
              comment={comment.comment}
              likecount={comment.likecount}
            />
          ))}
        </div>
        <button className="w-fit self-center mt-4 text-black py-2 px-8 border-1 border-solid rounded-sm cursor-pointer">Load more reviews</button>
      </div>
    </div>
  </div>
  {reviewModalOpen && (
    <WriteCommentModal
      onSubmit={addReview}
      onClose={() => setReviewModalOpen(false)}
    />
  )}
</div>
}