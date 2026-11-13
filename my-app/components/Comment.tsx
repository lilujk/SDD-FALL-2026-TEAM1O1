"use client";

import { useState } from "react";

type CommentProps = {
  author: string;
  comment: string;
  likecount: number;
};

export default function Comment({author, comment, likecount}: CommentProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likecount);

  return (

    <div className="flex flex-col p-4 text-black border-1 border-solid rounded-xl border-gray-300">
      <h6 className="font-bold">{author}</h6>
      <p className="mt-1 ml-5 w-[90%]">{comment}</p>
      <div className="flex flex-row mt-2">
         <button
         type="button"
         onClick={() => {
            setIsLiked((current) => !current);
            setLikeCount((count) => count + (isLiked ? -1 : 1));
         }}
         aria-label={isLiked ? "Unlike comment" : "Like comment"}
         className="shrink-0 cursor-pointer"
         >
         <img src={isLiked ? "/like-fill.png" : "/like-empty.png"} alt="Like Comment" className="h-6 w-6 object-contain"/>
         </button>
         <p className="text-black ml-1">{likeCount}</p>
      </div>
    </div>
  );
}