"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeButton from "./themeButton";
import React from "react";

const navItems = {
  "/": {
    name: "Home",
    x: 0,
    y: 0,
    w: "64px",
  },
  "/about": {
    name: "About",
    x: 64,
    y: 35,
    w: "65px",
  },
  "/blog": {
    name: "Blog",
    x: 127,
    y: 69,
    w: "56px",
  },
  '/projects': {
    name: 'projects',
    x: 182,
    y: 104,
    w: '100px',
  },
};

export default function Navbar() {
  const [mounted, setMounted] = React.useState(false);
  let pathName = usePathname() || "/";
  React.useEffect(() => setMounted(true), []);
  return (
    <div className="flex justify-center flex-row md:flex-col">
      <div className="md:m-auto">
        {mounted && <ThemeButton />}
      </div>
      {Object.entries(navItems).map(([path, { name }]) => {
        return (
          <Link
          key={path}
          href={path}
          className="px-3 pt-1.5 pb-1 mx-1 mt-0 rounded bg-neutral-50 text-xs font-semibold uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-200 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] active:font-bold md:px-6 md:pt-2.5 md:pb-2 md:mt-6"
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
}
