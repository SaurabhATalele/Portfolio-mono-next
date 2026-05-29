"use client";
import React from 'react';
import Link from 'next/link';
import projectsData from '../data/projects.json';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  // Display the first 3 projects as featured works
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <section id="projects" className="space-y-12 overflow-hidden my-4">
      <div className="flex flex-col md:flex-row items-end justify-between gap-4">
        <div className="space-y-4">
          <div className="font-code-sm text-code-sm text-primary uppercase tracking-[0.2em]">SELECTED_WORKS</div>
          <h2 className="font-display text-[40px] md:text-[64px] font-bold text-on-surface uppercase tracking-tighter leading-none">
            Featured <span className="text-primary">Works</span>
          </h2>
        </div>
        <Link
          className="text-primary font-label-caps text-label-caps uppercase tracking-widest hover:underline underline-offset-8 transition-all"
          href="/projects"
        >
          Explore full archive &mdash;&gt;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6">
        {featuredProjects.map((project, index) => (
          <div key={project.id} className={`${index === 0 ? 'md:col-span-8 md:row-span-2' : 'md:col-span-4'}`}>
            <ProjectCard
              project={project}
              large={index === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
