import { motion } from 'framer-motion';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';

interface BusinessGrowthProps {
    imgUrl?: string;
}

const BusinessGrowth = ({ imgUrl }: BusinessGrowthProps) => {
    return (
        <section className="py-[60px] lg:py-[80px] bg-white overflow-hidden">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
                    {/* Text Content */}
                    <div className="-mt-2.5 -ml-0">
                        <motion.h2
                            {...fadeInUpTitle}
                            className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight"
                        >
                            Let’s Grow Your Business <span className="text-cyan-500">together!</span>
                        </motion.h2>
                        <div className="text-slate-600 text-lg leading-relaxed space-y-4 text-justify">
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.2 }}
                            >
                                Are you ready to elevate your business and unlock its full digital potential? Connect with Cibato today and embark on a transformative journey where innovation meets precision. Our expert team is dedicated to guiding you through every step of the digital landscape—whether it’s crafting a powerful online presence, developing custom software solutions, or implementing impactful marketing strategies.
                            </motion.p>
                            <motion.p
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                            >
                                We don’t just deliver services; we create tailored experiences that align with your business objectives and drive meaningful results. With a strong commitment to quality, creativity, and client satisfaction, Cibato is your trusted partner in achieving sustained digital success. Let’s build something extraordinary together—reach out now and discover how we can bring your vision to life.
                            </motion.p>
                        </div>
                    </div>

                    {/* Illustration */}
                    <motion.div
                        {...fadeInUpImage}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden">
                            <img
                                src={imgUrl || "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"}
                                alt="Business Growth Team"
                                className="w-full h-[450px] object-cover object-center rounded-2xl shadow-2xl"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BusinessGrowth;
