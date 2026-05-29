import React from 'react';
import techStackData from '../data/techStack.json';

export function TechStack() {
  return (
    <section id="stack" className="space-y-12 min-h-[calc(100vh-5rem)] flex flex-col justify-center w-full overflow-hidden my-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="font-code-sm text-code-sm text-primary">TECHNICAL_STACK</div>
          <h2 className="font-display text-[40px] md:text-[64px] font-bold text-on-surface uppercase leading-none tracking-tighter">
            Technical<br />Ecosystem
          </h2>
        </div>
        <p className="text-tertiary max-w-md border-l border-primary/30 pl-6 py-2">
          A production-focused ecosystem spanning backend systems, modern frontend delivery, AI automation, and cloud operations.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techStackData.map((category) => (
          <div key={category.id} className="group bg-surface-container-lowest border border-black/10 dark:border-white/10 p-8 hover:border-primary/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-12">
              <span className="material-symbols-outlined text-primary text-3xl" data-icon={category.icon}>{category.icon}</span>
              <span className="font-code-sm text-code-sm text-on-surface-variant opacity-40">{category.id}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span key={skill} className="font-code-sm text-code-sm bg-surface-container px-2 py-1 border border-black/5 dark:border-white/5">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
