"use client";

import Link from "next/link";

export type ResourceTagType = "medium" | "price" | "topical" | "warning";

const backgroundColors: Record<ResourceTagType, string> = {
  medium: "bg-blue-100",
  price: "bg-emerald-100",
  topical: "bg-gray-200",
  warning: "bg-red-100",
}

export type ResourceTagProps = {
  name: string;
  type: ResourceTagType;
  selected?: boolean;
  onClick?: () => void;
};

export default function ResourceTag({
  name,
  type,
  selected = false,
  onClick,
}: ResourceTagProps) {
  const backgroundColor =
    type === "price" && onClick
      ? selected
        ? "bg-emerald-100"
        : "bg-gray-100"
      : backgroundColors[type];

  const className = `rounded-[0.5vw] px-2 py-1 text-center text-black ${backgroundColor}`;

  if (onClick) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={className}
      >
        {name}
      </button>
    );
  }

  return <div className={className}>{name}</div>;
}