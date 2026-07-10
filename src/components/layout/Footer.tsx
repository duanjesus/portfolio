const builtWith = ["React", "TypeScript", "Tailwind", "Framer Motion", "Vite"];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-10 text-white">
      <div className="mx-auto flex max-w-content flex-col items-center gap-3 px-6 text-center text-xs text-white/40 md:flex-row md:justify-between md:text-left">
        <p>© {new Date().getFullYear()} Duan Jesus. Built with {builtWith.join(" · ")}.</p>
        <p>duanjesus.dev</p>
      </div>
    </footer>
  );
}
