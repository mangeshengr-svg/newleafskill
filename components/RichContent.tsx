import React from 'react';
import Link from 'next/link';

interface RichContentProps {
  content: string;
  className?: string;
}

/**
 * Parses text into inline React nodes supporting:
 * - Subheadings: lines starting with ### or ##
 * - Markdown links: [anchor text](https://url)
 * - Raw URLs: http://... or https://...
 * - Bold: **text**
 * - Italic: *text*
 */
export function renderRichText(text: string) {
  // Pattern matching:
  // 1. Markdown link: [text](url)
  // 2. Bold text: **text**
  // 3. Raw URLs: https?://[^\s]+
  const tokenRegex = /(\[[^\]]+\]\([^\)]+\)|\*\*[^*]+\*\*|https?:\/\/[^\s<>"']+)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Match Markdown Link [text](url)
    const mdLinkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (mdLinkMatch) {
      const linkText = mdLinkMatch[1];
      const linkUrl = mdLinkMatch[2];
      const isInternal = linkUrl.startsWith('/') || linkUrl.startsWith('#');

      if (isInternal) {
        return (
          <Link
            key={index}
            href={linkUrl}
            className="text-emerald-700 font-bold underline decoration-emerald-400 underline-offset-2 hover:text-emerald-900 transition-colors"
          >
            {linkText}
          </Link>
        );
      }
      return (
        <a
          key={index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 font-bold underline decoration-emerald-400 underline-offset-2 hover:text-emerald-900 transition-colors inline-flex items-center gap-0.5"
        >
          <span>{linkText}</span>
          <span className="text-[10px]">↗</span>
        </a>
      );
    }

    // Match Bold **text**
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={index} className="font-extrabold text-slate-900">
          {boldMatch[1]}
        </strong>
      );
    }

    // Match Raw URL
    if (part.startsWith('http://') || part.startsWith('https://')) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 font-semibold underline decoration-emerald-400 underline-offset-2 hover:text-emerald-900 break-all transition-colors inline-flex items-center gap-0.5"
        >
          <span>{part}</span>
          <span className="text-[10px]">↗</span>
        </a>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

/**
 * Component to render a full block/paragraph of rich content
 * If a block starts with ### or ##, it renders as a subheading (<h3> or <h4>)
 */
export default function RichContent({ content, className = '' }: RichContentProps) {
  if (!content) return null;

  const trimmed = content.trim();

  // Check for H2
  if (trimmed.startsWith('## ')) {
    return (
      <h3 className={`text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-5 mb-2 flex items-center gap-2 ${className}`}>
        <span className="w-1.5 h-4 rounded-full bg-emerald-500 inline-block"></span>
        <span>{trimmed.substring(3)}</span>
      </h3>
    );
  }

  // Check for H3
  if (trimmed.startsWith('### ')) {
    return (
      <h4 className={`text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-4 mb-1.5 flex items-center gap-2 ${className}`}>
        <span className="w-1.5 h-3.5 rounded-full bg-emerald-500 inline-block"></span>
        <span>{trimmed.substring(4)}</span>
      </h4>
    );
  }

  return (
    <p className={`leading-relaxed ${className}`}>
      {renderRichText(content)}
    </p>
  );
}
