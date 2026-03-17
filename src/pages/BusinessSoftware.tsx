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

const BusinessSoftware = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl } = usePageData('software-page-id');

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
                                Transform Your Business with <span className="text-cyan-500">Cibato's Software Solutions</span>
                            </motion.h1>

                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                At Cibato, we serve a great business software designed to increase operational efficiency and support growth. Our comprehensive program set consists of a customized solution for accounting, Inventory and POS system that is specially designed to meet the various needs of various industries in Bangladesh by improving financial management efficiency and increasing processes. We help the business grow in the competitive environment. Experience the difference to Cibato and bring your business to another level!
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
                                src={getImageUrl('hero', 'https://img.freepik.com/free-vector/business-people-analyzing-marketing-data_74855-6319.jpg')}
                                alt="Business Software Solutions"
                                className="w-full h-full object-cover rounded-3xl shadow-2xl border-2 border-cyan-200"
                            />
                        </motion.div>
                    </div>
                </div>

                <ContactFormPopup isOpen={formOpen} onClose={() => setFormOpen(false)} />
            </section>

            {/* Awards Section */}
            <AwardsCertifications className="-mt-5 relative z-20" />

            {/* Business Software Services Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('services', 'https://img.freepik.com/free-vector/business-people-working-with-data_74855-5551.jpg')}
                                alt="Business Software Services"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-4xl lg:text-5xl font-black text-slate-900 mb-6"
                            >
                                Best <span className="text-cyan-500">Business Software</span> Services to Streamline Your Operations
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Streamline your operations with our leading business software services designed to simplify HR, payroll, and inventory management. Our more comprehensive business project product offering includes solutions for healthcare, training and retail that ensure easier processes and better efficiency. From managing employee records to optimizing sales and inventory, our software solutions cater to entrepreneurs of all sizes. With our innovative business software services, you can increase productivity, ensure timely reporting, and gain timely insights for better decision-making. Cooperate with us today!
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Cibato Section */}
            <WhyChoose imgUrl={getImageUrl('whyChoose', '')} reverse={true} />

            {/* Business Software Services Types Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <motion.h2
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition }}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-16"
                    >
                        We provide all types of <span className="text-cyan-500">business software</span> services. Like!
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Accounting, Inventory, POS Solutions */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-2xl group"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 bg-cyan-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                <svg className="w-12 h-12 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 3h18v4H3V3zm0 6h18v12H3V9zm2 2v8h14v-8H5z" />
                                </svg>
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Accounting, Inventory, POS Solutions
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Managing finances and inventory is effortless with our all-in-one solutions. Designed for businesses of all sizes, our tools ensure accurate sales tracking, inventory tracking, and real-time insights. Boost productivity, reduce errors, and make informed decisions with ease. Let us handle the numbers while you grow your business confidently.
                            </motion.p>
                        </motion.div>

                        {/* HR and Payroll Management */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-2xl group"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 bg-cyan-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                <svg className="w-12 h-12 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.3 }}
                                className="text-xl font-black text-cyan-500 mb-4 text-center"
                            >
                                HR and Payroll Management
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Effortlessly manage payroll, attendance, and employee records with our all-in-one HR solution. Automate payroll, track attendance, and ensure compliance with Bangladeshi laws. Reduce admin tasks, improve communication, and enhance employee satisfaction. Focus on growth while we streamline workforce management.
                            </motion.p>
                        </motion.div>

                        {/* School & College Management Solutions */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.3 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-2xl group"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 bg-cyan-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                <svg className="w-12 h-12 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                                </svg>
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.4 }}
                                className="text-xl font-black text-cyan-500 mb-4 text-center"
                            >
                                School & College Management Solutions
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Our school and college management software streamlines academic administration with attendance tracking, payroll management, and resource management. Designed for local compliance, it enhances communication and efficiency. Focus on delivering quality education while we handle operations, staff, and student management seamlessly.
                            </motion.p>
                        </motion.div>

                        {/* Diagnostic Management Solutions */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.4 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-2xl group"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 bg-cyan-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                <svg className="w-12 h-12 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
                                </svg>
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.5 }}
                                className="text-xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Diagnostic Management Solutions
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Enhance patient care with our diagnostic management software, designed for accurate record-keeping, appointment scheduling, and billing. Streamline workflows, reduce errors, and boost efficiency in clinics and healthcare facilities. With real-time data tracking and an intuitive interface, deliver top-quality healthcare with confidence.
                            </motion.p>
                        </motion.div>

                        {/* Smart Pharmacy Management System */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.5 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-2xl group"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 bg-cyan-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                <svg className="w-12 h-12 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 5h-2.64l1.14-3.14L17.15 1l-1.46 4H3v2l2 6-2 6v2h18v-2l-2-6 2-6V5zm-5 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                                </svg>
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.6 }}
                                className="text-xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Smart Pharmacy Management System
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.7 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Optimize pharmacy operations with our advanced management software. Ensure accurate inventory control, prescription tracking, and seamless billing while staying compliant with Bangladeshi regulations. Real-time stock monitoring and automation reduce errors, improve efficiency, and enhance customer satisfaction for a smooth workflow.
                            </motion.p>
                        </motion.div>

                        {/* All-in-One Restaurant Management */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.6 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-2xl group"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 bg-cyan-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                <svg className="w-12 h-12 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
                                </svg>
                            </div>
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.7 }}
                                className="text-xl font-black text-cyan-500 mb-4 text-center"
                            >
                                All-in-One Restaurant Management
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.8 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Run your restaurant effortlessly with our comprehensive management software. Whether you're managing a café or a large restaurant chain, our solution streamlines operations, optimizes efficiency, and enhances the dining experience. From order processing to staff management, we've got you covered.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Technologies/Clients Section */}
            <LogoCarousel />

            {/* Scalable Business Software Solutions Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('scalable', 'https://img.freepik.com/free-vector/business-team-analyzing-income-growth-chart_74855-6408.jpg')}
                                alt="Scalable Business Software"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </motion.div>

                        <div className="flex flex-col justify-center -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Scalable <span className="text-cyan-500">Business Software</span> Solutions to Fuel Your Growth and Success
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Our software solutions are built to grow alongside your business. Whether you're managing a small startup or a large corporation, our scalable tools are designed to meet your evolving needs. From handling basic operations to supporting complex workflows, our software integrates seamlessly with your existing systems. As your business expands, our flexible solutions adapt, ensuring you stay competitive. With continuous updates and a dedicated support team, we help you navigate your growth journey, streamline processes, and maximize efficiency, so you can focus on scaling and achieving long-term success.
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
                        <span className="text-cyan-500">Business Software</span><br />
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

            {/* Industry-Specific Software Solutions Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="flex flex-col justify-center -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Industry-Specific <span className="text-cyan-500">Software Solutions</span> with Tailored Support to Maximize Efficiency
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Every industry has unique operational needs, and our customized software solutions address these specific challenges. We work closely with businesses across diverse sectors—such as retail, healthcare, and finance—to deliver software that enhances productivity, optimizes workflows, and drives business success. Our team provides personalized support to ensure the software is aligned with your industry requirements, improving efficiency and reducing manual tasks. Whether you need automation, real-time data tracking, or compliance management, we ensure that our solutions are flexible enough to meet your exact business needs and help you stay ahead of the competition.
                            </motion.p>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('industrySpecific', 'https://img.freepik.com/free-vector/software-development-concept-illustration_114360-2729.jpg')}
                                alt="Industry-Specific Software Solutions"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <div className="-mt-[60px]">
                <Portfolio />
            </div>


            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <FAQ items={[
                {
                    question: "What types of businesses can benefit from your software solutions?",
                    answer: "Our software solutions cater to a variety of businesses, including healthcare facilities, pharmacies, restaurants, educational institutions, and retail stores."
                },
                {
                    question: "Is your software customizable to fit specific business needs?",
                    answer: "Yes, our solutions can be customized to align with your unique business requirements, ensuring maximum efficiency and ease of use."
                },
                {
                    question: "Can I access the software remotely?",
                    answer: "Yes, our cloud-based solutions allow you to access your data and manage operations from anywhere, anytime."
                },
                {
                    question: "How secure is my business data with your software?",
                    answer: "We prioritize data security with advanced encryption and regular backups to protect your sensitive business information."
                },
                {
                    question: "How often do you update the software with new features?",
                    answer: "We continuously improve our software with regular updates to incorporate the latest technology and industry trends."
                },
                {
                    question: "What are the pricing options for your software solutions?",
                    answer: "Our pricing plans are flexible and cater to businesses of all sizes, with options for monthly or yearly subscriptions."
                }
            ]} />

            {/* CTA */}
            <Contact />
        </>
    );
};

export default BusinessSoftware;
