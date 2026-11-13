"use client";

import Link from "next/link";

export default function AccountNavBar() {
  return (
    <nav className="flex flex-col items-center gap-6 text-xl text-black">
        <Link className="p-2 w-full border-2 border-solid border-black rounded-lg hover:text-gray-300" href="/account/edit-profile">Edit Profile</Link>
        <Link className="p-2 w-full border-2 border-solid border-black rounded-lg hover:text-gray-300" href="/account/your-resources">Your Resources</Link>
        <Link className="p-2 w-full border-2 border-solid border-black rounded-lg hover:text-gray-300" href="/account/saved-resources">Saved Resources</Link>
        <Link className="p-2 w-full border-2 border-solid border-black rounded-lg hover:text-gray-300" href="/account/saved-resources">Saved Tags</Link>
        <Link className="p-2 w-full border-2 border-solid border-green-600 bg-green-100 rounded-lg text-green-600 hover:text-gray-300" href="/add-resource">Add Resource</Link>
    </nav>
  );
}