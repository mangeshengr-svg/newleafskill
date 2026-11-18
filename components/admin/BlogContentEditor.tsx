'use client';

import React, { useRef, useState } from 'react';

interface BlogContentEditorProps {
  initialValue?: string;
  name?: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}

export default function BlogContentEditor({
  initialValue = '',
  name = 'content',
  rows = 12,
  required = true,
  placeholder = 'Write the full article body. Use toolbar buttons above to insert subheadings (H2, H3, H4), hyperlinks, and formatting...',
}: BlogContentEditorProps) {
  const [value, setValue] = useState(initialValue);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to insert markdown or text around selection
  const insertText = (before: string, after: string = '', defaultSelection: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || defaultSelection;

    const replacement = `${before}${selected}${after}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    setValue(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    }, 0);
  };

  const insertHeading = (level: 2 | 3 | 4) => {
    const prefix = '#'.repeat(level) + ' ';
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || `Subheading Level ${level}`;

    // Add extra newlines if needed
    const needsLeadingNewline = start > 0 && value[start - 1] !== '\n';
    const leading = needsLeadingNewline ? '\n\n' : '';
    const replacement = `${leading}${prefix}${selected}\n\n`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    setValue(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + leading.length + prefix.length,
        start + leading.length + prefix.length + selected.length
      );
    }, 0);
  };

  const handleOpenLinkModal = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const selected = value.substring(textarea.selectionStart, textarea.selectionEnd);
      setLinkText(selected || '');
    }
    setLinkUrl('');
    setShowLinkModal(true);
  };

  const handleApplyLink = () => {
    if (!linkUrl) {
      alert('Please enter a URL');
      return;
    }
    const label = linkText.trim() || 'Link Text';
    const markdownLink = `[${label}](${linkUrl.trim()})`;

    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + markdownLink + value.substring(end);
      setValue(newValue);
    } else {
      setValue((prev) => prev + markdownLink);
    }

    setShowLinkModal(false);
    setLinkText('');
    setLinkUrl('');
  };

  return (
    <div className="border border-slate-300 rounded-2xl overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
      {/* Editor Top Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 sm:p-2.5 flex flex-wrap items-center justify-between gap-2">
        {/* Formatting buttons */}
        <div className="flex flex-wrap items-center gap-1">
          {/* Subheading H2 */}
          <button
            type="button"
            onClick={() => insertHeading(2)}
            title="Insert Subheading H2"
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 text-xs font-black text-slate-700 transition cursor-pointer shadow-2xs"
          >
            H2
          </button>

          {/* Subheading H3 */}
          <button
            type="button"
            onClick={() => insertHeading(3)}
            title="Insert Subheading H3"
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 text-xs font-black text-slate-700 transition cursor-pointer shadow-2xs"
          >
            H3
          </button>

          {/* Subheading H4 */}
          <button
            type="button"
            onClick={() => insertHeading(4)}
            title="Insert Subheading H4"
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 text-xs font-black text-slate-700 transition cursor-pointer shadow-2xs"
          >
            H4
          </button>

          <span className="w-[1px] h-5 bg-slate-300 mx-1" />

          {/* Hyperlink button */}
          <button
            type="button"
            onClick={handleOpenLinkModal}
            title="Insert Hyperlink"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition cursor-pointer shadow-2xs"
          >
            <span>🔗</span>
            <span>Hyperlink</span>
          </button>

          {/* Bold button */}
          <button
            type="button"
            onClick={() => insertText('**', '**', 'bold text')}
            title="Bold text"
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-black text-slate-700 transition cursor-pointer shadow-2xs"
          >
            B
          </button>

          {/* Bullet List */}
          <button
            type="button"
            onClick={() => insertText('\n• ', '', 'List item')}
            title="Bullet point"
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition cursor-pointer shadow-2xs"
          >
            • Bullet
          </button>
        </div>

        {/* Tab switch (Write / Preview) */}
        <div className="flex items-center bg-slate-200/70 p-0.5 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              activeTab === 'write'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ✍️ Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-white text-emerald-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            👁️ Live Preview
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {activeTab === 'write' ? (
        <div className="relative">
          <textarea
            ref={textareaRef}
            name={name}
            rows={rows}
            required={required}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 text-xs sm:text-sm text-slate-800 focus:outline-none font-sans leading-relaxed resize-y bg-transparent"
          />
        </div>
      ) : (
        <div className="p-6 bg-slate-50/50 min-h-[240px] max-h-[500px] overflow-y-auto border-t border-slate-100">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 pb-3 mb-3 border-b border-slate-200 flex items-center justify-between">
            <span>Live Article Preview</span>
            <span className="text-[10px] text-slate-400 font-normal">How it renders on the Single Blog Page</span>
          </div>
          {value.trim() ? (
            <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
              {value.split(/\n\s*\n/).map((paragraph, idx) => {
                const trimmed = paragraph.trim();
                const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
                if (headingMatch) {
                  const level = headingMatch[1].length;
                  const text = headingMatch[2];
                  if (level === 2) {
                    return (
                      <h2 key={idx} className="font-outfit text-xl font-bold text-slate-900 pt-3">
                        {text}
                      </h2>
                    );
                  }
                  if (level === 3) {
                    return (
                      <h3 key={idx} className="font-outfit text-lg font-bold text-slate-900 pt-2">
                        {text}
                      </h3>
                    );
                  }
                  return (
                    <h4 key={idx} className="font-outfit text-base font-bold text-slate-800 pt-1">
                      {text}
                    </h4>
                  );
                }

                // Render links [text](url)
                return (
                  <p
                    key={idx}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: trimmed
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(
                          /\[([^\]]+)\]\(([^)]+)\)/g,
                          '<a href="$2" class="text-emerald-700 font-semibold underline decoration-emerald-500/50 hover:decoration-emerald-700">$1</a>'
                        )
                        .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>'),
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400 text-xs">
              No content typed yet. Switch back to Write mode to compose article.
            </div>
          )}
        </div>
      )}

      {/* Quick Helper Tip Bar */}
      <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span>💡 <strong>Tip:</strong> Subheading ke liye <code>## Subheading Text</code> likhein ya <strong>H2/H3/H4</strong> click karein.</span>
          <span>🔗 Link ke liye <code>[Link Text](https://...)</code> likhein ya <strong>Hyperlink</strong> button click karein.</span>
        </div>
        <div className="text-slate-400">
          Separate paragraphs with a blank line
        </div>
      </div>

      {/* Hyperlink Dialog Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>🔗</span>
                <span>Insert Hyperlink in Blog Content</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Anchor / Link Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Machine Embroidery Lehenga Designs"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Destination URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="e.g. https://newleafskills.com/ or /services"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  You can enter internal links (like <code>/services</code> or <code>/contact</code>) or external links (<code>https://...</code>)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyLink}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-xl transition cursor-pointer shadow-xs"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

