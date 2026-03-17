import { motion } from 'framer-motion';
import { fadeInUpTitle, fadeInUpText } from '../utils/animations';
import BgGrid from './BgGrid';

const BlogHero = () => {
    return (
        <section className="relative flex items-center overflow-hidden pt-[140px] pb-[10px] lg:pt-[180px] lg:pb-[30px]">
            <BgGrid density={40} glow={0.25} haze={0.08} />

            {/* Animated background orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[120px] animate-pulse" />

            <div className="container-custom relative z-10 w-full">
                <div className="text-center max-w-3xl mx-auto">
                    <motion.h1
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900 mb-6"
                    >
                        Our <span className="text-cyan-500">Blog</span>
                    </motion.h1>

                    <motion.p
                        {...fadeInUpText}
                        transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                        className="text-base lg:text-lg text-slate-600 leading-relaxed"
                    >
                        Insights, tips, and updates from the world of digital marketing and web development
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

export default BlogHero;
