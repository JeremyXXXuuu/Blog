import { Link } from "src/components/ui/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import Avatar from "@/public/avatar.png";

// Sample images for gallery - replace with your own images or dynamically load them
import CldImage from "@/components/cloud-image";

export default function MyVie() {
  return (
    <section className="flex flex-col gap-16 md:gap-24">
      {/* Header Section */}
      <header className="flex flex-col gap-8 text-primary animate-in">
        <h1 className="text-3xl font-bold tracking-tight">My Life</h1>
        <p
          className="text-muted-foreground"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          Welcome to a glimpse of my journey.
        </p>
      </header>

      {/* Links Section */}
      <nav
        className="flex flex-col gap-4 text-muted-foreground md:flex-row md:gap-6 animate-in"
        style={{ "--index": 2 } as React.CSSProperties}
      >
        <Link
          href="/my-vie/fitness"
          className="flex items-center gap-2 hover:text-primary transition"
        >
          <ArrowUpRightIcon className="h-5 w-5" />
          <span>Fitness</span>
        </Link>
        <Link
          href="/my-vie/cooking"
          className="flex items-center gap-2 hover:text-primary transition"
        >
          <ArrowUpRightIcon className="h-5 w-5" />
          <span>Jeremy&apos;s Cooking</span>
        </Link>
      </nav>

      {/* Gallery Section */}
      <section
        className="flex flex-col gap-8 animate-in"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        <h2 className="text-2xl text-muted-foreground">Photo Gallery</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CldImage
            src="sample.jpg"
            alt="Sample Imz age"
            className="rounded-lg"
            width="960"
            height="600"
          />
          <CldImage
            src="sample.jpg"
            alt="Sample Imz age"
            className="rounded-lg"
            width="960"
            height="600"
          />
          <CldImage
            src="sample.jpg"
            alt="Sample Imz age"
            className="rounded-lg"
            width="960"
            height="600"
          />
        </div>
      </section>
    </section>
  );
}
