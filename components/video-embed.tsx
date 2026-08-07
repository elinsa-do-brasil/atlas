import type { StaticImageData } from "next/image";
import { cn } from "@/lib/cn";

export type VideoEmbedProps = {
  src: string;
  title: string;
  description: string;
  poster?: string | StaticImageData;
  captions?: {
    src: string;
    srcLang: string;
    label: string;
    default?: boolean;
  };
  className?: string;
};

export function VideoEmbed({
  src,
  title,
  description,
  poster,
  captions,
  className,
}: VideoEmbedProps) {
  const normalizedSrc = src.trim();
  const normalizedTitle = title.trim();
  const normalizedDescription = description.trim();

  if (!normalizedSrc || !normalizedTitle || !normalizedDescription) {
    throw new Error("VideoEmbed requer link, título e descrição.");
  }

  const posterSrc = typeof poster === "string" ? poster : poster?.src;

  return (
    <figure
      className={cn(
        "not-prose my-6 overflow-hidden rounded-lg border bg-fd-card shadow-sm",
        className,
      )}
    >
      {/* biome-ignore lint/a11y/useMediaCaption: O componente aceita uma faixa opcional, pois nem todo vídeo hospedado contém fala. */}
      <video
        aria-label={normalizedTitle}
        className="block aspect-video w-full bg-black object-contain"
        controls
        playsInline
        poster={posterSrc}
        preload="metadata"
        src={normalizedSrc}
      >
        {captions ? (
          <track
            default={captions.default}
            kind="captions"
            label={captions.label}
            src={captions.src}
            srcLang={captions.srcLang}
          />
        ) : null}
        Seu navegador não consegue reproduzir este vídeo. Você pode{" "}
        <a className="underline" href={normalizedSrc}>
          abrir o arquivo diretamente
        </a>
        .
      </video>
      <figcaption className="border-t bg-fd-card px-4 py-3">
        <p className="m-0 text-sm font-medium text-fd-foreground">
          {normalizedTitle}
        </p>
        <p className="mt-1 mb-0 text-sm leading-relaxed text-fd-muted-foreground">
          {normalizedDescription}
        </p>
      </figcaption>
    </figure>
  );
}
