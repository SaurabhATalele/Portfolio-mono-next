"use client"

import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const CodeBlock = ({ code, filename, language }: { code: string, filename: string, language: string }) => {
    return (
        <div className="my-10 overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d1117] ">
            {/* Header */}
            <div className="flex rounded-t-xl items-center justify-between border-b border-zinc-800 px-4 py-3"
            >
                <span className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300">
                    {filename}
                </span>

                <button
                    onClick={() => { navigator.clipboard.writeText(code); }}
                    className="rounded-md p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                    <Image src="/icons/copy.svg" alt="Copy" width={24} height={24} className={'invert-[1]'} />
                </button>
            </div>

            {/* Code */}
            <SyntaxHighlighter
                language={language}
                style={dracula}
                showLineNumbers
                customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    padding: '1.5rem',
                    background: '#0d1117',
                    fontSize: '14px',
                }}
                codeTagProps={{
                    style: {
                        fontFamily:
                            'JetBrains Mono, Fira Code, Consolas, monospace',
                    },
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}