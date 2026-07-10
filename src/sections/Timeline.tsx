import { timeline } from "../data/timeline";

export function Timeline() {
  return (
    <ol className="relative border-l border-ink/10 pl-8">
      {timeline.map((item) => (
        <li key={item.year} className="mb-10 last:mb-0">
          <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-ink" />
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">{item.year}</p>
          <h3 className="mt-1 text-lg font-semibold text-ink">{item.title}</h3>
          <p className="mt-1 text-ink/60">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
