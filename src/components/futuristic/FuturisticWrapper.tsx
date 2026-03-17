import { ReactNode } from 'react';

interface FuturisticWrapperProps {
    children: ReactNode;
    className?: string;
}

const FuturisticWrapper = ({ children, className = '' }: FuturisticWrapperProps) => {
    return (
        <div className={`relative ${className}`}>
            {/* Apply dark theme CSS overrides */}
            <style>
                {`
          /* Force dark theme colors on wrapped content */
          .futuristic-section * {
            color: #E0E6ED !important;
          }
          
          .futuristic-section h1,
          .futuristic-section h2,
          .futuristic-section h3,
          .futuristic-section h4,
          .futuristic-section h5,
          .futuristic-section h6 {
            font-family: 'Space Grotesk', sans-serif !important;
            background: linear-gradient(135deg, #00C8FF, #7A3CFF) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
          }
          
          .futuristic-section p,
          .futuristic-section span,
          .futuristic-section div {
            font-family: 'Inter', sans-serif !important;
          }
          
          .futuristic-section button:not(.neon-button) {
            background: linear-gradient(135deg, #00C8FF, #7A3CFF) !important;
            border: none !important;
            color: white !important;
            padding: 12px 32px !important;
            font-weight: 700 !important;
            border-radius: 8px !important;
            transition: all 0.3s ease !important;
          }
          
          .futuristic-section button:not(.neon-button):hover {
            box-shadow: 0 0 20px rgba(0, 200, 255, 0.6),
                        0 0 40px rgba(122, 60, 255, 0.4) !important;
            transform: translateY(-2px) !important;
          }
          
          .futuristic-section .bg-white,
          .futuristic-section [class*="bg-slate"],
          .futuristic-section [class*="bg-gray"] {
            background: rgba(26, 31, 46, 0.7) !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(0, 200, 255, 0.2) !important;
            box-shadow: 0 8px 32px 0 rgba(0, 200, 255, 0.1) !important;
          }
          
          .futuristic-section [class*="text-slate"],
          .futuristic-section [class*="text-gray"] {
            color: #8B92A0 !important;
          }
          
          .futuristic-section [class*="text-cyan"],
          .futuristic-section [class*="text-blue"] {
            color: #00C8FF !important;
          }
          
          .futuristic-section img {
            border-radius: 16px !important;
            border: 1px solid rgba(0, 200, 255, 0.3) !important;
          }
        `}
            </style>

            <div className="futuristic-section">
                {children}
            </div>
        </div>
    );
};

export default FuturisticWrapper;
