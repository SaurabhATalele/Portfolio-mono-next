import React from 'react';

export function Projects() {
  return (
    <>
<section id="projects" className="space-y-12">
<div className="flex flex-col md:flex-row items-end justify-between gap-4">
<h2 className="font-display text-[48px] font-bold text-on-surface uppercase tracking-tighter">Featured Works</h2>
<a className="text-primary font-label-caps text-label-caps uppercase tracking-widest hover:underline underline-offset-8" href="#">Explore full archive</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-6 min-h-[600px]">
<div className="md:col-span-8 md:row-span-2 group relative overflow-hidden bg-surface-container border border-black/10 dark:border-white/10 p-8">
<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
<img alt="Project One" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105" data-alt="A macro close-up of a high-resolution laptop screen displaying complex, color-coded lines of Python code in a professional IDE. The background is softly blurred, showing a modern, dimly lit developer workspace with a glowing green mechanical keyboard. The image aesthetic is technical, clean, and emphasizes precision and craftsmanship in software engineering." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFKy78b-fotmK5pJ3lsNkxgVVpW_WWbG6SzSWtgSVy6fO02Hfr8As7Cin5l3DNWOra3QCC-ZVQPEmys0DnQTMJSYU6aeJwnDSbRh2VYNEYNR-RS6MidyYaK7ZXfp_pSu4-A9B3-5HaAl-AvKz3_bwW1Ux2V7N5mppNh-3djyHNQYNbPTBxA17pC2kqBkbNCrHcBpEK6O9nMVR-nUHos0se8txMrqYfu54voHcIfCeEVCRFqo4IptaRSDcFnwj9Sj0Tyeby-kAxUgU" />
<div className="relative z-20 h-full flex flex-col justify-end">
<div className="flex gap-2 mb-4">
<span className="text-[10px] font-code-sm px-2 py-0.5 bg-primary/20 text-primary border border-primary/30 uppercase">SaaS</span>
<span className="text-[10px] font-code-sm px-2 py-0.5 bg-primary/20 text-primary border border-primary/30 uppercase">Infrastructure</span>
</div>
<h3 className="font-display text-[40px] text-on-surface font-bold mb-2">NEURAL_PIPE v2</h3>
<p className="text-tertiary max-w-md mb-6">High-throughput data streaming architecture for real-time AI inference at scale.</p>
<div className="flex gap-4">
<button className="bg-primary text-on-primary px-6 py-2 font-code-sm text-code-sm uppercase font-bold flex items-center gap-2">View Case Study</button>
<span className="material-symbols-outlined text-white/40 self-center" data-icon="open_in_new">open_in_new</span>
</div>
</div>
</div>
<div className="md:col-span-4 group relative overflow-hidden bg-surface-container border border-black/10 dark:border-white/10 p-6">
<div className="relative z-20">
<div className="text-primary font-code-sm text-code-sm mb-2">INTERNAL_TOOL</div>
<h3 className="font-display text-headline-lg text-on-surface font-bold mb-2">AUTO_CORE</h3>
<p className="text-on-surface-variant text-body-md text-sm mb-4">Proprietary CLI for accelerating microservice deployment pipelines by 40%.</p>
<div className="flex gap-2">
<span className="material-symbols-outlined text-primary" data-icon="terminal">terminal</span>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="code">code</span>
</div>
</div>
</div>
<div className="md:col-span-4 group relative overflow-hidden bg-surface-container-high border border-primary/20 p-6 shadow-glow">
<div className="relative z-20">
<div className="text-primary font-code-sm text-code-sm mb-2">EXPERIMENTAL</div>
<h3 className="font-display text-headline-lg text-on-surface font-bold mb-2">VOID_OS</h3>
<p className="text-on-surface-variant text-body-md text-sm mb-4">A minimalist browser-based operating system shell written in Rust and WebAssembly.</p>
<a className="text-primary font-code-sm text-code-sm hover:underline" href="#">GITHUB_REPO -&gt;</a>
</div>
</div>
</div>
</section>
    </>
  );
}
