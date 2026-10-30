'use client';

import { useTransition } from 'react';
import { deleteFaq } from '@/lib/faqActions';

interface DeleteFaqButtonProps {
  id: number;
  question: string;
}

export default function DeleteFaqButton({ id, question }: DeleteFaqButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete this FAQ?\n\n"${question}"`)) {
      startTransition(async () => {
        try {
          await deleteFaq(id);
        } catch (error) {
          alert('Failed to delete FAQ');
        }
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer disabled:opacity-50"
      aria-label={`Delete ${question}`}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
