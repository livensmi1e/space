// @ts-check
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";

// https://astro.build/config
export default defineConfig({
  site: "https://livensmi1e.github.io",
  base: "/space",
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of Contents" }]],
    shikiConfig: {
      themes: {
        light: "github-light-default",
        dark: "github-dark-default",
      },
    },
  },
});
