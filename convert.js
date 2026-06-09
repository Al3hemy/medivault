const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'lovable_raw.html'), 'utf8');

// Extract the body content (between <!--$--> and <!--/$--> or just inside <body>)
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
let bodyHtml = bodyMatch ? bodyMatch[1] : '';

// Remove the lovable badge and script tags
bodyHtml = bodyHtml.replace(/<aside id="lovable-badge"[\s\S]*?<\/aside>/, '');
bodyHtml = bodyHtml.replace(/<script[\s\S]*?<\/script>/g, '');
// Remove the specific tsr stream stuff
bodyHtml = bodyHtml.replace(/<section aria-label="Notifications[^>]*><\/section>/, '');

// Convert HTML to JSX
let jsx = bodyHtml
  .replace(/class=/g, 'className=')
  .replace(/stroke-width=/g, 'strokeWidth=')
  .replace(/stroke-linecap=/g, 'strokeLinecap=')
  .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
  .replace(/fill-rule=/g, 'fillRule=')
  .replace(/clip-rule=/g, 'clipRule=')
  .replace(/<!--.*?-->/g, '') // remove comments
  // fix inline styles
  .replace(/style="([^"]*)"/g, (match, p1) => {
    const styleObj = p1.split(';').filter(Boolean).reduce((acc, rule) => {
      const [key, value] = rule.split(':').map(s => s.trim());
      if (key && value) {
        const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        acc[camelKey] = value;
      }
      return acc;
    }, {});
    return `style={${JSON.stringify(styleObj)}}`;
  });

// Also need to close self-closing tags properly in JSX if they aren't
// like <input>, <img>, <br>, <hr>
jsx = jsx.replace(/<(img|input|br|hr)([^>]*[^\/])>/g, '<$1$2 />');

const pageContent = `
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      ${jsx}
    </>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', pageContent);
console.log('Successfully generated page.tsx');
