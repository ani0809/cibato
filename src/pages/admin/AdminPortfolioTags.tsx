
import { useState, useEffect } from 'react';
import { API_URL, fetchWithAuth } from '../../utils/api';
import { Trash2, Tag } from 'lucide-react';

const AdminPortfolioTags = () => {
    const [tags, setTags] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadTags();
    }, []);

    const loadTags = async () => {
        try {
            const res = await fetch(`${API_URL}/portfolio-tags`);
            const data = await res.json();
            setTags(data);
        } catch (error) {
            console.error('Failed to load tags');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetchWithAuth('/portfolio-tags', {
                method: 'POST',
                body: JSON.stringify({ name })
            });
            if (res.ok) {
                setName('');
                loadTags();
            } else {
                alert('Failed to add tag');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this tag?')) return;
        try {
            await fetchWithAuth(`/portfolio-tags/${id}`, { method: 'DELETE' });
            setTags(tags.filter(t => t.id !== id));
        } catch (error) {
            alert('Failed to delete');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Tag className="w-6 h-6 text-cyan-500" />
                Portfolio Tags
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-lg font-semibold mb-4 text-slate-800">Add New Tag</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    placeholder="e.g. Minimalist"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-2 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
                            >
                                {submitting ? 'Adding...' : 'Add New Tag'}
                            </button>
                        </form>
                    </div>
                </div>

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
                                ) : tags.length === 0 ? (
                                    <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500">No tags found</td></tr>
                                ) : (
                                    tags.map((tag) => (
                                        <tr key={tag.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-cyan-600 transition-colors">
                                                {tag.name}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                                {tag.slug}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(tag.id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPortfolioTags;
