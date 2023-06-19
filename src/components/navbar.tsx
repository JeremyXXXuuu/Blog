import Link from "next/link";
import { usePathname } from "next/navigation";

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
  // '/guestbook': {
  //   name: 'guestbook',
  //   x: 182,
  //   y: 104,
  //   w: '100px',
  // },
};

export default function Navbar() {
  let pathName = usePathname() || "/";
  return (
    <div className="flex flex-col">
      {Object.entries(navItems).map(([path, { name }]) => {
        return (
          <Link
            key={path}
            href={path}
            className="px-6 pt-2.5 pb-2 mt-6 rounded bg-neutral-50 text-xs font-semibold uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-200 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] active:font-bold"
            //className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
}
