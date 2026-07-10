import { Github, Linkedin, Mail, MessageCircle, FileDown } from "lucide-react";
import { Section } from "../components/layout/Section";

const links = [
  {
    label: "Email",
    value: "duanjesus30@gmail.com",
    href: "mailto:duanjesus30@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "@duanjesus",
    href: "https://github.com/duanjesus",
    icon: Github,
  },
  // TODO: replace with real LinkedIn profile URL
  { label: "LinkedIn", value: "Add your LinkedIn URL", href: "#", icon: Linkedin },
  // TODO: replace with real WhatsApp link (e.g. https://wa.me/55...)
  { label: "WhatsApp", value: "Add your WhatsApp link", href: "#", icon: MessageCircle },
  { label: "Resume", value: "Download PDF", href: "/resume.pdf", icon: FileDown },
];

export function Contact() {
  return (
    <Section id="contact" className="border-t border-black/5">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40">Contact</h2>
      <p className="mt-4 max-w-xl text-lg text-ink/70">
        Open to backend and full-stack roles. The fastest way to reach me is email.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {links.map(({ label, value, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center gap-4 rounded-xl border border-ink/10 px-5 py-4 transition-colors hover:border-ink/25 hover:bg-ink/[0.02]"
          >
            <Icon size={20} className="text-ink/50" />
            <span>
              <span className="block text-sm font-medium text-ink">{label}</span>
              <span className="block text-sm text-ink/50">{value}</span>
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
