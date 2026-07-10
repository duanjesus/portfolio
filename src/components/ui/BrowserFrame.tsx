import { motion } from "framer-motion";

interface BrowserFrameProps {
  src: string;
  alt: string;
  className?: string;
}

export function BrowserFrame({ src, alt, className = "" }: BrowserFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`overflow-hidden rounded-2xl bg-[#1d1d1f] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="flex items-center gap-1.5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <img src={src} alt={alt} loading="lazy" className="w-full" />
    </motion.div>
  );
}
