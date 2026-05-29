import { Hero } from "./components/Hero";
import { TechStack } from "./components/TechStack";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";

export default function Home() {
  return (
    <main className="w-full max-w-[1200px] mx-auto px-margin-mobile md:px-24 pt-4 pb-16">
      <Hero />
      <TechStack />
      <Experience />
      <Projects />
    </main>
  );
}
