import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';
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

const DigitalMarketing = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl } = usePageData('digital-marketing-page-id');

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
                                Leading <span className="text-cyan-500">Digital Marketing</span> Service agency in Bangladesh
                            </motion.h1>

                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Cibato is the top digital marketing service agency in Bangladesh, which is dedicated to help the business grow online. We offer a specific customization strategy, including SEO, marketing on social media and PPC to increase your brand vision and drive the results. As a reliable digital marketing service agency in Bangladesh We guarantee that the data that is driven by data will increase the ROI maximum, whether you are startups or businesses that have been established. Our team of experts at Cibato offer comprehensive services. Makes us a company that needs digital marketing in Bangladesh
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
                                src={getImageUrl('hero', 'https://img.freepik.com/free-vector/digital-marketing-concept-illustration_114360-1633.jpg')}
                                alt="Digital Marketing"
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
                                src={getImageUrl('resultDriven', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80')}
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
                                Empower <span className="text-cyan-500">Your Business</span> with Result-Driven Digital Marketing
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Unlock your business's full potential with our expert Digital Marketing Service. We specialize in tailored strategies that drive real results through social media, SEO, and targeted campaigns. Our goal is to enhance your online presence, increase brand awareness, and maximize growth. With our Digital Marketing Service, you get data-driven solutions designed to generate leads, improve conversions, and boost revenue. Whether you need social media management, search engine optimization, or paid advertising, our team ensures measurable success. Choose our Digital Marketing Service to stay ahead of the competition and achieve long-term business growth. Let's build your digital success together!
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Cibato Section */}
            <WhyChoose
                imgUrl={getImageUrl('whyChoose', '')}
                reverse={true}
                className="my-[40px] mx-[15px] p-0"
            />

            {/* Our Expertise: Comprehensive Digital Marketing Services Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <motion.h2
                        {...fadeInUpTitle}
                        className="text-3xl lg:text-4xl font-black text-center text-slate-900 mb-16"
                    >
                        Our expertise: Comprehensive <span className="text-cyan-500">Digital Marketing</span> services
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Social Media Marketing */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-2xl group"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-2xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Social Media Marketing
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                In today's digital world, social media brings your brand to life. We craft scroll-stopping content, foster authentic interactions, and design targeted campaigns that truly connect. By blending creativity with data, we ensure your brand shines, turning followers into loyal fans. Let's tell your story and build meaningful connections together!
                            </motion.p>
                        </motion.div>

                        {/* Email Marketing */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-2xl group"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.3 }}
                                className="text-2xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Email Marketing
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Emails aren't just messages—they're powerful connections. Our email marketing crafts tailored, eye-catching campaigns that feel personal. With smart segmentation and analytics, we ensure every email nurtures leads, drives clicks, and strengthens relationships. Let's turn your inbox into a space for meaningful engagement!
                            </motion.p>
                        </motion.div>

                        {/* Search Engine Optimization */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.3 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-2xl group"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.4 }}
                                className="text-2xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Search Engine Optimization
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.5 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                SEO bridges your brand to those searching for you. With in-depth keyword research, optimized web pages, and strong backlinks, we make you a magnet for organic traffic. Our goal? Boost visibility, grow authority, and turn clicks into conversions. Let's elevate your brand and secure top search rankings together!
                            </motion.p>
                        </motion.div>

                        {/* Content Marketing Strategy */}
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.4 }}
                            className="bg-white p-8 rounded-2xl border-2 border-cyan-400 hover:border-cyan-500 transition-all hover:shadow-2xl group"
                        >
                            <motion.h3
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.5 }}
                                className="text-2xl font-black text-cyan-500 mb-4 text-center"
                            >
                                Content Marketing Strategy
                            </motion.h3>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                className="text-sm text-slate-700 leading-relaxed text-center"
                            >
                                Every brand has a story; ours is making yours shine. Our content writing services bring your voice to life with compelling, high-quality material. Combined with targeted marketing strategies, we distribute content where it matters most, driving engagement and establishing you as a leader. Let's create a narrative that connects!
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
                                src={getImageUrl('growBusiness', 'https://img.freepik.com/free-vector/business-team-working-cogwheel-mechanism-together_74855-5236.jpg')}
                                alt="Grow Your Business with Digital Marketing"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </motion.div>

                        <div className="flex flex-col justify-center -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Grow Your Business with Expert <span className="text-cyan-500">Digital Marketing</span> Services
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify"
                            >
                                Our Digital Marketing Service is crafted to help your business thrive by enhancing brand visibility, driving targeted traffic, and boosting conversions. With tailored, result-driven strategies, we align with your business goals to ensure success. From SEO and social media marketing to paid campaigns, we focus on what matters most—growing your online presence and increasing revenue. Let us help you unlock your business's true potential and achieve measurable results with our Digital Marketing Service. Together, we'll fuel your growth and elevate your brand in the competitive digital landscape.
                            </motion.p>
                        </div>
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
                        <div className="order-2 lg:order-1 -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                Why <span className="text-cyan-500">Digital Marketing</span> Services Are Essential for Building a Strong Brand!
                            </motion.h2>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-700 leading-relaxed text-justify"
                            >
                                In today's competitive market, digital marketing services are crucial for building a strong brand. From enhancing visibility to engaging with the target audience, these services help businesses establish trust and reliability. With the right strategy, you can create a lasting impact, foster customer loyalty, and drive sustainable growth. Investing in professional digital marketing services ensures that your brand stays ahead of the competition, maximizing its potential in the ever-evolving digital landscape. By leveraging expert strategies, your business will stand out, connect with customers, and achieve long-term success.
                            </motion.p>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
                            className="relative order-1 lg:order-2"
                        >
                            <img
                                src={getImageUrl('leadingAgency', 'https://img.freepik.com/free-vector/digital-marketing-team-with-laptops-light-bulb-marketing-team-metrics-marketing-team-lead-responsibilities-concept_335657-2022.jpg')}
                                alt="Digital Marketing Team"
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
                    question: "What are digital marketing services?",
                    answer: "Digital marketing services include a range of online strategies such as SEO, social media marketing, PPC, content marketing, and email marketing to help businesses grow their online presence."
                },
                {
                    question: "Why are digital marketing services important for my business?",
                    answer: "They help increase brand awareness, drive targeted traffic, generate leads, and improve overall sales by reaching your audience through various online channels."
                },
                {
                    question: "How can digital marketing services improve my brand visibility?",
                    answer: "By using strategies like SEO, social media marketing, and paid ads, digital marketing services ensure your brand reaches potential customers across different platforms."
                },
                {
                    question: "What digital marketing services are best for my business?",
                    answer: "The right services depend on your business goals, target audience, and budget, but a combination of SEO, PPC, and social media usually works well."
                },
                {
                    question: "How often should I update my digital marketing strategy?",
                    answer: "Regular updates based on market trends, performance analysis, and changing customer behaviors are crucial for long-term success."
                }
            ]} />

            {/* CTA */}
            <Contact />
        </>
    );
};

export default DigitalMarketing;
