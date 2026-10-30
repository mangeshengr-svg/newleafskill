'use client';

import { useState, useEffect } from 'react';

export default function AdminHomeHeroPage() {
  const [formData, setFormData] = useState({
    badge_text: '',
    main_heading: '',
    description: '',
    btn1_text: '',
    btn1_link: '',
    btn2_text: '',
    btn2_link: '',
    stat1_value: '',
    stat1_label: '',
    stat2_value: '',
    stat2_label: '',
    stat3_value: '',
    stat3_label: '',
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/admin/home-hero');
      const data = await res.json();
      if (data.content) {
        setFormData(data.content);
      }
    } catch (err) {
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/admin/home-hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Hero section updated successfully!');
      } else {
        setError(data.message || 'Update failed');
      }
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  if (loading) return <div className="p-8 text-slate-500">Loading editor...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Manage Home Hero Section</h1>
        <p className="text-sm text-slate-500 mt-1">Update titles, badges, buttons, and stats shown on the main banner.</p>
      </div>

      {message && <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm">{message}</div>}
      {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Top Badge Text</label>
          <input
            type="text"
            name="badge_text"
            value={formData.badge_text || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Main Heading</label>
          <textarea
            name="main_heading"
            rows="2"
            value={formData.main_heading || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Description Paragraph</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Button 1 Text</label>
            <input
              type="text"
              name="btn1_text"
              value={formData.btn1_text || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Button 1 Link</label>
            <input
              type="text"
              name="btn1_link"
              value={formData.btn1_link || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Button 2 Text</label>
            <input
              type="text"
              name="btn2_text"
              value={formData.btn2_text || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Button 2 Link</label>
            <input
              type="text"
              name="btn2_link"
              value={formData.btn2_link || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Stats Boxes (Bottom 3 Cards)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Stat 1 Value</label>
              <input type="text" name="stat1_value" value={formData.stat1_value || ''} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 mb-2" />
              <label className="block text-xs font-semibold text-slate-600 mb-1">Stat 1 Label</label>
              <input type="text" name="stat1_label" value={formData.stat1_label || ''} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Stat 2 Value</label>
              <input type="text" name="stat2_value" value={formData.stat2_value || ''} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 mb-2" />
              <label className="block text-xs font-semibold text-slate-600 mb-1">Stat 2 Label</label>
              <input type="text" name="stat2_label" value={formData.stat2_label || ''} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Stat 3 Value</label>
              <input type="text" name="stat3_value" value={formData.stat3_value || ''} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 mb-2" />
              <label className="block text-xs font-semibold text-slate-600 mb-1">Stat 3 Label</label>
              <input type="text" name="stat3_label" value={formData.stat3_label || ''} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md shadow-blue-600/20"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}