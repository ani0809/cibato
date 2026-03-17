import { motion } from 'framer-motion';
import { fadeInUpTitle, fadeInUpText } from '../utils/animations';

interface SectionTitleProps {
    subtitle?: string;
    title: string;
    highlightedWord?: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

const SectionTitle = ({ subtitle, title, highlightedWord, align = 'center', className = '' }: SectionTitleProps) => {
    const alignmentClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
    const itemsAlignment = align === 'left' ? 'items-start' : align === 'right' ? 'items-end' : 'items-center';

    return (
        <div className={`flex flex-col ${itemsAlignment} ${alignmentClass} mb-12 ${className}`}>
            {subtitle && (
                <motion.span
                    {...fadeInUpText}
                    className="px-4 py-2 rounded-full bg-cyan-50 text-cyan-600 text-xs font-bold uppercase tracking-wider mb-4 inline-block"
                >
                    {subtitle}
                </motion.span>
            )}

            <motion.h2
                {...fadeInUpTitle}
                transition={{ ...fadeInUpTitle.transition, delay: 0.1 }}
                className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            >
                {title} {highlightedWord && (
                    <span className="relative inline-block">
                        <span className="relative z-10 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                            {highlightedWord}
                        </span>
                        <motion.span
                            initial={{ width: '0%' }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="absolute bottom-2 left-0 h-3 bg-cyan-100/50 -z-10 -rotate-1"
                        ></motion.span>
                    </span>
                )}
            </motion.h2>

            <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 80, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-6 ${align === 'center' ? 'mx-auto' : ''}`}
            ></motion.div>
        </div>
    );
};

export default SectionTitle;
