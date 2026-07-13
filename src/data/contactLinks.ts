import { Github, Linkedin, Mail, MessageCircle, type LucideIcon } from "lucide-react";

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
}

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "duanjesus@hotmail.com",
    href: "mailto:duanjesus@hotmail.com",
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
];
