import { motion } from "framer-motion";
import { Section } from "../components/layout/Section";
import { useGithubStats } from "../hooks/useGithubStats";
import { useLocale } from "../i18n/locale";
import { strings } from "../i18n/strings";

export function GithubActivity() {
  const { stats, status, username } = useGithubStats();
  const locale = useLocale();
  const t = strings[locale].githubActivity;

  return (
    <Section tone="dark">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-sm font-semibold uppercase tracking-widest text-white/40"
      >
        {t.eyebrow}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl bg-white p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] md:p-8"
      >
        <img
          src={`https://ghchart.rshah.org/0071E3/${username}`}
          alt={`${username}'s GitHub contribution graph`}
          loading="lazy"
          className="w-full"
        />
      </motion.div>

      {status === "ready" && stats && (
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 text-center sm:grid-cols-3">
          <div>
            <p className="text-shadow-dark text-4xl font-semibold tracking-tight text-white">{stats.publicRepoCount}</p>
            <p className="mt-1 text-sm text-white/40">{t.publicRepos}</p>
          </div>
          <div>
            <p className="text-shadow-dark text-4xl font-semibold tracking-tight text-white">{stats.totalStars}</p>
            <p className="mt-1 text-sm text-white/40">{t.stars}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-sm text-white/40">{t.topLanguages}</p>
            <p className="mt-2 text-sm font-medium text-white/80">
              {stats.topLanguages.map((entry) => entry.language).join(" · ") || "N/A"}
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <p className="mt-10 text-center text-sm text-white/40">
          {t.errorPrefix}{" "}
          <a href={`https://github.com/${username}`} className="underline" target="_blank" rel="noreferrer">
            github.com/{username}
          </a>{" "}
          {t.errorSuffix}
        </p>
      )}
    </Section>
  );
}
