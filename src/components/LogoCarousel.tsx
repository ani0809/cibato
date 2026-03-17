import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { API_URL } from '../utils/api';
import { fadeInUpText } from '../utils/animations';

interface Client {
  id: string;
  name: string;
  logo: string;
  url: string;
}

const LogoCarousel = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const scrollerRef1 = useRef<HTMLDivElement>(null);
  const scrollerRef2 = useRef<HTMLDivElement>(null);
  const scrollerRef3 = useRef<HTMLDivElement>(null);
  const scrollerRef4 = useRef<HTMLDivElement>(null);

  const pausedRows = useRef<boolean[]>([false, false, false, false]);

  useEffect(() => {
    // Fetch clients
    fetch(`${API_URL}/clients`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setClients(data);
        }
      })
      .catch(err => console.error('Failed to load clients', err));
  }, []);

  // Split clients into 4 rows
  const chunkSize = Math.ceil(clients.length / 4);
  const row1Logos = clients.slice(0, chunkSize);
  const row2Logos = clients.slice(chunkSize, chunkSize * 2);
  const row3Logos = clients.slice(chunkSize * 2, chunkSize * 3);
  const row4Logos = clients.slice(chunkSize * 3);

  useEffect(() => {
    if (clients.length === 0) return;

    const scrollers = [
      { ref: scrollerRef1, speed: 0.5, direction: 1 },
      { ref: scrollerRef2, speed: 0.6, direction: -1 },
      { ref: scrollerRef3, speed: 0.55, direction: 1 },
      { ref: scrollerRef4, speed: 0.65, direction: -1 },
    ];

    const animations: number[] = [];

    scrollers.forEach(({ ref, speed, direction }, index) => {
      const element = ref.current;
      if (!element) return;

      const scrollWidth = element.scrollWidth / 2;
      let position = direction === 1 ? -scrollWidth : 0;

      const animate = () => {
        if (!pausedRows.current[index]) {
          position += speed * direction;

          if (direction === 1 && position >= 0) {
            position = -scrollWidth;
          } else if (direction === -1 && position <= -scrollWidth) {
            position = 0;
          }

          element.style.transform = `translateX(${position}px)`;
        }

        const frame = requestAnimationFrame(animate);
        animations.push(frame);
      };

      animate();
    });

    return () => {
      animations.forEach(frame => cancelAnimationFrame(frame));
    };
  }, [clients]);

  const handleMouseEnter = (index: number) => {
    pausedRows.current[index] = true;
  };

  const handleMouseLeave = (index: number) => {
    pausedRows.current[index] = false;
  };

  if (clients.length === 0) return null;

  return (
    <section className="py-[60px] lg:py-[80px] bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10 mb-12">
        <motion.div
          {...fadeInUpText}
          className="text-center"
        >
          <span className="inline-block px-5 py-2.5 bg-white/30 backdrop-blur-3xl backdrop-saturate-150 border border-white/40 text-slate-900 text-sm font-bold rounded-xl uppercase tracking-wider shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] mb-3">
            SERVICE WITH SMILE
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            Our clients <span className="text-cyan-500">believe</span> in us
          </h2>
        </motion.div>
      </div>

      <div className="relative space-y-0 container-custom">
        {/* Row 1 */}
        <div
          className="overflow-hidden relative py-2"
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave(0)}
        >
          <div
            ref={scrollerRef1}
            className="flex space-x-4 w-fit"
            style={{ willChange: 'transform' }}
          >
            {[...row1Logos, ...row1Logos, ...row1Logos, ...row1Logos].map((logo, index) => (
              <a
                key={`row1-${index}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[300px] h-[100px] bg-white rounded-xl transition-all duration-300 flex items-center justify-center p-0 group hover:scale-105 border-2 border-cyan-200 block"
              >
                <img
                  src={logo.logo.startsWith('http') ? logo.logo : `${API_URL.replace('/api', '')}${logo.logo}`}
                  alt={logo.name}
                  title={logo.name}
                  className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div
          className="overflow-hidden relative py-2"
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}
        >
          <div
            ref={scrollerRef2}
            className="flex space-x-4 w-fit"
            style={{ willChange: 'transform' }}
          >
            {[...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos].map((logo, index) => (
              <a
                key={`row2-${index}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[300px] h-[100px] bg-white rounded-xl transition-all duration-300 flex items-center justify-center p-0 group hover:scale-105 border-2 border-cyan-200 block"
              >
                <img
                  src={logo.logo.startsWith('http') ? logo.logo : `${API_URL.replace('/api', '')}${logo.logo}`}
                  alt={logo.name}
                  title={logo.name}
                  className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div
          className="overflow-hidden relative py-2"
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}
        >
          <div
            ref={scrollerRef3}
            className="flex space-x-8 w-fit"
            style={{ willChange: 'transform' }}
          >
            {[...row3Logos, ...row3Logos, ...row3Logos, ...row3Logos].map((logo, index) => (
              <a
                key={`row3-${index}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[300px] h-[100px] bg-white rounded-xl transition-all duration-300 flex items-center justify-center p-0 group hover:scale-105 border-2 border-cyan-200 block"
              >
                <img
                  src={logo.logo.startsWith('http') ? logo.logo : `${API_URL.replace('/api', '')}${logo.logo}`}
                  alt={logo.name}
                  title={logo.name}
                  className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Row 4 */}
        <div
          className="overflow-hidden relative py-2"
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={() => handleMouseLeave(3)}
        >
          <div
            ref={scrollerRef4}
            className="flex space-x-8 w-fit"
            style={{ willChange: 'transform' }}
          >
            {[...row4Logos, ...row4Logos, ...row4Logos, ...row4Logos].map((logo, index) => (
              <a
                key={`row4-${index}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[300px] h-[100px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center p-0 group hover:scale-105 border-2 border-cyan-200 block"
              >
                <img
                  src={logo.logo.startsWith('http') ? logo.logo : `${API_URL.replace('/api', '')}${logo.logo}`}
                  alt={logo.name}
                  title={logo.name}
                  className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
