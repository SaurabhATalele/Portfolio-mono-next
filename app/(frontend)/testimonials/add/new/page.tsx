// "use client" ensures this component runs on the client side.
"use client";

import React, { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

export default function AddTestimonialPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch session on client side
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch((err) => console.error("Error fetching session:", err))
      .finally(() => setLoadingSession(false));
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/auth/google/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/auth/google/logout";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Please write some feedback.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonials/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, rating }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit testimonial");
      }
      // On success, redirect back to home or show success message
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto py-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-6">
        Leave a Testimonial
      </h1>
      {loadingSession ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-primary/20" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                {user.name.charAt(0)}
              </div>
            )}
            <span className="text-xs text-on-surface font-semibold">{user.name}</span>
            <button type="button" onClick={handleLogout} className="ml-auto text-xs text-error hover:underline bg-transparent border-none cursor-pointer">
              Logout
            </button>
          </div>
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
                    className={`w-6 h-6 ${star <= rating ? "text-primary fill-primary" : "text-on-surface-variant/20"}`}
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
          <div className="space-y-2">
            <label className="text-xs font-label-caps text-on-surface-variant uppercase tracking-wider block">Your Review</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              maxLength={200}
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
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      ) : (
        <div className="space-y-4 text-center py-4">
          <p className="text-on-surface-variant text-body-md leading-relaxed">
            Sign in with Google to share your experience and add a testimonial directly to the page.
          </p>
          <button onClick={handleLogin} className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 text-neutral-800 font-medium py-3 px-4 rounded-lg border border-neutral-300 transition-all duration-300 active:scale-95 shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.9-2.7 3.42-4.51 6.76-4.51z" />
              <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.12 2.74-2.38 3.58l3.69 2.87c2.16-1.99 3.42-4.93 3.42-8.6z" />
              <path fill="#FBBC05" d="M5.24 14.54c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.39 6.95C.5 8.75 0 10.77 0 12.87s.5 4.12 1.39 5.92l3.85-4.25z" />
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.69-2.87c-1.02.68-2.33 1.09-3.96 1.09-3.34 0-6.17-2.18-7.18-5.12L1.28 17.43C3.24 21.3 7.29 23 12 23z" />
            </svg>
            <span className="font-semibold text-sm">Sign in with Google</span>
          </button>
        </div>
      )}
    </section>
  );
}
