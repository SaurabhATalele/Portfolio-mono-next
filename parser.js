const fs = require('fs');

const html = fs.readFileSync('stitch_original.html', 'utf-8');

function htmlToJsx(htmlStr) {
  return htmlStr
    .replace(/class=/g, 'className=')
    .replace(/<!--(.*?)-->/g, '{/* $1 */}')
    .replace(/<img([^>]*[^/])>/g, '<img$1 />')
    .replace(/<hr([^>]*[^/])>/g, '<hr$1 />')
    .replace(/<br([^>]*[^/])>/g, '<br$1 />')
    .replace(/<input([^>]*[^/])>/g, '<input$1 />')
    .replace(/style="([^"]*)"/g, (match, styleStr) => {
        // basic style string to object converter (not full-proof, but works for simple cases)
        const styleObj = styleStr.split(';').filter(Boolean).map(s => {
            const [k, v] = s.split(':');
            if(!k || !v) return '';
            const key = k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            return `${key}: "${v.trim()}"`;
        }).filter(Boolean).join(', ');
        return `style={{${styleObj}}}`;
    });
}

const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (!bodyMatch) {
  console.log("No body found");
  process.exit(1);
}

let bodyContent = htmlToJsx(bodyMatch[1]);

// Split into Header, Hero, Stats, Ecosystem, Experience, Featured Works, CTA, Footer
// Based on the HTML comments
function extractSection(name, content, startComment, endComment) {
    const startIndex = content.indexOf(`{/* ${startComment} */}`);
    const endIndex = endComment ? content.indexOf(`{/* ${endComment} */}`) : content.indexOf('</main>');
    if (startIndex === -1 || endIndex === -1) return null;
    return content.substring(startIndex, endIndex);
}

const headerContent = contentMatch => {
    const start = contentMatch.indexOf('{/* TopAppBar */}');
    const end = contentMatch.indexOf('{/* SideNavBar (Sticky Desktop Only) */}');
    return contentMatch.substring(start, end);
};

const sideNavContent = contentMatch => {
    const start = contentMatch.indexOf('{/* SideNavBar (Sticky Desktop Only) */}');
    const end = contentMatch.indexOf('<main');
    return contentMatch.substring(start, end);
};

// I'll just write the entire converted body to a single file, and then I can manually split it, or use it directly as page.tsx for now to get exactly the layout. Wait, user said "make it into different files for different sections also add a theme toggle for light and dark theme". So I need to split it.

const sections = {
    Header: headerContent(bodyContent),
    SideNav: sideNavContent(bodyContent),
    Hero: extractSection('Hero', bodyContent, 'Hero Section', 'Stats Grid'),
    Stats: extractSection('Stats', bodyContent, 'Stats Grid', 'Technical Ecosystem'),
    Ecosystem: extractSection('Ecosystem', bodyContent, 'Technical Ecosystem', 'Experience Section (Timeline)'),
    Experience: extractSection('Experience', bodyContent, 'Experience Section (Timeline)', 'Bento Projects Grid'),
    Projects: extractSection('Projects', bodyContent, 'Bento Projects Grid', 'CTA Section'),
    CTA: extractSection('CTA', bodyContent, 'CTA Section', 'Footer'),
};

const footerStart = bodyContent.indexOf('{/* Footer */}');
sections.Footer = bodyContent.substring(footerStart);

for (const [key, val] of Object.entries(sections)) {
    if (!val) continue;
    let componentCode = `import React from 'react';\n\nexport function ${key}() {\n  return (\n    <>\n      ${val}\n    </>\n  );\n}\n`;
    // Write to file
    fs.writeFileSync(`app/components/${key}.tsx`, componentCode);
}

console.log("Extracted components.");
