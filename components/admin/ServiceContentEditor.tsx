'use client';

import React, { useRef, useState } from 'react';

interface ServiceContentEditorProps {
  initialValue?: string;
  name?: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}

export default function ServiceContentEditor({
  initialValue = '',
  name = 'full_desc',
  rows = 8,
  required = false,
  placeholder = 'Write full description paragraphs. Use buttons above to add Subheadings (H2, H3), Hyperlinks, and Formatting...',
}: ServiceContentEditorProps) {
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
    const selected = value.substring(start, end) || (level === 2 ? 'Subheading Title' : 'Section Heading');

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
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Subheading H2 */}
          <button
            type="button"
            onClick={() => insertHeading(2)}
            title="Insert Subheading H2 (## Title)"
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 text-xs font-black text-slate-700 transition cursor-pointer shadow-2xs"
          >
            H2
          </button>

          {/* Subheading H3 */}
          <button
            type="button"
            onClick={() => insertHeading(3)}
            title="Insert Subheading H3 (### Title)"
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 text-xs font-black text-slate-700 transition cursor-pointer shadow-2xs"
          >
            H3
          </button>

          <span className="w-[1px] h-5 bg-slate-300 mx-1" />

          {/* Hyperlink button */}
          <button
            type="button"
            onClick={handleOpenLinkModal}
            title="Insert Clickable Hyperlink"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition cursor-pointer shadow-2xs"
          >
            <span>🔗</span>
            <span>Hyperlink</span>
          </button>

          {/* Bold button */}
          <button
            type="button"
            onClick={() => insertText('**', '**', 'bold text')}
            title="Bold text (**text**)"
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
        <div className="p-6 bg-slate-50/50 min-h-[220px] max-h-[460px] overflow-y-auto border-t border-slate-100">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 pb-2 mb-3 border-b border-slate-200 flex items-center justify-between">
            <span>Service Page Live Rendering Preview</span>
            <span className="text-[10px] text-slate-400 font-normal">How visitors will see it on the service page</span>
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
                      <h3 key={idx} className="text-lg sm:text-xl font-black text-slate-900 tracking-tight pt-2 flex items-center gap-2">
                        <span className="w-1.5 h-4 rounded-full bg-emerald-500 inline-block"></span>
                        <span>{text}</span>
                      </h3>
                    );
                  }
                  if (level === 3) {
                    return (
                      <h4 key={idx} className="text-base sm:text-lg font-bold text-slate-900 tracking-tight pt-1 flex items-center gap-2">
                        <span className="w-1.5 h-3.5 rounded-full bg-emerald-500 inline-block"></span>
                        <span>{text}</span>
                      </h4>
                    );
                  }
                  return (
                    <h5 key={idx} className="text-sm font-bold text-slate-800 pt-1">
                      {text}
                    </h5>
                  );
                }

                // Render hyperlinks [text](url) and **bold**
                return (
                  <p
                    key={idx}
                    className="leading-relaxed text-xs sm:text-sm text-slate-600 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs"
                    dangerouslySetInnerHTML={{
                      __html: trimmed
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(
                          /\[([^\]]+)\]\(([^)]+)\)/g,
                          '<a href="$2" target="_blank" class="text-emerald-700 font-bold underline decoration-emerald-400 underline-offset-2 hover:text-emerald-900">$1 ↗</a>'
                        )
                        .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-extrabold text-slate-900">$1</strong>'),
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400 text-xs">
              No content typed yet. Switch back to Write mode to compose service overview.
            </div>
          )}
        </div>
      )}

      {/* Quick Helper Tip Bar */}
      <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span>💡 <strong>Subheading:</strong> <code>## Heading</code> ya <strong>H2/H3</strong> button click karein.</span>
          <span>🔗 <strong>Hyperlink:</strong> <strong>🔗 Hyperlink</strong> button click karke direct link insert karein.</span>
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
                <span>Insert Hyperlink in Service Description</span>
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
                  placeholder="e.g. View Custom Logo Samples or Contact Team"
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
                  placeholder="e.g. /contact#quote or https://plixalabs.com"
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Supports internal links (<code>/services</code>, <code>/contact</code>, <code>/our-work</code>) or external URLs (<code>https://...</code>).
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
