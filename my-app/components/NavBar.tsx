"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800">
      <Link href="/home" className="text-2xl font-bold hover:text-gray-300">
        ART 1O1
      </Link>

      <div className="flex items-center gap-6 text-xl">
        <Link className="hover:text-gray-300" href="/explore">Find Resource</Link>
        <Link className="hover:text-gray-300" href="/add-resource">Add Resource</Link>
        <Link className="hover:text-gray-300" href="/about">About</Link>
        <Link className="hover:text-gray-300" href="/account-management/login">Account</Link>
      </div>
    </nav>
  );
}