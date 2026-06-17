"use client";

import React, { useEffect, useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard";

interface Testimonial {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  content: string;
  rating: number;
  createdAt: string;
  position?: string;
  organization?: string;
  approved?: boolean;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  const approvedTestimonials = testimonials.filter(
    (t) => t.approved !== false
  );

  const updateScrollState = () => {
    const container = containerRef.current;

    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowArrows(scrollWidth > clientWidth);
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    updateScrollState();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(updateScrollState);

    resizeObserver.observe(container);
    container.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [approvedTestimonials.length]);

  // Auto-scroll carousel every 5 seconds
  useEffect(() => {
    if (!containerRef.current) return;
    const startAutoScroll = () => {
      autoScrollRef.current = window.setInterval(() => {
        if (canScrollRight) {
          scroll('right');
        } else if (canScrollLeft) {
          scroll('left');
        }
      }, 5000);
    };
    startAutoScroll();
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [canScrollRight, canScrollLeft, approvedTestimonials.length]);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;

    containerRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  if (approvedTestimonials.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-xl text-center text-on-surface-variant font-body-md">
        No testimonials yet. Be the first to leave one!
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide py-4"
        style={{ scrollPadding: "0 2rem" }}
        onMouseEnter={() => {
          if (autoScrollRef.current) clearInterval(autoScrollRef.current);
        }}
        onMouseLeave={() => {
          if (autoScrollRef.current) clearInterval(autoScrollRef.current);
          // restart auto-scrolling after hover
          autoScrollRef.current = window.setInterval(() => {
            if (canScrollRight) scroll('right');
            else if (canScrollLeft) scroll('left');
          }, 5000);
        }}
      >
        {approvedTestimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>

      {showArrows && canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          aria-label="Previous testimonials"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-colors hidden md:flex z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {showArrows && canScrollRight && (
        <button
          onClick={() => scroll("right")}
          aria-label="Next testimonials"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-colors hidden md:flex z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}