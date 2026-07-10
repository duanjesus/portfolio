import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";
type Tone = "light" | "dark";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  className?: string;
}

interface ButtonAsLinkProps extends BaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  href: string;
  to?: never;
}

interface ButtonAsRouterLinkProps extends BaseProps {
  to: string;
  href?: never;
}

type ButtonProps = ButtonAsLinkProps | ButtonAsRouterLinkProps;

const variantClasses: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "bg-ink text-white hover:bg-ink/85",
    secondary: "border border-ink/15 text-ink hover:border-ink/30 hover:bg-ink/[0.03]",
    ghost: "text-ink/70 hover:text-ink",
  },
  dark: {
    primary: "bg-white text-ink hover:bg-white/85",
    secondary: "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
    ghost: "text-white/70 hover:text-white",
  },
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[15px]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  tone = "light",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 ${variantClasses[tone][variant]} ${sizeClasses[size]} ${className}`;

  if ("to" in props && props.to) {
    const { to, ...rest } = props;
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { href, ...rest } = props as ButtonAsLinkProps;
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
