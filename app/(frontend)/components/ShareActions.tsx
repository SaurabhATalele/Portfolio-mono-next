'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface ShareActionsProps {
  title: string
  slug: string
}

export const ShareActions: React.FC<ShareActionsProps> = ({ title, slug }) => {
  const [copied, setCopied] = useState(false)
  
  // Base URL would typically come from an env var in production
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const shareUrl = `${baseUrl}/blogs/${slug}`

  const handleShare = (platform: string) => {
    let url = ''
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`
        window.open(url, '_blank', 'noreferrer')
        break
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        window.open(url, '_blank', 'noreferrer')
        break
      case 'copy':
        navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
  }

  return (
    <div className="flex gap-4">
      {[
        { id: 'twitter' },
        { id: 'linkedin' },
        { id: 'copy', label: copied ? 'Copied!' : 'Copy Link' }
      ].map((platform) => (
        <button 
          key={platform.id} 
          onClick={() => handleShare(platform.id)}
          className={`px-4 py-2 border border-black/10 dark:border-white/10 text-[10px] font-code-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-2
            ${platform.id === 'copy' && copied ? 'bg-primary text-on-primary' : 'hover:bg-primary hover:text-on-primary'}`}
        >
          <Image 
            src={`/icons/${platform.id}.svg`} 
            alt={platform.id} 
            width={16} 
            height={16} 
            className={`transition-all ${platform.id === 'copy' && copied ? 'invert' : 'invert-0 dark:invert group-hover:invert'}`} 
          />
          <span className="hidden md:inline">{platform.label}</span>
        </button>
      ))}
    </div>
  )
}
