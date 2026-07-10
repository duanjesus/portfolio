import { createContext, useContext } from "react";

export type Locale = "en" | "pt";

export const LocaleContext = createContext<Locale>("en");

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/pt" || pathname.startsWith("/pt/") ? "pt" : "en";
}

/** Strips a "/pt" prefix, returning the canonical (English) path. */
function toCanonicalPath(pathname: string): string {
  if (pathname === "/pt") return "/";
  if (pathname.startsWith("/pt/")) return pathname.slice(3);
  return pathname;
}

/** Rewrites a canonical (English) path/hash for the given locale, e.g. "/#projects" -> "/pt#projects". */
export function localizePath(path: string, locale: Locale): string {
  if (locale === "en") return path;
  if (path === "/") return "/pt";
  if (path.startsWith("/#")) return `/pt${path.slice(1)}`;
  return `/pt${path}`;
}

/** Given the current pathname + hash, returns the equivalent URL in the other locale. */
export function otherLocalePath(pathname: string, hash: string, currentLocale: Locale): string {
  const targetLocale: Locale = currentLocale === "en" ? "pt" : "en";
  const canonical = toCanonicalPath(pathname);
  const base = canonical === "/" ? "/" : canonical;
  return localizePath(base, targetLocale) + hash;
}
