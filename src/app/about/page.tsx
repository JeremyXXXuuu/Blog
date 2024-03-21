import ConnectLinks from "@/components/ConnectLinks";
import { Link } from "@/components/ui/link";
import { Section } from "@/components/ui/section";
import React from "react";
import Workplaces from "./workPlaces";
import OrosoundIMG from "@/public/work/orosound.png";
import SiemensIMG from "@/public/work/siemens.png";
import shuIMG from "@/public/work/shu.png";

function About() {
  return (
    <div
      className="flex animate-in flex-col gap-16 md:gap-24"
      style={{ "--index": 3 } as React.CSSProperties}
    >
      <Section heading="About" headingAlignment="left">
        <div className="flex flex-col gap-6">
          <p>Hello world, I&apos;m Huamao XU!</p>

          <p>
            I have a passion for design and am always looking for ways to
            incorporate it into my engineering work.
          </p>
          <p>
            When I&apos;m not at my desk I am probably lifting weights, playing
            soccer, or at a coffee shop :)
          </p>
        </div>
      </Section>

      <Section heading="Connect" headingAlignment="left">
        <div className="flex w-full flex-col gap-8">
          <p>
            Have a question or just want to chat? Feel free to{" "}
            <Link href="jeremyxu1234@gmail.com">email me</Link>. Try finding me
            anywhere else at @jeremyxxxuuu.
          </p>
          <ul className="animated-list grid flex-grow grid-cols-1 gap-2 md:grid-cols-2">
            {ConnectLinks.map((link) => (
              <li className="col-span-1 transition-opacity" key={link.label}>
                <Link
                  href={link.href}
                  className="inline-grid w-full rounded-lg border border-primary p-4 no-underline transition-opacity"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{link.icon}</span>
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="ml-auto h-5 w-5 text-secondary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section heading="Work" headingAlignment="left">
        <div className="flex w-full flex-col gap-8">
          <p>
            {new Date().getFullYear() - 2022}+ years of professional development
            experience.
          </p>
          <p>
            I started my career teaching others how to code, which I will always
            be appreciative of. Then I worked at a few small local companies.
            Now I&apos;m a full stack engineer currently working at{" "}
            <Link className="underline" href="https://www.orosound.com/">
              Orosound
            </Link>
            , French tech company with a breakthrough expertise in audio
            innovation.
          </p>
          <Workplaces items={workplaces} />
        </div>
      </Section>
    </div>
  );
}
const workplaces = [
  {
    title: "Full Stack Engineer",
    company: "Orosound",
    time: "2022 -",
    imageSrc: OrosoundIMG,
    link: "https://orosound.com/",
  },
  {
    title: "Software Engineer",
    company: "Siemens Healthineers",
    time: "2021 - 2022",
    imageSrc: SiemensIMG,
    link: "https://www.siemens-healthineers.com/",
  },
  {
    title: "Coding Camp Instructor",
    company: "University of Shanghai",
    time: "2019",
    imageSrc: shuIMG,
    link: "https://en.shu.edu.cn/",
  },
];

export default About;
