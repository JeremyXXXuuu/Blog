import { Client} from "@notionhq/client";

import { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";

const client = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function blogs() {
  const blogs = await client.databases.query({
    database_id: `${process.env.NOTION_DATABASE_ID}`,
  });
  return blogs;
}

async function blog(id: string) {
  const blog = await client.pages.retrieve({
    page_id: id,
  });
  return blog as GetPageResponse;
}

async function blockRetrieve(id: string) {
  const blockRet = await client.blocks.retrieve({
    block_id: id,
  });
  return blockRet;
}

async function blocks(id: string) {
  const myBlocks = await client.blocks.children.list({
    block_id: id,
  });
  // console.log(JSON.stringify(myBlocks));
  return myBlocks;
}

export { blogs, blog, blockRetrieve, blocks };
