import type * as React from "react";
import { cn } from "@/lib/cn";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-fd-card text-fd-card-foreground shadow-sm",
        className,
      )}
      data-slot="card"
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("p-4", className)} data-slot="card-content" {...props} />
  );
}

export { Card, CardContent };
