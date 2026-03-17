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

import GoogleWorkspacePricing from '../components/GoogleWorkspacePricing';
import { usePageData } from '../hooks/usePageData';


const GoogleWorkspace = () => {
    const [formOpen, setFormOpen] = useState(false);
    const { getImageUrl, data: content } = usePageData('google-workspace-page-id');

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
                                <span dangerouslySetInnerHTML={{ __html: content?.hero?.title || 'Get <span class="text-cyan-500">Google Workspace</span> Solutions In Bangladesh – Power Up Your Productivity' }} />
                            </motion.h1>

                            <motion.div
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-base lg:text-lg text-slate-600 leading-relaxed text-justify"
                                dangerouslySetInnerHTML={{ __html: content?.hero?.description || 'Google Workspace Solutions – Power Up Your Productivity. Boost your business with Google Workspace (formerly G Suite) – the ultimate suite of cloud-based tools for seamless collaboration, communication, and productivity. We provide expert Google Workspace services to help you set up custom emails, manage cloud storage, and streamline teamwork with Gmail, Drive, Meet, and more. Optimize your workflow and get ranked on Google with our professional support. Whether you’re a startup or an enterprise, our tailored Google Workspace services ensure smooth operations and enhanced efficiency.' }}
                            />

                            <motion.div
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                            >
                                <CibatoSlideButton
                                    label={content?.hero?.buttonText || "GET A FREE CONSULTANCY"}
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
                                src={getImageUrl('hero', 'https://img.freepik.com/free-vector/digital-marketing-agency-concept-illustration_114360-6394.jpg')}
                                alt="Google Workspace Solutions"
                                className="w-full h-full object-contain rounded-3xl"
                            />
                        </motion.div>
                    </div>
                </div>

                <ContactFormPopup isOpen={formOpen} onClose={() => setFormOpen(false)} />
            </section>

            {/* Awards Section */}
            <AwardsCertifications className="-mt-5 relative z-20" />

            {/* Google Workspace Plans Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative flex justify-center"
                        >
                            <img
                                src={getImageUrl('businessNeeds', 'https://img.freepik.com/free-vector/setup-wizard-concept-illustration_114360-1428.jpg')}
                                alt="Google Workspace Plans"
                                className="w-[85%] h-auto rounded-2xl"
                            />
                        </motion.div>

                        <div className="-mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight"
                            >
                                <span dangerouslySetInnerHTML={{ __html: content?.businessNeeds?.title || 'Why Your Business Needs <span class="text-cyan-500">Google Workspace</span>' }} />
                            </motion.h2>
                            <motion.div
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="text-lg text-slate-600 leading-relaxed text-justify mb-6 space-y-4"
                                dangerouslySetInnerHTML={{ __html: content?.businessNeeds?.description || "In today's fast-paced digital world, efficient collaboration is key to success. Google Workspace provides a unified platform where your team can communicate, create, and coordinate seamlessly." }}
                            />

                            {/* Only show list if no dynamic description override exists (legacy support) or if we want to mix them. 
                                For now, the user request implies replacing the list with the text paragraphs. 
                                So we omit the list if using dynamic content that is clearly the new format. 
                            */}
                            {!content?.businessNeeds?.description && (
                                <motion.ul
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                                    className="space-y-4"
                                >
                                    {[
                                        'Professional email address @yourcompany.com',
                                        'Access files from anywhere with Google Drive',
                                        'Secure video meetings with Google Meet',
                                        'Real-time collaboration on Docs, Sheets & Slides',
                                        'Enterprise-grade security and management controls'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-700">
                                            <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-4 h-4 text-cyan-600" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Cibato Section */}
            <WhyChoose imgUrl={getImageUrl('whyChoose', '')} reverse={true} />



            {/* Detailed Pricing Table & Apps */}
            <GoogleWorkspacePricing data={content} />

            {/* Smart Communication & Collaboration Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="order-2 lg:order-2 -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-8 leading-tight"
                            >
                                Smart <span className="text-cyan-500">Communication & Collaboration</span>
                            </motion.h2>

                            <motion.ul
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="space-y-6"
                            >
                                {[
                                    {
                                        title: 'Business Email with Gmail',
                                        desc: 'Create professional email addresses for your team using your domain name, enhancing brand credibility and customer trust.'
                                    },
                                    {
                                        title: 'Real-Time Collaboration',
                                        desc: 'Work together on documents, spreadsheets, and presentations with seamless real-time editing and commenting through Google Docs, Sheets, and Slides.'
                                    },
                                    {
                                        title: 'Smart Communication Tools',
                                        desc: 'Stay connected with Google Meet for secure video and voice calls, and Google Chat for organized, real-time team messaging and project discussions.'
                                    },
                                    {
                                        title: 'Shared Calendars & Task Management',
                                        desc: 'Coordinate meetings, set deadlines, and manage team schedules efficiently with shared calendars and built-in task tools.'
                                    }
                                ].map((item, i) => (
                                    <li key={i} className="flex cross-start gap-4 text-slate-700">
                                        <div className="w-6 h-6 mt-1 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check className="w-6 h-6 text-cyan-500 font-bold" strokeWidth={3} />
                                        </div>
                                        <div>
                                            <span className="font-bold text-slate-900">{item.title}: </span>
                                            {item.desc}
                                        </div>
                                    </li>
                                ))}
                            </motion.ul>
                        </div>

                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative order-1 lg:order-1"
                        >
                            <img
                                src={getImageUrl('smart_collaboration', 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80')}
                                alt="Smart Communication & Collaboration"
                                className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Productivity Software Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative order-1 lg:order-2"
                        >
                            <img
                                src={getImageUrl('productivity_software', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80')}
                                alt="Productivity Software"
                                className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                            />
                        </motion.div>

                        <div className="order-2 lg:order-1 -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-8 leading-tight"
                            >
                                Productivity <span className="text-cyan-500">Software</span>
                            </motion.h2>

                            <motion.ul
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="space-y-6"
                            >
                                {[
                                    {
                                        title: 'Shared Calendars',
                                        desc: 'Easily view team members’ availability and integrate multiple calendars into one view to quickly schedule meetings and events.'
                                    },
                                    {
                                        title: 'Docs, Sheets & Forms',
                                        desc: 'Create, edit, and collaborate on documents, spreadsheets, and forms from anywhere — even offline — for seamless productivity on the go.'
                                    },
                                    {
                                        title: 'Slides – Presentation Builder',
                                        desc: 'Collaborate in real-time on presentations with colleagues, your entire organization, or external partners, all through a secure cloud-based platform.'
                                    }
                                ].map((item, i) => (
                                    <li key={i} className="flex cross-start gap-4 text-slate-700">
                                        <div className="w-6 h-6 mt-1 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check className="w-6 h-6 text-cyan-500 font-bold" strokeWidth={3} />
                                        </div>
                                        <div>
                                            <span className="font-bold text-slate-900">{item.title}: </span>
                                            {item.desc}
                                        </div>
                                    </li>
                                ))}
                            </motion.ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technologies/Clients Section */}
            <LogoCarousel />

            {/* Get G Suite Section */}
            <section className="py-[60px] lg:py-[80px]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            {...fadeInUpImage}
                            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
                            className="relative order-1 lg:order-1"
                        >
                            <img
                                src={getImageUrl('get_g_suite', 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80')}
                                alt="Get G Suite with Gmail on Your Domain"
                                className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                            />
                        </motion.div>

                        <div className="order-2 lg:order-2 -mt-2.5 -ml-0">
                            <motion.h2
                                {...fadeInUpTitle}
                                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                                className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight uppercase"
                            >
                                Get G Suite with <span className="text-cyan-500">Gmail on Your Domain</span>
                                <span className="block text-xl lg:text-2xl mt-2 font-bold text-slate-700 normal-case">We Provide Free Migration and Configuration</span>
                            </motion.h2>

                            <motion.div
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                className="space-y-6 text-slate-600 leading-relaxed text-justify"
                            >
                                <p className="uppercase font-semibold text-slate-800">
                                    All of your favorite Google products are perfectly integrated with your account. You can always add later as your team grows.
                                </p>

                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Best Google Workspace (G Suite) Pricing in Bangladesh</h3>
                                    <p className="mb-4">
                                        Google Workspace (formerly G Suite) offers a variety of plans — including Business Starter, Business Standard, Business Plus, and Enterprise — each tailored to meet different business needs with varying features and pricing.
                                    </p>
                                    <p className="mb-4">
                                        Pricing may vary depending on your region and selected plan. For the most accurate and up-to-date information in Bangladesh, we recommend visiting the Cibato website or contacting the Cibato sales team directly.
                                    </p>
                                    <p>
                                        Cibato proudly offers some of the most competitive Google Workspace pricing in Bangladesh, along with expert support and flexible subscription options.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <FAQ items={
                [
                    {
                        question: "What is included in Google Workspace?",
                        answer: "Google Workspace includes Gmail, Calendar, Drive, Docs, Sheets, Slides, Meet, Chat, and more, all connected in a seamless cloud environment."
                    },
                    {
                        question: "Can I use my existing domain with Google Workspace?",
                        answer: "Yes! We can set up Google Workspace using your company's domain name (e.g., name@yourcompany.com) for a professional look."
                    },
                    {
                        question: "Is Google Workspace secure?",
                        answer: "Yes, Google Workspace is built with enterprise-grade security, including 2-step verification, single-sign-on (SSO), and advanced administrative controls."
                    },
                    {
                        question: "Will I lose my old emails during migration?",
                        answer: "No, our migration experts ensure that all your existing emails, contacts, and calendar data are safely transferred to your new Google Workspace account."
                    },
                    {
                        question: "Do you offer support after setup?",
                        answer: "Yes, we provide ongoing technical support and can assist with user management, security settings, and troubleshooting."
                    }
                ]} />

            {/* CTA */}
            < Contact />
        </>
    );
};

export default GoogleWorkspace;
