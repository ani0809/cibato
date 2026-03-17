import { useState, useEffect } from 'react';
import { Save, User, Lock, CheckCircle, Mail, AlertCircle } from 'lucide-react';
import { API_URL } from '../../utils/api';
import ImagePicker from '../../components/admin/ImagePicker';

const AdminProfile = () => {
    const [user, setUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        image: '',
        currentPassword: '',
        password: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userStr = localStorage.getItem('adminUser');
        if (userStr) {
            const userData = JSON.parse(userStr);
            setUser(userData);
            setFormData(prev => ({
                ...prev,
                name: userData.name || '',
                username: userData.username || '',
                email: userData.email || '',
                image: userData.image || ''
            }));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        if (formData.password && formData.password !== formData.confirmPassword) {
            setStatus({ type: 'error', message: 'New passwords do not match' });
            return;
        }

        setLoading(true);
        const token = localStorage.getItem('adminToken');

        try {
            const payload = {
                name: formData.name,
                username: formData.username,
                email: formData.email,
                image: formData.image || '',
                currentPassword: formData.currentPassword,
                password: formData.password || undefined
            };

            const res = await fetch(`${API_URL}/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const updatedUser = await res.json();

                // Update local storage
                localStorage.setItem('adminUser', JSON.stringify({
                    ...updatedUser,
                    role: user.role
                }));

                // Trigger event to update AdminLayout header immediately
                window.dispatchEvent(new Event('userUpdated'));

                setStatus({ type: 'success', message: 'Profile updated successfully' });

                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    password: '',
                    confirmPassword: ''
                }));
            } else {
                const data = await res.json();
                setStatus({ type: 'error', message: data.message || 'Update failed' });
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Connection error' });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
                <p className="text-slate-500 mt-1">Update your account information and password</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <form onSubmit={handleSubmit} className="p-8 space-y-10">
                    {status && (
                        <div className={`p-4 rounded-lg flex items-center gap-2 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                            }`}>
                            {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            {status.message}
                        </div>
                    )}

                    {/* Personal Information */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                            <User className="w-5 h-5 text-cyan-600" />
                            Personal Information
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <ImagePicker
                                    label="Profile Image"
                                    value={formData.image}
                                    onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                                    helperText="Recommended: Square image"
                                    previewHeight="h-32"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                        value={formData.username}
                                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                            <Lock className="w-5 h-5 text-cyan-600" />
                            Security
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Current Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-400"
                                    placeholder="Required to make changes"
                                    value={formData.currentPassword}
                                    onChange={e => setFormData({ ...formData, currentPassword: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Leave blank to keep current"
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-400"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-400"
                                        value={formData.confirmPassword}
                                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-cyan-500 text-white px-6 py-2.5 rounded-lg hover:bg-cyan-600 transition-colors font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                        >
                            {loading ? 'Saving...' : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
