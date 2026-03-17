import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Facebook, X, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowUpRight, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactFormPopup from './ContactFormPopup';
import { useSettings } from '../context/SettingsContext';
import { API_URL } from '../utils/api';
import { fadeInUpText, fadeInUpImage } from '../utils/animations';

const Footer = () => {
  const { settings } = useSettings();
  const [formOpen, setFormOpen] = useState(false);
  const [footerMenus, setFooterMenus] = useState<any[]>([]);

  // Helper to get social link
  const getSocialLink = (key: keyof typeof settings) => settings[key] || '#';
  const location = useLocation();

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Fetch Footer Menus
    fetch(`${API_URL}/menus?type=footer`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFooterMenus(data);
        }
      })
      .catch(err => console.error("Failed to load footer menus", err));

  }, []);

  return (
    <footer key={location.pathname} className="relative bg-[#0a1628] border-t border-slate-800 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-40 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-[8px] relative z-10">
        {/* Top Section with Logo and CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-8 border-b border-slate-800">
          <motion.div
            {...fadeInUpImage}
            transition={{ ...fadeInUpImage.transition, delay: 0.1 }}
            className="mb-6 md:mb-0"
          >
            <a href="/" className="inline-block group cursor-pointer">
              <img src="/cibato-logo.png" alt="Cibato" className="h-12 transition-transform duration-300 group-hover:scale-105" />
            </a>
          </motion.div>

          <motion.div
            {...fadeInUpText}
            transition={{ ...fadeInUpText.transition, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => setFormOpen(true)}
              className="group flex items-center gap-3 pl-6 pr-2 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/30"
            >
              <span className="text-base">Get A Free Consultancy</span>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-cyan-500 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Address Column */}
          <motion.div
            {...fadeInUpText}
            transition={{ ...fadeInUpText.transition, delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-xl mb-6">Address</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-base">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <span className="text-slate-300">
                  {settings.contact_address || 'House-78, Block-K, Road-20, South Banasree, Dhaka-1219'}
                </span>
              </li>
              <li className="flex items-start gap-3 text-base">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <a href={`tel:${(settings.contact_phone_1 || '+880 16014 19997').replace(/\s/g, '')}`} className="text-slate-300 hover:text-cyan-400 transition-colors">
                  {settings.contact_phone_1 || '+880 16014 19997'}
                </a>
              </li>
              {(settings.contact_phone_2 || (!settings.contact_phone_1 && !settings.contact_phone_2)) && (
                <li className="flex items-start gap-3 text-base">
                  <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <a href={`tel:${(settings.contact_phone_2 || '+880 16245 43242').replace(/\s/g, '')}`} className="text-slate-300 hover:text-cyan-400 transition-colors">
                    {settings.contact_phone_2 || '+880 16245 43242'}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3 text-base">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <a href={`mailto:${settings.contact_email_1 || 'info@cibato.com'}`} className="text-slate-300 hover:text-cyan-400 transition-colors">
                  {settings.contact_email_1 || 'info@cibato.com'}
                </a>
              </li>
              {(settings.contact_email_2 || (!settings.contact_email_1 && !settings.contact_email_2)) && (
                <li className="flex items-start gap-3 text-base">
                  <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <a href={`mailto:${settings.contact_email_2 || 'webcibato@gmail.com'}`} className="text-slate-300 hover:text-cyan-400 transition-colors">
                    {settings.contact_email_2 || 'webcibato@gmail.com'}
                  </a>
                </li>
              )}
            </ul>
          </motion.div>

          {/* Dynamic Footer Columns */}
          {footerMenus.map((column, colIndex) => (
            <motion.div
              key={column.id || colIndex}
              {...fadeInUpText}
              transition={{ ...fadeInUpText.transition, delay: 0.2 + (colIndex * 0.1) }}
            >
              <h3 className="text-white font-bold text-xl mb-6">{column.title}</h3>
              <ul className="space-y-3">
                {Array.isArray(column.children) && column.children.map((link: any, index: number) => (
                  <li key={index}>
                    <a
                      href={link.path}
                      className="text-slate-300 hover:text-cyan-400 transition-all duration-300 text-base flex items-center gap-2 group"
                    >
                      <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-300 flex-shrink-0" />
                      <span>{link.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Media Icons and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex justify-start gap-4">
            {[
              { icon: Facebook, link: getSocialLink('social_facebook') },
              { icon: Instagram, link: getSocialLink('social_instagram') },
              { icon: Linkedin, link: getSocialLink('social_linkedin') },
              { icon: Twitter, link: getSocialLink('social_twitter') },
              { icon: Youtube, link: getSocialLink('social_youtube') }
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-cyan-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-slate-300 text-base">
            {settings.footer_copyright || `© 2020-${currentYear} by Cibato. All rights reserved.`}
          </p>
        </div>

        {/* Copyright */}

      </div>

      <ContactFormPopup isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </footer >
  );
};

export default Footer;
