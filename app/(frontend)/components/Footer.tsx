import Image from 'next/image';
import React from 'react';

export function Footer() {
  return (
    <>
      <section id="contact" className="relative bg-surface-container-lowest border border-black/10 dark:border-white/10 p-12 md:p-24 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <div className="font-code-sm text-code-sm text-primary uppercase tracking-[0.3em]">Available for projects</div>
          <h2 className="font-display text-[48px] md:text-[64px] font-bold text-on-surface leading-tight uppercase tracking-tighter">Ready to build the next system?</h2>
          <p className="text-tertiary text-body-lg">Currently accepting high-impact opportunities in SaaS architecture and AI-driven products.</p>
          <div className="flex flex-col md:flex-row justify-center pt-8">
            <a className="bg-primary text-sm lg:text-md text-on-primary flex justify-center py-5 font-display text-headline-sm-mobile font-bold uppercase tracking-tighter p-2" href="mailto:saurabhatalele@gmail.com">saurabhatalele@gmail.com</a>
          </div>
        </div>
      </section>
      <footer className="bg-background border-t border-black/5 dark:border-white/5 py-24">
        <div className="max-w-[1200px] mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-headline-lg font-bold tracking-tighter text-on-surface uppercase">
                SAURABH TALELE
              </h1>

              <div className="mt-2 flex items-center gap-2 text-primary font-code-sm">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span>Available for Full Stack Engineering Opportunities</span>
              </div>
            </div>

            <p className="text-on-surface-variant text-body-md max-w-md leading-relaxed">
              Full Stack Engineer with 2+ years of experience building scalable web
              applications, AI-powered products, and high-performance backend systems.
              Passionate about modern web technologies, system design, and turning
              complex ideas into production-ready solutions.
            </p>


          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="font-label-caps text-label-caps text-on-surface-variant uppercase opacity-50">Navigation</div>
              <ul className="space-y-2 font-code-sm text-code-sm">
                <li><a className="text-tertiary hover:text-primary transition-all underline underline-offset-4" href="/#">Home</a></li>
                <li><a className="text-tertiary hover:text-primary transition-all underline underline-offset-4" href="/#experience">Experience</a></li>
                <li><a className="text-tertiary hover:text-primary transition-all underline underline-offset-4" href="/projects">Projects</a></li>
                <li><a className="text-tertiary hover:text-primary transition-all underline underline-offset-4" href="/blogs">Blogs</a></li>
                <li><a className="text-tertiary hover:text-primary transition-all underline underline-offset-4" href="/testimonials">Testimonials</a></li>
                <li><a className="text-tertiary hover:text-primary transition-all underline underline-offset-4" href="/rss.xml">RSS</a></li>
              </ul>
            </div>
            {/* <div className="space-y-4">
              <div className="font-label-caps text-label-caps text-on-surface-variant uppercase opacity-50">Legal</div>
              <ul className="space-y-2 font-code-sm text-code-sm">
                <li><a className="text-tertiary hover:text-primary transition-all underline underline-offset-4" href="#">Architecture</a></li>
                <li><a className="text-tertiary hover:text-primary transition-all underline underline-offset-4" href="#">Status</a></li>
              </ul>
            </div> */}
            <div className="space-y-4 col-span-2 md:col-span-1">
              <div className="font-label-caps text-label-caps text-on-surface-variant uppercase opacity-50">Social</div>
              <div className="flex gap-4">
                <a className="text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all p-2 group" href="mailto:saurabhatalele@gmail.com" title="Email">
                  <Image src="/icons/email.svg" alt="Email" width={20} height={20} className="opacity-80 group-hover:opacity-100 transition-all dark:invert" />
                </a>
                <a className="text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all p-2 group" href="https://www.linkedin.com/in/saurabh-talele1122" title="LinkedIn">
                  <Image src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} className="opacity-80 group-hover:opacity-100 transition-all dark:invert" />
                </a>
                <a className="text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all p-2 group" href="https://github.com/SaurabhATalele" title="GitHub">
                  <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} className="opacity-80 group-hover:opacity-100 transition-all dark:invert" />
                </a> </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-margin-desktop mt-24 flex flex-col md:flex-row justify-between items-center gap-4 text-on-secondary-container font-code-sm text-[12px] opacity-40">
          {/* <div>© 2024 SYSTEM_EXECUTABLE. ALL RIGHTS RESERVED.</div>
<div>BUILD_ID: 9X-442-PROD</div> */}
        </div>
      </footer>
    </>
  );
}
