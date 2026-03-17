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

const SEOServices = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl } = usePageData('seo-services-page-id');

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
                                Rank Higher with Cibato's <span className="text-cyan-500">SEO Solutions</span> in Bangladesh
                            </motion.h1>

                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Cibato offers top-notch SEO services in Bangladesh to help businesses achieve higher rankings and drive organic traffic. Our search engine optimization strategies include keyword research, on-page and off-page SEO, technical SEO, and local SEO. Whether you're a startup or an established brand, we ensure your website stays ahead of competitors. Boost your online presence with Cibato's expert SEO solutions. Let's grow your business with effective SEO strategies!
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
                                src={getImageUrl('hero', 'https://img.freepik.com/free-vector/seo-analytics-team-concept-illustration_114360-9205.jpg')}
                                alt="SEO Services"
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
                                src={getImageUrl('elevateBusiness', 'https://img.freepik.com/free-vector/seo-concept-illustration_114360-1811.jpg')}
                                alt="SEO Services"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-4xl lg:text-5xl font-black text-slate-900 mb-6"
                            >
                                Elevate Your Business <span className="text-cyan-500">With SEO</span> Services
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                At Cibato, we specialize in boosting your search engine rankings and driving targeted traffic to your website. Our expert team combines technical SEO and high-quality content strategies to help businesses thrive online. Whether you run a local business or an e-commerce store, we craft customized solutions to outperform competitors. We have successfully optimized multiple e-commerce websites, ensuring higher visibility and increased conversions. Let Cibato take your business to the next level with proven SEO services in Bangladesh!
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Cibato Section */}
            {/* Why Choose Cibato Section */}
            <WhyChoose imgUrl={getImageUrl('whyChoose', '')} reverse={true} />

            {/* 100% Organic Traffic Growth Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('organicTraffic', 'https://img.freepik.com/free-vector/organic-flat-seo-illustration_23-2148847906.jpg')}
                                alt="Organic Traffic Growth"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                100% Organic <span className="text-cyan-500">Traffic Growth</span> with Cibato's Proven SEO Strategies
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                At Cibato, we help businesses achieve 100% organic traffic growth through result-driven SEO strategies. Our expert team optimizes your website with advanced on-page, off-page, and technical SEO techniques to improve search engine rankings. We focus on sustainable, long-term growth by targeting the right audience and boosting conversions. Whether you're an e-commerce store or a local business, we ensure maximum visibility. Experience real, measurable results with Cibato's SEO services in Bangladesh—let's grow your business together!
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why SEO is Essential Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <motion.h2
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-12"
                    >
                        Why <span className="text-cyan-500">SEO is Essential</span> For Your Business Growth
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Ranking Importance */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.1 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-4 text-center">Ranking Importance</h3>
                            <p className="text-sm text-slate-700 leading-relaxed text-center">
                                Higher rankings on search engines increase visibility, making it easier for potential customers to find you. A well-optimized website ensures your brand stays ahead of competitors and gains long-term credibility.
                            </p>
                        </motion.div>

                        {/* Effective Strategy */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.2 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-4 text-center">Effective Strategy</h3>
                            <p className="text-sm text-slate-700 leading-relaxed text-center">
                                SEO involves keyword research, content optimization, and technical improvements to enhance website performance. A strong strategy helps build authority, ensuring sustainable growth and better search rankings.
                            </p>
                        </motion.div>

                        {/* Bring Visitors */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-4 text-center">Bring Visitors</h3>
                            <p className="text-sm text-slate-700 leading-relaxed text-center">
                                With SEO, your website attracts targeted visitors actively searching for your products or services. More traffic means more engagement, boosting brand awareness and customer trust in your business.
                            </p>
                        </motion.div>

                        {/* More Leads and Sales */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-4 text-center">More Leads and Sales</h3>
                            <p className="text-sm text-slate-700 leading-relaxed text-center">
                                Higher rankings drive quality traffic, boosting conversions. SEO turns visitors into loyal customers, increasing revenue and ensuring lasting business success with organic strategies.
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
                        <div className="flex flex-col justify-center -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Analyze Your <span className="text-cyan-500">Website</span> With Cibato & Unlock Growth Opportunities
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Want to know how well your website is performing? At Cibato, we provide in-depth website analysis to identify SEO issues, improve rankings, and enhance user experience. Our expert team examines site speed, keywords, backlinks, and technical SEO to ensure your website meets search engine standards. Whether you run an e-commerce store or a business website, we deliver actionable insights to boost traffic and conversions. Let Cibato help you uncover hidden opportunities and create a winning strategy for online success. Get a free website audit today and start growing your business with confidence!
                            </motion.p>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('analyzeWebsite', 'https://img.freepik.com/free-vector/website-analytics-concept-illustration_114360-1434.jpg')}
                                alt="Website Analysis"
                                className="w-full h-[400px] object-contain rounded-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Keyword Research Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('keywordResearch', 'https://img.freepik.com/free-vector/keyword-research-concept-illustration_114360-4992.jpg')}
                                alt="Keyword Research Services"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Unlock <span className="text-cyan-500">Growth</span> with Cibato's Expert Keyword Research Services
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed mb-6"
                            >
                                Keywords tell a story, and our keyword research services at Cibato focus on understanding your customers' perspectives.
                            </motion.p>

                            <motion.div
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                className="space-y-4"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        We analyze search behavior to identify what potential customers are looking for. This insight helps you optimize content effectively, ensuring you meet audience needs and improve search visibility.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        Targeting high-intent keywords drives relevant traffic, leading to better engagement and higher conversions. Our approach boosts your return on investment by attracting the right audience.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        Our keyword research provides a clear strategy for content creation, aligning it with audience interests and current search trends, ensuring long-term success in search rankings.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* On-Page SEO Services Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="order-2 lg:order-1 -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Optimize Your <span className="text-cyan-500">Website</span> With Cibato's Expert On-Page SEO Services
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify mb-6"
                            >
                                At Cibato, we specialize in on-page SEO services to enhance your website's performance and visibility. Our experts optimize meta tags, headings, URLs, keyword placement, and internal linking to improve search rankings. We ensure your content is SEO-friendly, engaging, and user-focused, driving higher traffic and better conversions. Additionally, we enhance site speed, mobile responsiveness, and technical SEO to boost user experience. Whether you're a startup or an enterprise, our tailored strategies help you rank higher and stay ahead of competitors. Get started with Cibato's on-page SEO solutions and achieve sustainable online growth today!
                            </motion.p>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative order-1 lg:order-2"
                        >
                            <img
                                src={getImageUrl('onPage', 'https://img.freepik.com/free-vector/seo-optimization-concept-illustration_114360-14330.jpg')}
                                alt="On-Page SEO Services"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Technical SEO Services Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('technical', 'https://img.freepik.com/free-vector/server-concept-illustration_114360-279.jpg')}
                                alt="Technical SEO Services"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Transform Your <span className="text-cyan-500">Website</span> with Our Top-notch Technical SEO Services
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify mb-6"
                            >
                                Cibato offers specialized technical SEO services to optimize your website for search engines. Our core services include.
                            </motion.p>

                            <motion.div
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                className="space-y-3"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        <span className="font-bold text-slate-900">Site Audit:</span> Comprehensive analysis to identify technical issues.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        <span className="font-bold text-slate-900">Crawlability and Indexing:</span> Ensuring that search engines can easily access your site.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        <span className="font-bold text-slate-900">Page Speed Optimization:</span> Improving loading time for better user experience.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        <span className="font-bold text-slate-900">Mobile Optimization:</span> Making your site mobile-friendly and responsive.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        <span className="font-bold text-slate-900">Structured Data:</span> Applying Schema Markup for Enhanced Search Visibility.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        <span className="font-bold text-slate-900">HTTPS Security:</span> Ensuring your site is secure with HTTPS.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        <span className="font-bold text-slate-900">Error Fix:</span> Fixing 404 errors and broken links.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <Portfolio />

            {/* Off-Page SEO Services Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="order-2 lg:order-1 -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Boost Your <span className="text-cyan-500">Website Authority</span> With Cibato's Off-Page SEO Services
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify mb-6"
                            >
                                Cibato's off-page SEO services enhance your website's authority, rankings, and organic traffic. We focus on high-quality backlinks, content marketing, and social engagement to build trust and visibility. Boost your brand's online presence and stay ahead of competitors with our expert strategies!
                            </motion.p>

                            <motion.div
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                className="space-y-3"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        <span className="font-bold text-slate-900">Link Building:</span> Acquiring high-authority backlinks
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        <span className="font-bold text-slate-900">Content Marketing:</span> Creating valuable content to boost engagement
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        <span className="font-bold text-slate-900">Social Media Engagement:</span> Enhancing brand awareness through social platforms
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        <span className="font-bold text-slate-900">Guest Blogging:</span> Publishing articles on relevant blogs for better reach
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        <span className="font-bold text-slate-900">Influencer Outreach:</span> Partnering with influencers to increase brand visibility
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative order-1 lg:order-2"
                        >
                            <img
                                src={getImageUrl('offPage', 'https://img.freepik.com/free-vector/business-success-celebration-concept-illustration_114360-3023.jpg')}
                                alt="Off-Page SEO Services"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Pricing Packages Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 lg:mb-32">
                        <div>
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Grow Your <span className="text-cyan-500">Business</span> With Innovative SEO Marketing Strategies
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.2 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                At Cibato, we craft innovative SEO marketing strategies to help your business achieve sustainable growth. Our approach blends advanced keyword research, technical SEO, content optimization, and high-quality link building to enhance visibility and drive organic traffic. We focus on understanding user intent, search trends, and competitor insights to develop tailored strategies that deliver real results. Whether you're a startup or an established brand, our data-driven SEO solutions help you rank higher, attract more customers, and increase conversions. Stay ahead in the digital landscape with Cibato's expert SEO services—let's take your business to new heights!
                            </motion.p>
                        </div>

                        <div>
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                How We <span className="text-cyan-500">Deliver</span> Our Best Results with Our SEO Strategy ?
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                At Cibato, we follow a structured, data-driven approach to SEO success. Our process begins with in-depth website analysis to identify key areas for improvement. We then conduct keyword research to target the right audience and optimize your website's content, meta tags, and structure for better rankings. Through high-quality link building, content marketing, and technical SEO, we enhance your site's authority and visibility. We continuously track performance, refine strategies, and adapt to algorithm updates to ensure sustainable growth. With Cibato's expert SEO services, your business stays ahead of the competition and achieves long-term success!
                            </motion.p>
                        </div>
                    </div>

                    <motion.h2
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-4 leading-tight"
                    >
                        Our Compressive<br />
                        <span className="text-cyan-500">SEO Services</span><br />
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
                            {...fadeInUpImage}
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

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <FAQ items={[
                {
                    question: "What is SEO, and why is it important for my business?",
                    answer: "SEO (Search Engine Optimization) improves your website’s visibility on search engines, helping you attract more organic traffic and increase conversions."
                },
                {
                    question: "How long does it take to see SEO results?",
                    answer: "SEO is a long-term strategy, and results typically take 3-6 months depending on competition and keyword difficulty."
                },
                {
                    question: "Does Cibato offer local SEO services?",
                    answer: "Yes, we specialize in local SEO to help your business rank higher in local search results and attract more customers in your area."
                },
                {
                    question: "What is the difference between On-Page and Off-Page SEO?",
                    answer: "On-Page SEO involves optimizing content and website structure, while Off-Page SEO focuses on building backlinks and authority through external sources."
                },
                {
                    question: "Do you provide monthly SEO reports?",
                    answer: "Yes, we provide detailed monthly reports outlining your website’s performance, keyword rankings, and traffic growth."
                },
                {
                    question: "Can I do SEO myself, or do I need an agency?",
                    answer: "While basic SEO can be done yourself, hiring an agency like Cibato ensures expert strategies, technical optimization, and consistent results."
                }
            ]} />

            {/* CTA */}
            <Contact />
        </>
    );
};

export default SEOServices;
