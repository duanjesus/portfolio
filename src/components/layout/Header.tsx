import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { FlagBR, FlagUS } from "../ui/Flag";
import { NavDropdown } from "../ui/NavDropdown";
import { useLocale, otherLocalePath } from "../../i18n/locale";
import { strings } from "../../i18n/strings";
import { projects } from "../../data/projects";
import { contactLinks } from "../../data/contactLinks";

export function Header() {
  const locale = useLocale();
  const { pathname, hash } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = strings[locale];
  const homeHref = locale === "en" ? "/" : "/pt";
  const hashHref = (id: string) => (locale === "en" ? `/#${id}` : `/pt#${id}`);
  const switchTo = locale === "en" ? "pt" : "en";
  const switchHref = otherLocalePath(pathname, hash, locale);
  const CurrentFlag = locale === "pt" ? FlagBR : FlagUS;

  const projectItems = projects.map((project) => ({
    key: project.slug,
    label: project.name,
    sublabel: project.content[locale].tagline,
    href: hashHref(project.slug),
  }));

  const contactItems = contactLinks.map((link) => ({
    key: link.label,
    label: link.label,
    sublabel: link.value,
    href: link.href,
    external: true,
    icon: <link.icon size={16} />,
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black backdrop-blur-xl">
      <div className="mx-auto grid max-w-content grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4">
        <Link to={homeHref} className="group flex items-center gap-2.5 justify-self-start">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-white to-white/70 text-[11px] font-bold tracking-tight text-black transition-transform duration-200 group-hover:scale-105">
            DJ
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">Duan Jesus</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <NavDropdown label={t.nav.projects} triggerHref={hashHref(projects[0].slug)} items={projectItems} />
          <a href={hashHref("about")} className="transition-colors hover:text-white">
            {t.nav.about}
          </a>
          <NavDropdown label={t.nav.contact} triggerHref={hashHref("contact")} items={contactItems} />
        </nav>

        <div className="flex items-center justify-self-end gap-3">
          <Link
            to={switchHref}
            className="flex items-center gap-2 rounded-full border border-white/15 py-1.5 pl-1.5 pr-3 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
            aria-label={switchTo === "pt" ? "Ver em português" : "View in English"}
          >
            <CurrentFlag className="h-5 w-5" />
            {locale.toUpperCase()}
          </Link>
          <Button href="/resume.pdf" variant="secondary" size="sm" tone="dark" className="hidden sm:inline-flex">
            {t.nav.resume}
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/30 hover:text-white md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-black md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-6">
              <Button href="/resume.pdf" variant="secondary" size="sm" tone="dark" className="w-full sm:hidden">
                {t.nav.resume}
              </Button>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40">{t.nav.projects}</p>
                <div className="mt-3 flex flex-col gap-3">
                  {projectItems.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-white/80 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <a
                href={hashHref("about")}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold uppercase tracking-widest text-white/40 transition-colors hover:text-white"
              >
                {t.nav.about}
              </a>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40">{t.nav.contact}</p>
                <div className="mt-3 flex flex-col gap-3">
                  {contactItems.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
