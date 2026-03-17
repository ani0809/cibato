import { useState, useEffect, useRef } from 'react';
import { Code, DollarSign, TrendingUp, Search, Palette, Video } from 'lucide-react';
import FloatingCard from './FloatingCard';

const CreativeServices = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const services = [
        {
            icon: Code,
            title: 'Web Design & Development',
            description: 'Your website is often the first point of contact for potential customers. At Cibato, we create custom websites that are not only visually appealing but also user-friendly and optimized for performance.',
            gradient: 'from-indigo-500 to-purple-600',
            span: 'lg:col-span-2'
        },
        {
            icon: DollarSign,
            title: 'Business Software',
            description: "In today's competitive landscape, efficiency is key. Cibato offers tailored business software solutions to automate processes, enhance productivity, and streamline operations.",
            gradient: 'from-green-500 to-teal-600',
            span: 'lg:col-span-1'
        },
        {
            icon: TrendingUp,
            title: 'Digital Marketing',
            description: "Boost your brand's visibility and attract a targeted audience with our digital marketing services. From social media marketing to paid ads, we implement strategies that help you engage with potential customers.",
            gradient: 'from-pink-500 to-rose-600',
            span: 'lg:col-span-1'
        },
        {
            icon: Search,
            title: 'Search Engine Optimization',
            description: "Get your website noticed by search engines and rank higher in search results. Our comprehensive SEO services are designed to improve your website's on-page and off-page SEO.",
            gradient: 'from-amber-500 to-orange-600',
            span: 'lg:col-span-2'
        },
        {
            icon: Palette,
            title: 'Graphic Design',
            description: "Visuals play a crucial role in establishing a brand's identity. Our graphic design team creates high-quality visuals, including logos, banners, brochures, and more.",
            gradient: 'from-violet-500 to-purple-600',
            span: 'lg:col-span-1'
        },
        {
            icon: Video,
            title: 'Video Editing',
            description: "In the age of digital content, video is one of the most powerful marketing tools. Cibato offers professional video editing services to help you create compelling videos for your brand.",
            gradient: 'from-cyan-500 to-blue-600',
            span: 'lg:col-span-1'
        }
    ];

    return (
        <section id="services" ref={sectionRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-indigo-pink rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-56 h-56 bg-gradient-green-blue rounded-full opacity-10 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'slide-in-up' : 'opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-soft border-2 border-indigo-100 mb-6">
                        <span className="decorative-dot"></span>
                        <span className="text-sm font-bold text-indigo-600 uppercase tracking-wide">
                            What Can We Do For You
                        </span>
                    </div>

                    <h2 className="text-4xl lg:text-6xl font-black creative-heading mb-4">
                        <span className="block">We solve real</span>
                        <span className="creative-gradient-text">problems</span>
                    </h2>
                </div>

                {/* Asymmetric Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    {services.map((service, index) => (
                        <FloatingCard
                            key={index}
                            className={`${service.span} group relative overflow-hidden`}
                            delay={index * 100}
                            tilt={index % 3 === 0 ? 'left' : index % 3 === 1 ? 'right' : 'none'}
                        >
                            {/* Gradient background that shows on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                                    <service.icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Decorative line */}
                                <div className={`h-1 w-20 bg-gradient-to-r ${service.gradient} rounded-full mt-6 group-hover:w-full transition-all duration-500`}></div>
                            </div>
                        </FloatingCard>
                    ))}
                </div>

                {/* CTA Button */}
                <div className={`text-center ${isVisible ? 'fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
                    <a
                        href="#contact"
                        className="creative-button inline-flex items-center gap-2"
                    >
                        VIEW ALL SERVICES
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CreativeServices;
