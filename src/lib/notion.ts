import { Client } from "@notionhq/client";

import { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";

const client = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function blogs() {
  let allResults: any[] = [];
  let hasMore = true;
  let startCursor: string | undefined = undefined;

  while (hasMore) {
    const response = await client.databases.query({
      database_id: `${process.env.NOTION_BLOG_DATABASE_ID}`,
      start_cursor: startCursor,
      page_size: 100, // Maximum page size
    });

    allResults = allResults.concat(response.results);
    hasMore = response.has_more;
    startCursor = response.next_cursor || undefined;
  }

  return {
    results: allResults,
    has_more: false,
    next_cursor: null,
  };
}

async function projects() {
  let allResults: any[] = [];
  let hasMore = true;
  let startCursor: string | undefined = undefined;

  while (hasMore) {
    const response = await client.databases.query({
      database_id: `${process.env.NOTION_PROJECT_DATABASE_ID}`,
      start_cursor: startCursor,
      page_size: 100, // Maximum page size
    });

    allResults = allResults.concat(response.results);
    hasMore = response.has_more;
    startCursor = response.next_cursor || undefined;
  }

  console.log("Projects fetched from Notion:", {
    total_count: allResults.length,
    results: allResults,
  });

  return {
    results: allResults,
    has_more: false,
    next_cursor: null,
  };
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

async function getBlocks(id: string): Promise<any[]> {
  let allBlocks: any[] = [];
  let hasMore = true;
  let startCursor: string | undefined = undefined;

  while (hasMore) {
    const response = await client.blocks.children.list({
      block_id: id,
      start_cursor: startCursor,
      page_size: 100, // Maximum page size
    });

    allBlocks = allBlocks.concat(response.results);
    hasMore = response.has_more;
    startCursor = response.next_cursor || undefined;
  }

  console.log(`Fetched ${allBlocks.length} blocks for block ID: ${id}`);

  // Fetches all child blocks recursively
  // be mindful of rate limits if you have large amounts of nested blocks
  // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks: Promise<any>[] = allBlocks.map(async (block) => {
    if ((block as { has_children: boolean }).has_children) {
      const children: any[] = await getBlocks(block.id);
      return { ...block, children };
    }
    return block;
  });

  return Promise.all(childBlocks).then((blocks) =>
    blocks.reduce((acc, curr) => {
      if (curr.type === "bulleted_list_item") {
        if (acc[acc.length - 1]?.type === "bulleted_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: "bulleted_list",
            bulleted_list: { children: [curr] },
          });
        }
      } else if (curr.type === "numbered_list_item") {
        if (acc[acc.length - 1]?.type === "numbered_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: "numbered_list",
            numbered_list: { children: [curr] },
          });
        }
      } else {
        acc.push(curr);
      }
      return acc;
    }, [])
  );
}

/**
 * Returns a random integer between the specified values, inclusive.
 * The value is no lower than `min`, and is less than or equal to `max`.
 *
 * @param {number} minimum - The smallest integer value that can be returned, inclusive.
 * @param {number} maximum - The largest integer value that can be returned, inclusive.
 * @returns {number} - A random integer between `min` and `max`, inclusive.
 */
function getRandomInt(minimum: number, maximum: number): number {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { blogs, blog, blockRetrieve, getBlocks, projects };
