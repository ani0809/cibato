import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUpText, fadeInUpImage } from '../utils/animations';
import { ArrowLeft, Share2, Facebook, Linkedin, X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Contact from '../components/Contact';
import { API_URL, UPLOAD_URL } from '../utils/api';
import SeoHead from '../components/SeoHead';

const SinglePortfolioPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState<any>(null);
    const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch ALL portfolios to find current AND related
                const res = await fetch(`${API_URL}/portfolios`);
                const allProjects = await res.json();

                if (!Array.isArray(allProjects)) throw new Error('Invalid response');

                // 1. Find Current Project
                const found = allProjects.find((p: any) => p.slug === id || p.id === id);

                if (found) {
                    setProject({
                        ...found,
                        image: found.image ? (found.image.startsWith('http') ? found.image : `${UPLOAD_URL}${found.image}`) : 'https://placehold.co/1920x1080?text=Project+Image',
                        categories: [found.category],
                        technologies: found.technologies || [],
                        keyFeatures: found.keyFeatures || []
                    });

                    // 2. Find Related Projects (Same Category, Exclude Current)
                    const related = allProjects
                        .filter((p: any) => p.category === found.category && p.id !== found.id)
                        .slice(0, 6) // Limit to 6
                        .map((p: any) => ({
                            ...p,
                            image: p.image ? (p.image.startsWith('http') ? p.image : `${UPLOAD_URL}${p.image}`) : 'https://placehold.co/600x400?text=No+Image',
                        }));

                    setRelatedProjects(related);
                    setCurrentSlide(0);
                } else {
                    setProject(null);
                }
            } catch (err) {
                console.error(err);
                setProject(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    // Carousel Logic
    const ITEMS_PER_VIEW = 3;
    const maxSlide = Math.max(0, relatedProjects.length - ITEMS_PER_VIEW);
    const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
    const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Project Not Found</h2>
                    <Link to="/portfolio" className="text-cyan-600 hover:text-cyan-700 font-medium">
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-[140px] pb-[10px] lg:pt-[180px] lg:pb-[30px]">
            {project && (
                <SeoHead
                    title={project.seo?.metaTitle || `${project.title} - ${project.client || 'Project'}`}
                    description={project.seo?.metaDescription || project.description?.substring(0, 160)}
                    keywords={project.seo?.keywords || project.technologies?.join(', ')}
                    image={project.seo?.metaImage || project.image}
                    type="article"
                    schemaMarkup={project.seo?.schemaMarkup}
                />
            )}
            <div className="container-custom">

                {/* Back Link */}
                <div className="mb-12">
                    <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" /> Back to Projects
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 mb-24">

                    {/* LEFT COLUMN: Image + Content - 7 Columns */}
                    <div className="lg:col-span-7 space-y-20">
                        {/* 1. Image */}
                        <motion.div
                            {...fadeInUpImage}
                            className="rounded-xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-200"
                        >
                            <div className="h-12 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex-1 mx-4 h-8 bg-white rounded-md border border-slate-200 flex items-center px-3 text-xs text-slate-400 font-mono overflow-hidden">
                                    {project.url || 'https://portfolio.com/project'}
                                </div>
                            </div>
                            <div className="relative aspect-[16/10] bg-white group">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-top transition-transform duration-1000 ease-in-out group-hover:scale-[1.02]"
                                />
                            </div>
                        </motion.div>

                        {/* 2. Content Sections */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.2 }}
                            className="space-y-16"
                        >
                            {/* Project Description */}
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 mb-6">Project Description</h2>
                                <div
                                    className="prose prose-lg text-slate-600 max-w-none leading-relaxed break-words"
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Key Info Sidebar - 5 Columns */}
                    <div className="lg:col-span-5">
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.2 }}
                            className="sticky top-32"
                        >
                            {/* Title Section */}
                            <div className="border-b border-slate-100 pb-8 mb-8">
                                <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider rounded-md mb-4">
                                    {project.category}
                                </span>
                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight break-words">
                                    {project.title}
                                </h1>

                                <div className="flex items-center gap-4 text-sm font-bold text-slate-900">
                                    <Share2 className="w-4 h-4" />
                                    <span>Share</span>
                                    <div className="h-px w-8 bg-slate-200"></div>
                                    <div className="flex gap-2">
                                        <a href="#" className="p-2 rounded-full hover:bg-slate-100 transition-colors"><Facebook className="w-4 h-4" /></a>
                                        <a href="#" className="p-2 rounded-full hover:bg-slate-100 transition-colors"><X className="w-4 h-4" /></a>
                                        <a href="#" className="p-2 rounded-full hover:bg-slate-100 transition-colors"><Linkedin className="w-4 h-4" /></a>
                                    </div>
                                </div>
                            </div>

                            {/* Meta Details List */}
                            <div className="space-y-8 mb-10">
                                {project.url && (
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 mb-1">Project URL</h3>
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-base text-slate-500 hover:text-cyan-600 transition-colors break-words font-medium block">
                                            {project.url}
                                        </a>
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 mb-1">Client</h3>
                                    <p className="text-base text-slate-500 font-medium break-words">{project.client || 'Confidential'}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 mb-1">Release Date</h3>
                                    <p className="text-base text-slate-500 font-medium">{project.duration || '2025'}</p>
                                </div>

                                {/* Tech Stack - Moved Here */}
                                {project.technologies && project.technologies.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 mb-2">Technologies Used</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 font-medium text-xs rounded-md border border-slate-200">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Launch Button */}
                            {project.url && (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl mb-12"
                                >
                                    View Project
                                </a>
                            )}
                        </motion.div>
                    </div>

                </div>

                {/* Related Projects Carousel */}
                {relatedProjects.length > 0 && (
                    <div className="border-t border-slate-100 pt-16 mb-20">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-3xl font-black text-slate-900">Related Projects</h3>
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
                                animate={{ x: `-${currentSlide * (33.33 + 0)}%` }}
                            >
                                <div className="flex gap-6 w-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * (100 / ITEMS_PER_VIEW)}%)` }}>
                                </div>
                            </motion.div>

                            <div className="relative overflow-hidden">
                                <div
                                    className="flex transition-transform duration-500 ease-out"
                                    style={{ transform: `translateX(-${currentSlide * (100 / ITEMS_PER_VIEW)}%)` }}
                                >
                                    {relatedProjects.map((p) => (
                                        <div
                                            key={p.id}
                                            className="min-w-[100%] md:min-w-[50%] lg:min-w-[33.333%] px-3 box-border"
                                        >
                                            <Link to={`/portfolio/${p.slug || p.id}`} className="group block h-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                                                <div className="relative h-64 overflow-hidden">
                                                    <img
                                                        src={p.image}
                                                        alt={p.title}
                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-cyan-600 rounded-full">
                                                            {p.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <h4 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-cyan-500 transition-colors">
                                                        {p.title}
                                                    </h4>
                                                    <div className="flex items-center text-cyan-500 font-bold text-sm gap-1 group-hover:gap-2 transition-all">
                                                        View Project <ArrowUpRight className="w-4 h-4" />
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

            </div>
            <Contact />
        </div>
    );
};

export default SinglePortfolioPage;
