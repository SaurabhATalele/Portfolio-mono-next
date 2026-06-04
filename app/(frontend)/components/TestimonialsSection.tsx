"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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
  const [user, setUser] = useState<User | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  
  // Form State
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch session
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(err => console.error("Error fetching session:", err))
      .finally(() => setLoadingSession(false));
  }, []);

  const handleLogin = () => {
    window.location.href = '/api/auth/google/login';
  };

  const handleLogout = () => {
    window.location.href = '/api/auth/google/logout';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Please write some feedback.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/testimonials/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, rating }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit testimonial');
      }

      // Add new testimonial to local list
      if (data.testimonial) {
        setTestimonials(prev => [data.testimonial, ...prev]);
        setContent('');
        setRating(5);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="space-y-12 my-24 scroll-mt-20">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="font-code-sm text-code-sm text-primary uppercase tracking-[0.2em]">TESTIMONIALS</div>
        <h2 className="font-display text-[40px] md:text-[64px] font-bold text-on-surface uppercase tracking-tighter leading-none">
          What People <span className="text-primary">Say</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Testimonials List */}
        <div className="md:col-span-8 space-y-6">
          {testimonials.length === 0 ? (
            <div className="glass-panel p-8 rounded-xl text-center text-on-surface-variant font-body-md">
              No testimonials yet. Be the first to leave one!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="glass-panel p-6 rounded-xl space-y-4 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < t.rating ? 'text-primary fill-primary' : 'text-on-surface-variant/20'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    {/* Content */}
                    <p className="text-on-surface-variant text-body-md italic leading-relaxed">
                      &ldquo;{t.content}&rdquo;
                    </p>
                  </div>

                  {/* Author details */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border border-primary/20"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-on-surface text-body-md">{t.name}</div>
                      <div className="text-xs text-on-surface-variant/60">{t.email}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action / Creation Tile */}
        <div className="md:col-span-4 sticky top-24">
          <div className="glass-panel p-6 rounded-xl space-y-6 border border-white/10 shadow-glow">
            <h3 className="font-display text-xl font-bold text-on-surface uppercase tracking-tight">
              Leave a Testimonial
            </h3>

            {loadingSession ? (
              <div className="h-40 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : user ? (
              /* Submission Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-primary/25" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-xs text-on-surface font-semibold">{user.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-xs text-error hover:underline bg-transparent border-none cursor-pointer"
                  >
                    Logout
                  </button>
                </div>

                {/* Rating Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-label-caps text-on-surface-variant uppercase tracking-wider block">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none transition-transform active:scale-95 bg-transparent border-none cursor-pointer"
                      >
                        <svg
                          className={`w-6 h-6 ${star <= rating ? 'text-primary fill-primary' : 'text-on-surface-variant/20'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Content */}
                <div className="space-y-2">
                  <label className="text-xs font-label-caps text-on-surface-variant uppercase tracking-wider block">Your Review</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    placeholder="Tell us what you think..."
                    className="w-full p-3 rounded-lg bg-surface/50 border border-white/10 text-on-surface focus:border-primary focus:outline-none transition-all duration-300 resize-none font-body-md text-sm"
                  />
                </div>

                {error && <p className="text-xs text-error">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-wider py-3 hover:opacity-90 active:scale-95 transition-all text-center whitespace-nowrap disabled:opacity-50 disabled:scale-100"
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            ) : (
              /* Google Login Action */
              <div className="space-y-4 text-center py-4">
                <p className="text-on-surface-variant text-body-md leading-relaxed">
                  Sign in with Google to share your experience and add a testimonial directly to the page.
                </p>
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 text-neutral-800 font-medium py-3 px-4 rounded-lg border border-neutral-300 transition-all duration-300 active:scale-95 shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.9-2.7 3.42-4.51 6.76-4.51z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.12 2.74-2.38 3.58l3.69 2.87c2.16-1.99 3.42-4.93 3.42-8.6z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.24 14.54c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.39 6.95C.5 8.75 0 10.77 0 12.87s.5 4.12 1.39 5.92l3.85-4.25z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.69-2.87c-1.02.68-2.33 1.09-3.96 1.09-3.34 0-6.17-2.18-7.18-5.12L1.28 17.43C3.24 21.3 7.29 23 12 23z"
                    />
                  </svg>
                  <span className="font-semibold text-sm">Sign in with Google</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
