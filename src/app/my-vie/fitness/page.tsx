import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/lib/notion";
import { Section } from "@/components/ui/section";
import CldImage from "@/components/cloud-image";

interface Props {
  blogs: [any];
}

interface BlogItem {
  slug: string;
  name: string;
  img: string;
  created_date: string;
  description?: string;
}

export default async function Fitness() {
  const blogs = (await getBlogs()) as any;
  return (
    <div>
      <Head>
        <title>Latest blogs</title>
      </Head>

      <main className="m-auto ">
        <div className="flex flex-col gap-16 md:gap-12 ">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="animate-in text-3xl font-bold tracking-tight">
                Fitness
              </h1>
              <p
                className="animate-in text-muted-foreground"
                style={{ "--index": 1 } as React.CSSProperties}
              >
                All about my fit, training journey ...
              </p>
            </div>
          </div>
          {/* Gallery Section */}
          <section
            className="flex flex-col gap-8 animate-in"
            style={{ "--index": 3 } as React.CSSProperties}
          >
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
          <ul
            className="flex flex-col animated-list animate-in"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            {blogs
              .filter(
                (blog: any) =>
                  blog.cover != null &&
                  blog.properties.Published.checkbox === true &&
                  blog.properties.Type.select?.name === "fitness" &&
                  blog.properties.Name.rich_text[0] != null
              )
              .map((blog: any, index: number) => {
                const blogItem: BlogItem = {
                  slug: blog.id,
                  name: blog.properties.Name.rich_text[0].plain_text,
                  img: blog.cover.external.url,
                  created_date: blog.properties.Date.created_time,
                };
                return <Post blogItem={blogItem} key={blog.idg} />;
              })}
          </ul>
        </div>
      </main>
    </div>
  );
}

function Post({ blogItem }: { blogItem: BlogItem }) {
  const { name, img, slug, description, created_date } = blogItem;
  return (
    <li className="py-3 group transition-opacity " key={slug}>
      <div className="flex py-3 flex-col md:flex-row gap-4 md:gap-6 items-center ">
        <div className=" flex aspect-square min-w-24 md:w-48 w-full h-32 relative drop-shadow-sm ">
          <Link href={`/pages/${slug}`} className="font-medium leading-tight">
            <Image
              src={img}
              alt={name}
              fill
              className="object-cover rounded-lg"
            />
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Link href={`/pages/${slug}`} className="font-medium leading-tight">
              {name}
            </Link>
            <div className="text-sm text-gray-500">
              {formatDate(created_date)}
            </div>
            {/* display date and description */}
          </div>
          <div className="text-sm text-gray-500">{description}</div>
        </div>
      </div>
    </li>
  );
}

const formatDate = (date: string) =>
  new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

async function getBlogs() {
  // Get the posts
  let { results } = await blogs();

  // Return the blog
  return results;
}

export const revalidate = 60;
