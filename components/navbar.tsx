import Link from "next/link";
import { usePathname } from 'next/navigation';

const navItems = {
    '/': {
      name: 'home',
      x: 0,
      y: 0,
      w: '64px',
    },
    '/about': {
      name: 'about',
      x: 64,
      y: 35,
      w: '65px',
    },
    '/blog': {
      name: 'blog',
      x: 127,
      y: 69,
      w: '56px',
    },
    // '/guestbook': {
    //   name: 'guestbook',
    //   x: 182,
    //   y: 104,
    //   w: '100px',
    // },
  };

  export default function Navbar() {
    let pathName = usePathname() || '/';
    return (
        <div>
            {Object.entries(navItems).map(([path, {name}]) => {
                return (
                    <Link
                    key={path}
                    href={path}
                  >
                    {name}
                  </Link>
                )
            })}

        </div>
    )
  }