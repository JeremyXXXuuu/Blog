"use client";
import React, { useEffect, useState } from "react";

import { Block } from "@/types/notion";

import { renderBlock } from "./renderer";

// import "highlight.js/styles/github-dark-dimmed.css";
import { useTheme } from "next-themes";

export default function BlockComponent({ block }: { block: Block }) {
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (!theme) {
    return null;
  }
  return <div>{renderBlock(block, theme!)}</div>;
}
