import { Hero } from "../sections/Hero";
import { TechStack } from "../sections/TechStack";
import { FeaturedProjects } from "../sections/FeaturedProjects";
import { About } from "../sections/About";
import { GithubActivity } from "../sections/GithubActivity";
import { Contact } from "../sections/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <TechStack />
      <FeaturedProjects />
      <About />
      <GithubActivity />
      <Contact />
    </>
  );
}
