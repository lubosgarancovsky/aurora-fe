import React, { InputHTMLAttributes } from "react";
import { cn } from "@/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMsg?: string;
  fullWidth?: boolean;
  optional?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, errorMsg, fullWidth, optional, ...props },
    ref
  ) => {
    const classes = cn(
      "border border-border rounded-md bg-default px-3 py-1.5 focus:outline-none focus:outline-primary focus:ring-0 active:ring-0 w-fit",
      { "border-danger": error, "w-full": fullWidth },
      className
    );

    const Wrapper = label || errorMsg ? "div" : React.Fragment;

    return (
      <Wrapper className="flex flex-col gap-1.5 text-left">
        {label && (
          <label>
            {label}{" "}
            {optional && (
              <span className="text-foreground-dark text-sm">(optional)</span>
            )}
          </label>
        )}
        <input ref={ref} className={classes} {...props} />
        {error && errorMsg && (
          <span className="text-danger text-sm">{errorMsg}</span>
        )}
      </Wrapper>
    );
  }
);

Input.displayName = "Input";
