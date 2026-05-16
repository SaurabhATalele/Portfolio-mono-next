import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function BlogsPage() {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'blogs',
    depth: 1,
  })

  return (
    <main className="max-w-[1200px] mx-auto px-6 py-32 md:px-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="space-y-4">
          <div className="font-code-sm text-sm text-primary uppercase tracking-[0.3em]">
            Journal & Insights
          </div>
          <h1 className="font-display text-[56px] md:text-[80px] font-bold leading-none uppercase tracking-tighter">
            The <span className="text-primary italic">Archive</span>
          </h1>
        </div>
        <p className="max-w-[400px] text-tertiary text-lg font-light leading-relaxed">
          Exploring the intersection of architectural design, creative coding, and digital experiences.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.docs.map((post: any) => (
          <Link 
            key={post.id} 
            href={`/blogs/${post.slug}`} 
            className="group relative flex flex-col h-full bg-surface-container border border-black/10 dark:border-white/10 overflow-hidden transition-all duration-500 hover:border-primary/50"
          >
            <div className="aspect-[16/10] overflow-hidden bg-black/5 dark:bg-white/5">
              {post.image && typeof post.image === 'object' && (
                <img 
                  src={post.image.url} 
                  alt={post.image.alt || post.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              )}
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-4 mb-4">
                <span className="w-8 h-[1px] bg-primary/30"></span>
                <span className="font-code-sm text-[10px] text-tertiary uppercase tracking-widest">
                  {new Date(post.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {post.title}
              </h2>
              
              <p className="text-tertiary font-light line-clamp-3 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                <span className="font-code-sm text-xs text-primary uppercase tracking-[0.2em]">Read More</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                  <path d="M4.16663 10H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.8333 5L15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.docs.length === 0 && (
        <div className="py-32 text-center border border-dashed border-black/10 dark:border-white/10">
          <p className="text-tertiary font-code-sm uppercase tracking-widest">No articles found in the archive.</p>
        </div>
      )}
    </main>
  )
}
