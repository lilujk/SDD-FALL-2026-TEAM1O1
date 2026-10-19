"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/account", label: "Account" },
  { href: "/add-resource", label: "AddResource" },
  { href: "/explore", label: "Explore" },
  { href: "/individual-resource", label: "IndividualResource" },
  { href: "/login", label: "Login" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="flex gap-4 bg-neutral-900 p-4">
      {links.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`text-sm transition-colors hover:text-white ${
              isActive ? "font-bold text-white" : "text-neutral-400"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}