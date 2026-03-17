import { useState, useEffect } from 'react';
import { ArrowRight, Play, Facebook, Twitter, Instagram, Linkedin, X } from 'lucide-react';
import ContactFormPopup from '../ContactFormPopup';

const CreativeHero = () => {
    const [mounted, setMounted] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);

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

    return (
        <section id="home" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 bg-white overflow-hidden">
            {/* Geometric Background Shapes */}
            <div className="absolute top-20 right-10 w-64 h-64 geometric-circle" style={{ animationDelay: '0s' }} />
            <div className="absolute bottom-20 left-10 w-48 h-48 geometric-square" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/4 w-32 h-32 geometric-circle" style={{ animationDelay: '4s' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* Left Content - 7 columns */}
                    <div className={`lg:col-span-7 space-y-8 ${mounted ? 'slide-in-left' : 'opacity-0'}`}>

                        {/* Welcome Badge */}
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-soft border-2 border-indigo-100">
                            <span className="decorative-dot"></span>
                            <span className="text-sm font-bold text-indigo-600 uppercase tracking-wide">
                                Welcome To Cibato
                            </span>
                        </div>

                        {/* Large Heading with slight rotation */}
                        <div className="rotate-slight-left">
                            <h1 className="creative-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
                                <span className="block text-gray-900">Web agency that</span>
                                <span className="block creative-gradient-text mt-2">drive results</span>
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                            Cibato is a leading digital marketing and IT solutions agency dedicated to helping businesses grow in the digital age. Based in Bangladesh, we offer customized, results-driven services tailored to your unique needs.
                        </p>

                        {/* CTA Buttons */}
                        <div className={`flex flex-wrap gap-4 ${mounted ? 'fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                            <button
                                onClick={() => setFormOpen(true)}
                                className="creative-button inline-flex items-center gap-2"
                            >
                                Get Started
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => setVideoOpen(true)}
                                className="creative-button-outline inline-flex items-center gap-3"
                            >
                                <div className="w-10 h-10 bg-gradient-indigo-pink rounded-full flex items-center justify-center">
                                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                                </div>
                                <span>Watch Video</span>
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className={`flex gap-4 ${mounted ? 'scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                            {[
                                { icon: Facebook, link: '#', color: 'hover:text-blue-600' },
                                { icon: Twitter, link: '#', color: 'hover:text-sky-500' },
                                { icon: Instagram, link: '#', color: 'hover:text-pink-600' },
                                { icon: Linkedin, link: '#', color: 'hover:text-blue-700' },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 transition-all duration-300 hover:shadow-md ${social.color} hover:-translate-y-1`}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - 5 columns with offset */}
                    <div className={`lg:col-span-5 relative ${mounted ? 'slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                        <div className="relative rotate-slight-right">
                            {/* Main Image */}
                            <div className="creative-image overflow-hidden">
                                <img
                                    src="/WhatsApp_Image_2025-11-06_at_7.27.45_PM-removebg-preview.png"
                                    alt="Professional Business Person"
                                    className="w-full h-auto object-cover"
                                    style={{ transform: 'scale(1.05)' }}
                                />
                            </div>

                            {/* Floating Stats - Bottom Left */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-float rotate-slight-left">
                                <div className="text-4xl sm:text-5xl font-bold creative-gradient-text">5+</div>
                                <div className="text-sm font-semibold text-gray-600 mt-1">Years Experience</div>
                            </div>

                            {/* Floating Stats - Top Right */}
                            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-float rotate-slight-right">
                                <div className="text-4xl sm:text-5xl font-bold bg-gradient-green-blue bg-clip-text text-transparent">490+</div>
                                <div className="text-sm font-semibold text-gray-600 mt-1">Projects</div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute top-1/2 -right-8 w-24 h-24 bg-gradient-amber-pink rounded-full opacity-20 blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {videoOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-75 fade-in"
                    onClick={() => setVideoOpen(false)}
                >
                    <div className="relative w-full max-w-5xl scale-in" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setVideoOpen(false)}
                            className="absolute -top-12 right-0 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="bg-white rounded-3xl p-2 shadow-2xl">
                            <div className="relative pt-[56.25%] bg-gray-900 rounded-2xl overflow-hidden">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                    title="Company Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ContactFormPopup isOpen={formOpen} onClose={() => setFormOpen(false)} />
        </section>
    );
};

export default CreativeHero;
