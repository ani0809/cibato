import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

const AnimatedSection = ({ children, className = '', delay = 0 }: AnimatedSectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            transition={{ delay }}
            className={`relative ${className}`}
        >
            {/* Neon Edge Glow on Scroll */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 1, delay: delay + 0.3 }}
                style={{
                    background: 'linear-gradient(90deg, transparent, #00C8FF, #7A3CFF, transparent)',
                }}
            />

            {/* Soft Spotlight */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: delay + 0.2 }}
                style={{
                    background:
                        'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,200,255,0.2), transparent)',
                }}
            />

            {/* Content with stagger */}
            <motion.div variants={staggerItem}>{children}</motion.div>

            {/* Bottom Neon Line */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-px"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 1, delay: delay + 0.5 }}
                style={{
                    background: 'linear-gradient(90deg, transparent, #7A3CFF, #00C8FF, transparent)',
                }}
            />
        </motion.div>
    );
};

export default AnimatedSection;
