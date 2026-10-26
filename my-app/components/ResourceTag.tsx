"use client";

import Link from "next/link";

type ResourceTagType = "medium" | "price" | "topical" | "warning";

type ResourceTagProps = {
  name: string;
  type: ResourceTagType;
}

const backgroundColors: Record<ResourceTagType, string> = {
  medium: "bg-blue-100",
  price: "bg-emerald-100",
  topical: "bg-gray-200",
  warning: "bg-red-100",
}

export default function ResourceTag() {

  return (
    <div className={`rounded-[2vw] px-5 py-2 text-center text-black ${backgroundColors[type]}`}>
        <p>Colors</p>
    </div>
  );
}