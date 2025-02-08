// @ts-check
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";

// https://astro.build/config
export default defineConfig({
    site: "https://livensmi1e.github.io",
    base: "/readme",
    markdown: {
        remarkPlugins: [
            remarkToc,
            [remarkCollapse, { test: "Table of Contents" }],
        ],
        shikiConfig: {
            themes: {
                light: "catppuccin-latte",
                dark: "catppuccin-frappe",
            },
        },
    },
});
