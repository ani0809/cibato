import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';
import { Check } from 'lucide-react';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import LogoCarousel from '../components/LogoCarousel';
import BgGrid from '../components/BgGrid';
import CibatoSlideButton from '../components/CibatoSlideButton';
import ContactFormPopup from '../components/ContactFormPopup';
import AwardsCertifications from '../components/AwardsCertifications';
import WhyChoose from '../components/WhyChoose';
import Portfolio from '../components/Portfolio';
import { usePageData } from '../hooks/usePageData';

const VoiceOver = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl } = usePageData('voice-over-page-id');

    return (
        <>
            {/* Hero Section */}
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
                                className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-slate-900"
                            >
                                Genuine Human <span className="text-cyan-500">Voice Over</span> Services For Every Need!
                            </motion.h1>

                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Looking for high-quality Voice Over Services that bring your content to life? At Cibato, we provide expert Voice Over Services for commercials, explainer videos, e-learning, audiobooks, and more. Our talented voice artists deliver natural, engaging, and professional recordings tailored to your needs. Whether you need a warm and friendly tone or a powerful and authoritative voice, our Voice Over Services ensure clarity and impact. With fast turnaround times and studio-quality recordings, we help you create compelling audio content that resonates with your audience. Let's give your brand a voice that stands out!
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
                            transition={{ ...fadeInUpImage.transition, delay: 0.4 }}
                            className="relative h-[400px] w-full flex items-center justify-center"
                        >
                            <img
                                src={getImageUrl('hero', 'https://img.freepik.com/free-vector/voice-recording-concept-illustration_114360-4468.jpg')}
                                alt="Voice Over Services"
                                className="w-full h-full object-contain rounded-3xl shadow-2xl border-2 border-cyan-200"
                            />
                        </motion.div>
                    </div>
                </div>

                <ContactFormPopup isOpen={formOpen} onClose={() => setFormOpen(false)} />
            </section>

            {/* Awards Section */}
            <AwardsCertifications className="-mt-5 relative z-20" />

            {/* Creative Services Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('elevateContent', 'https://img.freepik.com/free-vector/voice-recording-studio-concept-illustration_114360-5003.jpg')}
                                alt="Elevate Your Content"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-4xl lg:text-5xl font-black text-slate-900 mb-6"
                            >
                                How Can We <span className="text-cyan-500">Elevate Your Content</span> With Professional Voice Over Services?
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                At Cibato, we provide professional voice over services that enhance your brand's message and engage your audience. Whether for commercials, corporate videos, e-learning, or podcasts, our talented voice artists deliver crisp, high-quality recordings tailored to your needs. Our voice over services ensure clear communication, emotional connection, and a professional touch that makes your content stand out. With multiple language options, fast turnaround times, and studio-grade quality, we bring your scripts to life with precision and creativity. Let our voice over services add the perfect tone and personality to your project!
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Cibato Section */}
            {/* Why Choose Cibato Section */}
            <WhyChoose imgUrl={getImageUrl('whyChoose', '')} reverse={true} />

            {/* Our Skilled Team Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <motion.h2
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-4 leading-tight"
                    >
                        Professional <span className="text-cyan-500">Voice Over</span> Services From Script to Final Delivery
                    </motion.h2>

                    <motion.p
                        {...fadeInUpText}
                        transition={{ ...fadeInUpText.transition, delay: 0.2 }}
                        className="text-center text-lg text-slate-600 mb-12 max-w-4xl mx-auto"
                    >
                        we offer a comprehensive voice over service that ensures your project is executed with precision and professionalism.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Review Consultation & Script */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.1 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-3 text-center">Review Consultation & Script</h3>
                            <p className="text-sm text-slate-700 leading-relaxed text-center">
                                We offer a complete and reliable voice over service, ensuring your project is executed with precision. From script development to tone selection, we align every detail with your vision. Our expert team refines your script to deliver engaging, clear, and professional voiceovers that captivate your audience effortlessly.
                            </p>
                        </motion.div>

                        {/* Voice Selection and Recording */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.2 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-3 text-center">Voice Selection and Recording</h3>
                            <p className="text-sm text-slate-700 leading-relaxed text-center">
                                Our team selects the perfect professional voice artist based on your project's tone, style, and language needs. We ensure high-quality voice over services, delivering engaging and impactful recordings tailored to your brand's identity. Every voiceover is recorded using advanced audio equipment for top-tier results.
                            </p>
                        </motion.div>

                        {/* Editing and Post-Production */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-3 text-center">Editing and Post-Production</h3>
                            <p className="text-sm text-slate-700 leading-relaxed text-center">
                                After recording, we meticulously edit the voiceover to eliminate imperfections, ensuring clarity, consistency, and the perfect delivery. If needed, we sync the voice over service with your visuals or animations, providing a seamless experience that enhances storytelling and brand communication effectively.
                            </p>
                        </motion.div>

                        {/* Review and Final Delivery */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-3 text-center">Review and Final Delivery</h3>
                            <p className="text-sm text-slate-700 leading-relaxed text-center">
                                We provide fully edited voice over services for your review and feedback. Once approved, we deliver the final voiceover in your preferred format, ensuring seamless integration into your project. Our goal is to provide you with a flawless, ready-to-use voiceover that enhances your content and engages your audience.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Technologies/Clients Section */}
            <LogoCarousel />

            {/* Why Every Business Needs A Website Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('customizedVoiceOver', 'https://img.freepik.com/free-vector/podcast-recording-concept-illustration_114360-4889.jpg')}
                                alt="Customized Voice Overs"
                                className="w-full h-full object-contain rounded-2xl"
                            />
                        </motion.div>

                        <div className="flex flex-col justify-center -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Customized <span className="text-cyan-500">Voice Overs</span> For Corporate Videos, Podcasts, Audiobooks And more!
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Experience top-level voice over services for all your corporate and media projects with Cibato. We offer super-fast delivery and work with professional voiceover artists who are proficient in multiple languages and formats. Our expert voice actors deliver translated scripts with perfect timing and rhythm, ensuring that the seamless dubbing closely matches the original audio. Whether you need voiceover for corporate videos, podcasts, audiobooks or other media, Cibato provides customized solutions for your specific needs, helping you connect with your audience across languages and platforms.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Pricing Packages Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <motion.h2
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-4 leading-tight"
                    >
                        Our Compressive<br />
                        <span className="text-cyan-500">Voice Over Services</span><br />
                        For Growth And Pricing
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {/* Starter Package */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.1 }}
                            className="relative bg-white rounded-3xl border-2 border-cyan-400 overflow-hidden hover:shadow-2xl transition-all"
                        >
                            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-md shadow-lg z-10">
                                SALE
                            </div>

                            <div className="p-8">
                                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg>
                                </div>

                                <h3 className="text-3xl font-black text-center text-slate-900 mb-6">Starter Package</h3>

                                <div className="bg-slate-900 text-white text-center py-4 rounded-xl mb-6">
                                    <div className="text-xl line-through opacity-60">$180</div>
                                    <div className="text-5xl font-black">$ 120</div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {[
                                        '1 Page / Landing Page',
                                        'Functional Website',
                                        'Responsive Design',
                                        'Content Upload',
                                        'Speed Optimization',
                                        'Contact Form',
                                        'Hosting Setup',
                                        'Social Media Icons',
                                        'Plugins Installation',
                                        'Free SSL - Security',
                                        'Delivery Time 3 Days'
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2 text-base text-slate-700">
                                            <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-1" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-base py-2 rounded-xl transition-colors">
                                    Get Started
                                </button>
                                <p className="text-center text-base text-slate-600 mt-3 px-4">Sale ends soon!</p>
                            </div>
                        </motion.div>

                        {/* Corporate Package */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.2 }}
                            className="relative bg-white rounded-3xl border-2 border-cyan-400 overflow-hidden hover:shadow-2xl transition-all"
                        >
                            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-md shadow-lg z-10">
                                SALE
                            </div>

                            <div className="p-8">
                                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                    </svg>
                                </div>

                                <h3 className="text-3xl font-black text-center text-slate-900 mb-6">Corporate Package</h3>

                                <div className="bg-slate-900 text-white text-center py-4 rounded-xl mb-6">
                                    <div className="text-xl line-through opacity-60">$599</div>
                                    <div className="text-5xl font-black">$ 450</div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {[
                                        'Unlimited Pages',
                                        'Functional Website',
                                        'Responsive Design',
                                        'Woo-Commerce',
                                        'Payment Processing',
                                        'Opt-In Form',
                                        'Content Upload',
                                        'Products Upload',
                                        'Speed Optimization',
                                        'Hosting Setup',
                                        'Social Media Integration',
                                        'Plugins Installation',
                                        'Free SSL - Security',
                                        'Delivery Time 10 Days'
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                                            <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition-colors">
                                    Get Started
                                </button>
                                <p className="text-center text-sm text-slate-600 mt-3 px-4">Sale ends soon!</p>
                            </div>
                        </motion.div>

                        {/* Enterprise Package */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                            className="relative bg-white rounded-3xl border-2 border-cyan-400 overflow-hidden hover:shadow-2xl transition-all"
                        >
                            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-md shadow-lg z-10">
                                SALE
                            </div>

                            <div className="p-8">
                                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                </div>

                                <h3 className="text-3xl font-black text-center text-slate-900 mb-6">Enterprise Package</h3>

                                <div className="bg-slate-900 text-white text-center py-4 rounded-xl mb-6">
                                    <div className="text-xl line-through opacity-60">$390</div>
                                    <div className="text-5xl font-black">$ 280</div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {[
                                        '5-8 Pages',
                                        'Functional Website',
                                        'Responsive Design',
                                        'Woo-Commerce',
                                        'Payment Processing',
                                        'Content Upload',
                                        'Speed Optimization',
                                        'Hosting Setup',
                                        'Social Media Integration',
                                        'Plugins Installation',
                                        'Free SSL - Security',
                                        'Delivery Time 7 Days'
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                                            <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition-colors">
                                    Get Started
                                </button>
                                <p className="text-center text-sm text-slate-600 mt-3 px-4">Sale ends soon!</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <div className="-mt-10">
                <Portfolio />
            </div>

            {/* Bangladesh's Leading Agency Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Premium <span className="text-cyan-500">Voice Over</span> Services for Every Industry
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-700 leading-relaxed text-justify"
                            >
                                Looking for high-quality voice over services that bring your project to life? Our professional voice over services cater to businesses, commercials, e-learning, animations, and more. With expert voice artists, crisp audio production, and tailored tone selection, we ensure that your message is delivered with clarity and impact. Whether you need a warm, authoritative, or energetic tone, our voice over services are designed to fit your unique needs. Using advanced recording technology and meticulous editing, we guarantee flawless audio quality. Elevate your brand with our exceptional voiceovers and make a lasting impression on your audience today!
                            </motion.p>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('premium', 'https://img.freepik.com/free-vector/voice-assistant-concept-illustration_114360-5035.jpg')}
                                alt="Voice Over Services"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <FAQ items={[
                {
                    question: "What types of voice over services do you provide?",
                    answer: "We offer professional voice over services for commercials, explainer videos, e-learning, audiobooks, IVR, corporate narrations, and more."
                },
                {
                    question: "Can I choose the voice artist for my project?",
                    answer: "Yes! We provide a selection of voice artists based on your project's tone, language, and style requirements."
                },
                {
                    question: "How long does it take to complete a voice over project?",
                    answer: "Turnaround time depends on the project length, but most recordings are delivered within 24-72 hours."
                },
                {
                    question: "Do you provide revisions if I need changes?",
                    answer: "Yes, we offer revisions to ensure the final voice over meets your expectations."
                },
                {
                    question: "What audio formats do you provide for the final delivery?",
                    answer: "We deliver high-quality audio files in MP3, WAV, or any other format based on your needs."
                }
            ]} />

            {/* CTA */}
            <Contact />
        </>
    );
};

export default VoiceOver;
