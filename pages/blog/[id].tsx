import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { blog, blogs, blocks } from "../../lib/notion";
import styles from "../../styles/Home.module.css";
import { ReactElement } from "react";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  id: string;
  blog: any;
  blocks: [any];
}

export interface RichText {
  type: string;
  text: Text;
  plain_text: string;
  href: any;
}

export interface BlockDetails {
  rich_text: RichText[];
  is_toggleable: boolean;
  color: string;
}

export interface Parent {
  type: string;
  page_id: string;
}

export interface Block {
  object: string;
  id: string;
  parent: Parent;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  has_children: boolean;
  archived: boolean;
  type: string;
  [blockType: string]: BlockDetails | boolean | string | any;
}

const renderBlock = (block: Block): ReactElement => {
  switch (block.type) {
    case "heading_1":
      // For a heading
      return <h1>{block["heading_1"].text[0].plain_text} </h1>;
    case "heading_2":
      // For a heading
      return <h2>{block["heading_2"].text[0].plain_text} </h2>;
    case "heading_3":
      // For a heading
      return <h3>{block["heading_3"].text[0].plain_text} </h3>;
    case "image":
      // For an image
      return (
        <Image
          src={block["image"].file.url}
          width={650}
          height={400}
          alt={"block img"}
        />
      );
    case "bulleted_list_item":
      // For an unordered list
      return (
        <ul>
          <li>{block["bulleted_list_item"].text[0].plain_text} </li>
        </ul>
      );
    case "paragraph":
      // For a paragraph
      return <p>{block["paragraph"].text[0]?.text?.content} </p>;
    case "code":
      return (
        <pre>
          <code>{block["code"].text[0].text.content}</code>
        </pre>
      );
    default:
      // For an extra type
      return <p>Undefined type </p>;
  }
};

const Post: NextPage<Props> = ({ id, blog, blocks }) => {
  return (
    <div className={styles.blogPageHolder}>
      <Head>
        <title>{blog.properties.Name.rich_text[0].plain_text}</title>
      </Head>
      <Image src={blog.cover.external.url} width={500} height={300} alt={""} />
      <div>{blog.properties.Name.rich_text[0].plain_text}</div>
      {blocks.map((block, index) => {
        return (
          <div key={index} className={styles.blogPageContent}>
            {renderBlock(block)}
          </div>
        );
      })}
    </div>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  let { results } = await blogs();
  // Get all posts
  return {
    paths: results.map((blog) => {
      // Go through every post
      return {
        params: {
          // set a params object with an id in it
          id: blog.id,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  let { id } = ctx.params as IParams;
  // Get the dynamic id
  let page_result = await blog(id);
  console.log(page_result);
  // Fetch the post
  let { results } = await blocks(id);
  // Get the children
  return {
    props: {
      id,
      blog: page_result,
      blocks: results,
    },
  };
};

export default Post;
