import { HTMLAttributes, ReactNode } from "react";
import { mergeClasses } from "@/utils";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  children?: ReactNode;
}

export function Text({ as = "p", weight = "normal", children, className, ...rest }: TextProps) {
  const Root = as ?? "p";
  const _className = mergeClasses(
    "text-slate-500",
    weight === "light" && "font-light",
    weight === "normal" && "font-normal",
    weight === "medium" && "font-medium",
    weight === "semibold" && "font-semibold",
    weight === "bold" && "font-bold",
    className,
  );

  return (
    <Root className={_className} {...rest}>
      {children}
    </Root>
  );
}
