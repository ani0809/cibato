import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import CibatoSlideButton from './CibatoSlideButton';
import { API_URL, UPLOAD_URL } from '../utils/api';

const BlogGrid = ({ categorySlug }: { categorySlug?: string }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/blogs`)
            .then(res => res.json())
            .then(data => {
                let posts = Array.isArray(data) ? data : [];

                // Filter by category slug if provided
                if (categorySlug) {
                    posts = posts.filter((p: any) => {
                        const cat = p.category || '';
                        const catSlug = cat.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
                        return catSlug === categorySlug;
                    });
                }

                const formatted = posts.map((post: any) => ({
                    id: post.id,
                    title: post.title,
                    excerpt: post.excerpt,
                    image: post.image ? (post.image.startsWith('http') ? post.image : `${UPLOAD_URL}${post.image}`) : 'https://placehold.co/600x400?text=No+Image',
                    author: 'Cibato Team',
                    date: new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    category: post.category || 'Uncategorized'
                }));
                setBlogPosts(formatted);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [categorySlug]);

    return (
        <section ref={sectionRef} className="py-[60px] lg:py-[80px] bg-gradient-to-b from-white via-slate-50/30 to-white relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-40 left-20 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
                {loading ? (
                    <div className="text-center py-20 text-slate-500">Loading blogs...</div>
                ) : blogPosts.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">No blog posts found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => {
                            // Simple slugify that matches backend
                            const slug = (post.title || 'untitled').toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
                            return (
                                <Link
                                    key={post.id}
                                    to={`/our-blogs/${slug}`}
                                    className="block"
                                >
                                    <motion.article
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                                        className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border-2 border-slate-200 h-full"
                                    >
                                        {/* Image */}
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-4 py-1.5 bg-cyan-500 text-white text-xs font-bold rounded-full">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    <span>{post.author}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{post.date}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-cyan-500 transition-colors duration-300">
                                                {post.title}
                                            </h3>

                                            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-4">
                                                <CibatoSlideButton label="Read More" size="small" />
                                            </div>
                                        </div>
                                    </motion.article>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogGrid;
