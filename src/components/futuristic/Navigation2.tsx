import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface Navigation2Props {
    scrolled: boolean;
}

const Navigation2 = ({ scrolled }: Navigation2Props) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    const services = [
        'Web Design & Development',
        'Digital Marketing',
        'SEO Services',
        'Mobile Apps Development',
        'Graphic Design',
        'Content Writing',
        'Video Editing',
        'Social Media Marketing',
        'Email Marketing',
        'Business Software',
        'Business Website',
        'E-commerce Website',
        'Google Workspace',
        'Voice Over'
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'glass-card shadow-[0_8px_32px_0_rgba(0,200,255,0.2)]'
                    : 'bg-[#0A0F1D]/60 backdrop-blur-xl border-b border-[#00C8FF]/20'
                }`}
        >
            {/* Scan Line Effect */}
            <div className="absolute top-0 left-0 right-0 h-px">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-[#00C8FF] to-transparent opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo with Glow */}
                    <div className="flex items-center group cursor-pointer">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#00C8FF]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <img
                                src="/cibato-logo.png"
                                alt="Cibato Logo"
                                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105 relative z-10"
                            />
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-2">
                        <a href="/" className="group relative px-4 py-2 text-[#E0E6ED] font-semibold transition-all duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            <span className="relative z-10 group-hover:text-[#00C8FF] transition-colors">Home</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00C8FF]/10 to-[#7A3CFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00C8FF] to-[#7A3CFF] group-hover:w-full transition-all duration-300"></div>
                        </a>

                        <a href="#about" className="group relative px-4 py-2 text-[#E0E6ED] font-semibold transition-all duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            <span className="relative z-10 group-hover:text-[#00C8FF] transition-colors">About Us</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00C8FF]/10 to-[#7A3CFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00C8FF] to-[#7A3CFF] group-hover:w-full transition-all duration-300"></div>
                        </a>

                        {/* Services Dropdown */}
                        <div
                            className="relative group z-50"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <button className="px-4 py-2 text-[#E0E6ED] font-semibold transition-colors flex items-center space-x-1 group-hover:text-[#00C8FF]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                <span>Services</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 glass-card neon-border-blue rounded-xl transition-all duration-300 max-h-[500px] overflow-y-auto ${servicesOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                                }`}>
                                <div className="grid grid-cols-1 gap-1 p-3">
                                    {services.map((service, index) => (
                                        <a
                                            key={index}
                                            href={`#${service.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="block px-4 py-2 text-sm text-[#E0E6ED] hover:text-[#00C8FF] hover:bg-[#00C8FF]/10 rounded-lg transition-all duration-200"
                                            style={{ fontFamily: 'Inter, sans-serif' }}
                                        >
                                            {service}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <a href="#portfolio" className="group relative px-4 py-2 text-[#E0E6ED] font-semibold transition-all duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            <span className="relative z-10 group-hover:text-[#00C8FF] transition-colors">Portfolio</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00C8FF]/10 to-[#7A3CFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00C8FF] to-[#7A3CFF] group-hover:w-full transition-all duration-300"></div>
                        </a>

                        <a href="#team" className="group relative px-4 py-2 text-[#E0E6ED] font-semibold transition-all duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            <span className="relative z-10 group-hover:text-[#00C8FF] transition-colors">Our Team</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00C8FF]/10 to-[#7A3CFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00C8FF] to-[#7A3CFF] group-hover:w-full transition-all duration-300"></div>
                        </a>

                        <a href="#testimonials" className="group relative px-4 py-2 text-[#E0E6ED] font-semibold transition-all duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            <span className="relative z-10 group-hover:text-[#00C8FF] transition-colors">Testimonials</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00C8FF]/10 to-[#7A3CFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00C8FF] to-[#7A3CFF] group-hover:w-full transition-all duration-300"></div>
                        </a>

                        <a href="#blog" className="group relative px-4 py-2 text-[#E0E6ED] font-semibold transition-all duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            <span className="relative z-10 group-hover:text-[#00C8FF] transition-colors">Blog</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00C8FF]/10 to-[#7A3CFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00C8FF] to-[#7A3CFF] group-hover:w-full transition-all duration-300"></div>
                        </a>

                        {/* Contact Button */}
                        <button
                            onClick={() => window.location.href = '#contact'}
                            className="neon-button text-sm"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            Contact Us
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-[#00C8FF] hover:text-[#29F2FF] transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden glass-card border-t border-[#00C8FF]/20" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    <div className="px-4 py-6 space-y-3">
                        <a href="/" className="block px-4 py-2 text-[#E0E6ED] hover:text-[#00C8FF] hover:bg-[#00C8FF]/10 rounded-lg transition-all">Home</a>
                        <a href="#about" className="block px-4 py-2 text-[#E0E6ED] hover:text-[#00C8FF] hover:bg-[#00C8FF]/10 rounded-lg transition-all">About Us</a>

                        <div className="px-4 py-2">
                            <button
                                onClick={() => setServicesOpen(!servicesOpen)}
                                className="flex items-center justify-between w-full text-[#E0E6ED] hover:text-[#00C8FF]"
                            >
                                <span>Services</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {servicesOpen && (
                                <div className="mt-2 ml-4 space-y-2">
                                    {services.map((service, index) => (
                                        <a
                                            key={index}
                                            href={`#${service.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="block py-1 text-sm text-[#8B92A0] hover:text-[#00C8FF]"
                                        >
                                            {service}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <a href="#portfolio" className="block px-4 py-2 text-[#E0E6ED] hover:text-[#00C8FF] hover:bg-[#00C8FF]/10 rounded-lg transition-all">Portfolio</a>
                        <a href="#team" className="block px-4 py-2 text-[#E0E6ED] hover:text-[#00C8FF] hover:bg-[#00C8FF]/10 rounded-lg transition-all">Our Team</a>
                        <a href="#testimonials" className="block px-4 py-2 text-[#E0E6ED] hover:text-[#00C8FF] hover:bg-[#00C8FF]/10 rounded-lg transition-all">Testimonials</a>
                        <a href="#blog" className="block px-4 py-2 text-[#E0E6ED] hover:text-[#00C8FF] hover:bg-[#00C8FF]/10 rounded-lg transition-all">Blog</a>

                        <button
                            onClick={() => window.location.href = '#contact'}
                            className="neon-button w-full text-sm"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation2;
