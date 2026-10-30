'use client';

import { useState, useEffect } from 'react';

export default function AdminHomeSliderPage() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Edit Mode state
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    tab_name: '',
    media_type: 'image',
    media_url: '',
    slide_title: '',
    slide_desc: '',
    spec1_value: '',
    spec2_value: '',
    spec3_value: '',
    spec4_value: '',
    sort_order: 0,
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await fetch('/api/admin/home-slider');
      const data = await res.json();
      if (res.ok) {
        setSlides(data.slides);
      }
    } catch (err) {
      setError('Failed to load slides');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Jab Edit button par click ho
  const handleEditClick = (slide) => {
    setEditingId(slide.id);
    setFormData({
      tab_name: slide.tab_name,
      media_type: slide.media_type,
      media_url: slide.media_url,
      slide_title: slide.slide_title,
      slide_desc: slide.slide_desc || '',
      spec1_value: slide.spec1_value || '',
      spec2_value: slide.spec2_value || '',
      spec3_value: slide.spec3_value || '',
      spec4_value: slide.spec4_value || '',
      sort_order: slide.sort_order || 0,
    });
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      tab_name: '',
      media_type: 'image',
      media_url: '',
      slide_title: '',
      slide_desc: '',
      spec1_value: '',
      spec2_value: '',
      spec3_value: '',
      spec4_value: '',
      sort_order: 0,
    });
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const data = new FormData();
    if (editingId) data.append('id', editingId);
    data.append('tab_name', formData.tab_name);
    data.append('media_type', formData.media_type);
    data.append('existing_media_url', formData.media_url);
    data.append('slide_title', formData.slide_title);
    data.append('slide_desc', formData.slide_desc);
    data.append('spec1_value', formData.spec1_value);
    data.append('spec2_value', formData.spec2_value);
    data.append('spec3_value', formData.spec3_value);
    data.append('spec4_value', formData.spec4_value);
    data.append('sort_order', formData.sort_order);
    
    if (selectedFile) {
      data.append('media_file', selectedFile);
    }

    const endpoint = '/api/admin/home-slider';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method: method,
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        setMessage(editingId ? 'Slide updated successfully!' : 'Slide added successfully!');
        handleCancelEdit();
        fetchSlides();
      } else {
        setError(result.message || 'Operation failed');
      }
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;

    try {
      const res = await fetch(`/api/admin/home-slider?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage('Slide deleted successfully!');
        fetchSlides();
      } else {
        setError('Failed to delete slide');
      }
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Manage Home Hero Slider & Tabs</h1>
        <p className="text-sm text-slate-500 mt-1">Add, edit or remove slides, media files, and specs seamlessly.</p>
      </div>

      {message && <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm">{message}</div>}
      {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{error}</div>}

      {/* Form for Add / Edit */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-bold text-slate-900">
            {editingId ? `✏️ Edit Slide ID: #${editingId}` : '➕ Add New Slide / Tab Item'}
          </h3>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} className="text-xs px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg">
              Cancel Edit
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Tab Name (e.g. 3D Puff Cap)</label>
            <input type="text" name="tab_name" value={formData.tab_name} onChange={handleChange} required placeholder="3D Puff Cap" className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Media Type</label>
            <select name="media_type" value={formData.media_type} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900">
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              {editingId ? 'Replace File (Optional)' : 'Upload File'}
            </label>
            <input 
              type="file" 
              accept="image/*,video/*"
              onChange={(e) => setSelectedFile(e.target.files[0])} 
              required={!editingId} 
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Slide Title</label>
            <input type="text" name="slide_title" value={formData.slide_title} onChange={handleChange} required placeholder="3D Foam Puff Mascot Cap Punching" className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Sort Order</label>
            <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Slide Description</label>
          <textarea name="slide_desc" rows="2" value={formData.slide_desc} onChange={handleChange} placeholder="Raised 3mm EVA foam..." className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900" />
        </div>

        {/* Specs Inputs */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-sm font-bold text-slate-800 mb-3">Slide Specifications Boxes</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Stitches Value</label>
              <input type="text" name="spec1_value" value={formData.spec1_value} onChange={handleChange} placeholder="18,400" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Foam Relief Value</label>
              <input type="text" name="spec2_value" value={formData.spec2_value} onChange={handleChange} placeholder="3mm EVA" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Underlay Value</label>
              <input type="text" name="spec3_value" value={formData.spec3_value} onChange={handleChange} placeholder="Perforated Cap" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Seam Lock Value</label>
              <input type="text" name="spec4_value" value={formData.spec4_value} onChange={handleChange} placeholder="+0.40mm" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md transition-colors">
            {editingId ? 'Update Slide' : 'Add Slide'}
          </button>
        </div>
      </form>

      {/* Existing Slides Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Existing Slider Items ({slides.length})</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading slides...</div>
        ) : slides.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No slides added yet. Add one above!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase">
                  <th className="p-4">Tab Name</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Media</th>
                  <th className="p-4">Specs</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {slides.map((slide) => (
                  <tr key={slide.id} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-blue-600">{slide.tab_name}</td>
                    <td className="p-4 font-medium text-slate-900 max-w-xs truncate">{slide.slide_title}</td>
                    <td className="p-4 text-slate-500 text-xs truncate max-w-xs">{slide.media_url}</td>
                    <td className="p-4 text-xs text-slate-600">
                      {slide.spec1_value} | {slide.spec2_value}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleEditClick(slide)} className="px-3 py-1 bg-amber-50 text-amber-600 hover:bg-amber-100 font-medium rounded-lg text-xs">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(slide.id)} className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg text-xs">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}