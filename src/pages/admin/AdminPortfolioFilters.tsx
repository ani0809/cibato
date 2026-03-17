
import { useState, useEffect } from 'react';
import { API_URL, fetchWithAuth } from '../../utils/api';
import { Trash2, Filter } from 'lucide-react';

const AdminPortfolioFilters = () => {
    const [filters, setFilters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadFilters();
    }, []);

    const loadFilters = async () => {
        try {
            const res = await fetch(`${API_URL}/portfolio-filters`);
            const data = await res.json();
            setFilters(data);
        } catch (error) {
            console.error('Failed to load filters');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetchWithAuth('/portfolio-filters', {
                method: 'POST',
                body: JSON.stringify({ name })
            });
            if (res.ok) {
                setName('');
                loadFilters();
            } else {
                alert('Failed to add filter');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this filter?')) return;
        try {
            await fetchWithAuth(`/portfolio-filters/${id}`, { method: 'DELETE' });
            setFilters(filters.filter(f => f.id !== id));
        } catch (error) {
            alert('Failed to delete');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Filter className="w-6 h-6 text-cyan-500" />
                Portfolio Filters
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-lg font-semibold mb-4 text-slate-800">Add New Filter</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    placeholder="e.g. Featured"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-2 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
                            >
                                {submitting ? 'Adding...' : 'Add New Filter'}
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
                                ) : filters.length === 0 ? (
                                    <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500">No filters found</td></tr>
                                ) : (
                                    filters.map((filter) => (
                                        <tr key={filter.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-cyan-600 transition-colors">
                                                {filter.name}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                                {filter.slug}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(filter.id)}
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

export default AdminPortfolioFilters;
