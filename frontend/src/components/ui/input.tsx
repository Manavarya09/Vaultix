import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({
  className,
  label,
  error,
  icon,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-platinum-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-platinum-400">
            {icon}
          </div>
        )}
        <input
          className={cn(
            "w-full h-10 px-3 bg-obsidian-800 border border-obsidian-600 rounded-lg",
            "text-platinum-100 placeholder:text-platinum-500",
            "focus:outline-none focus:border-sapphire-500 focus:ring-1 focus:ring-sapphire-500/50",
            "transition-all duration-200",
            icon && "pl-10",
            error && "border-ruby-500 focus:border-ruby-500 focus:ring-ruby-500/50",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-ruby-400">{error}</p>
      )}
    </div>
  );
}
