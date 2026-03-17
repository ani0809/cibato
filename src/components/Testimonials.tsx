import { useState, useEffect, useRef } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_URL } from '../utils/api';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  image: string;
  text: string;
  rating: number;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_URL}/testimonials`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTestimonials(data);
        }
      })
      .catch(err => console.error('Failed to load testimonials', err));
  }, []);

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.12)] hover:shadow-[0_6px_30px_0_rgba(0,0,0,0.18)] transition-all duration-300">
      <p className="text-slate-700 leading-relaxed mb-6 text-sm">
        "{testimonial.text}"
      </p>

      <div className="flex mb-3">
        {[...Array(testimonial.rating || 5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-blue-500 fill-blue-500" />
        ))}
      </div>

      <div className="flex items-center">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-3 bg-slate-100"
        />
        <div>
          <h3 className="text-base font-bold text-slate-900">{testimonial.name}</h3>
          <p className="text-sm text-slate-600">{testimonial.position}</p>
        </div>
      </div>
    </div>
  );

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-[60px] lg:py-[80px] relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Left Column - Static Content */}
          <div className="lg:col-span-1 flex items-center">
            <div>
              <motion.span
                {...fadeInUpText}
                transition={{ ...fadeInUpText.transition, delay: 0.1 }}
                className="inline-block px-5 py-2.5 bg-white/30 backdrop-blur-3xl backdrop-saturate-150 border border-white/40 text-slate-900 text-sm font-bold rounded-xl uppercase tracking-wider shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] mb-4"
              >
                CLIENTS FEEDBACKS
              </motion.span>
              <motion.h2
                {...fadeInUpTitle}
                className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight"
              >
                Client testimonial and real success stories read
              </motion.h2>
              <motion.div
                {...fadeInUpText}
                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                className="mb-6"
              >
                <div className="text-6xl font-black text-blue-500 mb-2">99%</div>
                <p className="text-slate-600 text-sm">
                  Customer satisfaction based on {testimonials.length * 100}+ reviews and 20,000 Objective Resource
                </p>
              </motion.div>
              <motion.div
                {...fadeInUpText}
                transition={{ ...fadeInUpText.transition, delay: 0.5 }}
              >
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 hover:scale-105"
                >
                  <span className="text-base">Get In Touch</span>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-cyan-500 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right Columns - Scrolling Testimonials */}
          <motion.div
            {...fadeInUpImage}
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px] overflow-hidden"
          >
            {/* First Column - Scrolling Up */}
            <div className="relative">
              <div className="animate-scroll-vertical">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <TestimonialCard key={`col1-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Second Column - Scrolling Down */}
            <div className="relative">
              <div className="animate-scroll-vertical-reverse">
                {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
                  <TestimonialCard key={`col2-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
