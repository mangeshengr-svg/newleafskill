'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateGoogleReviewsSettings } from '@/lib/googleReviewsActions';

interface DisplaySettingsControlProps {
  currentMode: 'limited' | 'all';
  currentCount: number;
  totalActiveCount: number;
}

export default function DisplaySettingsControl({
  currentMode,
  currentCount,
  totalActiveCount,
}: DisplaySettingsControlProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'limited' | 'all'>(currentMode);
  const [count, setCount] = useState<number>(currentCount || 10);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const res = await updateGoogleReviewsSettings(mode, count);
      if (res.success) {
        setSaved(true);
        router.refresh();
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert(res.error || 'Failed to update settings');
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-slate-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h3 className="text-sm font-bold text-slate-800">
            Frontend Website Display Controls
          </h3>
          <span className="text-[10px] uppercase font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
            Live Setting
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Select whether to show all verified Google reviews on the homepage slider, or restrict to a custom number (e.g. 10).
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Toggle Mode */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={() => setMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Show All ({totalActiveCount})
          </button>
          <button
            type="button"
            onClick={() => setMode('limited')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'limited'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Limit Count
          </button>
        </div>

        {/* If limited, show count input */}
        {mode === 'limited' && (
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Count:</span>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-14 text-xs font-bold text-slate-800 outline-none text-center bg-transparent"
            />
          </div>
        )}

        {/* Save button */}
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Saving...' : saved ? '✓ Saved!' : 'Apply to Frontend'}
        </button>
      </div>
    </div>
  );
}
