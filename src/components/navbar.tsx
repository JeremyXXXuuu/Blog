"use client";
import { Fragment } from "react";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { NavLink } from "./ui/navLink";

import clsx from "clsx";
import { Link } from "./ui/link";
import { useRouter } from "next/navigation";

const links = [
  { label: "About", href: "/about" },
  // { label: "Blog", href: "/blog" },
  { label: "Project", href: "/project" },
];

export default function Navbar() {
  const pathname = `/${usePathname().split("/")[1]}`; // active paths on dynamic subpages
  const { theme, setTheme } = useTheme();
  const Router = useRouter();

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollThreshold = 100; // Adjust this value as needed

      setHasScrolled(scrollTop > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [page, setPage] = useState("home");

  function handlePageChange(value: string) {
    setPage(value);
    // You can use the value to navigate to the page
    if (value === "home") Router.push(`/`);
    else {
      Router.push(`/${value}`);
    }
  }

  return (
    <header
      className={clsx(
        "sticky top-0 z-20 bg-white dark:bg-background lg:border-b transition-all duration-300",
        hasScrolled ? "border-secondary" : "border-transparent"
      )}
    >
      <nav className="px-4 md:px-6 py-3 lg max-w-[700px] mx-auto flex justify-between items-center gap-3">
        <Link href="/" className="shrink-0 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 375 375"
            version="1.2"
          >
            <defs>
              <clipPath id="clip1">
                <path d="M 103.636719 64.171875 L 271.476562 64.171875 L 271.476562 310 L 103.636719 310 Z M 103.636719 64.171875 " />
              </clipPath>
            </defs>
            <g id="surface1">
              <g clipPath="url(#clip1)" clipRule="nonzero">
                <path
                  fill="currentColor"
                  d="M 211.375 151.808594 C 203.050781 149.433594 194.765625 155.722656 194.765625 164.390625 L 194.765625 297.785156 C 194.765625 305.234375 201.695312 310.808594 208.941406 309.09375 C 244.675781 300.671875 271.355469 268.492188 271.355469 230.195312 C 271.355469 193.117188 246.363281 161.785156 211.375 151.808594 Z M 180.15625 144.734375 L 180.15625 297.785156 C 180.15625 305.234375 173.230469 310.808594 165.980469 309.09375 C 130.246094 300.675781 103.566406 268.492188 103.566406 230.195312 L 103.566406 74.296875 C 103.566406 68.449219 108.902344 64.046875 114.640625 65.164062 C 151.925781 72.410156 180.15625 105.335938 180.15625 144.734375 Z M 180.15625 144.734375 "
                />
              </g>
            </g>
          </svg>
        </Link>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-24">
              {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuRadioGroup
                value={page}
                onValueChange={handlePageChange}
              >
                {/* <DropdownMenuRadioItem value="home">Home</DropdownMenuRadioItem> */}
                <DropdownMenuRadioItem value="about">
                  About
                </DropdownMenuRadioItem>
                {/* <DropdownMenuRadioItem value="blog">Blog</DropdownMenuRadioItem> */}
                <DropdownMenuRadioItem value="project">
                  Project
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
