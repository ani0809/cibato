import { useState, useEffect } from 'react';
import { API_URL, fetchWithAuth } from '../../utils/api';
import { Trash2, Edit, Plus, ArrowRight, CornerUpRight, RefreshCw, X, CheckCircle } from 'lucide-react';
import SeoHead from '../../components/SeoHead';

interface Redirect {
    id: string;
    from: string;
    to: string;
    type: number;
    active: boolean;
}

const AdminRedirects = () => {
    const [redirects, setRedirects] = useState<Redirect[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [form, setForm] = useState({
        from: '',
        to: '',
        type: 301,
        active: true
    });

    // Edit State
    const [editing, setEditing] = useState<Redirect | null>(null);

    useEffect(() => {
        loadRedirects();
    }, []);

    const loadRedirects = async () => {
        try {
            const res = await fetch(`${API_URL}/redirects`);
            const data = await res.json();
            setRedirects(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to load redirects');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Basic validation to prevent infinite loop (simple check)
            if (form.from.trim() === form.to.trim()) {
                alert('Source and target URLs cannot be the same');
                setSubmitting(false);
                return;
            }

            const res = await fetchWithAuth('/redirects', {
                method: 'POST',
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setForm({ from: '', to: '', type: 301, active: true });
                loadRedirects();
            } else {
                const err = await res.json();
                alert(err.message || 'Failed to add redirect');
            }
        } catch (error) {
            alert('Error adding redirect');
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdate = async () => {
        if (!editing) return;
        setSubmitting(true);

        try {
            const res = await fetchWithAuth(`/redirects/${editing.id}`, {
                method: 'PUT',
                body: JSON.stringify(editing)
            });

            if (res.ok) {
                setEditing(null);
                loadRedirects();
            } else {
                alert('Failed to update redirect');
            }
        } catch (error) {
            alert('Error updating redirect');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this redirect?')) return;
        try {
            await fetchWithAuth(`/redirects/${id}`, { method: 'DELETE' });
            setRedirects(redirects.filter(r => r.id !== id));
        } catch (error) {
            alert('Failed to delete redirect');
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-20 space-y-8">
            <SeoHead title="Redirects - Admin" />

            <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-50 rounded-2xl text-cyan-600">
                    <CornerUpRight className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Redirects</h1>
                    <p className="text-slate-500 text-lg">Manage URL redirects for SEO maintenance</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add New Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Add New Redirect</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">From URL (Source)</label>
                                <input
                                    required
                                    value={form.from}
                                    onChange={e => setForm({ ...form, from: e.target.value })}
                                    placeholder="/old-page"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                                />
                                <p className="text-xs text-slate-500 mt-1">Relative path (e.g., /old)</p>
                            </div>

                            <div className="flex justify-center py-2">
                                <ArrowRight className="w-5 h-5 text-slate-300 transform rotate-90 lg:rotate-0" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">To URL (Target)</label>
                                <input
                                    required
                                    value={form.to}
                                    onChange={e => setForm({ ...form, to: e.target.value })}
                                    placeholder="/new-page"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                                />
                                <p className="text-xs text-slate-500 mt-1">Relative (e.g., /new) or Absolute</p>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Type</label>
                                    <select
                                        value={form.type}
                                        onChange={e => setForm({ ...form, type: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                                    >
                                        <option value={301}>301 (Permanent)</option>
                                        <option value={302}>302 (Temporary)</option>
                                    </select>
                                </div>
                                <div className="flex items-end pb-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.active}
                                            onChange={e => setForm({ ...form, active: e.target.checked })}
                                            className="w-4 h-4 text-cyan-500 rounded border-slate-300 focus:ring-cyan-500"
                                        />
                                        <span className="text-sm font-medium text-slate-700">Active</span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                Add Redirect
                            </button>
                        </form>
                    </div>
                </div>

                {/* List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">From</th>
                                        <th className="px-6 py-4">To</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading...</td></tr>
                                    ) : redirects.length === 0 ? (
                                        <tr><td colSpan={5} className="p-8 text-center text-slate-500">No redirects found.</td></tr>
                                    ) : (
                                        redirects.map(r => (
                                            <tr key={r.id} className="hover:bg-slate-50/50">
                                                <td className="px-6 py-4">
                                                    {r.active ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                            <CheckCircle className="w-3 h-3" /> Active
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                                                            <X className="w-3 h-3" /> Inactive
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-mono text-sm text-slate-600 truncate max-w-[150px]" title={r.from}>
                                                    {r.from}
                                                </td>
                                                <td className="px-6 py-4 font-mono text-sm text-cyan-600 truncate max-w-[150px]" title={r.to}>
                                                    <div className="flex items-center gap-1">
                                                        <ArrowRight className="w-3 h-3 text-slate-300" />
                                                        {r.to}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 bg-slate-100 rounded text-xs font-mono font-medium text-slate-600">
                                                        {r.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => setEditing(r)}
                                                            className="p-2 text-slate-400 hover:text-cyan-500 hover:bg-cyan-50 rounded-lg transition-colors"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(r.id)}
                                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
            </div>

            {/* Edit Modal */}
            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-800">Edit Redirect</h3>
                            <button onClick={() => setEditing(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">From URL</label>
                                <input
                                    value={editing.from}
                                    onChange={e => setEditing({ ...editing, from: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">To URL</label>
                                <input
                                    value={editing.to}
                                    onChange={e => setEditing({ ...editing, to: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                                    <select
                                        value={editing.type}
                                        onChange={e => setEditing({ ...editing, type: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    >
                                        <option value={301}>301</option>
                                        <option value={302}>302</option>
                                    </select>
                                </div>
                                <div className="flex items-end pb-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={editing.active}
                                            onChange={e => setEditing({ ...editing, active: e.target.checked })}
                                            className="w-4 h-4 text-cyan-500 rounded border-slate-300 focus:ring-cyan-500"
                                        />
                                        <span className="text-sm font-medium text-slate-700">Active</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setEditing(null)}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={submitting}
                                className="px-6 py-2 bg-cyan-500 text-white rounded-lg font-bold hover:bg-cyan-600 transition-colors"
                            >
                                {submitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRedirects;
