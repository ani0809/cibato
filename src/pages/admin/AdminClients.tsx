import React, { useState, useEffect } from 'react';
import { Users, Plus, Trash2, Edit, X, ExternalLink } from 'lucide-react';
import { API_URL, fetchWithAuth } from '../../utils/api';
import ImagePicker from '../../components/admin/ImagePicker';

interface ClientItem {
    id: string;
    name: string;
    logo: string;
    url: string;
}

const AdminClients = () => {
    const [clients, setClients] = useState<ClientItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', url: '#', logo: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            const res = await fetch(`${API_URL}/clients`);
            const data = await res.json();
            setClients(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to load clients');
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (client: ClientItem) => {
        setEditingId(client.id);
        setFormData({ name: client.name, url: client.url, logo: client.logo });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: '', url: '#', logo: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const url = editingId ? `/clients/${editingId}` : '/clients';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetchWithAuth(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                closeModal();
                loadClients();
            } else {
                alert(`Failed to ${editingId ? 'update' : 'create'} client`);
            }
        } catch (error) {
            console.error(error);
            alert('Error saving client');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this client?')) return;

        try {
            await fetchWithAuth(`/clients/${id}`, { method: 'DELETE' });
            setClients(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error('Failed to delete');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Users className="w-8 h-8 text-cyan-500" />
                    Clients & Partners
                </h1>

                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData({ name: '', url: '#', logo: '' });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors shadow-sm hover:shadow"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {clients.map(client => (
                    <div key={client.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col gap-4 group">
                        <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center p-4 relative overflow-hidden">
                            <img
                                src={client.logo.startsWith('http') ? client.logo : `${API_URL.replace('/api', '')}${client.logo}`}
                                alt={client.name}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-slate-800">{client.name}</h3>
                                <a
                                    href={client.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1"
                                >
                                    Visit Link <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => startEdit(client)}
                                    className="p-2 text-slate-400 hover:text-cyan-500 hover:bg-cyan-50 rounded-lg transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(client.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800">{editingId ? 'Edit Client' : 'Add Client'}</h2>
                            <button onClick={closeModal} className="text-slate-500 hover:bg-slate-100 p-2 rounded-full"><X className="w-5 h-5" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Link URL</label>
                                <input
                                    type="url"
                                    required
                                    value={formData.url}
                                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div>
                                <ImagePicker
                                    label="Logo Image"
                                    value={formData.logo}
                                    onChange={(url) => setFormData(prev => ({ ...prev, logo: url }))}
                                    helperText="Recommended: 200x100px PNG"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting || !formData.logo}
                                className="w-full py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 font-medium"
                            >
                                {submitting ? 'Saving...' : (editingId ? 'Update Client' : 'Add Client')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminClients;
