"use client";

import React from "react";

interface Testimonial {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  content: string;
  rating: number;
  createdAt: string;
  approved?: boolean;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}



export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { name, avatar, content, createdAt } = testimonial;
  return (
    <div className="min-w-[280px] max-w-[320px] h-[320px] snap-start flex-shrink-0">
      <div className="glass-panel p-6 rounded-xl space-y-4 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between h-full">
        <div className="space-y-2 h-full">
          <p className="text-on-surface-variant text-body-md italic leading-relaxe">
            “{content}”
          </p>
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          {avatar ? (
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover border border-primary/20" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
              {name.charAt(0)}
            </div>
          )}
          <div>
            <div className="font-bold text-on-surface text-body-md">{name}</div>
            <div className="text-xs text-on-surface-variant/60">
              {new Date(createdAt).toLocaleDateString("en-IN")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
