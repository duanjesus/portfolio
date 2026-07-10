import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { FlagBR, FlagUS } from "../ui/Flag";
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
  const SwitchFlag = switchTo === "pt" ? FlagBR : FlagUS;

  const navItems = [
    { label: t.nav.projects, href: hashHref("projects") },
    { label: t.nav.about, href: hashHref("about") },
    { label: t.nav.contact, href: hashHref("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black backdrop-blur-xl">
      <div className="mx-auto grid max-w-content grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4">
        <Link to={homeHref} className="justify-self-start text-sm font-semibold tracking-tight text-white">
          Duan Jesus
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-3">
          <Link
            to={switchHref}
            className="flex items-center gap-2 rounded-full border border-white/15 py-1.5 pl-1.5 pr-3 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
            aria-label={switchTo === "pt" ? "Ver em português" : "View in English"}
          >
            <SwitchFlag className="h-5 w-5" />
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
