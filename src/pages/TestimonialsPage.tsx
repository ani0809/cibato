import { useState, useEffect } from 'react';
import { Star, Quote, User } from 'lucide-react';
import { API_URL } from '../utils/api';

interface Testimonial {
    id: string;
    name: string;
    position: string;
    image: string;
    text: string;
    rating: number;
}

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch(`${API_URL}/testimonials`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setTestimonials(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to load testimonials", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div className="pt-[140px] pb-[10px] lg:pt-[180px] lg:pb-[30px] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Testimonials</span>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Don't just take our word for it. Here's what our valued clients have to say about their experience working with us.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-500">Loading testimonials...</div>
                ) : testimonials.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">No testimonials found yet.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {testimonials.map((item) => (
                            <div key={item.id} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 relative group hover:bg-white hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
                                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200 group-hover:text-cyan-100 transition-colors" />

                                <div className="flex gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`}
                                        />
                                    ))}
                                </div>

                                <p className="text-sm text-slate-600 leading-relaxed mb-4 relative z-10 line-clamp-4">
                                    "{item.text}"
                                </p>

                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200 flex-shrink-0">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                                <User className="w-5 h-5 text-slate-300" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                                        <p className="text-xs text-cyan-600 font-medium">{item.position}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestimonialsPage;
