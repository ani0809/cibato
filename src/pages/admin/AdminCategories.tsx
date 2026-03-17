import React, { useState, useEffect } from 'react';
import { API_URL, fetchWithAuth } from '../../utils/api';
import { Trash2, Search, Tag, Edit, X, Save } from 'lucide-react';
import SeoSettingsForm from '../../components/admin/SeoSettingsForm';

interface Category {
    id: string;
    name: string;
    slug: string;
    seo?: any;
}

const AdminCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Edit Modal State
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editForm, setEditForm] = useState<{ name: string; seo: any }>({ name: '', seo: {} });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/categories`);
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetchWithAuth('/categories', {
                method: 'POST',
                body: JSON.stringify({ name })
            });
            if (res.ok) {
                setName('');
                loadCategories();
            } else {
                alert('Failed to add category');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this category?')) return;
        try {
            await fetchWithAuth(`/categories/${id}`, { method: 'DELETE' });
            setCategories(categories.filter(c => c.id !== id));
        } catch (error) {
            alert('Failed to delete');
        }
    };

    const startEdit = (cat: Category) => {
        setEditingCategory(cat);
        setEditForm({
            name: cat.name,
            seo: cat.seo || {}
        });
    };

    const handleUpdate = async () => {
        if (!editingCategory || !editForm.name.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetchWithAuth(`/categories/${editingCategory.id}`, {
                method: 'PUT',
                body: JSON.stringify(editForm)
            });

            if (res.ok) {
                setEditingCategory(null);
                loadCategories();
            } else {
                alert('Failed to update category');
            }
        } catch (error) {
            console.error(error);
            alert('Update failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 relative">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Tag className="w-6 h-6 text-cyan-500" />
                Categories
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Add New */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-lg font-semibold mb-4 text-slate-800">Add New Category</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    placeholder="e.g. Technology"
                                    required
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    The name is how it appears on your site.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-2 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
                            >
                                {submitting ? 'Adding...' : 'Add New Category'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column: List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-sm font-medium">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Slug</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {loading ? (
                                    <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
                                ) : categories.length === 0 ? (
                                    <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500">No categories found</td></tr>
                                ) : (
                                    categories.map((cat) => (
                                        <tr key={cat.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-cyan-600 transition-colors">
                                                {cat.name}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                                {cat.slug}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => startEdit(cat)}
                                                        className="p-2 text-slate-400 hover:text-cyan-500 hover:bg-cyan-50 rounded transition-all"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(cat.id)}
                                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editingCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-slate-800">Edit Category</h2>
                            <button
                                onClick={() => setEditingCategory(null)}
                                className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <SeoSettingsForm
                                    data={editForm.seo}
                                    onChange={(seo) => setEditForm(prev => ({ ...prev, seo }))}
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                            <button
                                onClick={() => setEditingCategory(null)}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={submitting}
                                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategories;
