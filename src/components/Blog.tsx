import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/api';
import { fadeInUpTitle, fadeInUpText } from '../utils/animations';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    slug: string;
}

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(3);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(`${API_URL}/blogs`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    // Map backend data to component structure if needed, or use as is
                    // Assuming backend returns matching fields or close enough
                    const formattedPosts = data.map((post: any) => ({
                        id: post.id,
                        title: post.title,
                        excerpt: post.excerpt || (typeof post.content === 'string' ? post.content.substring(0, 100) : '') + '...', // Fallback excerpt
                        image: post.image || '/blog/default.png',
                        category: post.category || 'General',
                        slug: post.slug
                    }));
                    setBlogPosts(formattedPosts.slice(0, 6)); // Limit to latest 6
                }
            } catch (error) {
                console.error('Failed to fetch blogs', error);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setVisibleCards(1);
            } else if (window.innerWidth < 1024) {
                setVisibleCards(2);
            } else {
                setVisibleCards(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (blogPosts.length === 0) return;
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Auto-play every 5 seconds

        return () => clearInterval(interval);
    }, [currentIndex, visibleCards, blogPosts.length]);

    const nextSlide = () => {
        if (blogPosts.length === 0) return;
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 >= blogPosts.length - (visibleCards - 1) ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        if (blogPosts.length === 0) return;
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? blogPosts.length - visibleCards : prevIndex - 1
        );
    };

    if (blogPosts.length === 0) {
        return null; // Don't show section if no blogs
    }


    return (
        <section className="py-[60px] lg:py-[80px] relative overflow-hidden">
            <div className="container-custom relative z-10">
                <motion.div
                    {...fadeInUpText}
                    className="text-center mb-6"
                >
                    <span className="inline-block px-5 py-2.5 bg-white/30 backdrop-blur-3xl backdrop-saturate-150 border border-white/40 text-slate-900 text-sm font-bold rounded-xl uppercase tracking-wider shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] mb-3">
                        READ OUR BLOGS
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                        Latest <span className="text-cyan-500">tips & tricks</span>
                    </h2>
                </motion.div>

                <div className="relative mb-0 group/carousel pt-8 pb-12">
                    <div className="overflow-x-hidden overflow-y-visible">
                        <motion.div
                            className="flex gap-6"
                            animate={{ x: `-${currentIndex * (100 / visibleCards)}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {blogPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className={`flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)]`}
                                >
                                    <div className="bg-white rounded-[10px] overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-500 h-full group/card hover:scale-[1.01] hover:-translate-y-1">
                                        <div className="relative overflow-hidden h-64">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-start p-6">
                                                <span className="text-white font-bold text-lg">{post.category}</span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <Link to={`/our-blogs/${post.slug}`} className="block group/link">
                                                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover/link:text-cyan-500 transition-colors duration-300">
                                                    {post.title}
                                                </h3>
                                            </Link>
                                            <p className="text-slate-600 line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-cyan-50 transition-all opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 z-20"
                        aria-label="Previous slide"
                    >
                        <ArrowLeft className="w-6 h-6 text-slate-900" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-cyan-50 transition-all opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 z-20"
                        aria-label="Next slide"
                    >
                        <ArrowRight className="w-6 h-6 text-slate-900" />
                    </button>
                </div>

                <div className="text-center -mt-[10px]">
                    <Link to="/our-blogs">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
                        >
                            <span className="text-base">See More Blogs</span>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <ArrowUpRight className="w-5 h-5 text-cyan-500 group-hover:rotate-45 transition-transform duration-300" />
                            </div>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Blog;
