import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-9 w-full rounded-sm border border-input bg-surface px-3 py-1 font-mono text-sm text-foreground transition-colors",
        "placeholder:font-mono placeholder:text-muted-foreground/70",
        "focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:mr-3 file:border-0 file:bg-transparent file:font-mono file:text-xs",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
