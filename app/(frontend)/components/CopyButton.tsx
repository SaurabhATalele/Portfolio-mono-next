'use client';
import { useState } from 'react';

export default function CopyButton({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute top-3 right-3 z-10 px-2 py-1 text-xs rounded-md bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
        >
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
}