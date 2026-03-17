export const fadeInUpTitle = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, delay: 0.1, ease: "easeOut" as const }
};

export const fadeInUpText = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.9, delay: 0.3, ease: "easeOut" as const }
};

export const fadeInUpImage = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" as const }
};

export const counterDuration = 3000;

// Generic variants
export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Futuristic / Special variants
export const glitchReveal = {
    hidden: { opacity: 0, x: -10, scale: 0.95 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "circOut"
        }
    }
};

export const letterReveal = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.03,
            duration: 0.5,
            ease: [0.2, 0.65, 0.3, 0.9]
        }
    })
};

export const neonPulse = {
    initial: { filter: "drop-shadow(0 0 0px rgba(0, 200, 255, 0))" },
    animate: {
        filter: [
            "drop-shadow(0 0 2px rgba(0, 200, 255, 0.5))",
            "drop-shadow(0 0 8px rgba(0, 200, 255, 0.3))",
            "drop-shadow(0 0 2px rgba(0, 200, 255, 0.5))"
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const magneticButton = {
    rest: { x: 0, y: 0 },
    hover: (custom: { x: number; y: number } = { x: 0, y: 0 }) => ({
        x: custom.x,
        y: custom.y,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1
        }
    })
};
