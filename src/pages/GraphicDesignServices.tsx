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

const GraphicDesignServices = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl, data: content } = usePageData('graphic-design-services');

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
                                Creative & Impactful <span className="text-cyan-500">Graphic Design Services</span> for Your Brand
                            </motion.h1>

                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                we offer professional Graphic Design services to help businesses create a strong visual identity. Our expert designers craft custom logos, social media graphics, marketing materials, and branding assets that align with your brand's vision. With our Graphic Design services, we ensure high-quality, engaging visuals that leave a lasting impression. Whether you need designs for digital or print media, we focus on creativity, precision, and brand consistency. Elevate your brand's presence with our Graphic Design services and make a powerful impact in a competitive marketplace.
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
                                src={getImageUrl('hero', "https://img.freepik.com/free-vector/graphic-design-colorful-geometrical-lettering_52683-34588.jpg")}
                                alt="Graphic Design Services"
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
                                src={getImageUrl('transformBrand', "https://img.freepik.com/free-vector/graphic-designer-working-laptop_23-2148226233.jpg")}
                                alt="Transform Your Brand"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-4xl lg:text-5xl font-black text-slate-900 mb-6"
                            >
                                Transform <span className="text-cyan-500">Your Brand</span> With Stunning Graphic Design
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                At Cibato, we provide professional Graphic Design services to help businesses create a unique and impactful visual identity. From logos, branding materials, and social media graphics to marketing collateral and print designs, our creative experts ensure high-quality, eye-catching visuals. We focus on delivering customized, innovative, and brand-aligned designs that capture attention and enhance engagement. Whether you're launching a new business or refreshing your existing brand, our Graphic Design services will help you stand out in a competitive market. Let Cibato bring your vision to life with visually stunning and professionally crafted designs!
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Cibato Section */}
            {/* Why Choose Cibato Section */}
            <WhyChoose imgUrl={getImageUrl('whyChoose', '')} reverse={true} />

            {/* Expert Graphic Design Solutions Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <motion.h2
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-4 leading-tight"
                    >
                        Expert <span className="text-cyan-500">Graphic Design</span> Solutions To Suit Your Need
                    </motion.h2>
                    <motion.p
                        {...fadeInUpText}
                        transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                        className="text-center text-lg text-slate-600 mb-12 max-w-4xl mx-auto"
                    >
                        we deliver custom graphic design solutions that enhance your brand's identity. From logos and branding to social media and marketing materials, we craft visually stunning designs to captivate your audience.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Logo Design */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.1 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl text-center group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-3">Logo Design</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Creating unique and memorable logos that represent your brand.
                            </p>
                        </motion.div>

                        {/* Social Media Graphics */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.2 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl text-center group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-3">Social Media Graphics</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Creating engaging visuals for your social media platforms.
                            </p>
                        </motion.div>

                        {/* Banner & Poster Design */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl text-center group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-3">Banner & Poster Design</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Designing impactful banners and posters for both digital and print use.
                            </p>
                        </motion.div>

                        {/* UI/UX Design */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl text-center group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-3">UI/UX Design</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                We design intuitive, engaging interfaces for optimal UX.
                            </p>
                        </motion.div>

                        {/* Motion Graphics Design */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl text-center group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-3">Motion Graphics Design</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                We create dynamic motion graphics that captivate and communicate.
                            </p>
                        </motion.div>

                        {/* Infographics */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl text-center group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-3">Infographics</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Transforming complex data into easy-to-understand visual content.
                            </p>
                        </motion.div>

                        {/* Brochure Design */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.7 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl text-center group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-3">Brochure Design</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Creating informative and attractive brochures.
                            </p>
                        </motion.div>

                        {/* Business Card */}
                        <motion.div
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: 0.8 }}
                            className="bg-white p-6 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-xl text-center group"
                        >
                            <h3 className="text-xl font-black text-cyan-500 mb-3">Business Card</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Design professional business cards that leave a lasting impression.
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
                                src={getImageUrl('elevateBrand', "https://img.freepik.com/free-vector/graphic-designer-desk-concept-illustration_114360-4329.jpg")}
                                alt="Elevate Your Brand"
                                className="w-full h-full object-contain rounded-2xl"
                            />
                        </motion.div>

                        <div className="flex flex-col justify-center -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Elevate Your Brand with Our Premium <span className="text-cyan-500">Graphic Design</span> Services in Bangladesh
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                At our premier graphic design agency in Bangladesh, we offer a comprehensive suite of premium design services to help businesses and individuals create stunning visuals that captivate and engage their audience. From logo design and branding to web design, social media graphics, and motion graphics, our team of talented designers leverages their expertise in Graphic Design Services in Bangladesh to deliver exceptional results. Whether you're looking to establish a strong brand identity, enhance your online presence, or communicate your message effectively, our Graphic Design Services in Bangladesh are tailored to meet your unique needs and exceed your expectations. Backed by our unwavering commitment to excellence and deep understanding of the Bangladeshi market, we are the go-to choice for businesses seeking to elevate their brand through our premium Graphic Design Services in Bangladesh.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Creative Consulting Section - Added as per request */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="-mt-2.5 -ml-0 order-2 lg:order-1">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                                dangerouslySetInnerHTML={{ __html: content?.creativeConsulting?.title || 'Unlock Your <span class="text-cyan-500">Brand\'s Potential</span> With Cibato\'s Creative Consulting' }}
                            />
                            <motion.div
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                                dangerouslySetInnerHTML={{ __html: content?.creativeConsulting?.description || '<p class="mb-4">In addition to our premium design services, Cibato also offers creative consulting to help you unlock your brand’s full potential. Our team of experienced strategists and creatives work closely with you to develop a comprehensive brand strategy that aligns with your business goals and resonates with your target audience.</p><p>From conducting market research and competitor analysis to defining your brand’s unique value proposition and crafting a cohesive visual identity, our creative consulting services ensure that your brand stands out in the crowded Bangladeshi market and leaves a lasting impression on your customers.</p>' }}
                            />
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative order-1 lg:order-2 flex justify-center"
                        >
                            <img
                                src={getImageUrl('creativeConsulting', "https://img.freepik.com/free-vector/business-consulting-concept-illustration_114360-9336.jpg")}
                                alt="Creative Consulting"
                                className="w-[85%] h-auto rounded-2xl"
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
                        <span className="text-cyan-500">Graphic Design Services</span><br />
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

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <FAQ items={[
                {
                    question: "What services does Cibato offer?",
                    answer: "Cibato offers a comprehensive suite of premium graphic design services, including logo design, branding, web design, social media graphics, motion graphics, and more. We cater to the unique needs of businesses and individuals in Bangladesh."
                },
                {
                    question: "How does Cibato's creative consulting differ from their design services?",
                    answer: "Cibato's creative consulting services go beyond just design. Our team of experienced strategists and creatives work with you to develop a comprehensive brand strategy that aligns with your business goals and target audience. This includes market research, competitor analysis, and defining your brand's unique value proposition."
                },
                {
                    question: "What is the turnaround time for Cibato's design projects?",
                    answer: "The turnaround time for Cibato's design projects varies depending on the scope and complexity of the project. However, we work closely with our clients to ensure that all deadlines are met and that the final deliverables exceed their expectations."
                },
                {
                    question: "How does Cibato ensure the quality of their work?",
                    answer: "At Cibato, we have a rigorous quality control process that involves multiple rounds of review and feedback from our team of designers and strategists. We also work closely with our clients to ensure that the final deliverables meet their exact specifications and requirements."
                },
                {
                    question: "What is Cibato's pricing structure?",
                    answer: "Cibato's pricing structure is tailored to the specific needs of each client. We offer competitive rates for our premium design services and creative consulting, and we are transparent about our pricing throughout the entire project lifecycle."
                }
            ]} />

            {/* CTA */}
            <Contact />
        </>
    );
};

export default GraphicDesignServices;
