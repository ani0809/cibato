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

const MobileAppsDevelopment = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl, data: content } = usePageData('mobile-apps-page-id');

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
                                dangerouslySetInnerHTML={{ __html: content?.hero?.title || 'Build Future-Ready <span class="text-cyan-500">Mobile Apps Development</span> with Cibato’s Expert Services' }}
                            />

                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                {content?.hero?.description || 'At Cibato, we specialize in mobile app development services that transform innovative ideas into seamless, high-performance applications. Our team ensures a user-centric approach, combining advanced technologies with intuitive UI/UX design to deliver engaging and scalable mobile solutions. Whether for iOS, Android, or cross-platform needs, we focus on functionality, security, and efficiency to enhance user experience and business growth. From concept to deployment, our expertise ensures a streamlined development process, creating apps that meet evolving industry demands. Partner with Cibato to develop robust, future-proof mobile applications that elevate your digital presence.'}
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
                                src={getImageUrl('hero', "https://img.freepik.com/free-vector/app-development-concept-illustration_114360-5164.jpg")}
                                alt="Mobile App Development"
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
                                src={getImageUrl('appDevelopment', "https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg")}
                                alt="App Development"
                                className="w-full h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-4xl lg:text-5xl font-black text-slate-900 mb-6"
                            >
                                Expert <span className="text-cyan-500">Mobile App Development</span> Services for Android & iOS
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Cibato offers top-notch mobile application development services designed for Android and iOS platforms. Our team specializes in creating high performance and friendly applications that improve engagement and optimize business operations. If you need a personalized app for e-commerce, corporate solutions or on-demand services, we ensure a perfect state-of-the-art experience. Our mobile application development services focus on safety, scalability and intuitive user/UX interface design. From the idea to the launch, we deal with the entire development process, ensuring that your application meets the standards of the motor. Choose cibato for mobile application development services for Android and iOS and bring your vision to life.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Cibato Section */}
            {/* Why Choose Cibato Section */}
            <WhyChoose imgUrl={getImageUrl('whyChoose', '')} reverse={true} />

            {/* The Best Mobile App Development Services Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <motion.h2
                        {...fadeInUpTitle}
                        transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-12 leading-tight"
                    >
                        The Best <span className="text-cyan-500">Mobile App Development</span> Services in Bangladesh
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Android App Development */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="bg-white rounded-3xl border-2 border-cyan-400 p-8 hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-2xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Android App Development
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                className="text-base text-slate-700 leading-relaxed text-center"
                            >
                                We develop high-performance Android apps tailored to your business needs. Our team ensures smooth functionality, intuitive UI, and strong security, delivering an engaging user experience. Whether for startups or enterprises, our apps drive customer engagement and business growth.
                            </motion.p>
                        </motion.div>

                        {/* iPhone App Development */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="bg-white rounded-3xl border-2 border-cyan-400 p-8 hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.3 }}
                                className="text-2xl font-black text-cyan-500 mb-4 text-center"
                            >
                                iPhone App Development
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base text-slate-700 leading-relaxed text-center"
                            >
                                Our iPhone app development ensures sleek, responsive, and secure applications that enhance user engagement. We build feature-rich, high-quality iOS apps tailored to your business goals, ensuring smooth performance and a seamless user experience while meeting Apple's latest guidelines.
                            </motion.p>
                        </motion.div>

                        {/* iPad App Development */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.3 }}
                            className="bg-white rounded-3xl border-2 border-cyan-400 p-8 hover:shadow-xl transition-all"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.4 }}
                                className="text-2xl font-black text-cyan-500 mb-4 text-center"
                            >
                                iPad App Development
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                className="text-base text-slate-700 leading-relaxed text-center"
                            >
                                We design and develop interactive, scalable iPad apps with user-friendly interfaces. Our solutions enhance productivity, streamline business operations, and deliver engaging experiences across industries, ensuring top-notch performance and security for your brand's success.
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
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('expertServices', "https://img.freepik.com/free-vector/mobile-app-development-concept-illustration_114360-5164.jpg")}
                                alt="Expert Mobile App Development Services"
                                className="w-full h-full object-contain rounded-2xl"
                            />
                        </motion.div>

                        <div className="flex flex-col justify-center -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Expert <span className="text-cyan-500">Mobile App Development</span> Services for Android & iOS
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                At Cibato, we follow a strategic and structured approach to turn your app vision into reality. Our process begins with deep market research and planning to define goals and user expectations. We then design intuitive, user-friendly interfaces and develop robust functionalities using cutting-edge technology. Rigorous testing ensures a seamless experience before launch. Even after deployment, we provide continuous maintenance, updates, and support to keep your app secure, efficient, and future-ready. Our goal is to deliver high-performance Android and iOS apps that drive engagement, enhance user experience, and accelerate business growth. Let's build something amazing together!
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
                        Our Comprehensive<br />
                        <span className="text-cyan-500">Mobile App Development</span><br />
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
                                Seamless Cross-Platform <span className="text-cyan-500">App Development</span> for Android & iOS
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-700 leading-relaxed"
                            >
                                Unlock the power of excellence on a cross platform with our android and iOS application development services specialists. We build high performance scalable applications that offer a perfect experience on various devices. Using state-of-the-art structures such as React Native and Flutter, we guarantee your application work smoothly on both platforms, reducing costs and development time. Our team focuses on the intuitive design of the user/UX interface, robust functionality and optimized performance to create users involving users and boost business success. Whether you launching a boot app or sizing a corporate solution, we help you reach a wider audience with a single efficient code base.
                            </motion.p>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative"
                        >
                            <img
                                src={getImageUrl('crossPlatform', "https://img.freepik.com/free-vector/android-concept-illustration_114360-4663.jpg")}
                                alt="Android App Development"
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
                    question: "What types of mobile app development services do you offer?",
                    answer: "We provide a wide range of mobile app development services, including native iOS and Android apps, cross-platform solutions, UI/UX design, app maintenance, and ongoing support tailored to your business needs."
                },
                {
                    question: "How much does it cost to develop a mobile app?",
                    answer: "The cost of developing a mobile app depends on the complexity, features, and platform(s) you want to target. We offer custom pricing based on your specific requirements and project scope."
                },
                {
                    question: "How long does it take to develop a mobile app?",
                    answer: "Development time varies based on the app's complexity and features. Simple apps may take a few weeks, while more complex apps can take several months. We'll provide an estimated timeline after evaluating your project."
                },
                {
                    question: "Will my app be available on both iOS and Android?",
                    answer: "Yes, we can develop apps for both platforms. We also offer cross-platform solutions for apps that work seamlessly on iOS and Android, saving you time and costs."
                },
                {
                    question: "Can I update and manage my mobile app after it's developed?",
                    answer: "Absolutely! We provide ongoing support and maintenance to help you manage and update your app. You'll have the ability to add new features and make improvements as needed."
                }
            ]} />

            {/* CTA */}
            <Contact />
        </>
    );
};

export default MobileAppsDevelopment;
