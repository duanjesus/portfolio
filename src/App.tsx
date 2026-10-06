import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { CaseStudy } from "./pages/CaseStudy";
import { LocaleContext, localeFromPathname } from "./i18n/locale";
import { strings } from "./i18n/strings";
import { scrollToSection } from "./lib/scrollToSection";

function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // The browser only scrolls to a #section by itself when the element already exists and the
    // navigation is a plain same-page anchor. Router links ("Back to projects") and first loads
    // (the section is rendered by React after the page arrives) need the scroll done here.
    return scrollToSection(decodeURIComponent(hash.slice(1)));
  }, [pathname, hash, key]);

  return null;
}

function DocumentMeta() {
  const { pathname } = useLocation();
  const locale = localeFromPathname(pathname);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    document.title = strings[locale].meta.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.setAttribute("content", strings[locale].meta.description);
  }, [locale]);

  return null;
}

function App() {
  const { pathname } = useLocation();
  const locale = localeFromPathname(pathname);

  return (
    <LocaleContext.Provider value={locale}>
      <ScrollToTop />
      <DocumentMeta />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<CaseStudy />} />
            <Route path="/pt" element={<Home />} />
            <Route path="/pt/projects/:slug" element={<CaseStudy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LocaleContext.Provider>
  );
}

export default App;
