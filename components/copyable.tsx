"use client";

import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";
import { buttonVariants } from "./ui/button";

interface CopyableProps {
  text: string;
  className?: string;
  onCopy?: () => void | Promise<void>;
}

export function Copyable({ text, className, onCopy }: CopyableProps) {
  const [copied, handleCopy] = useCopyButton(async () => {
    await navigator.clipboard.writeText(text);
    await onCopy?.();
  });
  const actionLabel = copied ? "Texto copiado" : "Copiar texto";

  return (
    <button
      type="button"
      aria-label={actionLabel}
      aria-live="polite"
      className={cn(
        buttonVariants({ color: "ghost" }),
        "group not-prose inline-flex max-w-full items-stretch overflow-hidden rounded-md border bg-fd-secondary/50 p-0 align-middle text-sm text-fd-foreground shadow-xs transition-colors hover:border-fd-primary/40 hover:bg-fd-accent focus-visible:ring-inset",
        className,
      )}
      onClick={handleCopy}
      title={actionLabel}
    >
      <span
        className="min-w-0 truncate px-2.5 py-1.5 leading-5 font-semibold"
        title="Toque para copiar"
      >
        {text}
      </span>
      <span className="flex shrink-0 items-center justify-center border-s px-2 text-fd-muted-foreground transition-colors group-hover:border-fd-primary/30 group-hover:bg-fd-primary/10 group-hover:text-fd-foreground [&_svg]:size-4">
        {copied ? (
          <Check
            aria-hidden="true"
            className="text-emerald-600 dark:text-emerald-400"
          />
        ) : (
          <Copy aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
