import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "../../lib/notion";

interface Props {
  blogs: [any];
}

interface BlogItem {
  name: string;
  img: string;
  created_date: string;
}

export default async function Blog() {
  const blogs = await getBlogs() as any;
  return (
    <div>
      <Head>
        <title>Latest posts</title>
      </Head>

      <main className="w-auto mr-5">
        {blogs
          .filter(
            (blog: any) =>
              blog.cover != null && blog.properties.Published.checkbox === true && blog.properties.Name.rich_text[0] != null
          )
          .map((blog: any, index: number) => {
            const blogItem: BlogItem = {
              name: blog.properties.Name.rich_text[0].plain_text,
              img: blog.cover.external.url,
              created_date: blog.properties.Date.created_time,
            };
            return (
              <Link href={`/posts/${blog.id}`} key={index} passHref>
                <div
                  className="flex items-center overflow-hidden md:flex-row bg-white border border-gray-200 rounded-lg shadow max-w-3xl ml-6 mb-6 h-36"
                >
                  <Image
                    src={blogItem.img}
                    width={400}
                    height={400}
                    alt={""}
                    className="object-cover rounded-t-lg w-36 md:w-72 "
                  />
                  <div className="flex flex-col justify-between ml-2 md:ml-6 p-4 leading-normal">
                    <div className="text-l md:mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      <span>{blogItem.name}</span>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {blogItem.created_date}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </main>
    </div>
  );
}

async function getBlogs() {
  // Get the posts
  let { results } = await blogs();
  // Return the blog
  return results;
}

export const revalidate = 60;
