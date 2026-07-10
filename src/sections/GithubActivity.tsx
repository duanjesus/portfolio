import { Section } from "../components/layout/Section";
import { useGithubStats } from "../hooks/useGithubStats";

export function GithubActivity() {
  const { stats, status, username } = useGithubStats();

  return (
    <Section className="border-t border-black/5">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40">GitHub Activity</h2>

      <div className="mt-8 overflow-hidden rounded-xl border border-ink/10">
        <img
          src={`https://ghchart.rshah.org/2563EB/${username}`}
          alt={`${username}'s GitHub contribution graph`}
          loading="lazy"
          className="w-full"
        />
      </div>

      {status === "ready" && stats && (
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
          <div>
            <p className="text-3xl font-semibold tracking-tight text-ink">{stats.publicRepoCount}</p>
            <p className="mt-1 text-sm text-ink/50">Public repos</p>
          </div>
          <div>
            <p className="text-3xl font-semibold tracking-tight text-ink">{stats.totalStars}</p>
            <p className="mt-1 text-sm text-ink/50">Stars</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-sm text-ink/50">Top languages</p>
            <p className="mt-2 text-sm font-medium text-ink/80">
              {stats.topLanguages.map((entry) => entry.language).join(" · ") || "—"}
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <p className="mt-8 text-sm text-ink/40">
          Live stats are temporarily unavailable — check{" "}
          <a href={`https://github.com/${username}`} className="underline" target="_blank" rel="noreferrer">
            github.com/{username}
          </a>{" "}
          directly.
        </p>
      )}
    </Section>
  );
}
