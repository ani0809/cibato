import React, { useState, useEffect } from 'react';
import { MessageSquareQuote, Plus, Trash2, Edit, X, Star } from 'lucide-react';
import { API_URL, fetchWithAuth } from '../../utils/api';
import ImagePicker from '../../components/admin/ImagePicker';

interface TestimonialItem {
    id: string;
    name: string;
    position: string;
    image: string;
    text: string;
    rating: number;
}

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<TestimonialItem, 'id'>>({
        name: '',
        position: '',
        image: '',
        text: '',
        rating: 5
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadTestimonials();
    }, []);

    const loadTestimonials = async () => {
        try {
            const res = await fetch(`${API_URL}/testimonials`);
            const data = await res.json();
            setTestimonials(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to load testimonials');
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (testimonial: TestimonialItem) => {
        setEditingId(testimonial.id);
        setFormData({
            name: testimonial.name,
            position: testimonial.position,
            image: testimonial.image,
            text: testimonial.text,
            rating: testimonial.rating
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: '', position: '', image: '', text: '', rating: 5 });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const url = editingId ? `/testimonials/${editingId}` : '/testimonials';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetchWithAuth(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                closeModal();
                loadTestimonials();
            } else {
                alert(`Failed to ${editingId ? 'update' : 'create'} testimonial`);
            }
        } catch (error) {
            console.error(error);
            alert('Error saving testimonial');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this testimonial?')) return;

        try {
            await fetchWithAuth(`/testimonials/${id}`, { method: 'DELETE' });
            setTestimonials(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error('Failed to delete');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <MessageSquareQuote className="w-8 h-8 text-cyan-500" />
                    Testimonials
                </h1>

                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData({ name: '', position: '', image: '', text: '', rating: 5 });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors shadow-sm hover:shadow"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4 group">

                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                <img
                                    src={testimonial.image || 'https://via.placeholder.com/150'}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{testimonial.name}</h3>
                                <p className="text-sm text-slate-500">{testimonial.position}</p>
                            </div>
                        </div>

                        <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current' : 'text-slate-200'}`} />
                            ))}
                        </div>

                        <p className="text-sm text-slate-600 line-clamp-3 italic">"{testimonial.text}"</p>

                        <div className="flex gap-2 justify-end mt-auto pt-4 border-t border-slate-100">
                            <button
                                onClick={() => startEdit(testimonial)}
                                className="p-2 text-slate-400 hover:text-cyan-500 hover:bg-cyan-50 rounded-lg transition-colors"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(testimonial.id)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-8">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                            <button onClick={closeModal} className="text-slate-500 hover:bg-slate-100 p-2 rounded-full"><X className="w-5 h-5" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
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
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.position}
                                        onChange={e => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className={`p-1 rounded-full transition-colors ${formData.rating >= star ? 'text-yellow-500' : 'text-slate-300'}`}
                                        >
                                            <Star className={`w-6 h-6 ${formData.rating >= star ? 'fill-current' : ''}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Feedback Text</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.text}
                                    onChange={e => setFormData({ ...formData, text: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
                                />
                            </div>

                            <div>
                                <ImagePicker
                                    label="Profile Photo"
                                    value={formData.image}
                                    onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                                    helperText="Recommended: 150x150px Square"
                                    previewHeight="h-24"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 font-medium"
                            >
                                {submitting ? 'Saving...' : (editingId ? 'Update Testimonial' : 'Add Testimonial')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTestimonials;
