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
import { buttonVariants } from "./ui/button";
import { Card, CardContent } from "./ui/card";

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

const fileGroupEntries = Object.entries(fileGroups) as [
  KnownFileGroup,
  readonly string[],
][];

const fileStyles: Record<
  FileGroup,
  { icon: LucideIcon; iconClassName: string; label: string }
> = {
  archive: {
    icon: FileArchive,
    iconClassName: "text-amber-600 dark:text-amber-400",
    label: "Arquivo compactado",
  },
  audio: {
    icon: AudioLines,
    iconClassName: "text-violet-600 dark:text-violet-400",
    label: "Arquivo de áudio",
  },
  code: {
    icon: FileCode,
    iconClassName: "text-sky-600 dark:text-sky-400",
    label: "Arquivo de código",
  },
  default: {
    icon: File,
    iconClassName: "text-fd-muted-foreground",
    label: "Arquivo",
  },
  document: {
    icon: FileType,
    iconClassName: "text-blue-600 dark:text-blue-400",
    label: "Documento",
  },
  image: {
    icon: FileImage,
    iconClassName: "text-emerald-600 dark:text-emerald-400",
    label: "Imagem",
  },
  pdf: {
    icon: FileText,
    iconClassName: "text-red-600 dark:text-red-400",
    label: "PDF",
  },
  spreadsheet: {
    icon: FileSpreadsheet,
    iconClassName: "text-green-600 dark:text-green-400",
    label: "Planilha",
  },
  text: {
    icon: FileText,
    iconClassName: "text-fd-muted-foreground",
    label: "Arquivo de texto",
  },
  video: {
    icon: FileVideoCamera,
    iconClassName: "text-rose-600 dark:text-rose-400",
    label: "Arquivo de vídeo",
  },
};

export type DownloadableFileProps = {
  href: string;
  title: string;
  description: string;
  fileName?: string;
  type?: string;
  buttonLabel?: string;
  className?: string;
};

function normalizeExtension(value?: string) {
  return value?.trim().replace(/^\./, "").toLowerCase();
}

function extensionFromPath(value: string) {
  const [path] = value.split(/[?#]/);
  const name = path.split("/").pop();
  const extension = name?.includes(".") ? name.split(".").pop() : undefined;

  return normalizeExtension(extension);
}

function getFileGroup(extension?: string): FileGroup {
  if (!extension) {
    return "default";
  }

  const group = fileGroupEntries.find(([, extensions]) =>
    extensions.includes(extension),
  );

  return group?.[0] ?? "default";
}

export function DownloadableFile({
  href,
  title,
  description,
  fileName,
  type,
  buttonLabel = "Baixar",
  className,
}: DownloadableFileProps) {
  const extension =
    normalizeExtension(type) ?? extensionFromPath(fileName ?? href);
  const style = fileStyles[getFileGroup(extension)];
  const Icon = style.icon;
  const downloadName = fileName ?? href.split(/[/?#]/).filter(Boolean).pop();

  return (
    <Card className={cn("not-prose my-6 p-2 w-full max-w-sm", className)}>
      <CardContent className="flex max-w-full flex-col gap-4 p-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-md border bg-fd-background">
            <Icon
              aria-hidden="true"
              className={cn("size-5", style.iconClassName)}
            />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="m-0 text-sm font-semibold leading-6 text-fd-foreground">
              {title}
            </p>
            <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
              {description}
            </p>

            <a
              className={cn(
                buttonVariants({ size: "sm", variant: "primary" }),
                "w-full shrink-0 gap-2 px-4 py-2 no-underline hover:no-underline sm:w-auto [&_svg]:size-4 mt-2",
              )}
              download={downloadName}
              href={href}
            >
              <Download aria-hidden="true" />
              {buttonLabel}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
