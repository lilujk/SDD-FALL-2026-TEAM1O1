"use client";

import { useState } from "react";

type WriteCommentModalProps = {
  onSubmit: (comment: string) => void;
  onClose: () => void;
};

export default function WriteCommentModal({
  onSubmit,
  onClose,
}: WriteCommentModalProps) {
  const [comment, setComment] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedComment = comment.trim();
    if (!trimmedComment) return;

    onSubmit(trimmedComment);
    setComment("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xl flex-col overflow-hidden rounded-xl border border-gray-300 bg-white text-black"
      >
        <h1 className="border-b border-gray-300 px-3 py-2 text-xl">
          Write Review
        </h1>

        <div className="m-2 flex flex-col px-2">
          <label htmlFor="review">Share your thoughts...</label>
          <textarea
            id="review"
            name="review"
            className="h-[100px] rounded-md border border-gray-300 px-2 py-1 text-base leading-6"
            maxLength={600}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <p className="self-end text-sm text-gray-500" aria-live="polite">
            {600 - comment.length} characters remaining
          </p>
        </div>

        <div className="mb-4 flex gap-2 px-3">
          <button
            type="submit"
            disabled={!comment.trim()}
            className="cursor-pointer rounded-sm bg-black px-3 py-1 text-sm text-white disabled:opacity-50"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-sm border border-gray-300 px-3 py-1 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}