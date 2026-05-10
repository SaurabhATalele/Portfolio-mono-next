"use client";
import React, { useEffect, useState } from 'react';
import { ThemeToggle } from "./ThemeToggle";
import { SideNav } from './SideNav';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "stack", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY + 150;

      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          if (element.offsetTop <= scrollPosition) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getLinkClasses = (section: string) => {
    const baseClasses = "relative font-label-caps text-label-caps uppercase tracking-widest py-1 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:transition-transform after:duration-300 after:origin-left";

    if (activeSection === section) {
      return `${baseClasses} font-bold text-primary after:scale-x-100`;
    }
    return `${baseClasses} text-on-surface-variant hover:text-primary after:scale-x-0 hover:after:scale-x-100`;
  };

  return (
    <>
      <header className="bg-background/80 backdrop-blur-md border-b border-black/10 dark:border-white/10 docked full-width top-0 sticky z-50 h-20">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center h-full px-margin-desktop">
          <div className="font-display text-headline-lg font-bold tracking-tighter text-on-surface uppercase flex items-center gap-2">
            <span className="text-primary font-code-sm">&gt;</span> Saurabh Talele
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className={getLinkClasses("home")} href="#home" onClick={() => setActiveSection("home")}>Home</a>
            <a className={getLinkClasses("stack")} href="#stack" onClick={() => setActiveSection("stack")}>Stack</a>
            <a className={getLinkClasses("experience")} href="#experience" onClick={() => setActiveSection("experience")}>Experience</a>
            <a className={getLinkClasses("projects")} href="#projects" onClick={() => setActiveSection("projects")}>Projects</a>
          </nav>
          <div className="flex items-center gap-4">

            <Link href="#contact" className="bg-primary text-on-primary font-label-caps text-label-caps px-4 md:px-6 py-3 hover:opacity-90 active:scale-95 transition-all inline-block text-center whitespace-nowrap">
              Let's Connect
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <SideNav />
    </>
  );
}
