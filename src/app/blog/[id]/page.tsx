import Image from "next/image";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { blog, blogs, getBlocks } from "../../../lib/notion";
import { Key, ReactElement } from "react";
import { RichText } from "./types";
import { parseRichText } from "../../../lib/utils";
import { renderBlock } from "@/components/notion/renderer";
import type { Block } from "@/types/notion.d.ts";

interface IParams extends ParsedUrlQuery {
  id: string;
}

const _renderBlock = (block: Block): ReactElement => {
  // console.log(JSON.stringify(block));
  switch (block.type) {
    case "heading_1":
      // For a heading
      return (
        <h1 className="text-3xl">
          {block["heading_1"].rich_text[0].plain_text}{" "}
        </h1>
      );
    case "heading_2":
      // For a heading
      return (
        <h2 className="text-2xl">
          {block["heading_2"].rich_text[0].plain_text}{" "}
        </h2>
      );
    case "heading_3":
      // For a heading
      return (
        <h3 className="text-xl">
          {block["heading_3"].rich_text[0].plain_text}{" "}
        </h3>
      );
    case "image":
      // For an image
      return (
        <div className="h-auto max-w-ful shadow-2xl ">
          <Image
            src={block["image"].file.url}
            width={500}
            height={300}
            alt={"block img"}
          />
        </div>
      );
    case "bulleted_list_item":
      // For an unordered list
      return (
        <li className="text-base m-4 ml-8">
          {block["bulleted_list_item"].rich_text[0].plain_text}{" "}
        </li>
      );
    case "paragraph":
      // For a paragraph
      if (block["paragraph"].rich_text.length) {
        const text = block["paragraph"].rich_text;
        const p = parseRichText(text, "text-base m-4 ");
        return (
          <div>
            {p.map(({ content, className }, index) => {
              return (
                <p key={index} className={className}>
                  {content}
                </p>
              );
            })}
          </div>
        );
      }

    case "code":
      // For a code block
      if (block["code"] && block["code"].rich_text.length) {
        return (
          <pre>
            <code>{block["code"].rich_text[0].text.content}</code>
          </pre>
        );
      }
    default:
      // For an extra type
      return <p>Undefined type </p>;
  }
};

// const Post = ({params}: {params : IParams}) => {
//   const { id } = params;
//   console.log(id);
//   return (
//     <div>{id}</div>
//   )
// };

const Post = async ({ params }: { params: IParams }) => {
  const { id } = params;
  const { blog, blocks }: { id: string; blog: any; blocks: any } =
    await getPost(params);
  return (
    <div className="m-auto">
      <Head>
        <title>{blog.properties.Name.rich_text[0].plain_text}</title>
      </Head>
      <div className=" max-w-4xl">
        <div className="flex justify-center h-60 mb-6">
          <Image
            className="object-cover max-w-ful shadow-2xl rounded-lg"
            src={blog.cover.external.url}
            width={600}
            height={300}
            alt={""}
          />
        </div>
        <div className="flex text-3xl font-semibold justify-center">
          {blog.properties.Name.rich_text[0].plain_text}
        </div>
        {blocks.map((block: Block, index: Key | null | undefined) => {
          return (
            <div key={index} className="mt-2">
              {renderBlock(block)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  let { results } = await blogs();
  // Get all posts
  const id = results
    .filter(
      (blog: any) =>
        blog.cover != null &&
        blog.properties.Published.checkbox === true &&
        blog.properties.Name.rich_text[0] != null
    )
    .map((blog) => {
      // Go through every post
      return {
        id: blog.id,
      };
    });
  return id;
}

async function getPost(params: IParams) {
  let { id } = params as IParams;
  // Get the dynamic id
  let page_result = await blog(id);
  // Fetch the post
  let block = await getBlocks(id);
  // Get the children
  return {
    id,
    blog: page_result,
    blocks: block,
  };
}
export const revalidate = 60;
export default Post;
