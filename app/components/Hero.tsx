import Image from 'next/image';
import Link from 'next/link';


export function Hero() {
  return (
    <>
      <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center min-h-[716px]">
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-surface-container-high border border-black/10 dark:border-white/10 text-primary font-code-sm text-code-sm uppercase tracking-tighter">Full Stack Engineer</span>
            <span className="w-12 h-[1px] bg-white/10"></span>
            <span className="text-on-surface-variant font-code-sm text-code-sm">SYSTEM_READY: TRUE</span>
          </div>
          <h1 className="font-display text-[50px] sm:text-[70px] md:text-[100px] leading-none font-extrabold tracking-tighter uppercase text-on-surface">
            SAURABH <span className="text-primary">TALELE</span>
          </h1>
          <p className="font-body-lg text-body-lg text-tertiary max-w-lg">
            Product-minded engineer building high-performance backend systems with clean architectures. Specialized in AI integration, enterprise automation, and resilient software ecosystems.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href='#projects' className="bg-primary text-on-primary px-8 py-4 font-label-caps text-label-caps uppercase font-bold flex items-center gap-3">
              View Selected Work
              <Image src="/icons/external-link.svg" alt="External Link" width={16} height={16} className="opacity-70 invert dark:invert-0" />
            </Link>
            <Link href='https://github.com/SaurabhATalele' target='_blank' className="border border-black/20 dark:border-white/20 text-on-surface px-8 py-4 font-label-caps text-label-caps uppercase font-bold hover:bg-white/5 transition-all">
              GitHub Profile
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-primary/20 blur-[120px] -z-10"></div>
          <div className="relative aspect-[4/5] border border-black/10 dark:border-white/10 p-4 bg-surface-container-lowest">

            <Image alt="Developer Portrait"
              width={1000}
              height={1000}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              data-alt="A professional portrait of a software engineer with a confident smile, wearing a modern dark suit and a crisp white shirt. The lighting is dramatic and technical, with cool blue and emerald green rim light reflecting off his features against a deep black, minimalist background. The style is sharp, editorial, and high-performance, fitting a cyber-minimalist tech portfolio."
              src="/images/heroImage.png" />
            <div className="absolute bottom-8 left-8 space-y-1">
              <div className="font-code-sm text-code-sm text-tertiary">LOC: Pune, MH</div>
              <div className="font-code-sm text-code-sm text-on-surface-variant">UTC +5:30</div>
            </div>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter border-y border-black/5 dark:border-white/5 py-12">
        <div className="space-y-2">
          <div className="text-[48px] font-display font-bold text-on-surface">2+</div>
          <div className="font-code-sm text-code-sm text-primary uppercase tracking-widest">Years Building</div>
          <p className="text-tertiary text-body-md opacity-60">Architecting systems across enterprise environments.</p>
        </div>
        <div className="space-y-2">
          <div className="text-[48px] font-display font-bold text-on-surface">7+</div>
          <div className="font-code-sm text-code-sm text-primary uppercase tracking-widest">Projects Shipped</div>
          <p className="text-tertiary text-body-md opacity-60">Delivered robust internal tools, automation, and enterprise solutions.</p>
        </div>
        <div className="space-y-2">
          <div className="text-[48px] font-display font-bold text-on-surface">SaaS + AI</div>
          <div className="font-code-sm text-code-sm text-primary uppercase tracking-widest">Tech Specialization</div>
          <p className="text-tertiary text-body-md opacity-60">Building AI-powered automation, SaaS and enterprise solutions.</p>
        </div>
      </section>
    </>
  );
}
