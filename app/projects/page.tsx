"use client";
import React from 'react';
import Link from 'next/link';
import projectsData from '../data/projects.json';
import { ProjectCard } from '../components/ProjectCard';
import Image from 'next/image';

export default function ProjectsPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-24 py-20 space-y-20">
      <div className="space-y-6 text-center md:text-left">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary font-code-sm text-sm uppercase tracking-widest hover:gap-3 transition-all"
        >
          <Image src="/icons/back.svg" alt="Back" width={20} height={20} className="opacity-80 group-hover:opacity-100 transition-all dark:invert" /> Back to Home
        </Link>
        <div className="space-y-4">
          <h1 className="font-display text-[48px] md:text-[80px] font-bold text-on-surface uppercase tracking-tighter leading-none">
            Selected <span className="text-primary">Works</span>
          </h1>
          <p className="text-tertiary text-lg max-w-2xl mx-auto md:mx-0">
            A comprehensive collection of my technical explorations, enterprise solutions, and open-source contributions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <div key={project.id} className="h-full">
            <ProjectCard
              project={project}
              large={false}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
