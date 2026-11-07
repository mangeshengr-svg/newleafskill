import pool from '@/lib/db';
import { getAllFlatCategories } from '@/lib/categoryActions';
import Link from 'next/link';
import EditServiceForm from './EditServiceForm';

export const instant = false;

function safeParseJson<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === 'object') return val as T;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [rows]: any = await pool.query('SELECT * FROM services WHERE id = ? LIMIT 1', [id]);
  const service = rows[0];

  if (!service) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Service Not Found</h2>
        <p className="text-xs text-slate-500">The requested service ID #{id} does not exist in the database.</p>
        <Link
          href="/admin/services"
          className="inline-block bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs"
        >
          ← Back to Services List
        </Link>
      </div>
    );
  }

  const categories = await getAllFlatCategories();

  // Parse JSON data for form display
  const fullDescArr: string[] = safeParseJson(service.full_desc, []);
  const fullDescText = Array.isArray(fullDescArr) ? fullDescArr.join('\n\n') : '';

  const keyHighlightsArr: string[] = safeParseJson(service.key_highlights, []);
  const keyHighlightsText = Array.isArray(keyHighlightsArr) ? keyHighlightsArr.join('\n') : '';

  const subOfferingsArr: any[] = safeParseJson(service.sub_offerings, []);
  const subOfferingsText = Array.isArray(subOfferingsArr)
    ? subOfferingsArr.map((s: any) => `${s.title}: ${s.desc}`).join('\n')
    : '';

  const fabricsArr: string[] = safeParseJson(service.fabrics, []);
  const fabricsText = Array.isArray(fabricsArr) ? fabricsArr.join(', ') : '';

  const machineFormatsArr: string[] = safeParseJson(service.machine_formats, []);
  const machineFormatsText = Array.isArray(machineFormatsArr) ? machineFormatsArr.join(', ') : '';

  const targetIndustriesArr: string[] = safeParseJson(service.target_industries, []);
  const targetIndustriesText = Array.isArray(targetIndustriesArr) ? targetIndustriesArr.join(', ') : '';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Service: {service.title}</h1>
          <p className="text-slate-500 text-xs mt-1">
            Update category, subcategory, SEO metadata, specifications, and images.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/services/categories"
            className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition"
          >
            🗂️ Categories
          </Link>
          <Link
            href="/admin/services"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
          >
            ← Back to Services
          </Link>
        </div>
      </div>

      <EditServiceForm
        service={service}
        categories={categories}
        parsedData={{
          fullDescText,
          keyHighlightsText,
          subOfferingsText,
          fabricsText,
          machineFormatsText,
          targetIndustriesText,
        }}
      />
    </div>
  );
}
