import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';
import { Lightbulb, Palette, Settings, Smartphone, Check, Rocket, Globe, Search, ShieldCheck } from 'lucide-react';
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

const BusinessWebsite = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl } = usePageData('business-website-page-id');

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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 -mt-2.5 -ml-0">
                            <motion.h1
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-slate-900"
                            >
                                Professional <span className="text-cyan-500">Business Website</span> Design Services – Grow Your Brand with Cibato
                            </motion.h1>

                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                A Business Website is a digital platform that showcases your company’s products, services, and brand to a global audience. It acts as a 24/7 online storefront, enhancing visibility and credibility. Businesses need websites to connect with customers, increase trust, and drive sales. In today’s digital age, a professional website helps grow your business by attracting more leads, improving customer engagement, and showcasing your expertise. It’s an essential tool for expanding reach and staying competitive in any industry.
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
                                src={getImageUrl('hero', 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800')}
                                alt="Web Development"
                                className="w-full h-full object-cover rounded-3xl shadow-2xl border-2 border-cyan-200"
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
                                src={getImageUrl('creative', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80')}
                                alt="Web Design Services"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-4xl lg:text-5xl font-black text-slate-900 mb-6"
                            >
                                What is <span className="text-cyan-500">Business Website</span> ?
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                At Cibato, we specialize in custom website design services tailored to help your business thrive. Whether you need a responsive design, eCommerce functionality, or a unique customized solution, we combine creativity with advanced technology to craft websites that captivate users and deliver results. Our designs are visually appealing, user-friendly, and optimized to elevate your online presence while driving growth. From concept to completion, we focus on turning your ideas into impactful digital experiences that set your business apart. Partner with Cibato to create a website that not only looks great but also achieves your goals.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>



            {/* Why Choose Cibato Section */}
            <WhyChoose
                imgUrl={getImageUrl('whyChoose', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800')}
                reverse={true}
            />

            {/* Website Features Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <motion.h2
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-12 leading-tight"
                    >
                        What Our <span className="text-cyan-500">Websites Includes</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {/* All Device Responsive */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl text-center group"
                        >
                            <div className="w-16 h-16 bg-cyan-50 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-cyan-100 transition-colors">
                                <Smartphone className="w-8 h-8 text-cyan-500" />
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-lg font-black text-cyan-500 mb-3"
                            >
                                All Device Responsive
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                className="text-sm text-slate-700 leading-relaxed"
                            >
                                Smooth viewing experience on mobile/tablet
                            </motion.p>
                        </motion.div>

                        {/* Fast Website Speed */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl text-center group"
                        >
                            <div className="w-16 h-16 bg-cyan-50 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-cyan-100 transition-colors">
                                <Rocket className="w-8 h-8 text-cyan-500" />
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.3 }}
                                className="text-lg font-black text-cyan-500 mb-3"
                            >
                                Fast Website Speed
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-sm text-slate-700 leading-relaxed"
                            >
                                You will have fast loading times to attract users.
                            </motion.p>
                        </motion.div>

                        {/* Social Media Integration */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.3 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl text-center group"
                        >
                            <div className="w-16 h-16 bg-cyan-50 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-cyan-100 transition-colors">
                                <Globe className="w-8 h-8 text-cyan-500" />
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.4 }}
                                className="text-lg font-black text-cyan-500 mb-3"
                            >
                                Social Media Integration
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                className="text-sm text-slate-700 leading-relaxed"
                            >
                                Connecting all your social profiles.
                            </motion.p>
                        </motion.div>

                        {/* SEO Optimization */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.4 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl text-center group"
                        >
                            <div className="w-16 h-16 bg-cyan-50 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-cyan-100 transition-colors">
                                <Search className="w-8 h-8 text-cyan-500" />
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.5 }}
                                className="text-lg font-black text-cyan-500 mb-3"
                            >
                                SEO Optimization
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                className="text-sm text-slate-700 leading-relaxed"
                            >
                                Get online quickly for whatever you do.
                            </motion.p>
                        </motion.div>

                        {/* Best Security */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.5 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl text-center group"
                        >
                            <div className="w-16 h-16 bg-cyan-50 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-cyan-100 transition-colors">
                                <ShieldCheck className="w-8 h-8 text-cyan-500" />
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.6 }}
                                className="text-lg font-black text-cyan-500 mb-3"
                            >
                                Best Security
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.7 }}
                                className="text-sm text-slate-700 leading-relaxed"
                            >
                                Security at all times from hackers
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Technologies/Clients Section */}
            <LogoCarousel />

            {/* Pricing Packages Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <motion.h2
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-4 leading-tight"
                    >
                        Our Compressive<br />
                        <span className="text-cyan-500">Business Website Development</span><br />
                        For Growth And Pricing
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {/* Starter Package */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
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

                                <motion.h3
                                    {...fadeInUpTitle}
                                    transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                    className="text-3xl font-black text-center text-slate-900 mb-6"
                                >
                                    Starter Package
                                </motion.h3>

                                <motion.div
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                    className="bg-slate-900 text-white text-center py-4 rounded-xl mb-6"
                                >
                                    <div className="text-xl line-through opacity-60">$180</div>
                                    <div className="text-5xl font-black">$ 120</div>
                                </motion.div>

                                <motion.ul
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                    className="space-y-3 mb-8"
                                >
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
                                </motion.ul>

                                <motion.button
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-base py-2 rounded-xl transition-colors"
                                >
                                    Get Started
                                </motion.button>
                                <p className="text-center text-base text-slate-600 mt-3 px-4">Sale ends soon!</p>
                            </div>
                        </motion.div>

                        {/* Corporate Package */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
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

                                <motion.h3
                                    {...fadeInUpTitle}
                                    transition={{ ...fadeInUpTitle.transition, delay: 0.3 }}
                                    className="text-3xl font-black text-center text-slate-900 mb-6"
                                >
                                    Corporate Package
                                </motion.h3>

                                <motion.div
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                    className="bg-slate-900 text-white text-center py-4 rounded-xl mb-6"
                                >
                                    <div className="text-xl line-through opacity-60">$599</div>
                                    <div className="text-5xl font-black">$ 450</div>
                                </motion.div>

                                <motion.ul
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                    className="space-y-3 mb-8"
                                >
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
                                </motion.ul>

                                <motion.button
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition-colors"
                                >
                                    Get Started
                                </motion.button>
                                <p className="text-center text-sm text-slate-600 mt-3 px-4">Sale ends soon!</p>
                            </div>
                        </motion.div>

                        {/* Enterprise Package */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.3 }}
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

                                <motion.h3
                                    {...fadeInUpTitle}
                                    transition={{ ...fadeInUpTitle.transition, delay: 0.4 }}
                                    className="text-3xl font-black text-center text-slate-900 mb-6"
                                >
                                    Enterprise Package
                                </motion.h3>

                                <motion.div
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                    className="bg-slate-900 text-white text-center py-4 rounded-xl mb-6"
                                >
                                    <div className="text-xl line-through opacity-60">$390</div>
                                    <div className="text-5xl font-black">$ 280</div>
                                </motion.div>

                                <motion.ul
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                    className="space-y-3 mb-8"
                                >
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
                                </motion.ul>

                                <motion.button
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.7 }}
                                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition-colors"
                                >
                                    Get Started
                                </motion.button>
                                <p className="text-center text-sm text-slate-600 mt-3 px-4">Sale ends soon!</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <Portfolio />

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <FAQ items={[
                {
                    question: "What services does Cibato provide?",
                    answer: "We provide complete website design and development services. Including responsive design e-commerce solutions and custom web applications"
                },
                {
                    question: "Why do I need a professional website for my company?",
                    answer: "A website increases your online presence. build credibility Attract potential customers and drive business growth in today's digital world"
                },
                {
                    question: "Will my website be mobile friendly?",
                    answer: "Yes, all of our designs are fully responsive and optimized for mobile, tablet, and desktop devices."
                },
                {
                    question: "Do you offer content creation for websites?",
                    answer: "Yes, we offer professional content writing services to ensure your website communicates effectively with your audience."
                },
                {
                    question: "Will my website be search engine optimized (SEO)?",
                    answer: "Yes, we provide basic SEO practices to help your website rank better in search engines. with advanced options available upon request"
                },
                {
                    question: "How much does it cost to design a professional website with Cibato?",
                    answer: "Price depends on the complexity and needs of the project. But we offer competitive prices to suit your budget."
                }
            ]} />

            {/* CTA */}
            <Contact />
        </>
    );
};

export default BusinessWebsite;
