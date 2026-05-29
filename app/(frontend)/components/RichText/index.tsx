import React from 'react'

type LexicalNode = {
  type: string
  version: number
  children?: LexicalNode[]
  text?: string
  format?: number
  tag?: string
  listType?: 'number' | 'bullet'
  value?: any // for upload/media
  url?: string
  newTab?: boolean
}

const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_UNDERLINE = 8
const IS_CODE = 16

const serialize = (children?: LexicalNode[]): React.ReactNode[] => {
  if (!children) return []

  return children.map((node, i) => {
    if (node.type === 'text') {
      let text: React.ReactNode = node.text

      if (node.format! & IS_BOLD) {
        text = <strong key={i}>{text}</strong>
      }
      if (node.format! & IS_ITALIC) {
        text = <em key={i}>{text}</em>
      }
      if (node.format! & IS_UNDERLINE) {
        text = <u key={i}>{text}</u>
      }
      if (node.format! & IS_STRIKETHROUGH) {
        text = <span key={i} className="line-through">{text}</span>
      }
      if (node.format! & IS_CODE) {
        text = <code key={i} className="bg-primary/10 text-primary px-1 rounded">{text}</code>
      }

      return <React.Fragment key={i}>{text}</React.Fragment>
    }

    if (!node) return null

    console.log(node.type, node)

    switch (node.type) {
      case 'heading': {
        const Tag = node.tag as React.ElementType

        return (
          <Tag
            key={i}
            className="font-display font-bold uppercase tracking-tight mt-12 mb-6 first:mt-0"
          >
            {serialize(node.children)}
          </Tag>
        )
      }
      case 'quote':
        return (
          <blockquote key={i} className="border-l-4 border-primary pl-8 my-12 italic text-2xl font-light text-tertiary">
            {serialize(node.children)}
          </blockquote>
        )
      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag key={i} className={`${node.listType === 'number' ? 'list-decimal' : 'list-disc'} pl-8 my-8 space-y-4`}>
            {serialize(node.children)}
          </ListTag>
        )
      case 'listitem':
        return <li key={i} className="text-tertiary">{serialize(node.children)}</li>
      case 'link':
        return (
          <a
            key={i}
            href={node.url}
            target={node.newTab ? '_blank' : undefined}
            rel={node.newTab ? 'noopener noreferrer' : undefined}
            className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
          >
            {serialize(node.children)}
          </a>
        )
      case 'upload':
        if (node.value?.url) {
          return (
            <div key={i} className="my-16 space-y-4">
              <div className="aspect-video overflow-hidden border border-black/10 dark:border-white/10">
                <img src={node.value.url} alt={node.value.alt || ''} className="w-full h-full object-cover grayscale" />
              </div>
              {node.value.alt && <p className="text-center text-xs font-code-sm text-tertiary uppercase tracking-widest">{node.value.alt}</p>}
            </div>
          )
        }
        return null
      default:
        return <p key={i} className="leading-loose mb-6 last:mb-0">{serialize(node.children)}</p>
    }
  })
}

export const RichText = ({ content }: { content: any }) => {
  if (!content) return null

  return (
    <div className="rich-text-content prose prose-xl dark:prose-invert max-w-none">
      {serialize(content.root?.children)}
    </div>
  )
}
