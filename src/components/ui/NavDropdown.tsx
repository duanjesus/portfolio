import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface NavDropdownItem {
  key: string;
  label: string;
  sublabel?: string;
  href: string;
  external?: boolean;
  icon?: ReactNode;
}

interface NavDropdownProps {
  label: string;
  triggerHref: string;
  items: NavDropdownItem[];
}

export function NavDropdown({ label, triggerHref, items }: NavDropdownProps) {
  return (
    <div className="group relative">
      <a href={triggerHref} className="flex items-center gap-1 transition-colors hover:text-white">
        {label}
        <ChevronDown size={14} className="text-white/40 transition-transform duration-200 group-hover:rotate-180 group-hover:text-white" />
      </a>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]">
          {items.map((item) => (
            <a
              key={item.key}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.icon && <span className="text-white/40">{item.icon}</span>}
              <span>
                <span className="block font-medium">{item.label}</span>
                {item.sublabel && <span className="block text-xs text-white/40">{item.sublabel}</span>}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
