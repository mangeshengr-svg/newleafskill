'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SyncReviewsModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSync = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/google-reviews/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: apiKey.trim() || undefined,
          placeId: placeId.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to sync reviews');
      }

      setStatusMessage({
        type: 'success',
        text: data.message || `Successfully synced ${data.totalFetched || 0} reviews!`,
      });
      router.refresh();
      setTimeout(() => {
        setIsOpen(false);
        setStatusMessage(null);
      }, 2000);
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Error occurred while syncing with SerpAPI',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] cursor-pointer"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Fetch from SerpAPI</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔄</span>
                <h3 className="font-bold text-base text-slate-900">Sync Google Reviews</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSync} className="mt-4 space-y-4">
              <p className="text-xs text-slate-500">
                You can leave these blank if you have already set <code>SERPAPI_KEY</code> and <code>GOOGLE_PLACE_ID</code> in <code>.env.local</code>. Or enter them below to sync directly.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  SERPAPI KEY (Optional if in .env.local)
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="e.g. 5fa7b..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Google Place ID (Optional if in .env.local)
                </label>
                <input
                  type="text"
                  value={placeId}
                  onChange={(e) => setPlaceId(e.target.value)}
                  placeholder="e.g. ChIJ..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {statusMessage && (
                <div
                  className={`p-3 rounded-xl text-xs ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition disabled:opacity-50"
                >
                  {loading ? 'Syncing...' : 'Start Sync Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
