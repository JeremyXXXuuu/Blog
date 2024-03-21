/** @type {import('next').NextConfig} */

import { withContentlayer } from "next-contentlayer";

const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "www.notion.so",
      "s3.us-west-2.amazonaws.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
    ],
  },
};

export default withContentlayer(nextConfig);
