"use client";
import React, { useEffect, useState } from 'react';
import TestimonialsCarousel from "./TestimonialsCarousel";
import Image from 'next/image';
import Link from 'next/link';

interface Testimonial {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  content: string;
  rating: number;
  createdAt: string;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface TestimonialsSectionProps {
  initialTestimonials: Testimonial[];
}

export function TestimonialsSection({ initialTestimonials }: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  return (
    <section id="testimonials" className="space-y-12 my-24 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-4">

        <div className="space-y-4">

          <div className="font-code-sm text-code-sm text-primary uppercase tracking-[0.2em]">TESTIMONIALS</div>
          <h2 className="font-display text-[40px] md:text-[64px] font-bold text-on-surface uppercase tracking-tighter leading-none">
            What People <span className="text-primary">Say</span>
          </h2>
        </div>
        <Link
          className="text-primary font-label-caps text-label-caps uppercase tracking-widest hover:underline underline-offset-8 transition-all flex items-center"
          href="/testimonials"
        >
          Explore full archive <Image src="/icons/back.svg" alt="Right Arrow" width={18} height={15} className="ml-2 rotate-180 dark:invert" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-8 items-start">
        {/* Testimonials List */}
        <div className="md:col-span-8 space-y-6">
          {testimonials.length === 0 ? (
            <div className="glass-panel p-8 rounded-xl text-center text-on-surface-variant font-body-md">
              No testimonials yet. Be the first to leave one!
            </div>
          ) : (
            <TestimonialsCarousel testimonials={testimonials} />
          )}
        </div>

      </div>
    </section>
  );
}
