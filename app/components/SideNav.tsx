import React from 'react';

import Image from 'next/image';

export function SideNav() {
  return (
    <>
      <aside className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 w-16 bg-surface-container-lowest border border-black/10 dark:border-white/10 shadow-glow flex-col items-center py-8 gap-8 z-40">
        <a className="text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all p-2 group" href="#" title="Email">
          <Image src="/icons/email.svg" alt="Email" width={20} height={20} className="opacity-80 group-hover:opacity-100 transition-all dark:invert" />
        </a>
        <a className="text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all p-2 group" href="#" title="LinkedIn">
          <Image src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} className="opacity-80 group-hover:opacity-100 transition-all dark:invert" />
        </a>
        <a className="text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all p-2 group" href="#" title="GitHub">
          <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} className="opacity-80 group-hover:opacity-100 transition-all dark:invert" />
        </a>
        <div className="h-12 w-[1px] bg-white/10 mt-4"></div>
        <div className="rotate-90 origin-center whitespace-nowrap font-code-sm text-code-sm text-on-surface-variant/40 mt-8">
          Connect
        </div>
      </aside>

    </>
  );
}
