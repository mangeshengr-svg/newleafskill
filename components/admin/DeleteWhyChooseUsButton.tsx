'use client';

import { useTransition } from 'react';
import { deleteWhyChooseUs } from '@/lib/whyChooseUsActions';

interface DeleteWhyChooseUsButtonProps {
  id: number;
  title: string;
}

export default function DeleteWhyChooseUsButton({ id, title }: DeleteWhyChooseUsButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete the Why Choose Us entry "${title}"?`)) {
      startTransition(async () => {
        try {
          await deleteWhyChooseUs(id);
        } catch (error) {
          alert('Failed to delete Why Choose Us item');
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
      aria-label={`Delete ${title}`}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
