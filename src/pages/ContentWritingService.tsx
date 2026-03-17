import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';
import { Check } from 'lucide-react';
import { usePageData } from '../hooks/usePageData';
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

const ContentWritingService = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl, data: content } = usePageData('content-writing-page-id');

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
                                dangerouslySetInnerHTML={{ __html: content?.hero?.title || 'Professional <span class="text-cyan-500">Content Writing</span> Services to Elevate Your Brand' }}
                            />

                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                {content?.hero?.description || 'At Cibato, we provide expert content writing services designed to boost your brand’s visibility and engagement. From SEO-friendly blog posts to compelling website copy, our writers craft content that resonates with your audience and drives results. Whether you need product descriptions, social media content, or email marketing copy, we ensure high-quality, original, and engaging content tailored to your business needs. Enhance your online presence and convert visitors into loyal customers with our strategic content solutions.'}
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
                                src={getImageUrl('hero', "https://img.freepik.com/free-vector/content-creator-concept-illustration_114360-3794.jpg")}
                                alt="Content Writing Services"
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
                                src={getImageUrl('coreStrategy', "https://img.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg")}
                                alt="Core Content Strategy"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-4xl lg:text-5xl font-black text-slate-900 mb-6"
                            >
                                The Core of a Winning <span className="text-cyan-500">Content Marketing Strategy</span>
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                A successful marketing plan starts with a well-crafted content marketing strategy that attracts, engages, and converts your audience. At Cibato, we focus on creating high-quality, SEO-optimized content that builds brand authority and drives organic traffic. From blog posts and website copy to email campaigns and social media content, we tailor every piece to align with your business goals. Our data-driven approach ensures your content reaches the right audience at the right time, maximizing engagement and conversions. With a solid content marketing strategy, your brand can establish credibility, nurture customer relationships, and achieve long-term success. We leverage the latest content trends and analytics to refine strategies, ensuring continuous growth. Let us help you create compelling content that turns prospects into loyal customers.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Cibato Section */}
            {/* Why Choose Cibato Section */}
            <WhyChoose imgUrl={getImageUrl('whyChoose', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800')} reverse={true} />

            {/* Our Skilled Team Section */}
            {/* Comprehensive Content Writing Services Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <motion.h2
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-12 leading-tight"
                    >
                        Comprehensive <span className="text-cyan-500">Content Writing</span> Services to Elevate Your Brand
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Webpage Copy Writing */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="bg-white rounded-3xl border-2 border-cyan-400 p-8 hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Webpage Copy Writing
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Engage visitors with compelling, SEO-optimized webpage copy that communicates your brand message effectively. We craft persuasive and clear content that enhances user experience, drives conversions, and strengthens your online presence for long-term success.
                            </motion.p>
                        </motion.div>

                        {/* Social Media Content */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="bg-white rounded-3xl border-2 border-cyan-400 p-8 hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.3 }}
                                className="text-xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Social Media Content
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Boost engagement with powerful social media content tailored for your audience. From eye-catching posts to strategic captions, we create shareable and persuasive content that enhances brand awareness, increases followers, and drives meaningful interactions.
                            </motion.p>
                        </motion.div>

                        {/* Product Descriptions */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.3 }}
                            className="bg-white rounded-3xl border-2 border-cyan-400 p-8 hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.4 }}
                                className="text-xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Product Descriptions
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Turn browsers into buyers with detailed, engaging product descriptions. We highlight key features, benefits, and unique selling points to persuade customers, improve conversions, and optimize product pages for better search rankings and visibility.
                            </motion.p>
                        </motion.div>

                        {/* Email Marketing Copy */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.4 }}
                            className="bg-white rounded-3xl border-2 border-cyan-400 p-8 hover:shadow-xl transition-all relative overflow-hidden group"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.5 }}
                                className="text-xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Email Marketing Copy
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Convert leads into loyal customers with high-converting email marketing copy. We craft personalized, engaging, and action-driven emails that boost open rates, drive sales, and nurture relationships through compelling subject lines and persuasive messaging.
                            </motion.p>
                        </motion.div>

                        {/* Blog Post Article */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.5 }}
                            className="bg-white rounded-3xl border-2 border-cyan-400 p-8 hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.6 }}
                                className="text-xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Blog Post Article
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.7 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Enhance brand authority with informative, well-researched blog posts. Our SEO-friendly content boosts traffic, engages readers, and positions your brand as an industry leader while delivering valuable insights that encourage audience trust and retention.
                            </motion.p>
                        </motion.div>

                        {/* Technical Writing */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.6 }}
                            className="bg-white rounded-3xl border-2 border-cyan-400 p-8 hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.7 }}
                                className="text-xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Technical Writing
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.8 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Simplify complex topics with precise and well-structured technical writing. We create detailed guides, manuals, and documentation that are easy to understand, ensuring clarity, accuracy, and effective communication for your business and target audience.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>



            {/* Technologies/Clients Section */}
            <LogoCarousel />

            {/* Our Content Writing Process Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('process', "https://img.freepik.com/free-vector/seo-content-concept-illustration_114360-3575.jpg")}
                                alt="Content Writing Process"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="flex flex-col justify-center -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Our <span className="text-cyan-500">Content Writing</span> Process
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                We follow a structured content writing process to ensure the best results. First, we conduct thorough research to understand your industry, target audience, and competitors. Next, we develop a strategic content plan that aligns with your business goals. Our expert writers craft compelling, SEO-friendly content that engages and informs readers. After writing, our editors refine the content for clarity, tone, and grammar. Finally, we deliver polished content ready for publication. Whether it’s blog posts, website copy, or marketing content, our proven process guarantees high-quality, impactful results that enhance your brand’s online presence.
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
                        <span className="text-cyan-500">Content Writing</span><br />
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
            <div className="-mt-10">
                <Portfolio />
            </div>

            {/* Results-Driven Content Marketing Strategy Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Results-Driven <span className="text-cyan-500">Content Marketing</span> Strategy
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-700 leading-relaxed mb-4 text-justify"
                            >
                                A strong content marketing strategy is key to long-term success. At Cibato, we combine creativity with data-driven insights to develop content that enhances brand visibility and increases customer engagement. We focus on crafting content that resonates with your audience, encourages interaction, and improves search rankings.
                            </motion.p>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                className="text-base lg:text-lg text-slate-700 leading-relaxed text-justify"
                            >
                                From keyword-rich articles to persuasive email campaigns, we ensure every piece is optimized for maximum impact. Our strategic approach helps businesses generate leads, improve conversions, and build long-term relationships. Let Cibato take your content marketing to the next level with engaging, goal-oriented strategies.
                            </motion.p>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative order-1 lg:order-2"
                        >
                            <img
                                src={getImageUrl('results', "https://img.freepik.com/free-vector/content-author-concept-illustration_114360-4663.jpg")}
                                alt="Results-Driven Content Strategy"
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
                    question: "What types of content writing services do you offer?",
                    answer: "We provide a wide range of content writing services, including website copy, blog posts, social media content, product descriptions, email marketing copy, and technical writing tailored to your business needs."
                },
                {
                    question: "How does SEO impact content writing?",
                    answer: "Yes! Our experienced writers specialize in various industries, ensuring well-researched, industry-specific, and audience-focused content that aligns with your brand voice and goals."
                },
                {
                    question: "Can you create content for my specific industry?",
                    answer: "We provide promotional emails, newsletters, automated sequences, abandoned cart reminders, welcome emails, and customer re-engagement campaigns."
                },
                {
                    question: "How do you ensure content originality and quality?",
                    answer: "We create 100% original, plagiarism-free content using thorough research and creative storytelling. Our editing process ensures clarity, accuracy, and engagement to meet the highest quality standards."
                },
                {
                    question: "How often should I update my website content?",
                    answer: "Regular content updates help maintain relevance, improve SEO rankings, and keep your audience engaged. We recommend fresh blog posts, updated website copy, and timely marketing content to stay competitive."
                }
            ]} />

            {/* CTA */}
            <Contact />
        </>
    );
};

export default ContentWritingService;
