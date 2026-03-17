import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, User, Linkedin, Twitter, Github, RotateCcw, AlertOctagon } from 'lucide-react';
import { API_URL, getAuthHeaders, fetchWithAuth } from '../../utils/api';
import ImagePicker from '../../components/admin/ImagePicker';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    socials: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
}

const AdminTeam = () => {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<TeamMember | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<TeamMember>>({
        name: '', role: '', bio: '', image: '', socials: {}
    });

    const [viewMode, setViewMode] = useState<'active' | 'trash'>('active');

    useEffect(() => {
        fetchTeam();
    }, [viewMode]);

    const fetchTeam = async () => {
        setLoading(true);
        try {
            const endpoint = viewMode === 'active' ? '/team' : '/team/trash';
            const res = await fetchWithAuth(endpoint);
            if (res.ok) {
                const data = await res.json();
                setTeam(Array.isArray(data) ? data : []);
            } else {
                setTeam([]);
            }
        } catch (error) {
            console.error("Failed to fetch team:", error);
            setTeam([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (viewMode === 'active') {
            if (!confirm('Are you sure you want to move this member to trash?')) return;
            await fetchWithAuth(`/team/${id}`, { method: 'DELETE' });
        } else {
            if (!confirm('Are you sure you want to PERMANENTLY delete this member?')) return;
            await fetchWithAuth(`/team/${id}/force`, { method: 'DELETE' });
        }
        fetchTeam();
    };

    const handleRestore = async (id: string) => {
        try {
            await fetchWithAuth(`/team/${id}/restore`, { method: 'POST' });
            fetchTeam();
        } catch (error) {
            console.error(error);
            alert('Failed to restore member');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? `${API_URL}/team/${editing.id}` : `${API_URL}/team`;

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(formData)
            });
            setIsFormOpen(false);
            resetForm();
            fetchTeam();
        } catch (error) {
            console.error("Failed to save member", error);
        }
    };

    const resetForm = () => {
        setEditing(null);
        setFormData({ name: '', role: '', bio: '', image: '', socials: {} });
    };

    const handleEdit = (member: TeamMember) => {
        setEditing(member);
        setFormData({ ...member });
        setIsFormOpen(true);
    };

    const updateSocial = (platform: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            socials: { ...prev.socials, [platform]: value }
        }));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto pb-20 px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                        {viewMode === 'active' ? 'Team Management' : 'Trash Bin'}
                    </h1>
                    <p className="text-slate-500 text-lg">Add and manage your team members.</p>
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
                            onClick={() => { resetForm(); setIsFormOpen(true); }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors font-semibold shadow-lg shadow-cyan-500/20"
                        >
                            <Plus className="w-5 h-5" />
                            Add Member
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member) => (
                    <div key={member.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group relative">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            {viewMode === 'active' ? (
                                <>
                                    <button onClick={() => handleEdit(member)} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-cyan-500 hover:text-white">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(member.id)} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-red-500 hover:text-white">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleRestore(member.id)} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-emerald-500 hover:text-white" title="Restore">
                                        <RotateCcw className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(member.id)} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-red-500 hover:text-white" title="Delete Permanently">
                                        <AlertOctagon className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-slate-100 border-2 border-slate-100 shadow-inner">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-full h-full p-4 text-slate-300" />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                            <span className="text-cyan-600 font-medium text-sm mb-3">{member.role}</span>
                            <p className="text-slate-500 text-sm line-clamp-3 mb-4">{member.bio}</p>

                            <div className="flex gap-3 mt-auto">
                                {member.socials?.linkedin && <Linkedin className="w-4 h-4 text-slate-400" />}
                                {member.socials?.twitter && <Twitter className="w-4 h-4 text-slate-400" />}
                                {member.socials?.github && <Github className="w-4 h-4 text-slate-400" />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-bold text-slate-900 mb-6">{editing ? 'Edit Member' : 'New Team Member'}</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                                    <input required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Role / Position</label>
                                    <input required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Bio</label>
                                <textarea rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} />
                            </div>

                            <div>
                                <ImagePicker
                                    label="Profile Image"
                                    value={formData.image}
                                    onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                                    helperText="Recommended: 400x400px Square"
                                    previewHeight="h-32"
                                />
                            </div>

                            <button type="submit" className="w-full py-3 bg-cyan-500 text-white rounded-xl font-bold hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20 mt-4">
                                {editing ? 'Update Member' : 'Add Member'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTeam;
