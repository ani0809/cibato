import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import LiveDemoModal from './LiveDemoModal';
import { API_URL, UPLOAD_URL } from '../utils/api';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';

const Portfolio = ({ showButton = true }: { showButton?: boolean }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDemoUrl, setCurrentDemoUrl] = useState('');

  const handleOpenDemo = (url: string) => {
    setCurrentDemoUrl(url);
    setIsModalOpen(true);
  };

  // Observer removed

  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    fetch(`${API_URL}/portfolio-categories`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const catNames = ['All', ...data.map((c: any) => c.name)];
          setCategories(catNames);
        }
      })
      .catch(err => console.error('Failed to load categories', err));
  }, []);

  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/portfolios`)
      .then(res => res.json())
      .then(data => {
        const formatted = (Array.isArray(data) ? data : [])
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((p: any) => ({
            ...p,
            id: p.id,
            title: p.title,
            category: p.category,
            description: p.description,
            image: p.image ? (p.image.startsWith('http') ? p.image : `${UPLOAD_URL}${p.image}`) : 'https://placehold.co/600x400?text=No+Image',
            url: p.url,
            slug: p.slug,
            technologies: p.technologies || []
          }));
        setProjects(formatted);
      })
      .catch(err => console.error(err));
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-[60px] lg:py-[80px] relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <motion.span
            {...fadeInUpTitle}
            transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
            className="inline-block px-5 py-2.5 bg-white/30 backdrop-blur-3xl backdrop-saturate-150 border border-white/40 text-slate-900 text-sm font-bold rounded-xl uppercase tracking-wider shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] mb-6"
          >
            OUR PORTFOLIO
          </motion.span>
          <motion.h2
            {...fadeInUpTitle}
            transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
            className="text-5xl lg:text-6xl font-black text-slate-900 mb-6"
          >
            Our Recent <span className="text-cyan-500">Work</span>
          </motion.h2>
          <motion.p
            {...fadeInUpText}
            transition={{ ...fadeInUpText.transition, delay: 0.4 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Explore our diverse portfolio of successful digital projects
          </motion.p>
        </div>

        <motion.div
          {...fadeInUpText}
          transition={{ ...fadeInUpText.transition, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              {...fadeInUpText}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(category)}
              className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 overflow-hidden group ${activeCategory === category
                ? 'text-white border border-white/10'
                : 'bg-white/25 backdrop-blur-3xl backdrop-saturate-150 text-slate-700 border border-white/40'
                }`}
            >
              {activeCategory === category && (
                <span className="absolute inset-0 rounded-lg">
                  <span
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: "linear-gradient(90deg, #00C2FF 0%, #7C3AED 100%)",
                    }}
                  />
                </span>
              )}
              <span className="relative z-10">
                {category}
              </span>
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              {...fadeInUpImage}
              transition={{ ...fadeInUpImage.transition, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100"
            >
              <div className="relative h-64 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 group-hover:scale-105 transition-transform duration-500" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay with Play Button */}
                {project.url && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/10 backdrop-blur-[2px]">
                    <button
                      onClick={() => handleOpenDemo(project.url)}
                      className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-cyan-50"
                    >
                      <Play className="w-4 h-4 fill-current" /> Live Demo
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-cyan-50 text-cyan-600 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                  {project.category}
                </span>
                <Link to={`/portfolio/${project.slug || project.id}`} className="block">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-500 transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {showButton && (
          <motion.div
            {...fadeInUpText}
            transition={{ ...fadeInUpText.transition, delay: 0.4 }}
            className="text-center mt-10"
          >
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
            >
              <span className="text-base">View All Projects</span>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-cyan-500 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </motion.a>
          </motion.div>
        )}

      </div>

      <LiveDemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        demoUrl={currentDemoUrl}
        title="Project Preview"
      />
    </section >
  );
};

export default Portfolio;
