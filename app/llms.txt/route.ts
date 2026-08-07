import { llms } from "fumadocs-core/source";
import { markdownResponse } from "@/lib/markdown-response";
import { absolutizeDocsMarkdownLinks } from "@/lib/shared";
import { source } from "@/lib/source";

export const revalidate = false;

export function GET() {
  return markdownResponse(absolutizeDocsMarkdownLinks(llms(source).index()));
}
