import { useEffect, useState } from "react";

const GITHUB_USERNAME = "duanjesus";
const CACHE_KEY = `github-stats:${GITHUB_USERNAME}`;
const CACHE_TTL_MS = 1000 * 60 * 30;

interface GithubRepo {
  name: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

export interface GithubStats {
  publicRepoCount: number;
  topLanguages: { language: string; count: number }[];
  totalStars: number;
}

interface CacheEntry {
  timestamp: number;
  stats: GithubStats;
}

type Status = "loading" | "ready" | "error";

export function useGithubStats() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const cachedRaw = sessionStorage.getItem(CACHE_KEY);
      if (cachedRaw) {
        try {
          const cached: CacheEntry = JSON.parse(cachedRaw);
          if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
            setStats(cached.stats);
            setStatus("ready");
            return;
          }
        } catch {
          // ignore malformed cache
        }
      }

      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
        );
        if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);

        const repos: GithubRepo[] = await response.json();
        const ownRepos = repos.filter((repo) => !repo.fork);

        const languageCounts = new Map<string, number>();
        for (const repo of ownRepos) {
          if (!repo.language) continue;
          languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
        }

        const topLanguages = Array.from(languageCounts.entries())
          .map(([language, count]) => ({ language, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);

        const computed: GithubStats = {
          publicRepoCount: ownRepos.length,
          topLanguages,
          totalStars: ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        };

        if (!cancelled) {
          setStats(computed);
          setStatus("ready");
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), stats: computed }));
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, status, username: GITHUB_USERNAME };
}
