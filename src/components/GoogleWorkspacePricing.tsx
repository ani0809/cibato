import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUpTitle, fadeInUpText } from '../utils/animations';
import { Check } from 'lucide-react';

// Common Google Icons (SVGs)
// Since we don't have them locally, I'll use inline SVGs or reliable sources.
// For now, I'll use placeholders or simple styled text if SVGs are too large, 
// BUT the user asked to "check logos carefully". I'll try to use image tags pointing to official-looking URLs or simple SVGs.
// I'll use a map for simplicity.

const AppIcon = ({ name }: { name: string }) => {
    const iconName = name.toLowerCase();

    // Map for exceptions or fallbacks
    const extMap: any = {
        'vids': 'png'
    };

    const ext = extMap[iconName] || 'svg';
    const src = `/icons/google/${iconName}.${ext}`;

    // Hardcoded SVGs for tricky icons that might fail downloading
    const svgFallbacks: any = {
        jamboard: (
            <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#F3A702" />
            </svg>
        ),
        sites: (
            <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4A8AF5" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h14v14H5z" />
                <path fill="#4A8AF5" d="M7 7h2v2H7zM7 11h2v2H7zM7 15h2v2H7zM11 7h6v2h-6zM11 11h6v2h-6zM11 15h6v2h-6z" />
            </svg>
        ),
        vids: (
            <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="#A142F4" />
                <path d="M10 8l6 4-6 4V8z" fill="white" />
            </svg>
        ),
        gemini: (
            <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#paint0_linear)" />
                <defs>
                    <linearGradient id="paint0_linear" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4285F4" />
                        <stop offset="1" stopColor="#DB4437" />
                    </linearGradient>
                </defs>
            </svg>
        )
    };

    const [imgFailed, setImgFailed] = React.useState(false);

    return (
        <div className="bg-[#F0F7FF] w-full h-[110px] rounded-xl flex flex-col items-center justify-center p-3 hover:shadow-lg transition-all border border-[#E1EFFE] group cursor-default">
            <div className="w-10 h-10 mb-3 flex items-center justify-center relative">
                {!imgFailed ? (
                    <img
                        src={src}
                        alt={name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={() => setImgFailed(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        {svgFallbacks[iconName] || (
                            <span className="text-xl font-bold text-slate-400">{name[0]}</span>
                        )}
                    </div>
                )}
            </div>
            <span className="text-[14px] font-bold text-slate-700">{name}</span>
        </div>
    );
};

interface PricingProps {
    data: any;
}

const GoogleWorkspacePricing = ({ data }: PricingProps) => {
    if (!data) return null;

    const { customPricing, appsIncluded } = data;

    if (!customPricing) return null;

    return (
        <section className="py-[60px] lg:py-[80px]">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <motion.h2
                        {...fadeInUpTitle}
                        className="text-3xl lg:text-4xl font-black text-slate-900 mb-4"
                    >
                        {customPricing.title}
                    </motion.h2>
                    <motion.p
                        {...fadeInUpText}
                        className="text-lg text-slate-600"
                    >
                        {customPricing.subtitle}
                    </motion.p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {customPricing.plans?.map((plan: any, i: number) => (
                        <motion.div
                            key={i}
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: i * 0.1 }}
                            className="border-2 border-cyan-400 rounded-2xl overflow-hidden hover:shadow-2xl transition-all bg-white flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-8 text-center border-b border-cyan-100">
                                <h3 className="text-3xl font-black text-slate-900 mb-4">{plan.name}</h3>
                                <p className="text-sm text-slate-600 mb-6 min-h-[40px]">{plan.description}</p>
                                <div className="text-3xl font-black text-red-500 mb-6">{plan.price}</div>
                                <button className="border-2 border-cyan-400 text-cyan-500 font-bold py-2 px-8 rounded hover:bg-cyan-400 hover:text-white transition-colors uppercase text-sm">
                                    {plan.buttonText}
                                </button>
                            </div>

                            {/* Features Scroll/List */}
                            <div className="p-6 flex-grow text-sm">
                                {/* Top Features */}
                                <div className="mb-6 space-y-2">
                                    {plan.features.top.map((feat: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-slate-700 font-semibold">{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Drive Icon */}
                                <div className="mb-6 flex items-center gap-3">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-8 h-8" />
                                    <span className="text-xs text-slate-500 leading-tight">Store, share and access files effortlessly over the cloud from any device.</span>
                                </div>

                                {/* Communicate */}
                                <div className="mb-4">
                                    <h4 className="font-bold text-slate-900 mb-2">Communicate</h4>
                                    <div className="space-y-2">
                                        {plan.features.communicate.map((feat: string, idx: number) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <Check className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-600">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Collaborate */}
                                <div className="mb-4">
                                    <h4 className="font-bold text-slate-900 mb-2">Collaborate</h4>
                                    <div className="space-y-2">
                                        {plan.features.collaborate.map((feat: string, idx: number) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <Check className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-600">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Control */}
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2">Control</h4>
                                    <div className="space-y-2">
                                        {plan.features.control.map((feat: string, idx: number) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <Check className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-600">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Apps Grid */}
                {appsIncluded && (
                    <div className="text-center">
                        <motion.h3
                            {...fadeInUpTitle}
                            className="text-2xl font-black text-slate-900 mb-2"
                        >
                            {appsIncluded.title}
                        </motion.h3>
                        <motion.p
                            {...fadeInUpText}
                            className="text-slate-600 mb-10"
                        >
                            {appsIncluded.subtitle}
                        </motion.p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {appsIncluded.apps.map((app: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <AppIcon name={app.name} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GoogleWorkspacePricing;
