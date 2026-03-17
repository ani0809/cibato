import { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Play, X, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactFormPopup from './ContactFormPopup';
import CibatoSlideButton from './CibatoSlideButton';
import BgGrid from './BgGrid';
import { useSettings } from '../context/SettingsContext';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage, fadeInScale } from '../utils/animations';

interface HeroProps {
  title?: string;

  description?: string;
  buttonLabel?: string;
  videoButtonLabel?: string;
  welcomeText?: string;
  imgUrl?: string;
}

const Hero = ({
  title,
  description,
  buttonLabel = "Get Started",
  videoButtonLabel = "Watch Video",
  welcomeText = "Welcome To Cibato",
  imgUrl = '/hero-img.png'
}: HeroProps) => {
  const { settings } = useSettings();
  console.log("Hero Rendering:", { title, imgUrl, settings });

  const [videoOpen, setVideoOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  // Helper to get social link - with safety check
  const getSocialLink = (key: keyof typeof settings) => (settings && settings[key]) ? settings[key] : '#';

  // Ensure image is a string
  const heroImageSrc = imgUrl || '/hero-img.png';

  const titleContent = title ? (
    <span dangerouslySetInnerHTML={{ __html: title }} />
  ) : (
    <>
      <span className="inline-block">
        Web agency that
      </span>
      <br />
      <span className="inline-block text-cyan-500">
        drive results
      </span>
    </>
  );

  const descriptionContent = description || "Cibato is a leading digital marketing and IT solutions agency dedicated to helping businesses grow in the digital age. Based in Bangladesh, we offer customized, results-driven services tailored to your unique needs. Our expertise includes web design & development, business software, mobile app development, SEO, and digital marketing, ensuring a strong online presence for your brand. We also specialize in graphic design, video editing, voice-over services, and business email solutions to enhance your communication and branding. Whether you're a startup or an established business, Cibato provides innovative strategies to help you succeed in a competitive marketplace.";

  useEffect(() => {
    if (videoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [videoOpen]);

  return (
    <section id="home" className="relative flex items-center overflow-hidden pt-[140px] pb-[10px] lg:pt-[180px] lg:pb-[30px]">
      <BgGrid density={40} glow={0.25} haze={0.08} />

      {/* Animated background orbs with parallax */}
      <div
        className="absolute top-20 left-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] animate-pulse"
      />
      <div
        className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[120px] animate-pulse"
      />

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 -mt-2.5 -ml-0">
            <motion.div
              {...fadeInUpText}
              transition={{ ...fadeInUpText.transition, delay: 0.1 }}
              className="inline-block"
            >
              <span className="px-5 py-2.5 bg-white/30 backdrop-blur-3xl backdrop-saturate-150 border border-white/40 text-slate-900 text-sm font-bold rounded-xl uppercase tracking-wider shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]">
                {welcomeText}
              </span>
            </motion.div>

            <motion.h1
              {...fadeInUpTitle}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900"
            >
              {titleContent}
            </motion.h1>

            <motion.p
              {...fadeInUpText}
              className="text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl"
              style={{ textAlign: 'justify' }}
            >
              {descriptionContent}
            </motion.p>

            <motion.div
              {...fadeInUpText}
              transition={{ ...fadeInUpText.transition, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <CibatoSlideButton
                label={buttonLabel}
                onClick={() => setFormOpen(true)}
                className="px-6 py-2.5 font-bold"
              />
              <button
                onClick={() => setVideoOpen(true)}
                className="group flex items-center gap-3 pl-8 pr-2 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
              >
                <span className="text-base">{videoButtonLabel}</span>
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-white/50 animate-ping"></span>
                  <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-cyan-500 fill-cyan-500 ml-0.5 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              </button>
            </motion.div>
          </div>

          <motion.div
            {...fadeInUpImage}
            className="relative lg:h-[600px] flex items-center justify-center lg:justify-end pr-0 lg:pr-16"
          >
            <div className="relative w-full max-w-[450px] lg:max-w-[550px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
              <img
                src={heroImageSrc}
                alt="Digital Agency Team"
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Float Elements */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInScale}
                transition={{ delay: 0.8 }}
                className="absolute bottom-8 -left-6 z-20 bg-white/80 backdrop-blur-xl border border-white/60 text-slate-900 px-6 py-4 rounded-2xl shadow-[0_20px_60px_0_rgba(0,0,0,0.15)] animate-float-medium"
              >
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{settings?.stat_years || '5+'}</div>
                <div className="text-xs font-bold tracking-wide uppercase text-slate-500">Years Experience</div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInScale}
                transition={{ delay: 1 }}
                className="absolute top-10 -right-8 z-20 bg-white/80 backdrop-blur-xl border border-white/60 text-slate-900 px-6 py-4 rounded-2xl shadow-[0_20px_60px_0_rgba(0,0,0,0.15)] animate-float-slower"
              >
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{settings?.stat_projects || '490+'}</div>
                <div className="text-xs font-bold tracking-wide uppercase text-slate-500">Projects Done</div>
              </motion.div>
            </div>

            {/* Social Icons - Raised Z-Index */}
            <div className="absolute right-0 lg:-right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
              {[
                { icon: Facebook, link: getSocialLink('social_facebook') },
                { icon: Instagram, link: getSocialLink('social_instagram') },
                { icon: Linkedin, link: getSocialLink('social_linkedin') },
                { icon: Twitter, link: getSocialLink('social_twitter') }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-cyan-500 rounded-xl flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-cyan-500/30"
                >
                  <social.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {
        videoOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setVideoOpen(false)}
          >
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-3xl backdrop-saturate-150"></div>

            <div
              className="relative w-full max-w-5xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute -top-12 right-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-xl"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative bg-white/15 backdrop-blur-3xl backdrop-saturate-150 border border-white/25 rounded-3xl p-2 shadow-[0_20px_80px_0_rgba(0,0,0,0.4)]">
                <div className="relative pt-[56.25%] bg-slate-900 rounded-2xl overflow-hidden">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={settings?.hero_video_url || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"}
                    title="Company Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="bg-white/20 backdrop-blur-3xl backdrop-saturate-150 border border-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                  Click outside or press ESC to close
                </div>
              </div>
            </div>
          </div>
        )
      }

      <ContactFormPopup isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </section >
  );
};

export default Hero;
