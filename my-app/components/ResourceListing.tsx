"use client";

import ResourceTag, { type ResourceTagProps } from "./ResourceTag";


type ResourceListingProps = {
  title: string;
  description: string;
  tags: ResourceTagProps[];
};

export default function ResourceListing({title, description, tags}: ResourceListingProps) {

const croppedDescription = description.length > 250 ? `${description.slice(0, 247)}...` : description;

  return (

    <div className="flex flex-col p-4 text-black border-1 border-solid rounded-xl border-gray-300">
        <h1 className="text-2xl">{title}</h1>

        <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
            <ResourceTag key={tag.name} name={tag.name} type={tag.type} />
            ))}
        </div>

        <p className="text-black mt-2">{croppedDescription}</p>
    </div>
  );
}