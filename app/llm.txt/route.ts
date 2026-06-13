export const runtime = "edge";

export async function GET() {
  const body = `
# Saurabh Talele - FUll Stack Developer

> Modern portfolio website built with Next.js App Router, Tailwind CSS, and Payload CMS. Designed for high-performance, accessible front-end storytelling with content management and polished UI components.

## About
Saurabh Talele is a full-stack developer with expertise in building modern web applications. His portfolio showcases a range of projects, blog content, and testimonials in a premium glassmorphism layout, with performance-focused rendering, reusable UI components, and CMS-backed content. The site includes a blog RSS feed and structured pages for portfolio presentation and client feedback.

## Skills / Tech
- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS, Client/Server Components
- CMS / Data: Payload CMS, API routes, RSS feed generation
- UX / Performance: Responsive design, smooth animations, accessibility, caching headers
- Tools: Bun, Git, ESLint, Payload CMS, Vercel-friendly configuration

## Pages
- Home — Portfolio overview, hero section, featured projects, and testimonials
- Projects — Project case studies and detailed work highlights
- Blog — Articles and write-ups with blog page rendering
- Testimonials — Approved testimonial feed with carousel and list view
- Admin — Payload CMS dashboard for managing content, media, and testimonials
- RSS — Auto-generated RSS feed for blog syndication

## Selected Features
- Reusable TestimonialCard used across carousel and testimonials pages
- Auto-scrolling testimonials carousel with manual controls and approval logic
- Blog section with RSS support and clean content presentation
- Payload CMS integration for managing testimonials and content
- High-performance, accessible UI with Tailwind and modern Next.js patterns

## Notes
- Built for developer portfolios needing a content-backed site with CMS editing
- Ideal for showcasing projects, blog posts, and testimonials in one polished application`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
