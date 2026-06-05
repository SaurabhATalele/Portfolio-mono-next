// app/components/CodeBlock.tsx
import { codeToHtml } from 'shiki';
import CopyButton from './CopyButton';

interface CodeBlockProps {
    code: string;
    language?: string;
    theme?: string;
}

export async function CodeBlock({
    code,
    language = 'typescript',
    theme = 'one-dark-pro',

}: CodeBlockProps) {
    const html = await codeToHtml(code, {
        lang: language, theme
    });

    return (
        <div className="relative rounded-lg overflow-hidden text-sm bg-[#282A36] text-card-foreground">
            <div className="flex justify-between items-center px-4 h-12 bg-card text-card-foreground border-b-1 border-light">
                <span className="text-sm font-medium text-white">{language}</span>

                <CopyButton code={code} />

            </div>
            <div className="overflow-auto bg-card text-card-foreground"
                dangerouslySetInnerHTML={{ __html: html }}
            >

            </div>
        </div>
    );
}