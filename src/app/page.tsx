import { Link } from "src/components/ui/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import Avatar from "@/public/avatar.png";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex animate-in flex-col gap-8">
        <div>
          <h1 className="animate-in text-3xl font-bold tracking-tight text-primary">
            Jeremy XU
          </h1>
          <p
            className="animate-in text-muted-foreground"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            Software Engineer & Creator
          </p>
        </div>
        <div
          className="flex animate-in flex-col gap-6 text-muted-foreground md:flex-row md:items-center"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <Image
            src={Avatar}
            width={85}
            height={85}
            alt="avatar"
            className="rounded-full bg-secondary"
          />
          {/* <Stats /> */}
        </div>
        <p
          className="max-w-lg animate-in text-primary"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          Good evening, I&apos;m, a programmer who loves building new things. In
          addition to coding, I also make YouTube videos, where I focus on tech,
          creative vlogs, and personal development.
        </p>
        <ul
          className="animated-list flex animate-in flex-col gap-2 text-muted-foreground md:flex-row md:gap-6"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <li className="transition-opacity">
            <Link
              href="jeremyxu1234@gmail.com"
              className="flex items-center gap-2 no-underline"
            >
              <ArrowUpRightIcon className="h-5 w-5" />
              <span>Contact</span>
            </Link>
          </li>
          <li className="transition-opacity">
            <Link
              href="jeremyxu1234@gmail.com"
              className="flex items-center gap-2 no-underline"
            >
              <ArrowUpRightIcon className="h-5 w-5" />
              <span>Get Newsletter</span>
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="flex animate-in flex-col gap-8"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        <h2 className="text-muted-foreground">Latest Posts</h2>
        {/* <PostList posts={posts} /> */}
        <Link
          href="/blog"
          className="text-muted-foreground underline underline-offset-4 hover:text-primary"
        >
          See All
        </Link>
      </div>
    </div>
  );
}
