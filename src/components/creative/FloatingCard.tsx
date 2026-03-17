import { ReactNode, useState, useRef, useEffect } from 'react';

interface FloatingCardProps {
    children: ReactNode;
    className?: string;
    tilt?: 'left' | 'right' | 'none';
    delay?: number;
}

const FloatingCard: React.FC<FloatingCardProps> = ({
    children,
    className = '',
    tilt = 'none',
    delay = 0
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            },
            { threshold: 0.2 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [delay]);

    const tiltClass =
        tilt === 'left' ? 'tilted-card-left' :
            tilt === 'right' ? 'tilted-card-right' : '';

    return (
        <div
            ref={cardRef}
            className={`floating-card ${tiltClass} ${className} ${isVisible ? 'scale-in' : 'opacity-0'
                }`}
        >
            {children}
        </div>
    );
};

export default FloatingCard;
