import { useState, useEffect, useRef } from 'react';

const HeroCarousel = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const targetCount = 340;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 3000;
    const steps = 60;
    const increment = targetCount / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.min(Math.floor(increment * currentStep), targetCount));
      } else {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  const clientLogos = [
    { name: 'Medcare BD', logo: '/Medcare bd White.png' },
    { name: 'Biotech International', logo: '/Biotech International White.png' },
    { name: 'Duronto Mart', logo: '/Duronto Mart White.png' },
    { name: 'Educube', logo: '/Educube White.png' },
    { name: 'IPS Bazar', logo: '/IPS Bazar White.png' },
    { name: 'Sunnah Squares', logo: '/Sunnah Squares White.png' }
  ];

  const avatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=7'
  ];

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-[10px] mb-2.5">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-shrink-0 w-full lg:w-[340px] h-[120px] bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-[10px] overflow-hidden shadow-lg">
          <div className="absolute top-4 right-4 grid grid-cols-2 gap-2">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-full border-[3px] border-white shadow-md overflow-hidden animate-pulse-slow"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationDuration: '3s'
                }}
              >
                <img
                  src={avatar}
                  alt={`Client ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="absolute bottom-5 left-6">
            <div className="text-6xl font-black text-white tracking-tight leading-none mb-1">
              {count}+
            </div>
            <div className="text-xs font-black text-white uppercase tracking-widest">
              CLIENT SATISFACTIONS
            </div>
          </div>
        </div>

        <div className="flex-1 w-full h-[120px] bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-[10px] overflow-hidden shadow-lg">
          <div
            className="relative h-full flex items-center group"
            onMouseEnter={(e) => {
              const scrollDiv = e.currentTarget.querySelector('.animate-scroll-horizontal') as HTMLElement;
              if (scrollDiv) scrollDiv.style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              const scrollDiv = e.currentTarget.querySelector('.animate-scroll-horizontal') as HTMLElement;
              if (scrollDiv) scrollDiv.style.animationPlayState = 'running';
            }}
          >
            <div className="flex gap-6 animate-scroll-horizontal px-6">
              {[...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex-shrink-0 w-48 h-20 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-full object-contain brightness-0 invert opacity-95 hover:opacity-100 transition-opacity duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
