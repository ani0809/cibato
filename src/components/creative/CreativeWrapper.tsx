// Creative component wrapper that applies creative styling to any children
import { ReactNode, useState, useRef, useEffect } from 'react';

interface CreativeWrapperProps {
    children: ReactNode;
    className?: string;
}

const CreativeWrapper: React.FC<CreativeWrapperProps> = ({ children, className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (wrapperRef.current) {
            observer.observe(wrapperRef.current);
        }

        return () => {
            if (wrapperRef.current) {
                observer.unobserve(wrapperRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            className={`transition-all duration-800 ${isVisible ? 'slide-in-up' : 'opacity-0'} ${className}`}
        >
            <style>
                {`
          /* Override existing component styles with creative theme */
          .creative-wrapper h2,
          .creative-wrapper h3 {
            font-family: 'Space Grotesk', sans-serif !important;
            font-weight: 800 !important;
          }
          
          .creative-wrapper p {
            font-family: 'Inter', sans-serif !important;
          }
          
          /* Make cards floating */
          .creative-wrapper > div > div > div[class*="bg-"] {
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
            border-radius: 16px;
          }
          
          .creative-wrapper > div > div > div[class*="bg-"]:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(79, 70, 229, 0.1), 0 10px 20px rgba(236, 72, 153, 0.05);
          }
        `}
            </style>
            <div className="creative-wrapper">
                {children}
            </div>
        </div>
    );
};

export default CreativeWrapper;
