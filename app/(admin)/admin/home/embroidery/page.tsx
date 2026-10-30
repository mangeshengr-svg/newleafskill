import db from '@/lib/db';
import { deleteEmbroideryItem } from '@/lib/actions';
import Link from 'next/link';

// Yeh configuration cacheComponents ke sath compatible hai
export const instant = false;

export default async function EmbroideryAdminPage() {
  // 1. SHOW (Fetch data from database)
  const [rows]: any = await db.query('SELECT * FROM embroidery_inspectors ORDER BY sort_order ASC');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Embroidery Inspectors Management</h1>
          <p className="text-sm text-gray-600">Manage tabs, specifications, and before/after images for the quality inspector section.</p>
        </div>
        <Link 
          href="/admin/home/embroidery/add" 
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          + Add New Tab Item
        </Link>
      </div>

      {/* SHOW TABLE */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tab Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Main Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Design Size</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No records found. Click "Add New Tab Item" to create one.
                </td>
              </tr>
            ) : (
              rows.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.sort_order}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.tab_title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.design_size || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <Link 
                      href={`/admin/home/embroidery/edit/${item.id}`} 
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    
                    <form action={async () => {
                      'use server';
                      await deleteEmbroideryItem(item.id);
                    }} className="inline">
                      <button 
                        type="submit" 
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}