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
import { useMemo } from 'react';

const EmailMarketing = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl, data: content } = usePageData('email-marketing-page-id');

    const pricingPackages = useMemo(() => {
        if (content && content.pricing && Array.isArray(content.pricing) && content.pricing.length > 0) {
            return content.pricing;
        }
        return [
            {
                name: 'Starter Package',
                price: '100',
                originalPrice: '150',
                currency: '$',
                badge: 'SALE',
                buttonText: 'Get Started',
                features: ['1 Email Campaign', 'Template Design', 'Responsive Layout', 'Content Upload', 'List Management', 'Basic Analytics', 'A/B Testing', 'Social Media Links', 'Spam Check', 'Delivery Time 3 Days']
            },
            {
                name: 'Corporate Package',
                price: '250',
                originalPrice: '350',
                currency: '$',
                badge: 'SALE',
                buttonText: 'Get Started',
                features: ['5 Email Campaigns', 'Custom Template', 'Responsive Layout', 'Content Strategy', 'Advanced Segmentation', 'Detailed Reporting', 'Automation Setup', 'Integration Support', 'Dedicated Manager', 'Delivery Time 7 Days']
            },
            {
                name: 'Enterprise Package',
                price: '450',
                originalPrice: '600',
                currency: '$',
                badge: 'SALE',
                buttonText: 'Get Started',
                features: ['10 Email Campaigns', 'Premium Templates', 'Responsive Layout', 'Full Strategy', 'Dynamic Segmentation', 'Custom Reporting', 'Advanced Automation', 'CRM Integration', 'Priority Support', 'Delivery Time 14 Days']
            }
        ];
    }, [content]);

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
                                dangerouslySetInnerHTML={{ __html: content?.hero?.title || 'We Are Best <span class="text-cyan-500">Email Marketing</span> Service Provider in Bangladesh. Grow Your Business with Cibato' }}
                            />

                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                {content?.hero?.description || 'Looking for effective email marketing services in Bangladesh? At Cibato, we craft high-converting email campaigns that boost engagement, nurture leads, and drive sales. Our services include personalized email automation, newsletters, and targeted promotions to help businesses connect with the right audience. With data-driven strategies, compelling content, and advanced segmentation, we maximize deliverability and ROI. Whether you\'re a startup or an established brand, our expert solutions ensure measurable success. Let\'s elevate your marketing with powerful email campaigns!'}
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
                                src={getImageUrl('hero', "https://img.freepik.com/free-vector/email-marketing-internet-chatting-24-hours-support_335657-3009.jpg")}
                                alt="Email Marketing"
                                className="w-[90%] h-full object-cover rounded-3xl shadow-2xl border-2 border-cyan-200"
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
                                src={getImageUrl('growth', "https://img.freepik.com/free-vector/email-marketing-concept-illustration_114360-1681.jpg")}
                                alt="Email Marketing Growth"
                                className="w-[85%] mx-auto h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                                dangerouslySetInnerHTML={{ __html: content?.growth?.title || 'Email Marketing for a <span class="text-cyan-500">Successful Business</span> Boost Engagement & Sales' }}
                            />
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                {content?.growth?.description || 'Email marketing is a powerful tool for business growth, customer engagement, and sales generation. At Cibato, we create personalized, high-impact email campaigns that nurture leads, strengthen customer relationships, and maximize ROI. Our targeted email strategies, including automation, newsletters, and promotional campaigns, ensure your message reaches the right audience at the right time. With data-driven insights, compelling content, and advanced segmentation, we help businesses in Bangladesh achieve higher conversions and lasting success. Let Cibato elevate your marketing with expert email solutions that drive real results!'}
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Cibato Section */}
            {/* Why Choose Cibato Section */}
            <WhyChoose
                imgUrl={getImageUrl('whyChoose', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800')}
                reverse={true}
                className="py-[60px] lg:py-[80px]"
            />

            {/* Expert Email Marketing Services Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <motion.h2
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-12 leading-tight"
                        dangerouslySetInnerHTML={{ __html: content?.services?.title || 'Expert <span class="text-cyan-500">Email Marketing Services</span> Boost Engagement & Sales' }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {content?.services?.items ? (
                            content.services.items.map((item: any, index: number) => (
                                <motion.div
                                    key={index}
                                    {...fadeInUpImage}
                                    transition={{ ...fadeInUpImage.transition, delay: 0.1 * (index + 1) }}
                                    className="bg-white rounded-3xl border-2 border-cyan-400 p-8 hover:shadow-xl transition-all"
                                >
                                    <motion.h3
                                        {...fadeInUpTitle}
                                        transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                        className="text-xl font-black text-cyan-500 mb-4 text-center"
                                    >
                                        {item.title}
                                    </motion.h3>
                                    <motion.p
                                        {...fadeInUpText}
                                        transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                        className="text-sm text-slate-700 leading-relaxed text-center"
                                    >
                                        {item.description}
                                    </motion.p>
                                </motion.div>
                            ))
                        ) : (
                            <>
                                {/* Professional Analysis */}
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
                                        Professional Analysis
                                    </motion.h3>
                                    <motion.p
                                        {...fadeInUpText}
                                        transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                        className="text-sm text-slate-700 leading-relaxed text-center"
                                    >
                                        We analyze trends, audience behavior, and engagement metrics to optimize your email campaigns. Our data-driven approach ensures higher open rates, increased click-throughs, and improved conversions, maximizing your marketing ROI effectively.
                                    </motion.p>
                                </motion.div>

                                {/* Engaging Email Designs */}
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
                                        Engaging Email Designs
                                    </motion.h3>
                                    <motion.p
                                        {...fadeInUpText}
                                        transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                        className="text-sm text-slate-700 leading-relaxed text-center"
                                    >
                                        Our expert designers create visually appealing, mobile-responsive email templates that capture attention instantly. Optimized for Gmail, Outlook, and Yahoo, our designs ensure better engagement and drive meaningful interactions with your audience.
                                    </motion.p>
                                </motion.div>

                                {/* Customizable Email Campaigns */}
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
                                        Customizable Email Campaigns
                                    </motion.h3>
                                    <motion.p
                                        {...fadeInUpText}
                                        transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                        className="text-sm text-slate-700 leading-relaxed text-center"
                                    >
                                        We create customized email campaigns tailored to your business goals. From promotional emails and newsletters to automated sequences, our strategies boost brand awareness, enhance customer retention, and drive sustainable business growth effectively.
                                    </motion.p>
                                </motion.div>

                                {/* Timely Campaign Execution */}
                                <motion.div
                                    {...fadeInUpImage}
                                    transition={{ ...fadeInUpImage.transition, delay: 0.4 }}
                                    className="bg-white rounded-3xl border-2 border-cyan-400 p-8 hover:shadow-xl transition-all"
                                >
                                    <motion.h3
                                        {...fadeInUpTitle}
                                        transition={{ ...fadeInUpTitle.transition, delay: 0.5 }}
                                        className="text-xl font-black text-cyan-500 mb-4 text-center"
                                    >
                                        Timely Campaign Execution
                                    </motion.h3>
                                    <motion.p
                                        {...fadeInUpText}
                                        transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                        className="text-sm text-slate-700 leading-relaxed text-center"
                                    >
                                        Consistency matters! Our streamlined email marketing process ensures timely campaign execution, keeping your audience engaged with regular updates, offers, and important announcements, helping to maintain strong customer relationships.
                                    </motion.p>
                                </motion.div>

                                {/* Analytics & Reporting */}
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
                                        Analytics & Reporting
                                    </motion.h3>
                                    <motion.p
                                        {...fadeInUpText}
                                        transition={{ ...fadeInUpText.transition, delay: 0.7 }}
                                        className="text-sm text-slate-700 leading-relaxed text-center"
                                    >
                                        Gain real-time insights with advanced analytics, tracking open rates, conversions, and engagement. Our detailed reports help refine your strategy, ensuring your email campaigns stay optimized for higher performance, better reach, and increased success.
                                    </motion.p>
                                </motion.div>

                                {/* 24/7 Expert Support */}
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
                                        24/7 Expert Support
                                    </motion.h3>
                                    <motion.p
                                        {...fadeInUpText}
                                        transition={{ ...fadeInUpText.transition, delay: 0.8 }}
                                        className="text-sm text-slate-700 leading-relaxed text-center"
                                    >
                                        Our dedicated support team is available 24/7 to assist with campaign adjustments, technical fixes, and strategy improvements. We ensure seamless email marketing execution, providing constant support to help your business achieve optimal results.
                                    </motion.p>
                                </motion.div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Technologies/Clients Section */}
            <LogoCarousel />

            {/* Why Every Business Needs A Website Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="flex flex-col gap-24">
                        {/* Section 1: Powerful Email Marketing Solutions */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <motion.div
                                {...fadeInUpImage}
                                transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                                className="relative"
                            >
                                <img
                                    src={getImageUrl('campaigns', "https://img.freepik.com/free-vector/email-marketing-concept-illustration_114360-1288.jpg")}
                                    alt="Powerful Email Marketing Solutions"
                                    className="w-[85%] mx-auto h-auto rounded-2xl"
                                />
                            </motion.div>

                            <div>
                                <motion.h2
                                    {...fadeInUpTitle}
                                    transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                    className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                                    dangerouslySetInnerHTML={{ __html: content?.campaigns?.title || 'Powerful <span class="text-cyan-500">Email Marketing</span> Solutions to Grow Your Business' }}
                                />
                                <motion.p
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                    className="text-lg text-slate-600 leading-relaxed text-justify"
                                >
                                    {content?.campaigns?.description || 'Get started with email marketing and unlock powerful customer engagement. Our expert team will help you set up targeted campaigns, craft compelling content, and optimize for the best results. From audience segmentation to automation and performance tracking, we ensure every email drives conversions. Whether you’re launching your first campaign or scaling an existing one, we provide end-to-end support for seamless execution. Let us help you build strong relationships with your audience and boost your business growth through strategic email marketing.'}
                                </motion.p>
                            </div>
                        </div>

                        {/* Section 2: High-Converting Email Copywriting */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <div className="order-2 lg:order-1 -mt-2.5 -ml-0">
                                <motion.h2
                                    {...fadeInUpTitle}
                                    transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                    className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                                    dangerouslySetInnerHTML={{ __html: content?.copywriting?.title || 'High-Converting <span class="text-cyan-500">Email Copywriting</span> to Boost Engagement, Build Trust, and Drive Sales' }}
                                />
                                <motion.p
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                    className="text-lg text-slate-600 leading-relaxed text-justify"
                                >
                                    {content?.copywriting?.description || 'Craft compelling email copy that captivates, engages, and converts. Our expert copywriting ensures your message resonates with your audience, driving higher open rates and click-throughs. From subject lines that grab attention to persuasive content that encourages action, we create emails that build trust and boost sales. Whether you need promotional emails, newsletters, or automated sequences, we tailor each message to align with your brand and goals. Let us help you maximize your email marketing success with strategic, high-converting copy.'}
                                </motion.p>
                            </div>

                            <motion.div
                                {...fadeInUpImage}
                                transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                                className="relative order-1 lg:order-2"
                            >
                                <img
                                    src={getImageUrl('copywriting', "https://img.freepik.com/free-vector/email-marketing-concept-illustration_114360-2216.jpg")}
                                    alt="Email Copywriting"
                                    className="w-[85%] mx-auto h-auto rounded-2xl"
                                />
                            </motion.div>
                        </div>

                        {/* Section 3: Best Results-Driven Email Campaigns */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <motion.div
                                {...fadeInUpImage}
                                transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                                className="relative"
                            >
                                <img
                                    src={getImageUrl('results', "https://img.freepik.com/free-vector/email-marketing-concept-illustration_114360-1631.jpg")}
                                    alt="Results-Driven Email Campaigns"
                                    className="w-[85%] mx-auto h-auto rounded-2xl"
                                />
                            </motion.div>

                            <div>
                                <motion.h2
                                    {...fadeInUpTitle}
                                    transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                    className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                                    dangerouslySetInnerHTML={{ __html: content?.results?.title || 'Best Results-Driven <span class="text-cyan-500">Email Campaigns</span> To Engage, Nurture & Convert' }}
                                />
                                <motion.p
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                    className="text-lg text-slate-600 leading-relaxed text-justify"
                                >
                                    {content?.results?.description || 'Supercharge your marketing with targeted email campaigns that drive engagement and conversions. We design, optimize, and manage email campaigns tailored to your audience, ensuring maximum impact. From lead nurturing sequences to promotional blasts and automated workflows, our expertly crafted emails keep your customers engaged and your business growing. With data-driven strategies, compelling copy, and seamless automation, we help you achieve higher open rates, better click-throughs, and increased ROI. Let’s build and execute email campaigns that deliver real results for your business.'}
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Powerful Email Marketing Features Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                                dangerouslySetInnerHTML={{ __html: content?.features?.title || 'Powerful <span class="text-cyan-500">Email Marketing</span> Features by Cibato to Drive Engagement & Sales' }}
                            />
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                {content?.features?.description || 'Cibato offers a complete suite of email marketing features designed to maximize your success. Our services include targeted audience segmentation, personalized automation, high-converting copywriting, and A/B testing for optimal performance. We ensure high deliverability rates, mobile-friendly designs, and detailed analytics to track and improve campaign results. Whether you need promotional emails, drip campaigns, or newsletters, our expert team helps you craft impactful messages that engage, nurture, and convert. With our data-driven approach, Cibato ensures every email delivers value and drives business growth.'}
                            </motion.p>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('features', "https://img.freepik.com/free-vector/email-campaign-concept-illustration_114360-1633.jpg")}
                                alt="Powerful Email Marketing Features"
                                className="w-[85%] mx-auto h-auto rounded-2xl"
                            />
                        </motion.div>
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
                        <span className="text-cyan-500">Email Marketing</span><br />
                        For Growth And Pricing
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {pricingPackages.map((pkg: any, index: number) => (
                            <motion.div
                                key={index}
                                {...fadeInUpImage}
                                transition={{ ...fadeInUpImage.transition, delay: 0.1 * (index + 1) }}
                                className="relative bg-white rounded-3xl border-2 border-cyan-400 overflow-hidden hover:shadow-2xl transition-all"
                            >
                                {pkg.badge && (
                                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-md shadow-lg z-10">
                                        {pkg.badge}
                                    </div>
                                )}

                                <div className="p-8">
                                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>

                                    <motion.h3
                                        {...fadeInUpTitle}
                                        transition={{ ...fadeInUpTitle.transition, delay: 0.1 * (index + 1) + 0.1 }}
                                        className="text-3xl font-black text-center text-slate-900 mb-6"
                                    >
                                        {pkg.name}
                                    </motion.h3>

                                    <motion.div
                                        {...fadeInUpText}
                                        transition={{ ...fadeInUpText.transition, delay: 0.1 * (index + 1) + 0.2 }}
                                        className="bg-slate-900 text-white text-center py-4 rounded-xl mb-6"
                                    >
                                        {pkg.originalPrice && pkg.originalPrice !== pkg.price && (
                                            <div className="text-xl line-through opacity-60">{pkg.currency}{pkg.originalPrice}</div>
                                        )}
                                        <div className="text-5xl font-black">{pkg.currency} {pkg.price}</div>
                                    </motion.div>

                                    <motion.ul
                                        {...fadeInUpText}
                                        transition={{ ...fadeInUpText.transition, delay: 0.1 * (index + 1) + 0.3 }}
                                        className="space-y-3 mb-8"
                                    >
                                        {pkg.features.map((feature: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-2 text-base text-slate-700">
                                                <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-1" />
                                                {feature}
                                            </li>
                                        ))}
                                    </motion.ul>

                                    <motion.button
                                        {...fadeInUpText}
                                        transition={{ ...fadeInUpText.transition, delay: 0.1 * (index + 1) + 0.4 }}
                                        onClick={() => setFormOpen(true)}
                                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-base py-2 rounded-xl transition-colors"
                                    >
                                        {pkg.buttonText || 'Get Started'}
                                    </motion.button>
                                    {pkg.footerText && <p className="text-center text-base text-slate-600 mt-3 px-4">{pkg.footerText}</p>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <div className="-mt-10">
                <Portfolio />
            </div>

            {/* Testimonials */}
            <div className="-mt-5">
                <Testimonials />
            </div>

            {/* FAQ */}
            <FAQ items={[
                {
                    question: "What is email marketing, and how does it benefit my business?",
                    answer: "Email marketing is a strategy that helps businesses engage with their audience, increase brand awareness, generate leads, and drive sales through targeted email Campaigns."
                },
                {
                    question: "How can email marketing improve customer engagement?",
                    answer: "By sending personalized emails, newsletters, and promotions, businesses can keep their audience informed, build relationships, and encourage repeat purchases."
                },
                {
                    question: "What types of email campaigns do you offer?",
                    answer: "We provide promotional emails, newsletters, automated sequences, abandoned cart reminders, welcome emails, and customer re-engagement campaigns."
                },
                {
                    question: "How do you measure the success of an email marketing campaign?",
                    answer: "We track key metrics such as open rates, click-through rates, conversions, bounce rates, and overall engagement to optimize performance and maximize ROI."
                },
                {
                    question: "Can you help with email automation and segmentation?",
                    answer: "Yes! We create automated workflows and segment your audience based on behavior, interests, and demographics to ensure highly relevant and effective campaigns."
                }
            ]} />

            {/* CTA */}
            <Contact />
        </>
    );
};

export default EmailMarketing;
