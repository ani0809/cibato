import AnimatedCounter from './AnimatedCounter';

const CreativeClientSatisfaction = () => {
    const stats = [
        { number: 98, suffix: '%', label: 'Client Satisfaction', color: 'from-indigo-500 to-purple-600' },
        { number: 490, suffix: '+', label: 'Projects Completed', color: 'from-pink-500 to-rose-600' },
        { number: 5, suffix: '+', label: 'Years Experience', color: 'from-green-500 to-teal-600' },
        { number: 50, suffix: '+', label: 'Team Members', color: 'from-amber-500 to-orange-600' },
    ];

    return (
        <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                    background: 'radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)',
                }}></div>
                <div className="absolute top-0 right-0 w-full h-full" style={{
                    background: 'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-black creative-heading mb-4">
                        <span className="creative-gradient-text">Numbers</span> that speak
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Our track record speaks for itself. Here's what we've achieved together with our amazing clients.
                    </p>
                </div>

                {/* Stats Grid - Asymmetric */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`floating-card text-center group ${index % 2 === 0 ? 'tilted-card-left' : 'tilted-card-right'
                                }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Decorative gradient blob */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 rounded-2xl`}></div>

                            <div className="relative z-10">
                                {/* Number with gradient */}
                                <div className={`mb-3`}>
                                    <AnimatedCounter
                                        end={stat.number}
                                        suffix={stat.suffix}
                                        className="text-5xl lg:text-6xl font-black"
                                        duration={2000}
                                    />
                                </div>

                                {/* Label */}
                                <div className="text-gray-700 font-semibold text-lg">
                                    {stat.label}
                                </div>

                                {/* Decorative line */}
                                <div className={`h-1 w-16 bg-gradient-to-r ${stat.color} rounded-full mt-4 mx-auto group-hover:w-full transition-all duration-500`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Badges/Logos could go here */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-6">
                        Trusted By Leading Companies
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CreativeClientSatisfaction;
