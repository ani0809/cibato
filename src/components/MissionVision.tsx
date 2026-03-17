import { motion } from 'framer-motion';

import { fadeInUpTitle, fadeInUpText } from '../utils/animations';
const MissionVision = () => {

    return (
        <section className="py-[60px] lg:py-[80px] bg-gradient-to-b from-white via-slate-50/30 to-white relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-40 left-20 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Mission Card */}
                    <motion.div
                        {...fadeInUpText}
                        transition={{ ...fadeInUpText.transition, delay: 0.1 }}
                        className="group relative"
                    >
                        <div className="relative bg-white rounded-3xl p-6 lg:p-8 shadow-md hover:shadow-lg transition-all duration-500 border-2 border-slate-200">
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                {/* Title */}
                                <motion.h3
                                    {...fadeInUpTitle}
                                    transition={{ ...fadeInUpTitle.transition, delay: 0.3 }}
                                    className="text-2xl lg:text-3xl font-black text-slate-900 mb-4"
                                >
                                    Our <span className="text-cyan-500">Mission</span>
                                </motion.h3>

                                {/* Description */}
                                <motion.p
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                    className="text-slate-700 leading-relaxed text-justify text-sm lg:text-base"
                                >
                                    At Cibato, our mission is simple – to provide businesses with cutting-edge digital marketing and IT solutions that foster growth, streamline operations, and drive long-term success. We are dedicated to delivering exceptional value to our clients through innovation, creativity, and a customer-first approach.
                                </motion.p>

                                {/* Decorative element */}
                                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Vision Card */}
                    <motion.div
                        {...fadeInUpText}
                        transition={{ ...fadeInUpText.transition, delay: 0.2 }}
                        className="group relative"
                    >
                        <div className="relative bg-white rounded-3xl p-6 lg:p-8 shadow-md hover:shadow-lg transition-all duration-500 border-2 border-slate-200">
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                {/* Title */}
                                <motion.h3
                                    {...fadeInUpTitle}
                                    transition={{ ...fadeInUpTitle.transition, delay: 0.3 }}
                                    className="text-2xl lg:text-3xl font-black text-slate-900 mb-4"
                                >
                                    Our <span className="text-cyan-500">Vision</span>
                                </motion.h3>

                                {/* Description */}
                                <motion.p
                                    {...fadeInUpText}
                                    transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                                    className="text-slate-700 leading-relaxed text-justify text-sm lg:text-base"
                                >
                                    We aim to be recognized as a global leader in digital marketing and IT solutions, known for our unwavering commitment to quality, customer satisfaction, and continuous innovation. Our vision is to empower businesses of all sizes with the tools they need to succeed in an increasingly digital world.
                                </motion.p>

                                {/* Decorative element */}
                                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default MissionVision;
