import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center font-medium 
    transition-all duration-200 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire-500 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-900
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-sapphire-500 text-white hover:bg-sapphire-400 
      shadow-lg shadow-sapphire-500/20 hover:shadow-sapphire-400/30
      active:scale-[0.98]
    `,
    secondary: `
      bg-obsidian-700 text-platinum-200 hover:bg-obsidian-600
      border border-obsidian-600 hover:border-obsidian-500
      active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-platinum-300 hover:text-platinum-100
      hover:bg-obsidian-700/50
    `,
    danger: `
      bg-ruby-500/10 text-ruby-400 hover:bg-ruby-500/20
      border border-ruby-500/30 hover:border-ruby-500/50
    `,
  };

  const sizes = {
    sm: "h-8 px-3 text-sm rounded-md gap-1.5",
    md: "h-10 px-4 text-sm rounded-lg gap-2",
    lg: "h-12 px-6 text-base rounded-lg gap-2.5",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
