import { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Play, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';
import ContactFormPopup from './ContactFormPopup';
import CibatoSlideButton from './CibatoSlideButton';
import BgGrid from './BgGrid';

interface AboutHeroProps {
    imgUrl?: string;
}

const AboutHero = ({ imgUrl }: AboutHeroProps) => {
    const [videoOpen, setVideoOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        if (videoOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [videoOpen]);

    return (
        <section id="home" className="relative flex items-center overflow-hidden pt-[140px] pb-[10px] lg:pt-[180px] lg:pb-[30px]">
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
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.1 }}
                            className="inline-block"
                        >
                            <span className="px-5 py-2.5 bg-white/30 backdrop-blur-3xl backdrop-saturate-150 border border-white/40 text-slate-900 text-sm font-bold rounded-xl uppercase tracking-wider shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]">
                                Welcome To Cibato
                            </span>
                        </motion.div>

                        <motion.h1
                            {...fadeInUpTitle}
                            transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900"
                        >
                            <span className="inline-block">
                                Web agency that
                            </span>
                            <br />
                            <span className="inline-block text-cyan-500">
                                drive results
                            </span>
                        </motion.h1>

                        <motion.p
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                            className="text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl"
                            style={{ textAlign: 'justify' }}
                        >
                            Cibato is a leading digital marketing and IT solutions agency dedicated to helping businesses grow in the digital age. Based in Bangladesh, we offer customized, results-driven services tailored to your unique needs. Our expertise includes web design & development, business software, mobile app development, SEO, and digital marketing, ensuring a strong online presence for your brand. We also specialize in graphic design, video editing, voice-over services, and business email solutions to enhance your communication and branding. Whether you're a startup or an established business, Cibato provides innovative strategies to help you succeed in a competitive marketplace.
                        </motion.p>

                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            <CibatoSlideButton
                                label="Get Started"
                                onClick={() => setFormOpen(true)}
                                className="px-6 py-2.5 font-bold"
                            />
                            <button
                                onClick={() => setVideoOpen(true)}
                                className="group flex items-center gap-3 pl-8 pr-2 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
                            >
                                <span className="text-base">Watch Video</span>
                                <div className="relative">
                                    <span className="absolute inset-0 rounded-full bg-white/50 animate-ping"></span>
                                    <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                        <Play className="w-5 h-5 text-cyan-500 fill-cyan-500 ml-0.5 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </div>
                            </button>
                        </motion.div>
                    </div>

                    <motion.div
                        {...fadeInUpImage}
                        transition={{ ...fadeInUpImage.transition, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="relative max-w-md mx-auto lg:mx-0 lg:ml-8">
                            <div className="relative rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500 h-[550px]">
                                <img
                                    src={imgUrl || "/hero-person.png"}
                                    alt="Professional Business Person"
                                    className="w-full h-full object-cover object-top"
                                    style={{
                                        transform: 'scale(1) translateX(20px)',
                                        transformOrigin: 'center top'
                                    }}
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                                className="absolute -bottom-4 -left-4 bg-white/30 backdrop-blur-3xl backdrop-saturate-150 border border-white/40 text-slate-900 px-6 py-3 rounded-2xl shadow-[0_20px_60px_0_rgba(0,0,0,0.2)] animate-float-medium"
                            >
                                <div className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">5+</div>
                                <div className="text-xs font-bold tracking-wide">Years Experience</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
                                className="absolute -top-4 -right-4 bg-white/30 backdrop-blur-3xl backdrop-saturate-150 border border-white/40 text-slate-900 px-6 py-3 rounded-2xl shadow-[0_20px_60px_0_rgba(0,0,0,0.2)] animate-float-slower"
                            >
                                <div className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">490+</div>
                                <div className="text-xs font-bold tracking-wide">Projects</div>
                            </motion.div>
                        </div>

                        <div className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                            {[
                                { icon: Facebook, link: 'https://www.facebook.com/wecibato' },
                                { icon: Instagram, link: 'https://www.instagram.com/wecibato' },
                                { icon: Linkedin, link: 'https://www.linkedin.com/company/cibato-com' },
                                { icon: X, link: 'https://x.com/CibatoC' }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    className="w-12 h-12 bg-cyan-500 hover:bg-cyan-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                                >
                                    <social.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {
                videoOpen && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
                        onClick={() => setVideoOpen(false)}
                    >
                        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-3xl backdrop-saturate-150"></div>

                        <div
                            className="relative w-full max-w-5xl animate-scale-in"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setVideoOpen(false)}
                                className="absolute -top-12 right-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-xl"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="relative bg-white/15 backdrop-blur-3xl backdrop-saturate-150 border border-white/25 rounded-3xl p-2 shadow-[0_20px_80px_0_rgba(0,0,0,0.4)]">
                                <div className="relative pt-[56.25%] bg-slate-900 rounded-2xl overflow-hidden">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                        title="Company Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>

                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                <div className="bg-white/20 backdrop-blur-3xl backdrop-saturate-150 border border-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                                    Click outside or press ESC to close
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <ContactFormPopup isOpen={formOpen} onClose={() => setFormOpen(false)} />
        </section >
    );
};

export default AboutHero;
