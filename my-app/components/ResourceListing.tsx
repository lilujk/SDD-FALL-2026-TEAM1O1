"use client";

import Link from "next/link";
import ResourceTag from "./ResourceTag";

export default function ResourceListing() {

  return (

    <div className="flex flex-col justify-between items-center p-4 bg-gray-800 text-black">
        <h1 className="flex items-center">
            Poline -- Esoteric Color Palette Generation Library 
        </h1>

        <div className="flex items-center gap-6">
            <ResourceTag></ResourceTag>
            <ResourceTag></ResourceTag>
            <ResourceTag></ResourceTag>
            <ResourceTag></ResourceTag>
            <ResourceTag></ResourceTag>
        </div>

        <p className="text-black">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum....
        </p>
    </div>
  );
}