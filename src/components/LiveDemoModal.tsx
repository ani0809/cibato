import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Tablet, Smartphone, ArrowLeft, ExternalLink, X } from 'lucide-react';

interface LiveDemoModalProps {
    isOpen: boolean;
    onClose: () => void;
    demoUrl: string;
    title?: string;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const LiveDemoModal = ({ isOpen, onClose, demoUrl, title = 'Live Preview' }: LiveDemoModalProps) => {
    const [device, setDevice] = useState<DeviceType>('desktop');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!mounted) return null;

    const getWidth = () => {
        switch (device) {
            case 'mobile': return '375px';
            case 'tablet': return '768px';
            default: return '100%';
        }
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] bg-slate-900/90 backdrop-blur-sm flex flex-col"
                >
                    {/* Header Bar */}
                    <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 shadow-xl shrink-0">
                        {/* Left: Back Button */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onClose}
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="hidden sm:inline font-medium">Back</span>
                            </button>
                            <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
                            <span className="text-slate-200 font-semibold hidden sm:block truncate max-w-[200px]">
                                {title}
                            </span>
                        </div>

                        {/* Center: Device Toggles */}
                        <div className="flex items-center bg-slate-800 rounded-lg p-1 gap-1">
                            <button
                                onClick={() => setDevice('desktop')}
                                className={`p-2 rounded-md transition-all ${device === 'desktop'
                                    ? 'bg-cyan-500 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                    }`}
                                title="Desktop View"
                            >
                                <Monitor className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setDevice('tablet')}
                                className={`p-2 rounded-md transition-all ${device === 'tablet'
                                    ? 'bg-cyan-500 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                    }`}
                                title="Tablet View"
                            >
                                <Tablet className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setDevice('mobile')}
                                className={`p-2 rounded-md transition-all ${device === 'mobile'
                                    ? 'bg-cyan-500 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                    }`}
                                title="Mobile View"
                            >
                                <Smartphone className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Right: Visit Site */}
                        <div className="flex items-center gap-4">
                            <a
                                href={demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-cyan-500/25"
                            >
                                <span className="hidden sm:inline">Visit Site</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                                onClick={onClose}
                                className="sm:hidden text-slate-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="flex-1 overflow-hidden bg-slate-900/50 flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
                        <div
                            className="relative h-full bg-white shadow-2xl transition-all duration-500 ease-in-out overflow-hidden"
                            style={{
                                width: getWidth(),
                                borderRadius: device === 'desktop' ? '8px' : '20px',
                                border: device !== 'desktop' ? '12px solid #1e293b' : 'none'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={demoUrl}
                                className="w-full h-full bg-white"
                                title="Live Preview"
                                style={{ border: 'none' }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

export default LiveDemoModal;
