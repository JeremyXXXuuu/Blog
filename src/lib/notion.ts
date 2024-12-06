import { Client } from "@notionhq/client";

import {
  GetPageResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { ExerciseProperties, FitnessLogProperties } from "@/types/notion";

const client = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function fitnessExercises(): Promise<
  (ExerciseProperties & { id: string })[]
> {
  const fitnessExercises = await client.databases.query({
    database_id: `${process.env.NOTION_FITNESS_EXERCISES_DATABASE_ID}`,
  });
  const exercises: (ExerciseProperties & { id: string })[] =
    fitnessExercises.results
      .filter(
        (exercise): exercise is PageObjectResponse => "properties" in exercise
      )
      .map((exercise) => ({
        id: exercise.id,
        ...(exercise.properties as unknown as ExerciseProperties),
      }));
  // exercises.forEach((exercise) => {
  //   console.log(
  //     exercise.id,
  //     exercise.Name.title[0].plain_text,
  //     exercise["Best Weight"].rollup.number
  //   );
  // });
  return exercises;
}

async function fitnessLogs() {
  try {
    console.log("fetching fitness logs");
    const fitnessLogs = await client.databases.query({
      database_id: `${process.env.NOTION_FITNESS_LOGS_DATABASE_ID}`,
      sorts: [
        {
          property: "Date",
          direction: "ascending",
        },
      ],
    });

    const logs: FitnessLogProperties[] = fitnessLogs.results
      .filter((log): log is PageObjectResponse => "properties" in log)
      .map((log) => log.properties as unknown as FitnessLogProperties);

    const exercises = await fitnessExercises();

    const processedLogs = await Promise.all(
      logs.map(async (log) => {
        const exercise = exercises.find(
          (exercise) => exercise.id === log.Exercise.relation[0].id
        );

        return {
          exerciseName: exercise?.Name.title[0].plain_text || "Unknown",
          date: log.Date.rollup.array[0].date?.start || "",
          reps: log.Reps.number || 0,
          sets: log.Set.number || 0,
          weight: log.Weight.number || 0,
        };
      })
    );

    console.log("processed logs", processedLogs);

    return processedLogs;
  } catch (error) {
    console.error("Error fetching fitness logs:", error);
    return [];
  }
}

async function blogs() {
  const blogs = await client.databases.query({
    database_id: `${process.env.NOTION_BLOG_DATABASE_ID}`,
  });
  return blogs;
}

async function projects() {
  const projects = await client.databases.query({
    database_id: `${process.env.NOTION_PROJECT_DATABASE_ID}`,
  });
  return projects;
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
  const { results } = await client.blocks.children.list({
    block_id: id,
  });

  // Fetches all child blocks recursively
  // be mindful of rate limits if you have large amounts of nested blocks
  // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks: Promise<any>[] = results.map(async (block) => {
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

export { blogs, blog, blockRetrieve, getBlocks, projects, fitnessLogs };
