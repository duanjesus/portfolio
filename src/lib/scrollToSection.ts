const SETTLE_MS = 4000;
const TAKEOVER_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

/**
 * Scrolls to a section and keeps it in place while the page settles.
 *
 * Images above the section arrive after the scroll and push it down, so a single
 * scrollIntoView() lands in the right place and then drifts away. The scroll is repeated
 * whenever the page changes height, until it stops changing, a few seconds pass, or the
 * reader starts scrolling on their own. Returns a function that stops it early.
 */
export function scrollToSection(id: string): () => void {
  // Instant on purpose: a smooth scroll across the whole page loads every lazy image on the way,
  // and each one moves the target again while the animation is still running.
  const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  scroll();

  const observer = new ResizeObserver(scroll);
  observer.observe(document.body);

  const stop = () => {
    observer.disconnect();
    window.clearTimeout(timer);
    TAKEOVER_EVENTS.forEach((event) => window.removeEventListener(event, stop));
  };
  const timer = window.setTimeout(stop, SETTLE_MS);
  TAKEOVER_EVENTS.forEach((event) => window.addEventListener(event, stop, { passive: true }));

  return stop;
}
