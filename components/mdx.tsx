import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/cn";
import { Copyable } from "./copyable";
import { DownloadableFile } from "./downloadable-file";
import { GithubCard } from "./github-card";
import { FundamentoBadge } from "./fundamento-badge";
import { VideoEmbed } from "./video-embed";
import { YouTubeEmbed } from "./youtube-embed";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Copyable,
    DownloadableFile,
    GithubCard,
    VideoEmbed,
    YouTubeEmbed,
    FundamentoBadge,
    img: (props) => (
      <ImageZoom
        {...(props as any)}
        className={cn("rounded-lg", props.className)}
        zoomInProps={{ className: "rounded-lg" }}
      />
    ),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
