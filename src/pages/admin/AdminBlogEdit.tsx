import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { API_URL, UPLOAD_URL, fetchWithAuth } from '../../utils/api';
import TextEditor from '../../components/TextEditor';
import SeoSettingsForm from '../../components/admin/SeoSettingsForm';
import ImagePicker from '../../components/admin/ImagePicker';

const AdminBlogEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        excerpt: '',
        content: '',
        image: '',
        seo: {}
    });
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        // Fetch categories
        fetch(`${API_URL}/categories`)
            .then(res => res.json())
            .then(data => setCategories(Array.isArray(data) ? data : []))
            .catch(err => console.error('Failed to load categories'));

        if (!isNew) {
            fetch(`${API_URL}/blogs/${id}`)
                .then(res => res.json())
                .then(data => setFormData({ ...data, seo: data.seo || {} }))
                .catch(err => alert('Failed to load blog'));
        }
    }, [id, isNew]);

    const handleInlineImageUpload = async (file: File): Promise<string> => {
        const form = new FormData();
        form.append('file', file);
        try {
            const res = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: form
            });
            const data = await res.json();
            return data.url ? (data.url.startsWith('http') ? data.url : `${UPLOAD_URL}${data.url}`) : '';
        } catch (error) {
            console.error('Inline upload failed', error);
            return '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint = isNew ? '/blogs' : `/blogs/${id}`;
            const method = isNew ? 'POST' : 'PUT';

            // Auto-generate excerpt from first line/paragraph of content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = formData.content;
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            const firstLine = textContent.split('.')[0].substring(0, 150) + '...';

            const dataToSave = {
                ...formData,
                excerpt: firstLine
            };

            await fetchWithAuth(endpoint, {
                method,
                body: JSON.stringify(dataToSave)
            });

            navigate('/admin/blogs');
        } catch (error) {
            alert('Failed to save');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/admin/blogs')} className="p-2 hover:bg-slate-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5 text-slate-500" />
                </button>
                <h1 className="text-2xl font-bold text-slate-800">{isNew ? 'Create Blog Post' : 'Edit Blog Post'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                            <input
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                            <select
                                required
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <ImagePicker
                            label="Featured Image"
                            value={formData.image}
                            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                            helperText="Recommended: 1200x630px for best display"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    {/* <label className="block text-sm font-medium text-slate-700 mb-1">Content</label> */}
                    <TextEditor
                        value={formData.content}
                        onChange={(val) => setFormData({ ...formData, content: val })}
                        onImageUpload={handleInlineImageUpload}
                    />
                </div>

                <div className="pt-6 border-t border-slate-100">
                    <SeoSettingsForm
                        data={formData.seo || {}}
                        onChange={(seo) => setFormData({ ...formData, seo })}
                    />
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                    >
                        <Save className="w-5 h-5" />
                        <span>{loading ? 'Saving...' : 'Save Post'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminBlogEdit;
