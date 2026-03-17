import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage, counterDuration } from '../utils/animations';

const Counter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = counterDuration;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function (easeOutExpo)
      const easeOut = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };

      setCount(Math.floor(easeOut(percentage) * value));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

interface WhyChooseProps {
  className?: string;
  imgUrl?: string;
  reverse?: boolean;
}

const WhyChoose = ({ className = "", imgUrl, reverse = false }: WhyChooseProps) => {
  const { settings } = useSettings();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Helper to parse stat string (e.g., "340+") into value and suffix
  const parseStat = (statStr: string | undefined, fallbackValue: number, fallbackSuffix: string) => {
    if (!statStr) return { value: fallbackValue, suffix: fallbackSuffix };
    const match = statStr.match(/^(\d+)(.*)$/);
    if (match) {
      return { value: parseInt(match[1], 10), suffix: match[2] };
    }
    return { value: fallbackValue, suffix: fallbackSuffix };
  };

  const happyClients = parseStat(settings.stat_clients, 340, '+');
  const projectComplete = parseStat(settings.stat_projects, 490, '+');
  const yearsInBusiness = parseStat(settings.stat_years, 5, '+');
  const satisfaction = { value: 99, suffix: '%' };

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

  const ImageColumn = () => (
    <motion.div
      className="relative flex items-start"
      {...fadeInUpImage}
    >
      <div className="relative w-full">
        <img
          src={imgUrl || "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"}
          alt="Why Choose Cibato"
          className="relative rounded-2xl w-full h-[450px] object-cover"
        />

        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-5 w-11/12 border-2 border-gray-300">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-black text-cyan-500 mb-1">
                {isVisible && <Counter value={happyClients.value} suffix={happyClients.suffix} />}
              </div>
              <div className="text-xs text-slate-600 font-semibold">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-cyan-500 mb-1">
                {isVisible && <Counter value={projectComplete.value} suffix={projectComplete.suffix} />}
              </div>
              <div className="text-xs text-slate-600 font-semibold">Project Complete</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-cyan-500 mb-1">
                {isVisible && <Counter value={yearsInBusiness.value} suffix={yearsInBusiness.suffix} />}
              </div>
              <div className="text-xs text-slate-600 font-semibold">Years In Business</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-cyan-500 mb-1">
                {isVisible && <Counter value={satisfaction.value} suffix={satisfaction.suffix} />}
              </div>
              <div className="text-xs text-slate-600 font-semibold">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const TextColumn = () => (
    <div className="-mt-2.5 -ml-0">
      <motion.h2
        {...fadeInUpTitle}
        className="text-4xl lg:text-5xl font-black text-slate-900 mb-6"
      >
        Why choose <span className="text-cyan-500">Cibato</span>
      </motion.h2>
      <div className="text-lg text-slate-700 leading-relaxed space-y-4 text-justify">
        <motion.p
          {...fadeInUpText}
          transition={{ ...fadeInUpText.transition, delay: 0.4 }}
        >
          At Cibato, we are deeply committed to helping your business succeed by aligning our digital
          strategies with your unique goals. With extensive industry experience, we bring expert insights
          and customized solutions tailored to various business sectors. Our result-oriented approach
          ensures that every project we undertake delivers measurable outcomes—whether it's driving
          website traffic, boosting conversions, or enhancing customer engagement.
        </motion.p>
        <motion.p
          {...fadeInUpText}
          transition={{ ...fadeInUpText.transition, delay: 0.6 }}
        >
          We believe in a collaborative, customer-centric process, working closely with our clients to craft solutions that
          foster long-term growth. Cibato is also known for offering affordable, scalable services that
          evolve with your business needs. Backed by a proven track record of successful projects and
          satisfied clients, we continue to earn trust through our dedication, innovation, and consistent
          delivery of excellence.
        </motion.p>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className={`py-[60px] lg:py-[80px] bg-white relative overflow-hidden ${className}`}>
      <div className="container-custom relative z-10">
        <div className={`grid ${reverse ? 'lg:grid-cols-[1.2fr_0.8fr]' : 'lg:grid-cols-[0.8fr_1.2fr]'} gap-12 items-center`}>
          {reverse ? (
            <>
              <TextColumn />
              <ImageColumn />
            </>
          ) : (
            <>
              <ImageColumn />
              <TextColumn />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
