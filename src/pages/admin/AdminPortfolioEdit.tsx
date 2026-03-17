import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { API_URL, UPLOAD_URL, fetchWithAuth } from '../../utils/api';
import TextEditor from '../../components/TextEditor';
import SeoSettingsForm from '../../components/admin/SeoSettingsForm';
import ImagePicker from '../../components/admin/ImagePicker';

const AdminPortfolioEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        client: '',
        duration: '',
        description: '',
        image: '',
        url: '',
        technologies: [] as string[],
        seo: {}
    });
    const [technologiesInput, setTechnologiesInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        // Fetch categories
        fetch(`${API_URL}/portfolio-categories`)
            .then(res => res.json())
            .then(data => setCategories(Array.isArray(data) ? data : []))
            .catch(err => console.error('Failed to load categories'));

        if (!isNew) {
            fetch(`${API_URL}/portfolios/${id}`)
                .then(res => res.json())
                .then(data => {
                    setFormData({ ...data, seo: data.seo || {} });
                    if (data.technologies && Array.isArray(data.technologies)) {
                        setTechnologiesInput(data.technologies.join(', '));
                    }
                })
                .catch(err => alert('Failed to load project'));
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

    const slugify = (text: string) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint = isNew ? '/portfolios' : `/portfolios/${id}`;
            const method = isNew ? 'POST' : 'PUT';

            const dataToSave = {
                ...formData,
                slug: slugify(formData.client || formData.title),
                technologies: technologiesInput.split(',').map(t => t.trim()).filter(Boolean)
            };

            await fetchWithAuth(endpoint, {
                method,
                body: JSON.stringify(dataToSave)
            });

            navigate('/admin/portfolio');
        } catch (error) {
            alert('Failed to save');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/admin/portfolio')} className="p-2 hover:bg-slate-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5 text-slate-500" />
                </button>
                <h1 className="text-2xl font-bold text-slate-800">{isNew ? 'New Project' : 'Edit Project'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Project Title</label>
                            <input
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                            <input
                                value={formData.client}
                                onChange={e => setFormData({ ...formData, client: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                >
                                    <option value="">Select...</option>
                                    {categories.map((cat: any) => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                                <input
                                    value={formData.duration}
                                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    placeholder="e.g. 2 months"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Live URL</label>
                                <input
                                    value={formData.url || ''}
                                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Technologies</label>
                                <input
                                    value={technologiesInput}
                                    onChange={e => setTechnologiesInput(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    placeholder="React, Node.js, etc."
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <ImagePicker
                            label="Project Image"
                            value={formData.image}
                            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Project Description</label>
                    <TextEditor
                        value={formData.description}
                        onChange={(val) => setFormData({ ...formData, description: val })}
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
                        <span>{loading ? 'Saving...' : 'Save Project'}</span>
                    </button>
                </div>
            </form >
        </div >
    );
};

export default AdminPortfolioEdit;
