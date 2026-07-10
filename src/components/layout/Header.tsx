import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

const navItems = [
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link to="/" className="text-sm font-semibold tracking-tight text-ink">
          Duan Jesus
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-ink/70 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <Button href="/resume.pdf" variant="secondary" size="sm">
          Resume
        </Button>
      </div>
    </header>
  );
}
