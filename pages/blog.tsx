import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { blogs } from "../lib/notion";

interface Props {
  blogs: [any];
}

interface BlogItem {
  name: string;
  img: string;
  created_date: string;
}

export default function Blog({ blogs }: Props) {
  console.log(blogs);
  return (
    <div className={styles.container}>
      <Head>
        <title>Latest posts</title>
      </Head>

      <main className={styles.main}>
        {blogs
          .filter(
            (blog) =>
              blog.cover != null && blog.properties.Published.checkbox === true
          )
          .map((blog, index) => {
            const blogItem: BlogItem = {
              name: blog.properties.Name.rich_text[0].plain_text,
              img: blog.cover.external.url,
              created_date: blog.properties.Date.created_time,
            };

            // console.log(JSON.stringify(blog));
            return (
              <div className={styles.cardHolder} key={index}>
                <Link href={`/blog/${blog.id}`}>
                  <Image src={blogItem.img} width={300} height={200} alt={""} />
                </Link>
                <div>
                  <div className={styles.cardContent}>
                    <Link href={`/blog/${blog.id}`}>{blogItem.name}</Link>
                  </div>
                  <p>{blogItem.created_date}</p>
                </div>
              </div>
            );
          })}
      </main>

      <footer className={styles.footer}>
        <p>Blog application</p>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  // Get the posts
  let { results } = await blogs();
  // Return the blog
  return {
    props: {
      blogs: results,
    },
  };
}
