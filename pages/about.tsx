// import type { Metadata } from "next";
import { GitHubIcon, ArrowIcon, TwitterIcon } from "../components/icons";

export const metadata = {
  title: "About",
  description: "VP of Developer Experience at Vercel.",
};

export default function AboutPage() {
  return (
    <section className="m-5 w-3/4">
      <h1 className="text-4xl">About Me</h1>
      <p className="text-lg mt-5 mb-3">Hey, I'm Jeremy.</p>
      <div className="text-lg">
        <p>
          I'm currently the <b>Fullstack Developer</b> at Orosound, I focus on{" "}
          <b>developing Fullstack web application</b> and <b>Oauth2</b>
        </p>
        <hr />
        <p>
          I'm passionate about many creative pursuits, including music,
          photography, videography, aesthetic bodybuilding, and of course,
          coding.
        </p>
        <p>
          I <b>love</b> building for the web. From something as simple as a
          single HTML file – all the way to large Next.js applications. The web
          is incredible. Anyone can become a developer, writer, or creator – and
          no one has to ask for permission. You can just build.
        </p>
        <p className="">Outside of Orosound, I ...</p>
        <div className="flex justify-start mt-5">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/leeerob"
            className="mr-10"
          >
            <div className="">
              <TwitterIcon />
              <div className="text-sm font-semibold mt-1">Twitter</div>
            </div>
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/jeremyxxxuuu"
            className=""
          >
            <div className="">
              <GitHubIcon />
              <div className="text-sm font-semibold">GitHub</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
