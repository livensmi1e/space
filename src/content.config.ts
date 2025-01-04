import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const writing = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/writings" }),
    schema: z.object({
        title: z.string(),
        date: z.string().transform((str) => {
            const date = new Date(str)
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }),
        time: z.string(),
        description: z.string(),
        tags: z.array(z.string())
    })
});

export const collections = { writing };