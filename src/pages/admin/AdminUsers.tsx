import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Trash2, Edit, Shield, User, X, Check, Mail } from 'lucide-react';
import { fetchWithAuth } from '../../utils/api';
import ImagePicker from '../../components/admin/ImagePicker';

const AdminUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: '',
        role: 'editor',
        email: '',
        image: ''
    });

    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    // Check Permissions
    useEffect(() => {
        const userStr = localStorage.getItem('adminUser');
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user.role !== 'admin') {
                navigate('/admin'); // Redirect non-admins
            }
        }
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const res = await fetchWithAuth('/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        try {
            const url = editingUser
                ? `/users/${editingUser.id}`
                : '/users';

            const method = editingUser ? 'PUT' : 'POST';

            // Clean payload
            const payload: any = { ...formData };
            if (!payload.password) delete payload.password; // Don't send empty password on edit
            if (!payload.image) payload.image = '';

            const res = await fetchWithAuth(url, {
                method,
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setIsModalOpen(false);
                setEditingUser(null);
                setFormData({ username: '', name: '', password: '', role: 'editor', email: '', image: '' });
                fetchUsers();
            } else {
                const data = await res.json();
                setStatus({ type: 'error', message: data.message || 'Operation failed' });
            }
        } catch (error) {
            console.error('Error saving user', error);
            setStatus({ type: 'error', message: 'Connection error' });
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const res = await fetchWithAuth(`/users/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchUsers();
            } else {
                const data = await res.json();
                alert(data.message || 'Failed to delete');
            }
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const openEdit = (user: any) => {
        setEditingUser(user);
        setFormData({
            username: user.username,
            name: user.name,
            password: '', // Don't show existing password
            role: user.role,
            email: user.email || '',
            image: user.image || ''
        });
        setIsModalOpen(true);
        setStatus(null);
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
                <button
                    onClick={() => {
                        setEditingUser(null);
                        setFormData({ username: '', name: '', password: '', role: 'editor', email: '', image: '' });
                        setIsModalOpen(true);
                        setStatus(null);
                    }}
                    className="flex items-center gap-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add User
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Role</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {loading ? (
                                <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading...</td></tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr><td colSpan={4} className="p-8 text-center text-slate-500">No users found.</td></tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {user.image ? (
                                                    <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                                                ) : (
                                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">
                                                        {user.name?.[0]?.toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-slate-900">{user.name}</div>
                                                    <div className="text-xs text-slate-500">@{user.username}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{user.email || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-emerald-100 text-emerald-700'
                                                }`}>
                                                {user.role === 'admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEdit(user)}
                                                    className="p-2 text-slate-400 hover:text-cyan-500 hover:bg-cyan-50 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                {user.username !== 'admin' && (
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-slate-800">
                                {editingUser ? 'Edit User' : 'Add New User'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {status && (
                                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                                    {status.message}
                                </div>
                            )}

                            {/* Image Picker */}
                            <div className="flex justify-center">
                                <ImagePicker
                                    label="Profile Image"
                                    value={formData.image}
                                    onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                                    helperText="Optional"
                                    previewHeight="h-24"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                        value={formData.username}
                                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        {editingUser ? 'New Password' : 'Password'}
                                    </label>
                                    <input
                                        type="password"
                                        required={!editingUser}
                                        placeholder={editingUser ? "Leave blank to keep" : ""}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                                    <select
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    >
                                        <option value="editor">Editor (Content Management)</option>
                                        <option value="admin">Admin (Full Access)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 font-medium"
                                >
                                    {editingUser ? 'Update User' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
