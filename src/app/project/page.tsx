import { Section } from "@/components/ui/section";
import { projects } from "@/lib/notion";
import { Link } from "@/components/ui/link";
import Image from "next/image";

import React from "react";

interface ProjectItem {
  slug: string;
  name: string;
  img: string;
  date: number;
  description: string;
}

export default async function Project() {
  const { results: project } = (await getProjects()) as any;

  //   console.log(project);

  return (
    <main className="m-auto">
      <div className="flex flex-col gap-16 md:gap-24 ">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="animate-in text-3xl font-bold tracking-tight">
              Project
            </h1>
            <p
              className="text-muted-foreground animate-in"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              Here are some of the project I&apos;ve worked on.
            </p>
          </div>
        </div>
        <ul className="flex flex-col animated-list">
          {project
            .filter(
              (project: any) =>
                project.cover != null &&
                project.properties.Published.checkbox === true &&
                project.properties.Name.rich_text[0] != null
            )
            .map((project: any, index: number) => {
              const projectItem: ProjectItem = {
                slug: project.id,
                name: project.properties.Page.title[0].plain_text,
                img: project.cover.external?.url || project.cover.file.url,
                date: project.properties.Date.number,
                description:
                  project.properties.Description.rich_text[0].plain_text,
              };
              return <Post projectItem={projectItem} key={project.idg} />;
            })}
        </ul>
      </div>
    </main>
  );
}

function Post({ projectItem }: { projectItem: ProjectItem }) {
  const { name, img, date, slug, description } = projectItem;
  return (
    <li className="py-3 group transition-opacity" key={slug}>
      <div className="flex py-6 flex-col md:flex-row gap-4 md:gap-6 items-center">
        <div className="hidden md:flex aspect-square min-w-24 w-24 h-24 relative drop-shadow-sm">
          <Link href={`/pages/${slug}`} className="font-medium leading-tight">
            <Image src={img} alt={name} fill className="object-cover rounded" />
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Link href={`/pages/${slug}`} className="font-medium leading-tight">
              {name}
            </Link>
            <div className="text-sm text-gray-500">{date}</div>
            {/* display date and description */}
          </div>
          <div className="text-sm text-gray-500">{description}</div>
        </div>
      </div>
    </li>
  );
}
async function getProjects() {
  return await projects();
}
