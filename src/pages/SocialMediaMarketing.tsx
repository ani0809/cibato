import { motion } from 'framer-motion';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';
import { Lightbulb, Palette, Settings, Smartphone, Check } from 'lucide-react';
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
import { useState, useMemo } from 'react';

// Default Pricing Packages (Fallback)
const defaultPricing = [
    {
        name: 'Starter Package',
        price: '120',
        originalPrice: '180',
        currency: '$',
        badge: 'SALE',
        buttonText: 'Get Started',
        features: [
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
        ]
    },
    {
        name: 'Corporate Package',
        price: '450',
        originalPrice: '599',
        currency: '$',
        badge: 'SALE',
        buttonText: 'Get Started',
        features: [
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
        ]
    },
    {
        name: 'Enterprise Package',
        price: '280',
        originalPrice: '390',
        currency: '$',
        badge: 'SALE',
        buttonText: 'Get Started',
        features: [
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
        ]
    }
];

const SocialMediaMarketing = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl, content } = usePageData('social-media-page-id');

    const pricingPackages = useMemo(() => {
        if (content && content.pricing && Array.isArray(content.pricing) && content.pricing.length > 0) {
            return content.pricing;
        }
        return defaultPricing;
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
                            >
                                Leading <span className="text-cyan-500">Social Media Marketing</span> Agency in Bangladesh
                            </motion.h1>

                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Cibato is a top-rated social media marketing agency in Bangladesh, helping businesses grow their online presence. We specialize in creating impactful social media strategies that engage your audience and drive results. From content creation to community management, we handle it all. Boost your brand visibility and connect with your customers through our expert social media marketing services.
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
                                src={getImageUrl('hero', 'https://img.freepik.com/free-vector/social-media-marketing-mobile-phone-concept_23-2148424075.jpg')}
                                alt="Social Media Marketing"
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
                                src={getImageUrl('whatIsSMM', 'https://img.freepik.com/free-vector/social-media-marketing-concept-illustration_114360-1455.jpg')}
                                alt="What is Social Media Marketing"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                What is <span className="text-cyan-500">Social Media Marketing</span> & Why Does It Matter?
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Social Media Marketing (SMM) is the process of promoting brands, products, and services through platforms like Facebook, Instagram, LinkedIn, Twitter, and TikTok to engage audiences and drive business growth. At Cibato, we leverage strategic content creation, targeted ads, and audience engagement to enhance brand visibility, increase customer interaction, and generate leads. SMM helps businesses build trust, foster relationships, and stay ahead of competitors in the digital space. Whether through organic posts or paid advertising, our expert social media marketing strategies ensure maximum reach and ROI. Grow your brand with Cibato’s tailored SMM solutions today!
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Cibato Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Social Media Strategy Development */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 text-center hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-xl lg:text-2xl font-black text-cyan-500 mb-4"
                            >
                                Social Media Strategy Development
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                className="text-sm lg:text-base text-slate-800 leading-relaxed font-medium"
                            >
                                We create customized social media strategies to align with your business goals. Our expert consultancy ensures you achieve measurable results by optimizing content, engagement, and brand positioning across multiple platforms.
                            </motion.p>
                        </motion.div>

                        {/* Social Media Content Creation */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 text-center hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.3 }}
                                className="text-xl lg:text-2xl font-black text-cyan-500 mb-4"
                            >
                                Social Media Content Creation
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-sm lg:text-base text-slate-800 leading-relaxed font-medium"
                            >
                                Engaging content is key to social media success. We craft high-quality posts, graphics, and videos that resonate with your audience, boost interaction, and drive brand loyalty, ensuring maximum visibility for your services.
                            </motion.p>
                        </motion.div>

                        {/* Social Media Advertising Manage */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.3 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 text-center hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.4 }}
                                className="text-xl lg:text-2xl font-black text-cyan-500 mb-4"
                            >
                                Social Media Advertising Manage
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                className="text-sm lg:text-base text-slate-800 leading-relaxed font-medium"
                            >
                                Our targeted ad campaigns drive real results. From lead generation to brand awareness, we optimize ad spend, ensuring higher engagement, conversions, and ROI through data-driven social media advertising strategies.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Cibato Section */}
            {/* Why Choose Cibato Section */}
            <WhyChoose
                imgUrl={getImageUrl('whyChoose', 'https://img.freepik.com/free-vector/social-media-marketing-mobile-phone-concept_23-2148424075.jpg')}
                reverse={true}
                className="py-[60px] lg:py-[80px]"
            />

            {/* Our Skilled Team Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <motion.h2
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-12 leading-tight"
                    >
                        Our Skilled Team expert In Result-Driven <span className="text-cyan-500">Social Media Marketing</span> Services
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Social Media Strategy */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 text-center hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-xl font-black text-cyan-500 mb-4"
                            >
                                Social Media Strategy
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                className="text-sm text-slate-800 leading-relaxed font-medium"
                            >
                                We craft custom social media strategies tailored to your business goals. By analyzing your industry, target audience, and competitors, we create a data-driven plan that enhances engagement, builds brand awareness, and maximizes conversions. Our approach ensures consistent growth and a strong social media presence.
                            </motion.p>
                        </motion.div>

                        {/* Content Creation */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 text-center hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.3 }}
                                className="text-xl font-black text-cyan-500 mb-4"
                            >
                                Content Creation
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-sm text-slate-800 leading-relaxed font-medium"
                            >
                                Engaging content is key to success! We create high-quality graphics, videos, and posts that capture your audience's attention. From storytelling to brand messaging, our content strategy increases interaction, boosts visibility, and establishes a strong brand identity, helping you stand out in a crowded digital space.
                            </motion.p>
                        </motion.div>

                        {/* Social Media Advertising */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.3 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 text-center hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.4 }}
                                className="text-xl font-black text-cyan-500 mb-4"
                            >
                                Social Media Advertising
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                className="text-sm text-slate-800 leading-relaxed font-medium"
                            >
                                We design and execute high-performance ad campaigns that reach your ideal audience. By using advanced targeting, A/B testing, and budget optimization, we drive more traffic, leads, and sales while maximizing your ROI. Our campaigns ensure measurable growth and increased brand.
                            </motion.p>
                        </motion.div>

                        {/* Community Management */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.4 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 text-center hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.5 }}
                                className="text-xl font-black text-cyan-500 mb-4"
                            >
                                Community Management
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                className="text-sm text-slate-800 leading-relaxed font-medium"
                            >
                                Building strong relationships with your audience is crucial! We actively engage with followers, respond to comments, and manage interactions to foster trust and loyalty. Our approach enhances customer satisfaction, improves brand reputation, and creates a positive online community for your business.
                            </motion.p>
                        </motion.div>

                        {/* Influencer Marketing */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.5 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 text-center hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.6 }}
                                className="text-xl font-black text-cyan-500 mb-4"
                            >
                                Influencer Marketing
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.7 }}
                                className="text-sm text-slate-800 leading-relaxed font-medium"
                            >
                                We connect your brand with relevant influencers to expand your reach and credibility. By leveraging trusted voices in your industry, we help increase brand awareness, boost engagement, and drive conversions. Our influencer collaborations ensure authenticity and meaningful audience connections.
                            </motion.p>
                        </motion.div>

                        {/* Analytics & Reporting */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.6 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 text-center hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.7 }}
                                className="text-xl font-black text-cyan-500 mb-4"
                            >
                                Analytics & Reporting
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.8 }}
                                className="text-sm text-slate-800 leading-relaxed font-medium"
                            >
                                We track and analyze your social media performance to optimize strategies. Our detailed reports provide insights into audience behavior, campaign success, and areas for improvement. By making data-driven decisions, we continuously refine our approach to achieve better results.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>



            {/* Technologies/Clients Section */}
            <LogoCarousel />

            {/* Why Every Business Needs A Website Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('growBusiness', 'https://img.freepik.com/free-vector/social-media-marketing-concept-illustration_114360-1454.jpg')}
                                alt="Grow Your Business With Social Media"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="flex flex-col justify-center -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                How Cibato Can Help <span className="text-cyan-500">Grow Your Business</span> With Social Media Marketing
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                At Cibato, we help businesses increase brand awareness, drive engagement, and boost sales through strategic social media marketing. Our expert team crafts customized strategies, creates high-quality content, runs targeted ad campaigns, and manages audience interactions to ensure maximum impact. We leverage data-driven insights to optimize performance, improve ROI, and establish a strong digital presence. Whether you’re looking to generate leads, enhance customer relationships, or grow your online community, we have the expertise to make it happen. Let Cibato transform your social media into a powerful growth engine—boost your business with us today!
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
                        <span className="text-cyan-500">Social Media Marketing</span><br />
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
                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
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

                                    {pkg.buttonLink ? (
                                        <motion.a
                                            href={pkg.buttonLink}
                                            {...fadeInUpText}
                                            transition={{ ...fadeInUpText.transition, delay: 0.1 * (index + 1) + 0.4 }}
                                            className="block w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition-colors text-center"
                                        >
                                            {pkg.buttonText || 'Get Started'}
                                        </motion.a>
                                    ) : (
                                        <motion.button
                                            onClick={() => setFormOpen(true)}
                                            {...fadeInUpText}
                                            transition={{ ...fadeInUpText.transition, delay: 0.1 * (index + 1) + 0.4 }}
                                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition-colors"
                                        >
                                            {pkg.buttonText || 'Get Started'}
                                        </motion.button>
                                    )}
                                    {pkg.footerText && <p className="text-center text-sm text-slate-600 mt-3 px-4">{pkg.footerText}</p>}
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

            {/* Why Social Media Marketing & Management Matter Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Why <span className="text-cyan-500">Social Media Marketing</span> & Management Matter for Business Growth ?
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                In today’s digital world, social media marketing and management are essential for business growth. Platforms like Facebook, Instagram, LinkedIn, and Twitter provide direct access to potential customers, increasing brand visibility, engagement, and trust. A well-managed social presence helps generate leads, drive website traffic, and boost conversions. At Cibato, we create targeted strategies, engaging content, and high-performance ad campaigns to maximize your impact. By managing interactions and analyzing data, we ensure consistent growth and a strong online presence. Stay ahead of competitors and unlock new opportunities with our expert social media marketing services! 🚀
                            </motion.p>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('whyMatters', "https://img.freepik.com/free-vector/target-audience-hero-image_23-2148671042.jpg")}
                                alt="Why Social Media Marketing Matters"
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
                    question: "Why is social media marketing important for my business?",
                    answer: "Social media marketing helps increase brand awareness, engage with your audience, generate leads, and drive sales by leveraging popular platforms like Facebook, Instagram, and LinkedIn."
                },
                {
                    question: "How long does it take to see results from social media marketing?",
                    answer: "Results vary based on strategy, industry, and audience, but businesses typically see engagement growth within a few weeks and measurable ROI within 3–6 months."
                },
                {
                    question: "Which social media platforms should my business focus on?",
                    answer: "It depends on your target audience. Facebook and Instagram are great for B2C, LinkedIn works well for B2B, and TikTok is ideal for younger demographics."
                },
                {
                    question: "What’s the difference between organic and paid social media marketing?",
                    answer: "Organic marketing involves unpaid content like posts and engagement, while paid marketing includes ads and promotions to reach a broader audience faster."
                },
                {
                    question: "Can Cibato manage my social media accounts for me?",
                    answer: "Yes! We handle everything from content creation and posting to ad management and analytics, ensuring your brand stays active and grows effectively."
                }
            ]} />

            {/* CTA */}
            <Contact />
        </>
    );
};

export default SocialMediaMarketing;
