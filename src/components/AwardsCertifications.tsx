import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUpText, fadeInUpImage } from '../utils/animations';
import { API_URL } from '../utils/api';

interface Award {
  id: string;
  name: string;
  logo: string;
  url: string;
}

const AwardsCertifications = ({ className }: { className?: string }) => {
  const [awards, setAwards] = useState<Award[]>([]);
  const sectionClass = className || "";

  useEffect(() => {
    fetch(`${API_URL}/awards`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAwards(data);
        }
      })
      .catch(err => console.error('Failed to load awards', err));
  }, []);

  if (awards.length === 0) return null;

  return (
    <div className={`container-custom py-[60px] lg:py-[80px] ${sectionClass}`}>
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <motion.div
          {...fadeInUpText}
          className="relative flex-shrink-0 w-full lg:w-[340px] h-[120px] bg-gradient-to-br from-blue-500 to-blue-600 rounded-[10px] overflow-hidden shadow-lg"
        >
          <div className="absolute inset-0 flex items-center px-6 py-4">
            <div className="text-left">
              <div className="text-2xl sm:text-3xl font-black text-white leading-snug">
                We are awarded
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white leading-snug">
                & certified
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider mt-1">
                for our services
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUpImage}
          transition={{ ...fadeInUpImage.transition, delay: 0.2 }}
          className="flex-1 w-full h-[120px] bg-gradient-to-br from-blue-500 to-blue-600 rounded-[10px] overflow-hidden shadow-lg"
        >
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
            <div className="flex gap-10 animate-scroll-horizontal px-6">
              {[...awards, ...awards, ...awards].map((award, index) => (
                <a
                  key={`${award.id}-${index}`}
                  href={award.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-48 h-16 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                >
                  <img
                    src={award.logo.startsWith('http') ? award.logo : `${API_URL.replace('/api', '')}${award.logo}`}
                    alt={award.name}
                    className="h-full w-full object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div >
    </div >
  );
};

export default AwardsCertifications;
