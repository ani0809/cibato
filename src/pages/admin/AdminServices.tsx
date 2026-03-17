import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Monitor, BarChart, Megaphone, Search, Palette, Video, Smartphone, Mail, Server, FileText, Mic, AtSign, Code, DollarSign, TrendingUp, RotateCcw, AlertOctagon } from 'lucide-react';
import { API_URL, getAuthHeaders, fetchWithAuth } from '../../utils/api';

// Icon mapping for display in selection
const ICONS: Record<string, any> = {
    Monitor, BarChart, Megaphone, Search, Palette, Video, Smartphone,
    Mail, Server, FileText, Mic, AtSign, Code, DollarSign, TrendingUp
};

const GRADIENTS = [
    { label: 'Blue to Cyan', value: 'from-blue-600 to-cyan-500', shadow: 'shadow-cyan-500/20' },
    { label: 'Emerald to Teal', value: 'from-emerald-500 to-teal-400', shadow: 'shadow-emerald-500/20' },
    { label: 'Orange to Red', value: 'from-orange-500 to-red-500', shadow: 'shadow-orange-500/20' },
    { label: 'Purple to Indigo', value: 'from-purple-600 to-indigo-500', shadow: 'shadow-purple-500/20' },
    { label: 'Pink to Rose', value: 'from-pink-500 to-rose-500', shadow: 'shadow-pink-500/20' },
    { label: 'Violet to Fuchsia', value: 'from-violet-600 to-fuchsia-500', shadow: 'shadow-violet-500/20' },
    { label: 'Blue to Indigo', value: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/20' },
    { label: 'Cyan to Blue', value: 'from-cyan-400 to-blue-500', shadow: 'shadow-cyan-500/20' },
    { label: 'Slate to Black', value: 'from-slate-700 to-slate-900', shadow: 'shadow-slate-500/20' },
    { label: 'Teal to Cyan', value: 'from-teal-400 to-cyan-500', shadow: 'shadow-teal-500/20' },
    { label: 'Indigo to Purple', value: 'from-indigo-500 to-purple-600', shadow: 'shadow-indigo-500/20' },
    { label: 'Blue to Cyan Light', value: 'from-blue-400 to-cyan-400', shadow: 'shadow-blue-500/20' },
];

const AdminServices = () => {
    const [services, setServices] = useState<any[]>([]);
    const [editing, setEditing] = useState<any>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        link: '',
        icon: 'Monitor',
        gradient: 'from-blue-600 to-cyan-500',
        shadow: 'shadow-cyan-500/20'
    });

    const [viewMode, setViewMode] = useState<'active' | 'trash'>('active');

    useEffect(() => {
        fetchServices();
    }, [viewMode]);

    const fetchServices = async () => {
        try {
            const endpoint = viewMode === 'active' ? '/services' : '/services/trash';
            const res = await fetchWithAuth(endpoint);
            if (res.ok) {
                const data = await res.json();
                setServices(Array.isArray(data) ? data : []);
            } else {
                setServices([]);
            }
        } catch (error) {
            console.error("Failed to fetch services:", error);
            setServices([]);
        }
    };

    const handleDelete = async (id: string) => {
        if (viewMode === 'active') {
            if (!confirm('Are you sure you want to move this service to trash?')) return;
            await fetchWithAuth(`/services/${id}`, { method: 'DELETE' });
        } else {
            if (!confirm('Are you sure you want to PERMANENTLY delete this service?')) return;
            await fetchWithAuth(`/services/${id}/force`, { method: 'DELETE' });
        }
        fetchServices();
    };

    const handleRestore = async (id: string) => {
        try {
            await fetchWithAuth(`/services/${id}/restore`, { method: 'POST' });
            fetchServices();
        } catch (error) {
            console.error(error);
            alert('Failed to restore service');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `${API_URL}/services/${editing.id}` : `${API_URL}/services`;

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
            body: JSON.stringify(formData)
        });

        setIsFormOpen(false);
        setEditing(null);
        setFormData({ title: '', description: '', link: '', icon: 'Monitor', gradient: 'from-blue-600 to-cyan-500', shadow: 'shadow-cyan-500/20' });
        fetchServices();
    };

    const handleEdit = (service: any) => {
        setEditing(service);
        setFormData({
            title: service.title,
            description: service.description,
            link: service.link || '',
            icon: service.icon,
            gradient: service.gradient,
            shadow: service.shadow
        });
        setIsFormOpen(true);
    };

    const handleGradientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = GRADIENTS.find(g => g.value === e.target.value);
        if (selected) {
            setFormData({ ...formData, gradient: selected.value, shadow: selected.shadow });
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-20 px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                        {viewMode === 'active' ? 'Services' : 'Trash Bin'}
                    </h1>
                    <p className="text-slate-500 text-lg">Manage the services listed on your website.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('active')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'active' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setViewMode('trash')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'trash' ? 'bg-white text-red-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Trash
                        </button>
                    </div>

                    {viewMode === 'active' && (
                        <button
                            onClick={() => { setEditing(null); setFormData({ title: '', description: '', link: '', icon: 'Monitor', gradient: 'from-blue-600 to-cyan-500', shadow: 'shadow-cyan-500/20' }); setIsFormOpen(true); }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors font-semibold shadow-lg shadow-cyan-500/20"
                        >
                            <Plus className="w-5 h-5" />
                            Add Service
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => {
                    const IconComp = ICONS[service.icon] || Monitor;
                    return (
                        <div key={service.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {viewMode === 'active' ? (
                                    <>
                                        <button onClick={() => handleEdit(service)} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-cyan-500 hover:text-white transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(service.id)} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleRestore(service.id)} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors" title="Restore">
                                            <RotateCcw className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(service.id)} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-red-500 hover:text-white transition-colors" title="Delete Forever">
                                            <AlertOctagon className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-4`}>
                                <IconComp className="w-6 h-6 text-white" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                            <p className="text-slate-600 text-sm line-clamp-3">{service.description}</p>
                        </div>
                    );
                })}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-bold text-slate-900 mb-6">{editing ? 'Edit Service' : 'New Service'}</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
                                <input required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                                <textarea required rows={4} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Service Page URL</label>
                                <input className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="/services/web-design" value={formData.link || ''} onChange={e => setFormData({ ...formData, link: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Icon</label>
                                    <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })}>
                                        {Object.keys(ICONS).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Color Theme</label>
                                    <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" value={formData.gradient} onChange={handleGradientChange}>
                                        {GRADIENTS.map((g, i) => <option key={i} value={g.value}>{g.label}</option>)}
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="w-full py-3 bg-cyan-500 text-white rounded-xl font-bold hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20 mt-4">
                                {editing ? 'Update Service' : 'Create Service'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminServices;
