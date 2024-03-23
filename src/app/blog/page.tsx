import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "../../lib/notion";
import { Section } from "@/components/ui/section";

interface Props {
  blogs: [any];
}

interface BlogItem {
  slug: string;
  name: string;
  img: string;
  created_date: string;
}

export default async function Blog() {
  const blogs = (await getBlogs()) as any;
  return (
    <div>
      <Head>
        <title>Latest blogs</title>
      </Head>

      <main className="m-auto ">
        <div className="flex flex-col gap-16 md:gap-24 ">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="animate-in text-3xl font-bold tracking-tight">
                Blogs
              </h1>
              <p
                className="animate-in text-muted-foreground"
                style={{ "--index": 1 } as React.CSSProperties}
              >
                posts about code, design, more ...
              </p>
            </div>
          </div>
          <ul className="flex flex-col animated-list">
            {blogs
              .filter(
                (blog: any) =>
                  blog.cover != null &&
                  blog.properties.Published.checkbox === true &&
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
  const { name, img, created_date, slug } = blogItem;
  return (
    <li className="py-3 group transition-opacity" key={slug}>
      <div className="flex justify-between gap-6 items-center">
        <Section heading={formatDate(created_date)}>
          <Link href={`/blog/${slug}`} className="font-medium leading-tight">
            {name}
          </Link>
        </Section>
        <div className="md:hidden aspect-square min-w-24 w-24 h-24 relative drop-shadow-sm">
          <Image src={img} alt={name} fill className="object-cover rounded" />
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
