import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { useLocale, otherLocalePath } from "../../i18n/locale";
import { strings } from "../../i18n/strings";

export function Header() {
  const locale = useLocale();
  const { pathname, hash } = useLocation();
  const t = strings[locale];
  const homeHref = locale === "en" ? "/" : "/pt";
  const hashHref = (id: string) => (locale === "en" ? `/#${id}` : `/pt#${id}`);
  const switchTo = locale === "en" ? "pt" : "en";
  const switchHref = otherLocalePath(pathname, hash, locale);
  const switchFlag = switchTo === "pt" ? "🇧🇷" : "🇺🇸";

  const navItems = [
    { label: t.nav.projects, href: hashHref("projects") },
    { label: t.nav.about, href: hashHref("about") },
    { label: t.nav.contact, href: hashHref("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link to={homeHref} className="text-sm font-semibold tracking-tight text-white">
          Duan Jesus
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to={switchHref}
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
            aria-label={switchTo === "pt" ? "Ver em português" : "View in English"}
          >
            <span className="text-base leading-none">{switchFlag}</span>
            {switchTo.toUpperCase()}
          </Link>
          <Button href="/resume.pdf" variant="secondary" size="sm" tone="dark">
            {t.nav.resume}
          </Button>
        </div>
      </div>
    </header>
  );
}
