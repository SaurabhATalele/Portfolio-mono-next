import React from 'react';
import experienceData from '../data/experience.json';

export function Experience() {
  return (
    <>
      <section className="space-y-16 my-4" id="experience">
        <div className="flex items-center gap-6">
          <h2 className="font-display text-[40px] md:text-[48px] font-bold text-on-surface uppercase tracking-tighter">Experience</h2>
          <div className="h-[1px] flex-grow bg-white/10"></div>
          <div className="hidden md:block font-code-sm text-code-sm text-tertiary">HISTORY_LOG</div>
        </div>
        <div className="space-y-12 max-w-4xl ml-auto border-l border-black/10 dark:border-white/10 pl-8 md:pl-16 relative">
          {experienceData.map((exp, index) => (
            <div key={exp.id} className="relative group p-6 md:p-8 border border-black/10 dark:border-white/10 hover:border-primary/50 transition-all duration-300">
              <div className={`absolute -left-[40px] md:-left-[72px] top-10 w-4 h-4 ring-4 ring-background z-10 ${index === 0 ? 'bg-primary' : 'bg-surface-container-high border border-black/10 dark:border-white/10'}`}></div>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-headline-lg text-on-surface flex md:items-center gap-4 flex-col md:flex-row">
                      {exp.company}
                      <span className={`font-code-sm text-code-sm px-2 py-0.5 uppercase ${exp.isPrimaryRole ? 'text-primary border border-primary/30' : 'text-tertiary border border-black/20 dark:border-white/20'}`}>
                        {exp.role}
                      </span>
                    </h3>
                    <p className="font-code-sm text-code-sm text-on-surface-variant">{exp.details}</p>
                  </div>
                </div>
                <p className="text-tertiary text-body-lg">
                  {exp.description}
                </p>
                {exp.impacts && exp.impacts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exp.impacts.map((impact, idx) => (
                      <div key={idx} className="p-4 bg-surface-container-low border border-black/5 dark:border-white/5">
                        <div className="text-primary font-bold text-code-sm mb-1">{impact.title}</div>
                        <p className="text-on-surface-variant text-body-md">{impact.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, idx) => (
                      <span key={idx} className="font-code-sm text-code-sm text-on-surface-variant px-3 py-1 border border-black/10 dark:border-white/10">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
