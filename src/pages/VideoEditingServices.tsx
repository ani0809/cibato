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

const VideoEditingServices = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl } = usePageData('video-editing-page-id');

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
                                High-Quality <span className="text-cyan-500">Video Editing</span> Services for Stunning Visuals
                            </motion.h1>

                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Cibato offers professional Video Editing Services to transform raw footage into captivating visual content. Our expert editors specialize in smooth transitions, motion graphics, color correction, and audio enhancements, ensuring your videos are engaging and polished. Whether you need content for social media, marketing campaigns, corporate presentations, or YouTube, our Video Editing Services deliver high-quality, visually appealing results. We focus on storytelling, creativity, and precision to help your brand stand out. With our Video Editing Services, you get seamless, impactful videos that leave a lasting impression. Let us bring your vision to life with professional editing!
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
                                src={getImageUrl('hero', 'https://img.freepik.com/free-vector/video-editor-concept-illustration_114360-3992.jpg')}
                                alt="Video Editing Services"
                                className="w-full h-full object-contain rounded-3xl"
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
                                src={getImageUrl('transformVideos', 'https://img.freepik.com/free-vector/video-editing-concept-illustration_114360-4912.jpg')}
                                alt="Transform Your Videos"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-4xl lg:text-5xl font-black text-slate-900 mb-6"
                            >
                                Transform Your <span className="text-cyan-500">Videos</span> with Professional Editing
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                We offer top-tier Video Editing Services to turn your raw footage into engaging, high-quality content. Our skilled editors specialize in cutting, color grading, sound design, and motion graphics to ensure a seamless and visually appealing final product. Whether you need social media clips, corporate videos, ads, or YouTube content, we craft videos that capture attention and tell compelling stories. As a trusted provider of Video Editing Services in Bangladesh, we focus on precision, creativity, and high-quality production. Let us enhance your videos and make your brand stand out with stunning visuals and smooth editing!
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
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-12 leading-tight"
                    >
                        Our Skilled Team <span className="text-cyan-500">Approach</span> To Delivering Value to you
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Professional Editing */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.1 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl"
                        >
                            <h3 className="text-2xl font-black text-cyan-500 mb-4 text-center">Professional Editing</h3>
                            <p className="text-base text-slate-700 leading-relaxed text-center">
                                Send us your photos and video footage, and our expert editors will create captivating, high-quality videos tailored to your vision. With seamless transitions, color grading, motion graphics, and custom effects, we bring your ideas to life. Enjoy unlimited revisions until you're completely satisfied. Let's craft stunning videos that leave a lasting impact!
                            </p>
                        </motion.div>

                        {/* Save Time */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl"
                        >
                            <h3 className="text-2xl font-black text-cyan-500 mb-4 text-center">Save Time</h3>
                            <p className="text-base text-slate-700 leading-relaxed text-center">
                                Video editing can be time-consuming, but our skilled team streamlines the process, delivering high-quality results fast. We handle cutting, enhancements, and post-production, so you can focus on your creative vision while we do the hard work. Get polished, engaging videos without storytelling—without the stress or hassle!
                            </p>
                        </motion.div>

                        {/* Transform Memories */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl"
                        >
                            <h3 className="text-2xl font-black text-cyan-500 mb-4 text-center">Transform Memories</h3>
                            <p className="text-base text-slate-700 leading-relaxed text-center">
                                Relive your most precious moments with our professional video editing services. Instead of letting your videos and photos fade away, we transform them into breathtaking cinematic stories. Whether it's travel memories, family events, or special celebrations, we bring them to life with stunning visuals, music, and smooth transitions.
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
                                src={getImageUrl('professionalService', 'https://img.freepik.com/free-vector/video-production-concept-illustration_114360-4768.jpg')}
                                alt="Professional Video Editing Service"
                                className="w-full h-full object-contain rounded-2xl"
                            />
                        </motion.div>


                        <div className="flex flex-col justify-center -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Our Professional <span className="text-cyan-500">Video Editing</span> Service For You!
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Enhance your footage with our hassle-free video editing services We handle everything, so you can focus on what matters.
                            </motion.p>

                            <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-4">We specialize in:</h3>

                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-lg text-slate-700">
                                    <Check className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                                    <span>Promotional videos and ads</span>
                                </li>
                                <li className="flex items-start gap-3 text-lg text-slate-700">
                                    <Check className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                                    <span>Business presentation</span>
                                </li>
                                <li className="flex items-start gap-3 text-lg text-slate-700">
                                    <Check className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                                    <span>Sales and marketing videos</span>
                                </li>
                                <li className="flex items-start gap-3 text-lg text-slate-700">
                                    <Check className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                                    <span>Social media content</span>
                                </li>
                                <li className="flex items-start gap-3 text-lg text-slate-700">
                                    <Check className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                                    <span>Event highlights</span>
                                </li>
                                <li className="flex items-start gap-3 text-lg text-slate-700">
                                    <Check className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                                    <span>And more!</span>
                                </li>
                            </ul>
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
                        <span className="text-cyan-500">Video Editing Services</span><br />
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
                                Why Choose <span className="text-cyan-500">Cibato</span> For Video Editing Services?
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-700 leading-relaxed text-justify"
                            >
                                At Cibato, we provide high-quality Video Editing Services designed to captivate your audience and enhance your brand's storytelling. Our expert editors specialize in seamless transitions, color correction, motion graphics, and audio enhancements to create visually stunning content. Whether it's for social media, advertisements, corporate videos, or YouTube content, we ensure your videos are engaging, professional, and impactful. As a trusted video editing service provider in Bangladesh, we focus on creativity and precision to deliver results that align with your brand's vision. Elevate your content with Cibato's expert Video Editing Services today!
                            </motion.p>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('whyChooseVideo', "https://img.freepik.com/free-vector/video-editor-working-laptop_23-2148226233.jpg")}
                                alt="Video Editing Services"
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
                    question: "What types of videos do you edit?",
                    answer: "We edit all types of videos, including promotional videos, business presentations, social media content, YouTube videos, event highlights, corporate videos, advertisements, and more. Whatever your video editing needs, we've got you covered!"
                },
                {
                    question: "How long does it take to edit a video?",
                    answer: "Turnaround time depends on video length and complexity. Basic edits can be completed in 24-48 hours, while more advanced edits with effects, animations, and transitions may take 3-7 days."
                },
                {
                    question: "What formats do you accept and deliver?",
                    answer: "We accept most common video formats including MP4, MOV, AVI, and more. We deliver in your preferred format, optimized for your specific platform (YouTube, Instagram, Facebook, etc.) with the best quality settings."
                },
                {
                    question: "Can I request revisions to my edited video?",
                    answer: "Yes! We offer revisions to ensure you're fully satisfied. Let us know your feedback, and we'll refine the video until it meets your expectations."
                }
            ]} />

            {/* CTA */}
            <Contact />
        </>
    );
};

export default VideoEditingServices;
