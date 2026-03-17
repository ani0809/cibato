import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';
import { Lightbulb, Palette, Settings, Smartphone, Check } from 'lucide-react';
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
import { useMemo } from 'react';

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

const WebDesignDevelopment = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl, data: content } = usePageData('web-design-page-id');

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
                                We Are Best <span className="text-cyan-500">Website Design And Development</span> Service Company In Bangladesh.
                            </motion.h1>

                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Looking for a reliable website design and development service in BD? We create stunning, responsive, and user-friendly websites tailored to your business needs. Our expert team delivers customized solutions that enhance your online presence and help you achieve your goals. Whether you're a startup or an established business, we ensure your website stands out with exceptional design and seamless functionality.
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
                                Creative <span className="text-cyan-500">Web Design And Development</span> Services
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                At Cibato, we provide expert website design and development services to elevate your brand. Our team blends creativity and technology to craft stunning, responsive, and user-friendly websites. Whether it's a business site or an eCommerce platform, we ensure top performance and a seamless user experience. Our goal is to create a digital presence that attracts and converts customers. Trust Cibato for professional website solutions that drive real results. Let us turn your vision into reality with exceptional website design and development services tailored to your needs.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Cibato Section */}
            <WhyChoose
                imgUrl={getImageUrl('whyChoose', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800')}
                reverse={true}
                className="my-[20px]"
            />

            {/* Our Skilled Team Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('skilledTeam', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')}
                                alt="Team Building Website"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Our Skilled Team Blends<br />
                                <span className="text-cyan-500">Creativity And Technology</span>
                            </motion.h2>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-2xl font-bold text-slate-900 mb-4"
                            >
                                How Do We Build The Perfect Website?
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                We work on building the perfect website. Start by defining the purpose and Goal of your website. Then try to do the perfect marketing for your audience. The company plans innovative and user-friendly designs that reflect the brand. Guaranteed mobile responsiveness Create high-quality content optimized for SEO and accessible onboarding options. After developing the site Conduct rigorous functionality and usability testing before launching. Finally, use reviews to gather feedback on creating an updated site and continuous improvements.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Development Process Section - Reduced padding by 60px total */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Research and Planning */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl group"
                        >
                            <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-100 transition-colors">
                                <Lightbulb className="w-7 h-7 text-cyan-500" />
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-lg font-black text-cyan-500 mb-3"
                            >
                                Research and Planning
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                className="text-sm text-slate-700 leading-relaxed"
                            >
                                We carefully analyze concurrent events and audiences to develop a strategic plan. Our team created a detailed site map that explains the structure and pages. of your website to optimize its flow and usability.
                            </motion.p>
                        </motion.div>

                        {/* Design & User Experience */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl group"
                        >
                            <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-100 transition-colors">
                                <Palette className="w-7 h-7 text-cyan-500" />
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.3 }}
                                className="text-lg font-black text-cyan-500 mb-3"
                            >
                                Design & User Experience
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-sm text-slate-700 leading-relaxed"
                            >
                                We create visually appealing, branded websites with intuitive navigation and user-friendly layouts, ensuring a seamless and engaging user experience that perfectly represents your brand and enhances its online presence.
                            </motion.p>
                        </motion.div>

                        {/* Development Process */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.3 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl group"
                        >
                            <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-100 transition-colors">
                                <Settings className="w-7 h-7 text-cyan-500" />
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.4 }}
                                className="text-lg font-black text-cyan-500 mb-3"
                            >
                                Development Process
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                className="text-sm text-slate-700 leading-relaxed"
                            >
                                Our development team uses the latest technology to create resource-rich sites tailored to your needs. From forms to e-commerce functionality, We use everything necessary for your site's success.
                            </motion.p>
                        </motion.div>

                        {/* Responsive Design */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.4 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl group"
                        >
                            <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-100 transition-colors">
                                <Smartphone className="w-7 h-7 text-cyan-500" />
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.5 }}
                                className="text-lg font-black text-cyan-500 mb-3"
                            >
                                Responsive Design
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                className="text-sm text-slate-700 leading-relaxed"
                            >
                                We create mobile-compatible websites that ensure optimal performance and a seamless user experience across desktops, tablets, and smartphones while maintaining consistency, visual appeal, and full functionality.
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
                        <div className="flex flex-col justify-center -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Why Every Business<br />
                                <span className="text-cyan-500">Needs A Website</span><br />
                                For Growth And Success ?
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Because every company needs a place to grow and succeed. Websites are essential for companies in today's digital age. increase credibility increase visibility and serves as a 24-hour, 7-day-a-week platform to showcase your products or services.With a site, you can attract customers, Increase sales, and reach a wider audience. At the same time benefit from economical marketing. It is an important foundation for building trust. Strengthen your brand and achieve business growth.
                            </motion.p>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('whyBusiness', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80')}
                                alt="Why Every Business Needs A Website"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Website Features Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
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
                                <Settings className="w-8 h-8 text-cyan-500" />
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
                                <Lightbulb className="w-8 h-8 text-cyan-500" />
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
                                <Palette className="w-8 h-8 text-cyan-500" />
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
                                <Settings className="w-8 h-8 text-cyan-500" />
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

            {/* Pricing Packages Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <motion.h2
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-4 leading-tight"
                    >
                        Our Compressive<br />
                        <span className="text-cyan-500">Web Design & Development</span><br />
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
                                            {/* Ideally we'd map icons too, but using a generic one or cycling them for now is fine */}
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

            {/* Bangladesh's Leading Agency Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('leadingAgency', 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80')}
                                alt="Web Design Team"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Bangladesh's Leading <span className="text-cyan-500">Web Design & Development</span> Agency!
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-700 leading-relaxed mb-4"
                            >
                                Procuring a website that elevates your brand and manages your success? We've got you covered!
                            </motion.p>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                className="text-base lg:text-lg text-slate-700 leading-relaxed"
                            >
                                As a trusted website design and development agency in Bangladesh. We create websites that are visually appealing and easy to use. which is tailored to your objectives. Whether it's a personal website Company portal or e-commerce platform We deliver results that engage your audience and increase conversions.Let us help him build a powerful online presence and turn his vision into reality. Make Parceria the best today!
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <FAQ items={[
                {
                    question: "What services does Cibato provide?",
                    answer: "We provide complete website design and development services. Including responsive design e-commerce solutions and custom web applications"
                },
                {
                    question: "Have you created a website that is compatible with mobile devices?",
                    answer: "Definitely! All of our sites are fully responsive and optimized for a perfect experience on all devices."
                },
                {
                    question: "Can you redesign my existing website?",
                    answer: "Yes! We specialize in modernizing existing sites. To meet current needs and improve efficiency"
                },
                {
                    question: "Do you have an SEO-friendly website design?",
                    answer: "Yes! All of our sites are designed with SEO best practices to help improve your rankings on search engines."
                },
                {
                    question: "How much does your website design service cost?",
                    answer: "Price depends on the complexity and needs of the project."
                },
                {
                    question: "How do I start using Cibato?",
                    answer: "Contact us via our website or contact form. Then our team will guide you through the process."
                }
            ]} />

            {/* CTA */}
            <Contact />
        </>
    );
};

export default WebDesignDevelopment;
