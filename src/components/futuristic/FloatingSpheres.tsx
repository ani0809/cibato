import { motion } from 'framer-motion';
import { floating, rotate } from '../../utils/animations';

const FloatingSpheres = () => {
    const spheres = [
        { size: 300, top: '10%', left: '5%', delay: 0, color: 'from-[#00C8FF]/20 to-[#7A3CFF]/10' },
        { size: 200, top: '60%', right: '10%', delay: 1, color: 'from-[#7A3CFF]/20 to-[#29F2FF]/10' },
        { size: 150, bottom: '20%', left: '15%', delay: 2, color: 'from-[#29F2FF]/20 to-[#00C8FF]/10' },
        { size: 250, top: '40%', right: '5%', delay: 0.5, color: 'from-[#00C8FF]/15 to-transparent' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {spheres.map((sphere, index) => (
                <motion.div
                    key={index}
                    className={`absolute rounded-full bg-gradient-to-br ${sphere.color} blur-3xl`}
                    style={{
                        width: sphere.size,
                        height: sphere.size,
                        top: sphere.top,
                        bottom: sphere.bottom,
                        left: sphere.left,
                        right: sphere.right,
                    }}
                    variants={floating}
                    animate="animate"
                    transition={{
                        delay: sphere.delay,
                        duration: 8 + index * 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Rotating hologram rings */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`ring-${i}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00C8FF]/20"
                    style={{
                        width: 400 + i * 150,
                        height: 400 + i * 150,
                    }}
                    variants={rotate}
                    animate="animate"
                    transition={{
                        duration: 30 - i * 5,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-[#00C8FF] rounded-full shadow-[0_0_10px_#00C8FF]" />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingSpheres;
