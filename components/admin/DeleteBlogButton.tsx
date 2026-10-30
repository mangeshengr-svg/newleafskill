'use client';

import { useTransition } from 'react';
import { deleteBlogPost } from '@/lib/blogActions';

interface DeleteBlogButtonProps {
  id: number;
  title: string;
}

export default function DeleteBlogButton({ id, title }: DeleteBlogButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete the blog post "${title}"?`)) {
      startTransition(async () => {
        try {
          await deleteBlogPost(id);
        } catch (error) {
          alert('Failed to delete blog post');
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
