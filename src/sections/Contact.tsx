import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle, FileDown } from "lucide-react";
import { Section } from "../components/layout/Section";
import { useLocale } from "../i18n/locale";
import { strings } from "../i18n/strings";

export function Contact() {
  const locale = useLocale();
  const t = strings[locale].contact;

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
    { label: "LinkedIn", value: "/in/duan-jesus", href: "https://www.linkedin.com/in/duan-jesus/", icon: Linkedin },
    { label: "WhatsApp", value: "(21) 96405-6742", href: "https://wa.me/5521964056742", icon: MessageCircle },
    { label: t.resumeLabel, value: t.resumeValue, href: "/resume.pdf", icon: FileDown },
  ];

  return (
    <Section id="contact" tone="light">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-ink/40">{t.eyebrow}</p>
        <p className="mx-auto mt-4 max-w-xl text-xl text-ink/70">{t.subtitle}</p>
      </motion.div>
      <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
        {links.map(({ label, value, href, icon: Icon }, index) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            className="flex items-center gap-4 rounded-2xl border border-ink/10 px-5 py-4 transition-all duration-200 hover:border-ink/20 hover:shadow-md"
          >
            <Icon size={20} className="text-ink/50" />
            <span>
              <span className="block text-sm font-medium text-ink">{label}</span>
              <span className="block text-sm text-ink/50">{value}</span>
            </span>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
