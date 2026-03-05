import React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const initials = fallback || (alt ? alt.charAt(0).toUpperCase() : "?");

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover border-2 border-obsidian-600",
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br from-sapphire-500 to-emerald-500 flex items-center justify-center font-medium text-white",
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
