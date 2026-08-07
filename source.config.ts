import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import { lastModifiedAuthor } from "@/lib/fumadocs/last-modified-author";

const docsPageSchema = pageSchema.extend({
  socialTitle: pageSchema.shape.title.optional(),
  socialDescription: pageSchema.shape.description.optional(),
});

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: "content",
  docs: {
    schema: docsPageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkRehypeOptions: {
      footnoteLabel: "Notas",
    },
  },
  plugins: [lastModified(), lastModifiedAuthor()],
});
