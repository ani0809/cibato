import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LiveDemoModal from './LiveDemoModal';
import { API_URL, UPLOAD_URL } from '../utils/api';
import { fadeInUpText, fadeInUpImage } from '../utils/animations';

const WebsiteDemos = ({ showButton = true }: { showButton?: boolean }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDemoUrl, setCurrentDemoUrl] = useState('');

    // Filtering State
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categories, setCategories] = useState<string[]>([]);
    const [demos, setDemos] = useState<any[]>([]);
    const [filteredDemos, setFilteredDemos] = useState<any[]>([]);

    const handleOpenDemo = (url: string) => {
        setCurrentDemoUrl(url);
        setIsModalOpen(true);
    };

    // Observer removed

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Demos
                const demosRes = await fetch(`${API_URL}/demos`);
                const demosData = await demosRes.json();

                // Fetch Categories
                const catsRes = await fetch(`${API_URL}/demo-categories`);
                const catsData = await catsRes.json();

                if (Array.isArray(catsData)) {
                    setCategories(["All", ...catsData.map((c: any) => c.name)]);
                }

                const formattedDemos = (Array.isArray(demosData) ? demosData : [])
                    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((p: any) => ({
                        ...p,
                        image: p.image ? (p.image.startsWith('http') ? p.image : `${UPLOAD_URL}${p.image}`) : 'https://placehold.co/1200x800?text=No+Image',
                    }));

                setDemos(formattedDemos);
                setFilteredDemos(formattedDemos);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredDemos(demos);
        } else {
            setFilteredDemos(demos.filter(d => d.category === selectedCategory));
        }
    }, [selectedCategory, demos]);

    return (
        <section id="demos" className="py-[60px] lg:py-[80px] relative overflow-hidden bg-white">
            <div className="container-custom relative z-10">
                <motion.div
                    {...fadeInUpText}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-5 py-2.5 bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-bold rounded-xl uppercase tracking-wider mb-6">
                        Showcase
                    </span>
                    <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">
                        Website <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Demos</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                        Interactive previews of our web development capabilities.
                    </p>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((cat, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${selectedCategory === cat
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {filteredDemos.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 font-medium">No demos available yet.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
                        <AnimatePresence mode='wait'>
                            {filteredDemos.map((demo) => (
                                <motion.div
                                    key={demo.id}
                                    layout
                                    {...fadeInUpImage}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-200 flex flex-col"
                                >
                                    {/* Browser Header */}
                                    <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                        <div className="ml-2 flex-1 h-5 bg-white rounded-md border border-slate-200 text-[10px] text-slate-400 flex items-center px-2 truncate">
                                            {(() => {
                                                try {
                                                    if (!demo.url) return 'demo.yoursite.com';
                                                    const urlStr = demo.url.startsWith('http') ? demo.url : `https://${demo.url}`;
                                                    return new URL(urlStr).hostname;
                                                } catch (e) {
                                                    return demo.url || 'demo.yoursite.com';
                                                }
                                            })()}
                                        </div>
                                    </div>

                                    {/* Full Height Image with Scroll */}
                                    <div className="relative w-full h-[500px] bg-slate-50 group overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                                        <img
                                            src={demo.image}
                                            alt={demo.title}
                                            className="w-full h-auto block"
                                        />

                                        {/* Overlay Action - Floating Button */}
                                        {demo.url && (
                                            <div className="sticky bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none sticky-overlay z-10">
                                                <button
                                                    onClick={() => handleOpenDemo(demo.url)}
                                                    className="bg-slate-900/90 backdrop-blur-sm text-white px-6 py-2.5 rounded-full font-bold shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-cyan-600 hover:scale-105 pointer-events-auto border border-white/10"
                                                >
                                                    <Monitor className="w-4 h-4" />
                                                    <span className="text-sm">View Demo</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col gap-4 flex-1 border-t border-slate-100">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                {demo.category && (
                                                    <span className="px-2.5 py-0.5 bg-cyan-50 text-cyan-600 text-[11px] font-bold rounded text-uppercase tracking-wider border border-cyan-100">
                                                        {demo.category}
                                                    </span>
                                                )}
                                                {demo.technologies && (
                                                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-bold rounded text-uppercase tracking-wider border border-slate-200">
                                                        {demo.technologies}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                                                {demo.title}
                                            </h3>

                                            <div
                                                className="text-slate-600 text-sm leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: demo.description }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {showButton && (
                    <motion.div
                        {...fadeInUpText}
                        transition={{ ...fadeInUpText.transition, delay: 0.8 }}
                        className="text-center mt-12"
                    >
                        <Link
                            to="/website-demos"
                            className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full transition-all duration-300 shadow-xl"
                        >
                            <span className="text-base">View All Demos</span>
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                <ArrowUpRight className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-300" />
                            </div>
                        </Link>
                    </motion.div>
                )}
            </div>

            <LiveDemoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                demoUrl={currentDemoUrl}
                title="Website Demo"
            />
        </section >
    );
};

export default WebsiteDemos;
