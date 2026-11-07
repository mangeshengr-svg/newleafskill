'use client';

import { useTransition } from 'react';

interface DeleteCategoryButtonProps {
  id: number;
  name: string;
  type: 'main' | 'sub';
  action: (id: number) => Promise<void>;
}

export default function DeleteCategoryButton({
  id,
  name,
  type,
  action,
}: DeleteCategoryButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const message =
      type === 'main'
        ? `Are you sure you want to delete MAIN category "${name}"? Subcategories may be orphaned.`
        : `Are you sure you want to delete subcategory "${name}"?`;

    if (!confirm(message)) return;

    startTransition(async () => {
      await action(id);
    });
  };

  if (type === 'main') {
    return (
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer disabled:opacity-50"
      >
        {isPending ? 'Deleting...' : '🗑️ Delete Main'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-[11px] font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 px-2 py-1 rounded-lg transition cursor-pointer disabled:opacity-50"
      title="Delete subcategory"
    >
      {isPending ? '...' : '✕'}
    </button>
  );
}

