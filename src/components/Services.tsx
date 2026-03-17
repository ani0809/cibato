import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code, DollarSign, TrendingUp, Search, Palette, Video, ArrowUpRight, Monitor, BarChart, Megaphone, Smartphone, Mail, Server, FileText, Mic, AtSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_URL } from '../utils/api';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';

// Icon mapping must match AdminServices
const ICONS: Record<string, any> = {
  Monitor, BarChart, Megaphone, Search, Palette, Video, Smartphone,
  Mail, Server, FileText, Mic, AtSign, Code, DollarSign, TrendingUp
};

const Services = ({ className = "", showButton = true, limit }: { className?: string; showButton?: boolean; limit?: number }) => {
  const [services, setServices] = useState<any[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then(res => res.json())
      .then(data => {
        setServices(Array.isArray(data) ? data : []);
      })
      .catch(console.error);
  }, []);

  const displayedServices = limit ? services.slice(0, limit) : services;

  return (
    <section id="services" ref={sectionRef} className={`py-[60px] lg:py-[80px] bg-white relative overflow-hidden ${className}`}>

      <div className="container-custom relative z-10">
        <motion.div
          {...fadeInUpText}
          className="text-center mb-16"
        >
          <motion.span
            {...fadeInUpText}
            transition={{ ...fadeInUpText.transition, delay: 0.1 }}
            className="px-5 py-2.5 bg-white/30 backdrop-blur-3xl backdrop-saturate-150 border border-white/40 text-slate-900 text-sm font-bold rounded-xl uppercase tracking-wider shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] mb-6 inline-block"
          >
            WHAT CAN WE DO FOR YOU
          </motion.span>
          <motion.h2
            {...fadeInUpTitle}
            className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            We solve real <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">problems</span>
          </motion.h2>
        </motion.div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {displayedServices.map((service, index) => {
            const IconComp = ICONS[service.icon] || Monitor;

            const CardContent = () => (
              <div className="relative h-full bg-white rounded-[1.5rem] p-6 border border-slate-200 hover:border-cyan-200 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`}></div>

                <div className="relative z-10 flex flex-col h-full items-center text-center">
                  {/* Icon Container with rotation animation on hover */}
                  <motion.div
                    className="mb-5 relative"
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.2,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                      <IconComp className="w-7 h-7 text-white" strokeWidth={1.5} />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.h3
                    {...fadeInUpTitle}
                    transition={{ ...fadeInUpTitle.transition, delay: index * 0.1 + 0.1 }}
                    className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300"
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    {...fadeInUpText}
                    transition={{ ...fadeInUpText.transition, delay: index * 0.1 + 0.2 }}
                    className="text-slate-600 leading-relaxed text-sm text-center"
                  >
                    {service.description}
                  </motion.p>
                </div>
              </div>
            );

            return (
              <motion.div
                key={service.id || index}
                {...fadeInUpImage}
                transition={{ ...fadeInUpImage.transition, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="group relative h-full"
              >
                {service.link ? (
                  <Link to={service.link} className="block h-full">
                    <CardContent />
                  </Link>
                ) : (
                  <CardContent />
                )}
              </motion.div>
            )
          })}
        </div>

        {showButton && (
          <motion.div
            {...fadeInUpText}
            className="text-center"
          >
            <a
              href="/services"
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 hover:scale-105"
            >
              <span className="text-base">View All Services</span>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-cyan-500 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;
