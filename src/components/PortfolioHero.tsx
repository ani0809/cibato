import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';
import ContactFormPopup from './ContactFormPopup';
import CibatoSlideButton from './CibatoSlideButton';
import BgGrid from './BgGrid';

interface PortfolioHeroProps {
    imgUrl?: string;
}

const PortfolioHero = ({ imgUrl }: PortfolioHeroProps) => {
    const [formOpen, setFormOpen] = useState(false);

    return (
        <section className="relative flex items-center overflow-hidden pt-[140px] pb-[10px] lg:pt-[180px] lg:pb-[30px]">
            <BgGrid density={40} glow={0.25} haze={0.08} />

            {/* Animated background orbs with parallax */}
            <div
                className="absolute top-20 left-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] animate-pulse"
            />
            <div
                className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[120px] animate-pulse"
            />

            <div className="container-custom relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="space-y-6 -mt-2.5 -ml-0">
                        <motion.h1
                            {...fadeInUpTitle}
                            transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900"
                        >
                            Showcasing our <span className="text-cyan-500">creative work</span>
                        </motion.h1>

                        <motion.p
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                            className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                        >
                            Explore our portfolio to see how we've helped businesses transform their digital presence.
                            From stunning websites to powerful software solutions, our work reflects our commitment to
                            quality, innovation, and client success. We take pride in delivering results that matter.
                        </motion.p>

                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                        >
                            <CibatoSlideButton
                                label="START YOUR PROJECT"
                                onClick={() => setFormOpen(true)}
                                className="px-8 py-3 font-bold uppercase"
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        {...fadeInUpImage}
                        transition={{ ...fadeInUpImage.transition, delay: 0.4 }}
                        className="relative h-[400px] w-full"
                    >
                        <div className="w-full h-full bg-white border-2 border-cyan-200 rounded-3xl shadow-sm overflow-hidden">
                            <img
                                src={imgUrl || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"}
                                alt="Portfolio Hero"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            <ContactFormPopup isOpen={formOpen} onClose={() => setFormOpen(false)} />
        </section>
    );
};

export default PortfolioHero;
