import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { blogs } from "../lib/notion";

export default function Home() {
  return (
    <div className="m-5 w-3/4">
      <h1 className="text-4xl">Hey, Jeremy here</h1>
      <p className="text-lg mt-5 mb-5">
        I'm a software engineer that focuses on turning ideas into fantastic
        products. I share something I known through articles and the Telegram
        channel.
      </p>
      <p className="text-lg">
        I'm still a bodybuilder, preparing for my first competition
      </p>
    </div>
  );
}
