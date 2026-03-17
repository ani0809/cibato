import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactFormPopup from './ContactFormPopup';
import CibatoSlideButton from './CibatoSlideButton';
import BgGrid from './BgGrid';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';

interface ServiceHeroProps {
    imgUrl?: string;
}

const ServiceHero = ({ imgUrl }: ServiceHeroProps) => {
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
                            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900"
                        >
                            Premium digital solutions for your business{' '}
                            <span className="text-cyan-500">
                                growth
                            </span>
                        </motion.h1>

                        <motion.p
                            {...fadeInUpText}
                            className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                        >
                            At Cibato, we are dedicated to providing exceptional digital solutions tailored to
                            meet the unique needs of your business. As a leading IT company based in
                            Bangladesh, we specialize in a wide range of services designed to drive growth,
                            enhance online visibility, and deliver measurable results. Whether you're looking to
                            revamp your website, improve your SEO ranking, or create stunning visuals for your
                            brand, Cibato has the expertise and resources to help you succeed.
                        </motion.p>

                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                        >
                            <CibatoSlideButton
                                label="GET A FREE CONSULTANCY"
                                onClick={() => setFormOpen(true)}
                                className="font-bold uppercase"
                                size="small"
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        {...fadeInUpImage}
                        className="relative h-[400px] w-full"
                    >
                        <div className="w-full h-full bg-white border-2 border-cyan-200 rounded-3xl shadow-sm overflow-hidden">
                            {imgUrl && (
                                <img
                                    src={imgUrl}
                                    alt="Service Hero"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <ContactFormPopup isOpen={formOpen} onClose={() => setFormOpen(false)} />
        </section>
    );
};

export default ServiceHero;
