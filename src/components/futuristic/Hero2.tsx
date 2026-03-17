import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Facebook, Twitter, Instagram, Linkedin, Play, X, Sparkles } from 'lucide-react';
import ContactFormPopup from '../ContactFormPopup';
import FloatingSpheres from './FloatingSpheres';
import {
    fadeInUp,
    fadeInScale,
    glitchReveal,
    letterReveal,
    staggerContainer,
    staggerItem,
    neonPulse,
    magneticButton,
} from '../../utils/animations';
import { useMousePosition } from '../../hooks/useAnimations';

const HeroEnhanced = () => {
    const [mounted, setMounted] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const mousePos = useMousePosition();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [magnetStrength, setMagnetStrength] = useState({ x: 0, y: 0 });

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    useEffect(() => {
        setMounted(true);
    }, []);

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

    // Magnetic button effect
    useEffect(() => {
        if (!buttonRef.current) return;

        const button = buttonRef.current;
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
            Math.pow(mousePos.x - buttonCenterX, 2) + Math.pow(mousePos.y - buttonCenterY, 2)
        );

        if (distance < 150) {
            const strength = Math.max(0, 1 - distance / 150);
            const x = (mousePos.x - buttonCenterX) * strength * 0.3;
            const y = (mousePos.y - buttonCenterY) * strength * 0.3;
            setMagnetStrength({ x, y });
        } else {
            setMagnetStrength({ x: 0, y: 0 });
        }
    }, [mousePos]);

    // Parallax effect
    const parallaxY = (mousePos.y - window.innerHeight / 2) * 0.02;
    const parallaxX = (mousePos.x - window.innerWidth / 2) * 0.02;

    // Cursor lighting effect
    const cursorLightStyle = {
        background: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, rgba(0,200,255,0.15), transparent 80%)`,
    };

    // Split text into letters for animation
    const headingText = "Web agency that";
    const highlightText = "drive results";

    return (
        <section
            id="home"
            ref={ref}
            className="relative flex items-center overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#050A1A] min-h-screen"
        >
            {/* Cursor Reactive Lighting */}
            <div className="absolute inset-0 pointer-events-none z-[2]" style={cursorLightStyle} />

            {/* Floating Spheres & Hologram Rings */}
            <FloatingSpheres />

            {/* Animated Background Waves */}
            <div className="absolute inset-0 opacity-30">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(${45 + i * 60}deg, transparent 40%, rgba(0,200,255,0.1) 50%, transparent 60%)`,
                        }}
                        animate={{
                            translateY: ['-100%', '100%'],
                        }}
                        transition={{
                            duration: 15 + i * 5,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 2,
                        }}
                    />
                ))}
            </div>

            {/* Gradient Streaks */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`streak-${i}`}
                        className="absolute h-px w-64"
                        style={{
                            top: `${20 + i * 20}%`,
                            left: `-20%`,
                            background: 'linear-gradient(90deg, transparent, #00C8FF, transparent)',
                        }}
                        animate={{
                            left: ['- 20%', '120%'],
                        }}
                        transition={{
                            duration: 8 + i,
                            repeat: Infinity,
                            delay: i * 1.5,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        {/* Welcome Badge */}
                        <motion.div variants={fadeInScale} className="inline-block">
                            <motion.div
                                className="glass-card px-6 py-3 rounded-full inline-flex items-center gap-2"
                                variants={neonPulse}
                                initial="initial"
                                animate="animate"
                            >
                                <Sparkles className="w-4 h-4 text-[#29F2FF]" />
                                <span
                                    className="text-[#00C8FF] text-sm font-bold uppercase tracking-wider"
                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                >
                                    Welcome To Cibato
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* Heading with Glitch Reveal */}
                        <div>
                            <motion.h1
                                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                variants={glitchReveal}
                            >
                                <span className="block text-[#E0E6ED]">
                                    {headingText.split('').map((char, i) => (
                                        <motion.span
                                            key={i}
                                            custom={i}
                                            variants={letterReveal}
                                            initial="hidden"
                                            animate={isInView ? 'visible' : 'hidden'}
                                            className="inline-block"
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </span>
                                <motion.span
                                    className="block bg-gradient-to-r from-[#00C8FF] to-[#7A3CFF] bg-clip-text text-transparent mt-2"
                                    variants={glitchReveal}
                                    style={{
                                        textShadow: '0 0 30px rgba(0,200,255,0.5)',
                                    }}
                                >
                                    {highlightText.split('').map((char, i) => (
                                        <motion.span
                                            key={i}
                                            custom={i}
                                            variants={letterReveal}
                                            initial="hidden"
                                            animate={isInView ? 'visible' : 'hidden'}
                                            className="inline-block"
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </motion.span>
                            </motion.h1>
                        </div>

                        {/* Description */}
                        <motion.p
                            className="text-base lg:text-lg text-[#8B92A0] leading-relaxed max-w-xl"
                            style={{ textAlign: 'justify', fontFamily: 'Inter, sans-serif' }}
                            variants={fadeInUp}
                        >
                            Cibato is a leading digital marketing and IT solutions agency dedicated to helping
                            businesses grow in the digital age. Based in Bangladesh, we offer customized,
                            results-driven services tailored to your unique needs. Our expertise includes web
                            design & development, business software, mobile app development, SEO, and digital
                            marketing, ensuring a strong online presence for your brand. We also specialize in
                            graphic design, video editing, voice-over services, and business email solutions to
                            enhance your communication and branding. Whether you're a startup or an established
                            business, Cibato provides innovative strategies to help you succeed in a competitive
                            marketplace.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div className="flex flex-wrap gap-4" variants={staggerItem}>
                            {/* Magnetic Button */}
                            <motion.button
                                ref={buttonRef}
                                onClick={() => setFormOpen(true)}
                                className="relative overflow-hidden"
                                custom={magnetStrength}
                                variants={magneticButton}
                                initial="rest"
                                whileHover="hover"
                                animate={magnetStrength.x !== 0 || magnetStrength.y !== 0 ? 'hover' : 'rest'}
                            >
                                <motion.div
                                    className="neon-button flex items-center gap-2"
                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Get Started
                                    <ArrowRight className="w-5 h-5" />
                                </motion.div>
                            </motion.button>

                            {/* Watch Video Button */}
                            <motion.button
                                onClick={() => setVideoOpen(true)}
                                className="group relative px-8 py-3 glass-card rounded-lg font-bold text-base flex items-center space-x-3"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#00C8FF] to-[#7A3CFF] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative w-12 h-12 bg-gradient-to-br from-[#00C8FF] to-[#7A3CFF] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                                    </div>
                                </div>
                                <span className="text-[#E0E6ED]">Watch Video</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - 3D Tilt Image */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeInScale}
                        className="relative"
                    >
                        <div
                            className="relative max-w-md mx-auto lg:mx-0 lg:ml-8"
                            style={{
                                transform: `perspective(1000px) rotateY(${parallaxX * 0.5}deg) rotateX(${-parallaxY * 0.5}deg)`,
                                transition: 'transform 0.1s ease-out',
                            }}
                        >
                            {/* Neon Edge Highlights */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl"
                                style={{
                                    background:
                                        'linear-gradient(45deg, transparent 30%, rgba(0,200,255,0.5) 50%, transparent 70%)',
                                    backgroundSize: '200% 200%',
                                }}
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                            />

                            {/* Holographic Frame */}
                            <div className="absolute -inset-2 neon-border-blue rounded-3xl blur-sm opacity-50" />

                            <div className="relative rounded-3xl overflow-hidden glass-card h-[550px]">
                                <img
                                    src="/WhatsApp_Image_2025-11-06_at_7.27.45_PM-removebg-preview.png"
                                    alt="Professional Business Person"
                                    className="w-full h-full object-cover object-top"
                                    style={{
                                        transform: 'scale(1) translateX(20px)',
                                        transformOrigin: 'center top',
                                    }}
                                />
                            </div>

                            {/* Floating Stats */}
                            <motion.div
                                className="absolute -bottom-4 -left-4 glass-card neon-border-blue px-6 py-4 rounded-2xl"
                                variants={neonPulse}
                                initial="initial"
                                animate="animate"
                                whileHover={{ scale: 1.1, rotate: -2 }}
                            >
                                <div
                                    className="text-3xl font-black bg-gradient-to-r from-[#00C8FF] to-[#29F2FF] bg-clip-text text-transparent"
                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                >
                                    5+
                                </div>
                                <div
                                    className="text-xs font-bold tracking-wide text-[#8B92A0]"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    Years Experience
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute -top-4 -right-4 glass-card neon-border-purple px-6 py-4 rounded-2xl"
                                variants={neonPulse}
                                initial="initial"
                                animate="animate"
                                whileHover={{ scale: 1.1, rotate: 2 }}
                            >
                                <div
                                    className="text-3xl font-black bg-gradient-to-r from-[#7A3CFF] to-[#00C8FF] bg-clip-text text-transparent"
                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                >
                                    490+
                                </div>
                                <div
                                    className="text-xs font-bold tracking-wide text-[#8B92A0]"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    Projects
                                </div>
                            </motion.div>
                        </div>

                        {/* Social Icons */}
                        <motion.div
                            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3"
                            variants={staggerContainer}
                        >
                            {[
                                { icon: Facebook, link: '#', color: 'from-[#00C8FF] to-[#0066FF]' },
                                { icon: Twitter, link: '#', color: 'from-[#00C8FF] to-[#29F2FF]' },
                                { icon: Instagram, link: '#', color: 'from-[#7A3CFF] to-[#00C8FF]' },
                                { icon: Linkedin, link: '#', color: 'from-[#00C8FF] to-[#7A3CFF]' },
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.link}
                                    className="group relative"
                                    variants={staggerItem}
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <div
                                        className={`absolute -inset-1 bg-gradient-to-br ${social.color} rounded-2xl blur-md opacity-0 group-hover:opacity-70 transition-all duration-500`}
                                    />
                                    <div className="relative w-14 h-14 glass-card rounded-2xl flex items-center justify-center">
                                        <social.icon className="w-6 h-6 text-[#00C8FF] group-hover:text-[#29F2FF] transition-colors" />
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Video Modal */}
            {videoOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={() => setVideoOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="absolute inset-0 bg-[#050A1A]/95 backdrop-blur-3xl" />

                    <motion.div
                        className="relative w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <button
                            onClick={() => setVideoOpen(false)}
                            className="absolute -top-12 right-0 w-12 h-12 neon-button rounded-full flex items-center justify-center"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative glass-card neon-border-blue rounded-3xl p-2">
                            <div className="relative pt-[56.25%] bg-[#050A1A] rounded-2xl overflow-hidden">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                    title="Company Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            <ContactFormPopup isOpen={formOpen} onClose={() => setFormOpen(false)} />
        </section>
    );
};

export default HeroEnhanced;
