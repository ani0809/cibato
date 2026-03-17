import React from 'react';

interface CurvedDividerProps {
    color?: string;
    flip?: boolean;
    height?: number;
}

const CurvedDivider: React.FC<CurvedDividerProps> = ({
    color = '#FFFFFF',
    flip = false,
    height = 80
}) => {
    return (
        <div className="relative w-full overflow-hidden" style={{ height: `${height}px` }}>
            <svg
                className="absolute bottom-0 w-full"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
            >
                <path
                    d="M0,0 C300,80 600,80 900,40 L900,120 L0,120 Z"
                    fill={color}
                />
                <path
                    d="M900,40 C1050,10 1150,30 1200,50 L1200,120 L900,120 Z"
                    fill={color}
                />
            </svg>
        </div>
    );
};

export default CurvedDivider;
