"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/waitlist", label: "Command OS" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
      <Link href="/" className="text-lg font-semibold tracking-widest text-white/90 hover:text-white transition-colors">
        CORE<span className="text-[#6c63ff]">X</span>
      </Link>
      <ul className="flex gap-8 text-sm text-white/60">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`hover:text-white transition-colors ${
                pathname === href ? "text-white" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
