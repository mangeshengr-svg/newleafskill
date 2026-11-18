import React from 'react';
import Link from 'next/link';

interface RichTextRendererProps {
  content: string | string[];
  className?: string;
}

/**
 * Parses inline formatting like markdown links [text](url) and <strong> tags
 */
function renderInlineContent(text: string): React.ReactNode {
  // Pattern to match [link text](url) or standard HTML tags if present
  // We match markdown links: [label](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    const textBefore = text.substring(lastIndex, match.index);
    if (textBefore) {
      parts.push(renderTextWithBold(textBefore, `pre-${match.index}`));
    }

    const label = match[1];
    const url = match[2];
    const isInternal = url.startsWith('/') || url.includes('localhost') || url.includes('newleafskills.com');

    if (isInternal) {
      // Normalize internal URL if it has full newleafskills domain
      const targetUrl = url.replace(/^https?:\/\/(www\.)?newleafskills\.com/, '') || '/';
      parts.push(
        <Link
          key={`link-${match.index}`}
          href={targetUrl}
          className="text-emerald-700 hover:text-emerald-800 font-semibold underline decoration-emerald-500/50 hover:decoration-emerald-700 underline-offset-2 transition-colors inline"
        >
          {label}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={`link-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 hover:text-emerald-800 font-semibold underline decoration-emerald-500/50 hover:decoration-emerald-700 underline-offset-2 transition-colors inline"
        >
          {label}
        </a>
      );
    }

    lastIndex = linkRegex.lastIndex;
  }

  const textAfter = text.substring(lastIndex);
  if (textAfter) {
    parts.push(renderTextWithBold(textAfter, `post-${lastIndex}`));
  }

  return parts.length > 0 ? parts : text;
}

/**
 * Handles **bold text** and <strong>bold text</strong> inside strings
 */
function renderTextWithBold(text: string, keyPrefix: string): React.ReactNode {
  // Match **bold** or <strong>bold</strong>
  const boldRegex = /(\*\*([^*]+)\*\*|<strong>([\s\S]*?)<\/strong>|<b>([\s\S]*?)<\/b>)/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = boldRegex.exec(text)) !== null) {
    const before = text.substring(lastIndex, match.index);
    if (before) {
      elements.push(before);
    }
    const boldText = match[2] || match[3] || match[4];
    elements.push(
      <strong key={`${keyPrefix}-b-${match.index}`} className="font-bold text-slate-900">
        {boldText}
      </strong>
    );
    lastIndex = boldRegex.lastIndex;
  }

  const remaining = text.substring(lastIndex);
  if (remaining) {
    elements.push(remaining);
  }

  return elements.length > 0 ? elements : text;
}

export default function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  // If array of paragraphs or headings
  const blocks: string[] = Array.isArray(content)
    ? content
    : (typeof content === 'string' ? content.split(/\n\s*\n/) : []);

  if (blocks.length === 0) return null;

  return (
    <div className={`space-y-5 text-slate-700 leading-relaxed ${className}`}>
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Check for Markdown headings #, ##, ###, ####
        const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
        if (headingMatch) {
          const level = headingMatch[1].length;
          const headingText = headingMatch[2];

          switch (level) {
            case 1:
              return (
                <h1
                  key={idx}
                  className="font-outfit text-2xl sm:text-3xl font-black text-slate-900 tracking-tight pt-4 pb-1 border-b border-slate-100"
                >
                  {renderInlineContent(headingText)}
                </h1>
              );
            case 2:
              return (
                <h2
                  key={idx}
                  className="font-outfit text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight pt-4 pb-1"
                >
                  {renderInlineContent(headingText)}
                </h2>
              );
            case 3:
              return (
                <h3
                  key={idx}
                  className="font-outfit text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-3"
                >
                  {renderInlineContent(headingText)}
                </h3>
              );
            case 4:
            default:
              return (
                <h4
                  key={idx}
                  className="font-outfit text-base sm:text-lg font-bold text-slate-800 tracking-tight pt-2"
                >
                  {renderInlineContent(headingText)}
                </h4>
              );
          }
        }

        // Check for HTML headings <h1..6>...</h1>
        const htmlHeadingMatch = trimmed.match(/^<(h[1-6])(?:\s+[^>]*)?>([\s\S]*?)<\/\1>$/i);
        if (htmlHeadingMatch) {
          const tag = htmlHeadingMatch[1].toLowerCase();
          const innerHtml = htmlHeadingMatch[2];
          if (tag === 'h1' || tag === 'h2') {
            return (
              <h2
                key={idx}
                className="font-outfit text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight pt-4 pb-1"
                dangerouslySetInnerHTML={{ __html: innerHtml }}
              />
            );
          }
          if (tag === 'h3') {
            return (
              <h3
                key={idx}
                className="font-outfit text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-3"
                dangerouslySetInnerHTML={{ __html: innerHtml }}
              />
            );
          }
          return (
            <h4
              key={idx}
              className="font-outfit text-base sm:text-lg font-bold text-slate-800 tracking-tight pt-2"
              dangerouslySetInnerHTML={{ __html: innerHtml }}
            />
          );
        }

        // Check if block contains raw HTML tags (like <a href="..."> or <strong>)
        if (/<(a|p|strong|em|span|ul|ol|li)\b[^>]*>/i.test(trimmed)) {
          return (
            <div
              key={idx}
              className="rich-text-content leading-relaxed text-justify [&_a]:text-emerald-700 [&_a]:hover:text-emerald-800 [&_a]:font-semibold [&_a]:underline [&_a]:decoration-emerald-500/50 [&_a]:hover:decoration-emerald-700 [&_strong]:text-slate-900 [&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: trimmed }}
            />
          );
        }

        // Normal paragraph with markdown support (links and bold)
        return (
          <p key={idx} className="leading-relaxed text-justify">
            {renderInlineContent(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

