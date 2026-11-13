"use client";

import Link from "next/link";

export type ResourceTagType = "medium" | "price" | "topical" | "warning";

export type ResourceTagProps = {
  name: string;
  type: ResourceTagType;
}

const backgroundColors: Record<ResourceTagType, string> = {
  medium: "bg-blue-100",
  price: "bg-emerald-100",
  topical: "bg-gray-200",
  warning: "bg-red-100",
}

export default function ResourceTag({ name, type }: ResourceTagProps) {
  return (
    <div className={`rounded-[0.5vw] px-2 py-1 text-center text-black ${backgroundColors[type]}`}>
      <p>{name}</p>
    </div>
  );
}