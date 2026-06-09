const fs = require('fs');

const pageContent = fs.readFileSync('src/app/page.tsx', 'utf8');

// Extract header
const headerMatch = pageContent.match(/<header[^>]*>([\s\S]*?)<\/header>/);
let headerHtml = headerMatch ? `<header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 py-4 bg-background/80 backdrop-blur-md border-b border-border/50">\n${headerMatch[1]}\n</header>` : '';

// Extract footer
const footerMatch = pageContent.match(/<footer[^>]*>([\s\S]*?)<\/footer>/);
let footerHtml = footerMatch ? `<footer className="relative border-t border-border/60 bg-background">\n${footerMatch[1]}\n</footer>` : '';

// Extract main
const mainMatch = pageContent.match(/<main[^>]*>([\s\S]*?)<\/main>/);
let mainHtml = mainMatch ? `<main className="flex-1">\n${mainMatch[1]}\n</main>` : '';

// Helper to replace <a> with <Link>
function replaceLinks(html) {
  return html.replace(/<a([^>]*)href="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (match, p1, href, p2, content) => {
    // skip external links if any
    if (href.startsWith('http')) return match;
    return `<Link${p1}href="${href}"${p2}>${content}</Link>`;
  });
}

// Write Navbar.tsx
const navbarCode = `
'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    ${replaceLinks(headerHtml).replace(
      /<button type="button" aria-label="Switch to dark mode"[^>]*>([\s\S]*?)<\/button>/,
      `<button type="button" aria-label="Switch to dark mode" className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-border bg-background/60 backdrop-blur transition-colors hover:border-primary/40 hover:bg-accent" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {mounted && (
          <span className="text-primary" style={{opacity:1, transform:'none'}}>
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon h-5 w-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun h-5 w-5"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
            )}
          </span>
        )}
      </button>`
    )}
  );
}
`;
fs.writeFileSync('src/components/Navbar.tsx', navbarCode);

// Write Footer.tsx
const footerCode = `
import Link from 'next/link';

export default function Footer() {
  return (
    ${replaceLinks(footerHtml)}
  );
}
`;
fs.writeFileSync('src/components/Footer.tsx', footerCode);

// Write new page.tsx
const newPageCode = `
import Link from 'next/link';

export default function Home() {
  return (
    ${replaceLinks(mainHtml)}
  );
}
`;
fs.writeFileSync('src/app/page.tsx', newPageCode);

// Create placeholder pages
const pages = ['platform', 'security', 'how-it-works', 'contact', 'auth'];
pages.forEach(page => {
  const dir = 'src/app/' + page;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dir + '/page.tsx', 
'export default function ' + page.replace(/-/g, '') + 'Page() {\\n' +
'  return (\\n' +
'    <div className="flex min-h-screen items-center justify-center pt-24">\\n' +
'      <h1 className="text-4xl font-bold">' + page.toUpperCase() + ' Page</h1>\\n' +
'    </div>\\n' +
'  );\\n' +
'}\\n'
  );
});
