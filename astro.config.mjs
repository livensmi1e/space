// @ts-check
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: "https://livensmi1e.github.io",
  base: "/space",
  markdown: {
    remarkPlugins: [
      remarkToc,
      [remarkCollapse, { test: "Table of Contents" }],
      remarkMath,
    ],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: "github-light-default",
        dark: "github-dark-default",
      },
    },
  },
  integrations: [react()],
});
