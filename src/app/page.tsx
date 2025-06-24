import { Link } from "src/components/ui/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import Avatar from "@/public/avatar_jeremy.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="flex animate-in flex-col gap-8">
          <div>
            <h1 className="animate-in text-3xl font-bold tracking-tight text-primary">
              Huamao XU
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
              width={88}
              height={88}
              alt="avatar"
              className="rounded-full bg-secondary"
            />
            {/* <Stats /> */}
          </div>
          <section
            // className="max-w-lg animate-in text-primary leading-relaxed"
            style={{ "--index": 2 } as React.CSSProperties}
            aria-label="Personal introduction"
          >
            <p>
              Hi, I&apos;m <span className="font-semibold">Huamao XU</span>{" "}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span
                    lang="zh-CN"
                    className="hover:underline underline-offset-2 cursor-pointer"
                  >
                    <ruby className="text-lg">徐华茂</ruby>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="text-center">
                    <p className="font-medium mb-1">My Chinese Name</p>
                    <p className="text-xs">徐华茂 (Xú Huá Mào)</p>
                    <p className="text-xs mt-1">
                      Pronunciation: &ldquo;Shoo Hwa-MOW&rdquo;
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      徐 = Family name • 华茂 = Given name
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
              , a full‑stack developer with <strong>4 years</strong> of hands‑on
              experience shipping products end‑to‑end.
            </p>

            <p className="mt-4">
              My toolkit ranges from <strong>React</strong> /{" "}
              <strong>Next.js</strong> on the front‑end to{" "}
              <strong>Node.js (TypeScript)</strong> and <strong>Python</strong>{" "}
              on the back‑end, all running in Dockerized micro‑services on{" "}
              <strong>AWS</strong> and <strong>GCP</strong>, topped with a pinch
              of <strong>Kubernetes</strong> for flavor.
            </p>

            <p className="mt-4">
              Beyond the keyboard you&apos;ll catch me chasing new personal‑best
              lifts at the gym🏋️, experimenting with bold fusion recipes in the
              kitchen🍳, and hunting for the perfect espresso shot ☕.
            </p>
          </section>
          <ul
            className="animated-list flex animate-in flex-col gap-2 text-muted-foreground md:flex-row md:gap-6"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            <li className="transition-opacity">
              <Link
                href="mailto:jeremyxu1234@gmail.com"
                className="flex items-center gap-2 no-underline"
              >
                <ArrowUpRightIcon className="h-5 w-5" />
                <span>Contact</span>
              </Link>
            </li>
            <li className="transition-opacity">
              <Link
                href="mailto:jeremyxu1234@gmail.com"
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
          <h2 className="text-muted-foreground">Latest Project</h2>
          {/* <PostList posts={posts} /> */}
          <Link
            href="/project"
            className="text-muted-foreground underline underline-offset-4 hover:text-primary"
          >
            See All
          </Link>
        </div>
      </div>
    </TooltipProvider>
  );
}
