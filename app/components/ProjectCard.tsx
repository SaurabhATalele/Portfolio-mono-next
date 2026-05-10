"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
}

interface ProjectCardProps {
  project: Project;
  large?: boolean;
}

export function ProjectCard({ project, large = false }: ProjectCardProps) {
  return (
    <div className="group relative overflow-hidden bg-surface-container border border-black/10 dark:border-white/10 p-6 md:p-8 h-full min-h-[400px] flex flex-col justify-end w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={project.image} 
          alt={project.name} 
          fill 
          className="object-cover grayscale opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-[10px] font-code-sm px-2 py-0.5 bg-primary/20 text-primary border border-primary/30 uppercase tracking-wider">
            {project.category}
          </span>
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] font-code-sm px-2 py-0.5 bg-white/5 text-on-surface-variant border border-white/10 uppercase">
              {t}
            </span>
          ))}
        </div>

        <h3 className={`font-display font-bold text-on-surface mb-2 leading-tight ${large ? 'text-[32px] md:text-[48px]' : 'text-[24px] md:text-[32px]'}`}>
          {project.name}
        </h3>
        
        <p className="text-tertiary text-sm md:text-base max-w-md mb-6 line-clamp-2 md:line-clamp-none">
          {project.description}
        </p>

        <div className="flex gap-4">
          <Link 
            href={project.demo} 
            target="_blank"
            className="bg-primary text-on-primary px-5 py-2.5 font-code-sm text-xs uppercase font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all"
          >
            Live Demo
            <Image src="/icons/external-link.svg" alt="Demo" width={14} height={14} className="invert dark:invert-0" />
          </Link>
          <Link 
            href={project.github} 
            target="_blank"
            className="border border-white/20 bg-white/5 text-on-surface px-5 py-2.5 font-code-sm text-xs uppercase font-bold flex items-center gap-2 hover:bg-white/10 active:scale-95 transition-all"
          >
            GitHub
            <Image src="/icons/github.svg" alt="GitHub" width={14} height={14} className="dark:invert-0 invert" />
          </Link>
        </div>
      </div>
    </div>
  );
}
