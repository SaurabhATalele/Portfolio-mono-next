import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import {
  JSXConvertersFunction,
  RichText as PayloadRichText,
} from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { ShareActions } from '../../components/ShareActions'
import { CodeBlock } from '../../components/CodeBlock'



// ISR: revalidate every 60 seconds
export const revalidate = 21600;

// Generate static params for all blog slugs
export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const posts = await payload.find({
    collection: 'blogs',
    depth: 0,
  });
  return posts.docs.map((post: any) => ({ slug: post.slug }));
}

// Generate SEO Metadata for Next.js
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'blogs',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
  })

  const post = posts.docs[0]
  if (!post) {
    return {}
  }

  const title = post.meta?.title || `${post.title} | Saurabh Talele`
  const description = post.meta?.description || post.excerpt || ''
  const imageUrl = post.meta?.image && typeof post.meta.image === 'object' ? post.meta.image.url : null

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  }
}

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  blocks: {
    code: ({ node }: { node: any }) => {
      const { code, language, filename } = node.fields;
      return (
        <CodeBlock
          code={code}
          language={language}
          filename={filename}
        />
      )
    },
  },

  // HEADINGS
  heading: ({ node, nodesToJSX }) => {
    const tag = node.tag
    const baseClasses = "font-display font-bold uppercase tracking-tight mt-12 mb-6 first:mt-0"
    const children = nodesToJSX({ nodes: node.children })

    switch (tag) {
      case 'h1':
        return <h1 className={`${baseClasses} text-3xl md:text-5xl text-zinc-950 dark:text-white leading-tight`}>{children}</h1>
      case 'h2':
        return <h2 className={`${baseClasses} text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100`}>{children}</h2>
      case 'h3':
        return <h3 className={`${baseClasses} text-xl md:text-2xl text-zinc-900 dark:text-zinc-100`}>{children}</h3>
      default:
        return <h4 className={`${baseClasses} text-lg md:text-xl text-zinc-900 dark:text-zinc-100`}>{children}</h4>
    }
  },

  // PARAGRAPH
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    return <p className="text-lg leading-relaxed text-tertiary mb-8">{children}</p>
  },

  // LINK
  link: ({ node, nodesToJSX }) => {
    const url = node.fields?.url || '#'
    const children = nodesToJSX({ nodes: node.children })
    return (
      <a
        href={url}
        target={node.fields?.newTab ? "_blank" : undefined}
        rel={node.fields?.newTab ? "noopener noreferrer" : undefined}
        className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
      >
        {children}
      </a>
    )
  },

  // QUOTE
  quote: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    return (
      <blockquote className="border-l-4 border-primary pl-8 my-12 italic text-2xl font-light text-tertiary">
        {children}
      </blockquote>
    )
  },

  // UNORDERED LIST
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    if (node.listType === 'number') {
      return <ol className="list-decimal pl-8 my-8 space-y-3 text-tertiary">{children}</ol>
    }
    return <ul className="list-disc pl-8 my-8 space-y-3 text-tertiary">{children}</ul>
  },

  // LIST ITEM
  listitem: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    return <li className="text-lg leading-relaxed">{children}</li>
  },

  // TEXT FORMATTING (Bold, Italic, etc.)
  text: ({ node }) => {
    let text: React.ReactNode = (node as any).text

    if ((node as any).format & 1) text = <strong key="bold">{text}</strong>
    if ((node as any).format & 2) text = <em key="italic">{text}</em>
    if ((node as any).format & 8) text = <u key="underline">{text}</u>
    if ((node as any).format & 16) text = <code key="code" className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono text-sm">{text}</code>

    return <React.Fragment>{text}</React.Fragment>
  },



  // UPLOAD (Images inside text)
  upload: ({ node }) => {
    if ((node as any).value?.url) {
      return (
        <figure className="my-16 space-y-4">
          <div className="aspect-video overflow-hidden border border-black/10 dark:border-white/10">
            <img src={(node as any).value.url} alt={(node as any).value.alt || ''} className="w-full h-full object-cover transition-all duration-700" />
          </div>
          {(node as any).value.alt && <figcaption className="text-center text-xs font-code-sm text-tertiary uppercase tracking-widest">{(node as any).value.alt}</figcaption>}
        </figure>
      )
    }
    return null
  },
})

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'blogs',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
  })

  const post = posts.docs[0]

  if (!post) {
    return notFound()
  }


  return (
    <article className="min-h-screen pb-32">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden bg-black">
        {post.image && typeof post.image === 'object' && (
          <img
            src={post.image.url || ''}
            alt={post.image.alt || post.title}
            className="w-full h-[50vh] object-cover opacity-60 grayscale scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

        <div className="absolute top-20 left-0 w-full p-6 md:p-24 max-w-[1200px] mx-auto right-0">
          <div className="space-y-6 max-w-[800px]">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 font-code-sm text-xs text-primary uppercase tracking-widest hover:gap-4 transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                <path d="M4.16663 10H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.8333 5L15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Archive
            </Link>

            <h1 className="font-display text-[40px] md:text-[60px] font-bold leading-tight uppercase tracking-tighter text-on-surface">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <div className="font-code-sm text-[10px] text-tertiary uppercase tracking-widest">Published</div>
                <div className="text-sm font-medium">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              </div>
              {/* <div className="space-y-1">
                <div className="font-code-sm text-[10px] text-tertiary uppercase tracking-widest">Reading Time</div>
                <div className="text-sm font-medium">5 min read</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-24 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {post.excerpt && (
              <p className="text-2xl font-light leading-relaxed text-tertiary italic border-l-4 border-primary pl-8">
                {post.excerpt}
              </p>
            )}

            <div className="prose prose-xl dark:prose-invert max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight prose-p:text-tertiary prose-p:leading-loose">

          {post.content ? (
            <PayloadRichText data={post.content} converters={jsxConverters} />
          ) : (
            <PayloadRichText data={{
              root: {
                type: 'root',
                children: [],
                direction: null,
                format: '',
                indent: 0,
                version: 1,
              },
            }} converters={jsxConverters} />
          )}


            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="p-8 bg-surface-container border border-black/5 dark:border-white/5 space-y-6">
              <h3 className="font-display text-xl font-bold uppercase tracking-tight">Share Article</h3>
              <div className="flex gap-4">
                <ShareActions title={post.title} slug={post.slug} />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold uppercase tracking-tight">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags && post.tags.length > 0 ? post.tags.map((tag: any) => (
                  <span key={tag.id} className="px-3 py-1 bg-black/5 dark:bg-white/5 text-[10px] font-code-lg uppercase tracking-widest text-tertiary">
                    {tag.name}
                  </span>
                )) : 'No tags found'}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}