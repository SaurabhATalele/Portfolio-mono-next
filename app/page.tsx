import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TechStack } from "./components/TechStack";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop space-y-32 pt-4 pb-16">
        <Hero />
        <TechStack />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
