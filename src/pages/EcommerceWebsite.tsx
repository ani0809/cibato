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

const EcommerceWebsite = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl } = usePageData('ecommerce-page-id');

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
                                We Are Best <span className="text-cyan-500">E-commerce Website</span> Design and Development Company in Bangladesh for Your Digital Success
                            </motion.h1>

                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Looking for the best e-commerce website design and development company in Bangladesh? We specialize in creating modern ecommerce websites. Easy to use and safe It is tailored to your business needs. Our team of experts guarantees smooth navigation. Responsive design and optimized performance for maximum conversion. Whether you're starting from scratch or upgrading an existing site. We offer first class solutions. Choose our ecommerce website design and development company to increase your online presence and manage your success. Let's create two of your dreams today!
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
            {/* E-Commerce Services Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('ecommerceServices', 'https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg')}
                                alt="E-Commerce Development"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Our <span className="text-cyan-500">E-Commerce website</span> development services to build your brand
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Cibato specializes in eCommerce website development services designed to help you build and grow your online brand. We create online stores that are user-friendly, secure, and scalable, tailored to meet your unique business needs. From seamless navigation to optimized performance, our eCommerce solutions focus on enhancing user experience and maximizing conversions. Whether you're launching a new store or upgrading an existing one, our team of experts delivers a professional and comprehensive online presence. With Cibato, you can transform visitors into loyal customers and drive long-term success. Partner with us to elevate your eCommerce journey and achieve your goals.
                            </motion.p>
                        </div>
                    </div>

                    {/* Platforms and Technologies Section */}
                    <div className="mt-20">
                        <motion.h2
                            {...fadeInUpTitle}
                            transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                            className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-12"
                        >
                            Platforms and <span className="text-cyan-500">Technologies</span> We Work With
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* WordPress */}
                            <motion.div
                                {...fadeInUpImage}
                                transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                                className="bg-white p-6 rounded-2xl border border-cyan-100 hover:border-cyan-400 hover:shadow-xl transition-all text-center group"
                            >
                                <div className="w-20 h-20 mx-auto mb-6">
                                    <img src={getImageUrl('wordpressLogo', 'https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg')} alt="WordPress" className="w-full h-full object-contain" />
                                </div>
                                <motion.h3
                                    {...fadeInUpTitle}
                                    transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                    className="text-xl font-black text-cyan-500 mb-4"
                                >
                                    WordPress
                                </motion.h3>
                                <motion.p
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                    className="text-sm text-slate-600 leading-relaxed"
                                >
                                    We develop strategic, user-friendly WordPress websites with structured navigation, optimized usability, and responsive designs. Our expert team ensures seamless performance, enhancing engagement and business growth through high-quality
                                </motion.p>
                            </motion.div>

                            {/* Shopify */}
                            <motion.div
                                {...fadeInUpImage}
                                transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                                className="bg-white p-6 rounded-2xl border border-cyan-100 hover:border-cyan-400 hover:shadow-xl transition-all text-center group"
                            >
                                <div className="w-20 h-20 mx-auto mb-6">
                                    <img src={getImageUrl('shopifyLogo', 'https://cdn.worldvectorlogo.com/logos/shopify.svg')} alt="Shopify" className="w-full h-full object-contain" />
                                </div>
                                <motion.h3
                                    {...fadeInUpTitle}
                                    transition={{ ...fadeInUpTitle.transition, delay: 0.3 }}
                                    className="text-xl font-black text-cyan-500 mb-4"
                                >
                                    Shopify
                                </motion.h3>
                                <motion.p
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                    className="text-sm text-slate-600 leading-relaxed"
                                >
                                    We design custom Shopify stores with intuitive navigation, mobile responsiveness, and seamless checkout. Our solutions enhance user engagement, brand identity, and conversions, ensuring a smooth, visually appealing, and high-performing e-commerce experience.
                                </motion.p>
                            </motion.div>

                            {/* Laravel */}
                            <motion.div
                                {...fadeInUpImage}
                                transition={{ ...fadeInUpImage.transition, delay: 0.3 }}
                                className="bg-white p-6 rounded-2xl border border-cyan-100 hover:border-cyan-400 hover:shadow-xl transition-all text-center group"
                            >
                                <div className="w-20 h-20 mx-auto mb-6">
                                    <img src={getImageUrl('laravelLogo', 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg')} alt="Laravel" className="w-full h-full object-contain" />
                                </div>
                                <motion.h3
                                    {...fadeInUpTitle}
                                    transition={{ ...fadeInUpTitle.transition, delay: 0.4 }}
                                    className="text-xl font-black text-cyan-500 mb-4"
                                >
                                    Laravel
                                </motion.h3>
                                <motion.p
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                    className="text-sm text-slate-600 leading-relaxed"
                                >
                                    We build secure, scalable Laravel websites with advanced functionality and seamless user experience. From business sites to e-commerce platforms, our expertise ensures high-performance, customization, and efficiency tailored to business needs.
                                </motion.p>
                            </motion.div>

                            {/* Magento */}
                            <motion.div
                                {...fadeInUpImage}
                                transition={{ ...fadeInUpImage.transition, delay: 0.4 }}
                                className="bg-white p-6 rounded-2xl border border-cyan-100 hover:border-cyan-400 hover:shadow-xl transition-all text-center group"
                            >
                                <div className="w-20 h-20 mx-auto mb-6">
                                    <img src={getImageUrl('magentoLogo', 'https://upload.wikimedia.org/wikipedia/commons/5/55/Magento_Logo.svg')} alt="Magento" className="w-full h-full object-contain" />
                                </div>
                                <motion.h3
                                    {...fadeInUpTitle}
                                    transition={{ ...fadeInUpTitle.transition, delay: 0.5 }}
                                    className="text-xl font-black text-cyan-500 mb-4"
                                >
                                    Magento
                                </motion.h3>
                                <motion.p
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                    className="text-sm text-slate-600 leading-relaxed"
                                >
                                    Our Magento websites deliver speed, security, and mobile responsiveness. We optimize user experience, performance, and customization to enhance e-commerce capabilities, ensuring a seamless shopping experience across all devices with modern, engaging design.
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Cibato Section */}
            <WhyChoose imgUrl={getImageUrl('whyChoose', '')} reverse={true} />

            {/* Why a Quality E-Commerce Website Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('ecommerceQuality', 'https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg')}
                                alt="E-Commerce Success"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Why a Quality <span className="text-cyan-500">E-Commerce Website</span> is Essential for Your Business Success
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                A high-quality ecommerce site is essential to building trust. Improved user experience and stimulate sales It acts as a digital showcase. Provide customers with a safe and integrated shopping experience. With a well-designed website You can improve your brand's credibility, increase conversions, and stay ahead of the competition. It also guarantees mobile responsiveness. Fast loading speed And SEO optimization makes it easier for potential customers to find and interact with your company. Investing in a quality ecommerce site is key to long-term growth and success.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhancing User Experience Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Enhancing <span className="text-cyan-500">User Experience</span> with a Clutter-Free Website Design
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                The user-friendly site guarantees a perfect browsing experience. Keep the design clean and easy to use. Providing clear navigation elements such as your current location and questionable menus It will help users easily find what they are looking for. Important elements such as shipping images, concise product descriptions and pricing details Improve usability and avoid confusion Avoid giving visitors too much information. Focus on key elements such as product images, descriptions, prices, and related items. To create an engaging and distraction-free shopping experience.
                            </motion.p>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('clutterFree', 'https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg')}
                                alt="Clutter-Free Website Design"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>
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

            {/* Crafting Effective Call-to-Actions Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('cta', 'https://img.freepik.com/free-vector/marketing-consulting-concept-illustration_114360-9027.jpg')}
                                alt="Crafting Effective Call-to-Actions"
                                className="w-full h-full object-contain rounded-2xl"
                            />
                        </motion.div>

                        <div className="flex flex-col justify-center -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Crafting Effective <span className="text-cyan-500">Call-to-Actions</span> for User Engagement
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                A well-designed headline (CTA) is critical in guiding users to the next step on your site, whether it's "add to cart," "complete purchase," or "submit payment." Money." Clear, engaging CTAs can help manage conversions. It's important to focus on the main CTA per page and at the same time offer secondary options, like downloading a demo or scheduling an update. Place your CTA strategically. Without overloading users, it guarantees their continued engagement. This increases your chances of achieving your site's goals effectively.
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
                        <span className="text-cyan-500">Ecommerce Development</span><br />
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
            <div className="-mt-5">
                <Portfolio />
            </div>

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <FAQ items={[
                {
                    question: "What services does Cibato offer?",
                    answer: "A website helps establish your online presence, build credibility, and attract potential customers."
                },
                {
                    question: "What platforms do you use to build websites?",
                    answer: "We specialize in WordPress, Shopify, Wix, and custom-built solutions tailored to your needs."
                },
                {
                    question: "Can I update my website content after it’s launched?",
                    answer: "Absolutely! We provide user-friendly CMS options, allowing you to manage and update content easily."
                },
                {
                    question: "Do you provide eCommerce website development?",
                    answer: "Yes, we create eCommerce websites with secure payment gateways and user-friendly interfaces."
                },
                {
                    question: "Do you offer website maintenance and support?",
                    answer: "Yes, we offer ongoing support and maintenance to keep your website running smoothly."
                },
                {
                    question: "How do I get started with my website project?",
                    answer: "Simply reach out to us via our contact page, and we'll discuss your requirements in detail."
                }
            ]} />

            {/* CTA */}
            <Contact />
        </>
    );
};

export default EcommerceWebsite;
