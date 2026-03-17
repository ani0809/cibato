import React, { ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip = ({ children, content, position = 'bottom' }: TooltipProps) => {
    return (
        <div className="relative group flex items-center justify-center">
            {children}
            <div className={`
                absolute z-50 px-3 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg shadow-xl 
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200
                whitespace-nowrap
                ${position === 'bottom' ? 'top-full mt-2' : ''}
                ${position === 'top' ? 'bottom-full mb-2' : ''}
                ${position === 'left' ? 'right-full mr-2' : ''}
                ${position === 'right' ? 'left-full ml-2' : ''}
            `}>
                {/* Arrow */}
                <div className={`
                    absolute w-2 h-2 bg-slate-800 transform rotate-45
                    ${position === 'bottom' ? '-top-1 left-1/2 -translate-x-1/2' : ''}
                    ${position === 'top' ? '-bottom-1 left-1/2 -translate-x-1/2' : ''}
                    ${position === 'left' ? 'top-1/2 -translate-y-1/2 -right-1' : ''}
                    ${position === 'right' ? 'top-1/2 -translate-y-1/2 -left-1' : ''}
                `}></div>
                {content}
            </div>
        </div>
    );
};

export default Tooltip;
