"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-t border-black/10 bg-pink-200 text-black">
            <div className="mx-auto flex max-w-6xl flex-col gap-5 pt-30 pb-10 md:flex-row items-center md:justify-between">
                <div className="max-w-xs">
                    <Link href="/" className="text-5xl font-londrina font-bold">
                        Art 1O1
                    </Link>
                    <div className="">
                        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-sm sm:flex-row">
                            <p>&copy; 2026 Art 1O1. All rights reserved.</p>
                            <p>Software Design and Documentation, Fall 2026</p>
                        </div>
                    </div>
                </div>
        
                <div className="pl-0 ml-0">
                    <div className="flex flex-col items-left gap-2 text-xl">
                        <Link className="hover:text-pink-600" href="/explore">Find Resource</Link>
                        <Link className="hover:text-pink-600" href="/add-resource">Add Resource</Link>
                        <Link className="hover:text-pink-600" href="/about">About</Link>
                        <Link className="hover:text-pink-600" href="/account-management/login">Account</Link>
                    </div>
                </div>
        
                
            </div>
        </footer>
    );
}