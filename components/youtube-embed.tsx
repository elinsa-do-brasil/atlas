import { cn } from "@/lib/cn";

const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
};

export function YouTubeEmbed({ videoId, title, className }: YouTubeEmbedProps) {
  const normalizedVideoId = videoId.trim();

  if (!YOUTUBE_VIDEO_ID_PATTERN.test(normalizedVideoId)) {
    throw new Error("YouTubeEmbed recebeu um ID de vídeo inválido.");
  }

  return (
    <div
      className={cn(
        "not-prose my-6 overflow-hidden rounded-lg border shadow-sm",
        className,
      )}
    >
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="block aspect-video w-full"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        src={`https://www.youtube-nocookie.com/embed/${normalizedVideoId}`}
        title={title}
      />
    </div>
  );
}
