import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { fadeInUpTitle, fadeInUpText } from '../utils/animations';

const defaultFaqs = [
    {
        question: "What services do you offer?",
        answer: "We offer a comprehensive range of digital solutions including Web Design & Development, Business Software, Mobile App Development, SEO, Digital Marketing, Graphic Design, Video Editing, and more."
    },
    {
        question: "How much does a project cost?",
        answer: "Our pricing is tailored to each project's specific needs and scope. We offer competitive rates and can provide a detailed quote after discussing your requirements during a free consultation."
    },
    {
        question: "How long does it take to complete a project?",
        answer: "Timeline varies based on complexity. A standard website might take 2-4 weeks, while custom software or mobile apps can take longer. We provide a clear timeline at the start of every project."
    },
    {
        question: "Do you provide support after the project is finished?",
        answer: "Yes, we offer ongoing support and maintenance packages to ensure your digital assets continue to perform optimally and stay secure."
    },
    {
        question: "Can you help with SEO and marketing?",
        answer: "Absolutely! We specialize in SEO and digital marketing strategies designed to increase your online visibility, drive traffic, and boost conversions."
    }
];

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items?: FAQItem[];
}

const FAQ = ({ items = defaultFaqs }: FAQProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="py-[60px] lg:py-[80px] relative overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <motion.span
                            {...fadeInUpTitle}
                            transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                            className="px-5 py-2.5 bg-white border border-slate-200 text-cyan-600 text-sm font-bold rounded-xl uppercase tracking-wider shadow-sm mb-6 inline-block"
                        >
                            Common Questions
                        </motion.span>
                        <motion.h2
                            {...fadeInUpTitle}
                            transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                            className="text-4xl lg:text-5xl font-black text-slate-900 mb-6"
                        >
                            Frequently Asked <span className="text-cyan-500">Questions</span>
                        </motion.h2>
                    </div>

                    <div className="space-y-4">
                        {items.map((faq, index) => (
                            <motion.div
                                key={index}
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: index * 0.1 }}
                                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                >
                                    <span className="text-lg font-bold text-slate-900 pr-8">{faq.question}</span>
                                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${activeIndex === index ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                        {activeIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
