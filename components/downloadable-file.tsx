import {
  AudioLines,
  Download,
  File,
  FileArchive,
  FileCode,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileType,
  FileVideoCamera,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { cacheLife } from "next/cache";
import { buttonVariants } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const fileGroups = {
  archive: ["7z", "gz", "rar", "tar", "zip"],
  audio: ["aac", "flac", "m4a", "mp3", "ogg", "wav"],
  code: ["css", "html", "js", "jsx", "md", "mdx", "py", "sh", "tsx", "ts"],
  document: ["doc", "docx", "odt", "rtf"],
  image: ["avif", "gif", "jpeg", "jpg", "png", "svg", "webp"],
  pdf: ["pdf"],
  spreadsheet: ["csv", "ods", "xls", "xlsx"],
  text: ["json", "log", "txt", "xml", "yaml", "yml"],
  video: ["avi", "m4v", "mov", "mp4", "webm", "wmv"],
} as const;

type KnownFileGroup = keyof typeof fileGroups;
type FileGroup = KnownFileGroup | "default";

const extensionToGroup = Object.fromEntries(
  Object.entries(fileGroups).flatMap(([group, extensions]) =>
    extensions.map((extension) => [extension, group as KnownFileGroup]),
  ),
) as Record<string, KnownFileGroup>;

const fileStyles: Record<
  FileGroup,
  { icon: LucideIcon; iconClassName: string }
> = {
  archive: {
    icon: FileArchive,
    iconClassName: "text-amber-600 dark:text-amber-400",
  },
  audio: {
    icon: AudioLines,
    iconClassName: "text-violet-600 dark:text-violet-400",
  },
  code: { icon: FileCode, iconClassName: "text-sky-600 dark:text-sky-400" },
  default: { icon: File, iconClassName: "text-fd-muted-foreground" },
  document: {
    icon: FileType,
    iconClassName: "text-blue-600 dark:text-blue-400",
  },
  image: {
    icon: FileImage,
    iconClassName: "text-emerald-600 dark:text-emerald-400",
  },
  pdf: { icon: FileText, iconClassName: "text-red-600 dark:text-red-400" },
  spreadsheet: {
    icon: FileSpreadsheet,
    iconClassName: "text-green-600 dark:text-green-400",
  },
  text: { icon: FileText, iconClassName: "text-fd-muted-foreground" },
  video: {
    icon: FileVideoCamera,
    iconClassName: "text-rose-600 dark:text-rose-400",
  },
};

export type DownloadableFileProps = {
  href: string;
  title: string;
  description: string;
  fileName?: string;
  type?: string;
  className?: string;
};

function normalizeExtension(value?: string) {
  return value?.trim().replace(/^\./, "").toLowerCase();
}

function fileNameFromPath(value: string) {
  const [path] = value.split(/[?#]/);
  return path.split("/").filter(Boolean).pop();
}

function extensionFromPath(value: string) {
  const name = fileNameFromPath(value);
  const extension = name?.includes(".") ? name.split(".").pop() : undefined;

  return normalizeExtension(extension);
}

function getFileGroup(extension?: string): FileGroup {
  if (!extension) {
    return "default";
  }

  return extensionToGroup[extension] ?? "default";
}

function formatFileSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return undefined;
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  const formatted = new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: value < 10 ? 1 : 0,
  }).format(value);

  return `${formatted} ${units[unitIndex]}`;
}

async function getFileSize(href: string) {
  "use cache";
  cacheLife("hours");

  try {
    const response = await fetch(href, { method: "HEAD" });
    const contentLength = response.headers.get("content-length");

    return contentLength ? formatFileSize(Number(contentLength)) : undefined;
  } catch {
    return undefined;
  }
}

export async function DownloadableFile({
  href,
  title,
  description,
  fileName,
  type,
  className,
}: DownloadableFileProps) {
  const extension =
    normalizeExtension(type) ?? extensionFromPath(fileName ?? href);
  const { icon: Icon, iconClassName } = fileStyles[getFileGroup(extension)];
  const downloadName = fileName ?? fileNameFromPath(href);
  const typeLabel = type?.replace(/^[^/]+\//, "").toUpperCase();
  const fileSize = await getFileSize(href);

  return (
    <Card
      className={cn(
        "not-prose my-6 w-full max-w-sm rounded-2xl p-2",
        className,
      )}
    >
      <CardContent className="flex max-w-full flex-col gap-4 p-3">
        <div className="flex min-w-0 gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-md border bg-fd-background">
            <Icon aria-hidden="true" className={cn("size-5", iconClassName)} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="m-0 text-sm font-semibold leading-6 text-fd-foreground">
              {title}
            </p>
            {typeLabel || fileSize ? (
              <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
                {typeLabel}
                {typeLabel && fileSize ? " • " : null}
                {fileSize ? (
                  <span className="font-mono">{fileSize}</span>
                ) : null}
              </p>
            ) : null}
          </div>
        </div>

        <p className="m-0 text-sm leading-6">{description}</p>
      </CardContent>

      <CardFooter className="px-3 py-2">
        <a
          className={cn(
            buttonVariants({ size: "sm", variant: "primary" }),
            "mt-2 w-full shrink-0 gap-2 px-4 py-2 no-underline hover:no-underline sm:w-auto [&_svg]:size-4",
          )}
          download={downloadName}
          href={href}
        >
          <Download aria-hidden="true" />
          Baixar
        </a>
      </CardFooter>
    </Card>
  );
}
