"use client";

import { Download, Loader } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { buttonVariants } from "./ui/button";

export type DownloadButtonProps = {
  href: string;
  fileName?: string;
  className?: string;
};

type DownloadState =
  | { status: "idle" }
  | { status: "downloading"; progress?: number };

export function DownloadButton({
  href,
  fileName,
  className,
}: DownloadButtonProps) {
  const [state, setState] = useState<DownloadState>({ status: "idle" });

  async function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    if (state.status === "downloading") {
      return;
    }

    setState({ status: "downloading", progress: undefined });

    try {
      const response = await fetch(href);

      if (!response.ok || !response.body) {
        throw new Error(`Failed to download ${href}`);
      }

      const totalBytes = Number(response.headers.get("content-length")) || undefined;
      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let receivedBytes = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        receivedBytes += value.length;

        setState({
          status: "downloading",
          progress: totalBytes
            ? Math.round((receivedBytes / totalBytes) * 100)
            : undefined,
        });
      }

      const blob = new Blob(chunks as BlobPart[], {
        type: response.headers.get("content-type") ?? undefined,
      });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = fileName ?? "";
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(blobUrl);
    } catch {
      // Cross-origin file server didn't allow the fetch (e.g. no CORS
      // headers). Fall back to a plain navigation instead of failing silently.
      window.open(href, "_blank", "noopener,noreferrer");
    } finally {
      setState({ status: "idle" });
    }
  }

  const isDownloading = state.status === "downloading";
  const progress = isDownloading ? state.progress : undefined;

  return (
    <a
      className={cn(
        buttonVariants({ size: "sm", variant: "primary" }),
        "relative isolate gap-2 overflow-hidden no-underline hover:no-underline [&_svg]:size-4",
        className,
      )}
      download={fileName}
      href={href}
      onClick={handleClick}
    >
      {progress !== undefined ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 -z-10 bg-white/25 transition-[width] duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        />
      ) : null}

      {isDownloading ? (
        <Loader aria-hidden="true" className="animate-spin" />
      ) : (
        <Download aria-hidden="true" />
      )}
      <span aria-live="polite">
        {isDownloading
          ? progress !== undefined
            ? `Baixando: ${progress}%`
            : "Baixando"
          : "Baixar"}
      </span>
    </a>
  );
}
