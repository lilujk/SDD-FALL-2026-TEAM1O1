"use client";

import Link from "next/link";

export default function NavBar() {

  return (

    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="flex items-center">
            <span className="text-xl font-bold">ART 1O1</span>
        </div>

        <div className="flex items-center gap-6">
            <Link className="hover:text-gray-300" href="/home">Home</Link>
            <Link className="hover:text-gray-300" href="/add-resource">Add Resource</Link>
            <Link className="hover:text-gray-300" href="/explore">Explore</Link>
            <Link className="hover:text-gray-300" href="/about">About</Link>
            <Link className="hover:text-gray-300" href="/account">Account</Link>
        </div>
    </nav>
  );
}