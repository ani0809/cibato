import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';
import { Calendar, User, ArrowLeft, Facebook, X, Linkedin, Share2, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import Contact from '../components/Contact';
import { API_URL, UPLOAD_URL } from '../utils/api';
import SeoHead from '../components/SeoHead';

const SingleBlogPage = () => {
    const { slug } = useParams();
    // const [isVisible, setIsVisible] = useState(false); // Removed custom observer state
    // const sectionRef = useRef<HTMLDivElement>(null); // Removed custom observer ref
    const [blogPost, setBlogPost] = useState<any>(null);
    const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        // Fetch categories for sidebar
        fetch(`${API_URL}/categories`)
            .then(res => res.json())
            .then(data => setCategories(Array.isArray(data) ? data : []))
            .catch(() => console.error('Failed to load categories'));
    }, []);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        window.scrollTo(0, 0);

        // Fetch ALL blogs to find current AND related
        fetch(`${API_URL}/blogs`)
            .then(res => res.json())
            .then(allBlogs => {
                if (!Array.isArray(allBlogs)) throw new Error('Invalid response');

                // 1. Find Current Blog
                const found = allBlogs.find((b: any) => {
                    const title = b.title || '';
                    const s = title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
                    return s === slug || b.id === slug;
                });

                if (!found) {
                    setBlogPost(null);
                    return;
                }

                // Process Current Blog Data
                setBlogPost({
                    ...found,
                    image: found.image ? (found.image.startsWith('http') ? found.image : `${UPLOAD_URL}${found.image}`) : 'https://placehold.co/800x600?text=No+Image',
                    featuredImage: found.image ? (found.image.startsWith('http') ? found.image : `${UPLOAD_URL}${found.image}`) : 'https://placehold.co/800x600?text=No+Image',
                    author: 'Cibato Team',
                    date: new Date(found.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    datePublished: found.createdAt,
                    metaDescription: found.excerpt,
                    tags: [found.category]
                });

                // 2. Find Related Posts (Same Category, Exclude Current)
                const related = allBlogs
                    .filter((b: any) => b.category === found.category && b.id !== found.id)
                    .slice(0, 6) // Limit to 6
                    .map((b: any) => ({
                        ...b,
                        slug: b.slug || b.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
                        image: b.image ? (b.image.startsWith('http') ? b.image : `${UPLOAD_URL}${b.image}`) : 'https://placehold.co/600x400?text=No+Image',
                        date: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    }));

                setRelatedPosts(related);
                setCurrentSlide(0); // Reset carousel
            })
            .catch(err => {
                console.error(err);
                setBlogPost(null);
            })
            .finally(() => setLoading(false));
    }, [slug]);

    useEffect(() => {
        if (!blogPost) return;
        document.title = `${blogPost.title} | Cibato Blog`;
    }, [blogPost]);

    useEffect(() => {
        if (!blogPost) return;
        document.title = `${blogPost.title} | Cibato Blog`;
    }, [blogPost]);

    // Removed custom IntersectionObserver effect

    // Carousel Logic
    const ITEMS_PER_VIEW = 3;
    const maxSlide = Math.max(0, relatedPosts.length - ITEMS_PER_VIEW);

    const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
    const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

    // Handle single blog card click to force reload if needed (Link usually handles it, but just in case)

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-slate-500">Loading blog post...</div>
            </div>
        );
    }

    if (!blogPost) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <div className="text-xl text-slate-500">Blog post not found.</div>
                <Link to="/our-blogs" className="text-cyan-500 hover:underline">Return to Blogs</Link>
            </div>
        );
    }

    return (
        <>
            {blogPost && (
                <SeoHead
                    title={blogPost.seo?.metaTitle || blogPost.title}
                    description={blogPost.seo?.metaDescription || blogPost.excerpt}
                    keywords={blogPost.seo?.keywords}
                    image={blogPost.seo?.metaImage || blogPost.featuredImage}
                    type="article"
                    schemaMarkup={blogPost.seo?.schemaMarkup}
                />
            )}
            <section className="relative pt-[140px] pb-[10px] lg:pt-[180px] lg:pb-[30px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50"></div>
                <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[140px] animate-pulse"></div>

                <div className="container-custom relative z-10">
                    <Link
                        to="/our-blogs"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl text-cyan-500 hover:text-cyan-600 hover:bg-white font-semibold mb-8 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Blog
                    </Link>

                    <motion.div
                        {...fadeInUpText}
                        transition={{ ...fadeInUpText.transition, delay: 0.1 }}
                    >
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.2 }}
                            className="mb-6"
                        >
                            <span className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold rounded-full shadow-lg shadow-cyan-500/30">
                                {blogPost.category}
                            </span>
                        </motion.div>

                        <motion.h1
                            {...fadeInUpTitle}
                            transition={{ ...fadeInUpTitle.transition, delay: 0.3 }}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8"
                        >
                            <span className="bg-gradient-to-r from-slate-900 via-cyan-900 to-slate-900 bg-clip-text text-transparent">
                                {blogPost.title}
                            </span>
                        </motion.h1>

                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                            className="inline-flex items-center gap-6 px-6 py-4 bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Written by</p>
                                    <p className="font-bold text-slate-900">{blogPost.author}</p>
                                </div>
                            </div>
                            <div className="h-10 w-px bg-slate-200"></div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Published on</p>
                                    <time dateTime={blogPost.datePublished} className="font-bold text-slate-900">{blogPost.date}</time>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <article className="pt-[20px] pb-[60px] lg:pb-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="lg:col-span-12 mb-8"
                        >
                            <img
                                src={blogPost.featuredImage}
                                alt="Featured blog post illustration"
                                className="w-full h-[600px] object-cover rounded-3xl shadow-xl border-2 border-slate-200"
                                loading="eager"
                            />
                        </motion.div>

                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.2 }}
                            className="lg:col-span-8"
                        >
                            <div
                                className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6 break-words break-all"
                                dangerouslySetInnerHTML={{ __html: blogPost.content }}
                            />

                            {/* Related Posts Carousel */}
                            {relatedPosts.length > 0 && (
                                <div className="mt-20 border-t border-slate-100 pt-16">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-3xl font-black text-slate-900">Related Posts</h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={prevSlide}
                                                disabled={currentSlide === 0}
                                                className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-slate-100 disabled:hover:text-slate-600"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={nextSlide}
                                                disabled={currentSlide >= maxSlide}
                                                className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-slate-100 disabled:hover:text-slate-600"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="overflow-hidden p-2 -m-2">
                                        <motion.div
                                            className="flex gap-6"
                                            initial={false}
                                            animate={{ x: `-${currentSlide * (33.33 + 0)}%` }} // Approximate percentage for 3 items. Better to use strict grid.
                                        // Ideally we map 3 items per view. Let's use a Grid approach but we need sliding. 
                                        // Simplest authentic carousel:
                                        >
                                            <div className="flex gap-6 w-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * (100 / ITEMS_PER_VIEW)}%)` }}>
                                                {/* To make the slide math easier, we can just map and set fixed width relative to container */}
                                            </div>
                                        </motion.div>

                                        {/* Re-implementing correctly with simple flex + translate */}
                                        <div className="relative overflow-hidden">
                                            <div
                                                className="flex transition-transform duration-500 ease-out"
                                                style={{ transform: `translateX(-${currentSlide * (100 / ITEMS_PER_VIEW)}%)` }}
                                            >
                                                {relatedPosts.map((post) => (
                                                    <div
                                                        key={post.id}
                                                        className="min-w-[100%] md:min-w-[50%] lg:min-w-[33.333%] px-3 box-border"
                                                    >
                                                        <Link to={`/blog/${post.slug}`} className="group block h-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                                                            <div className="relative h-48 overflow-hidden">
                                                                <img
                                                                    src={post.image}
                                                                    alt={post.title}
                                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                                />
                                                                <div className="absolute top-4 left-4">
                                                                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-cyan-600 rounded-full">
                                                                        {post.category}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="p-6">
                                                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                                                    <Calendar className="w-3 h-3" />
                                                                    <span>{post.date}</span>
                                                                </div>
                                                                <h4 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-cyan-500 transition-colors">
                                                                    {post.title}
                                                                </h4>
                                                                <div className="flex items-center text-cyan-500 font-bold text-sm gap-1 group-hover:gap-2 transition-all">
                                                                    Read Article <ArrowUpRight className="w-4 h-4" />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </motion.div>

                        <motion.aside
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                            className="lg:col-span-4"
                        >
                            <div className="sticky top-24 space-y-8">
                                <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200">
                                    <h3 className="text-xl font-black text-slate-900 mb-4">Categories</h3>
                                    <div className="space-y-2">
                                        {categories.length > 0 ? categories.map((cat: any) => (
                                            <Link
                                                key={cat.id}
                                                to={`/category/${cat.slug}`}
                                                className={`block w-full text-left px-4 py-2.5 rounded-xl transition-all duration-300 ${cat.name === blogPost.category
                                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg'
                                                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium'
                                                    }`}
                                            >
                                                {cat.name}
                                            </Link>
                                        )) : <p className="text-slate-500 text-sm">No categories found.</p>}
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200">
                                    <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                        <Share2 className="w-5 h-5 text-cyan-500" />
                                        Share This Post
                                    </h3>
                                    <div className="flex gap-3">
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-300"
                                        >
                                            <Facebook className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blogPost.title}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors duration-300"
                                        >
                                            <X className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl transition-colors duration-300"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </div>
                </div>
            </article>

            <Contact />
        </>
    );
};

export default SingleBlogPage;
