"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { ThemeToggle } from "./ThemeToggle";
import { SideNav } from './SideNav';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleNavClick = useCallback((sectionId: string) => {
    if (pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const getLinkClasses = (section: string) => {
    const baseClasses = "relative font-label-caps text-label-caps uppercase tracking-widest py-1 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:transition-transform after:duration-300 after:origin-left";

    if (activeSection === section && pathname === '/') {
      return `${baseClasses} font-bold text-primary after:scale-x-100`;
    }
    return `${baseClasses} text-on-surface-variant hover:text-primary after:scale-x-0 hover:after:scale-x-100`;
  };

  const navLinks = [
    { id: "home", label: "Home", path: "/#home" },
    { id: "stack", label: "Stack", path: "/#stack" },
    { id: "experience", label: "Experience", path: "/#experience" },
    { id: "projects", label: "Projects", path: "/#projects" },
  ];

  return (
    <>
      <header
        className="bg-background/80 backdrop-blur-md border-b border-black/10 dark:border-white/10 w-full top-0 sticky z-50"
        style={{ position: 'sticky', top: 0 }}
      >
        <div className="max-w-[1200px] mx-auto flex justify-between items-center h-20 px-6 md:px-24">
          {/* Logo */}
          <Link href="/" className="font-display text-headline-sm md:text-headline-lg font-bold tracking-tighter text-on-surface uppercase flex items-center gap-2 whitespace-nowrap">
            <span className="text-primary font-code-sm md:text-headline-lg">&gt;</span> Saurabh Talele
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                className={getLinkClasses(link.id)}
                href={link.path}
                onClick={(e) => {
                  if (pathname === '/' && link.path.startsWith('/#')) {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/#contact"
              className="hidden sm:inline-block bg-primary text-on-primary font-label-caps text-label-caps px-4 md:px-6 py-3 hover:opacity-90 active:scale-95 transition-all text-center whitespace-nowrap"
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault();
                  handleNavClick("contact");
                }
              }}
            >
              Let&apos;s Connect
            </Link>
            <ThemeToggle />
            {mounted && (
              <button
                type="button"
                className="md:hidden flex items-center justify-center w-12 h-12 cursor-pointer"
                onClick={toggleMenu}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  toggleMenu();
                }}
                aria-label="Toggle Menu"
                aria-expanded={isMenuOpen}
              >
                <Image
                  src={isMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
                  alt=""
                  width={28}
                  height={28}
                  className="dark:invert pointer-events-none"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mounted && isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-lg border-b border-black/10 dark:border-white/10 z-40">
            <nav className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  className={`${getLinkClasses(link.id)} inline-block`}
                  href={link.path}
                  onClick={(e) => {
                    if (pathname === '/' && link.path.startsWith('/#')) {
                      e.preventDefault();
                      handleNavClick(link.id);
                    } else {
                      setIsMenuOpen(false);
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="sm:hidden bg-primary text-on-primary font-label-caps text-label-caps px-6 py-3 hover:opacity-90 active:scale-95 transition-all text-center whitespace-nowrap"
                onClick={(e) => {
                  if (pathname === '/') {
                    e.preventDefault();
                    handleNavClick("contact");
                  } else {
                    setIsMenuOpen(false);
                  }
                }}
              >
                Let&apos;s Connect
              </Link>
            </nav>
          </div>
        )}
      </header>
      <SideNav />
    </>
  );
}
