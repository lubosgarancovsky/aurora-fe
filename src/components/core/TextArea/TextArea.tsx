import { cn } from "@/utils";
import React, { TextareaHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  errorMsg?: string;
  fullWidth?: boolean;
  optional?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className, label, error, errorMsg, fullWidth, optional, ...props },
    ref
  ) => {
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
        <textarea
          ref={ref}
          className={cn(
            "border border-border rounded-md bg-default px-3 py-1.5 focus:outline-none focus:outline-primary focus:ring-0 active:ring-0 w-full",
            className
          )}
          {...props}
        />
        {error && errorMsg && (
          <span className="text-danger text-sm">{errorMsg}</span>
        )}
      </Wrapper>
    );
  }
);

TextArea.displayName = "TextArea";
