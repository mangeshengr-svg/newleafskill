'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toggleGoogleReviewStatus, deleteGoogleReview } from '@/lib/googleReviewsActions';

interface ReviewActionButtonsProps {
  id: number;
  isActive: number;
}

export default function ReviewActionButtons({ id, isActive }: ReviewActionButtonsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentActive, setCurrentActive] = useState(isActive);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await toggleGoogleReviewStatus(id, currentActive);
      if (res.success && typeof res.newStatus === 'number') {
        setCurrentActive(res.newStatus);
        router.refresh();
      } else {
        alert(res.error || 'Failed to update review status');
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this Google Review?')) return;
    setLoading(true);
    try {
      const res = await deleteGoogleReview(id);
      if (res.success) {
        router.refresh();
      } else {
        alert(res.error || 'Failed to delete review');
      }
    } catch (err: any) {
      alert(err.message || 'Error deleting review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`px-3 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
          currentActive === 1
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
        }`}
      >
        {currentActive === 1 ? 'Active' : 'Hidden'}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition cursor-pointer"
        title="Delete Review"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
