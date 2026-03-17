import { useState, useMemo } from 'react';
import { Phone, Mail, ArrowUpRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/api';
import { MultiSelect } from './ui/MultiSelect';
import { useSettings } from '../context/SettingsContext';
import { fadeInUpTitle, fadeInUpText, fadeInUpImage } from '../utils/animations';

const DEFAULT_SERVICE_OPTIONS = [
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-apps', label: 'Mobile Apps' },
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'seo', label: 'SEO Services' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'content-writing', label: 'Content Writing' },
  { value: 'video-editing', label: 'Video Editing' },
  { value: 'social-media', label: 'Social Media Marketing' },
  { value: 'email-marketing', label: 'Email Marketing' },
  { value: 'business-software', label: 'Business Software' },
  { value: 'ecommerce', label: 'E-commerce Website' },
  { value: 'google-workspace', label: 'Google Workspace' },
  { value: 'other', label: 'Other' }
];

const Contact = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: [] as string[],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const serviceOptions = useMemo(() => {
    if (settings?.form_service_options) {
      return settings.form_service_options.split(',').map(s => {
        const trimmed = s.trim();
        return { value: trimmed, label: trimmed };
      });
    }
    return DEFAULT_SERVICE_OPTIONS;
  }, [settings?.form_service_options]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        service: formData.service.join(', '),
        message: formData.message
      };

      const response = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', service: [], message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-[60px] lg:py-[80px] relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/10"></div>

      {/* Background decoration with enhanced blur */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-400 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full blur-[100px]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-20 items-center">
          {/* Left Column - Heading and Button */}
          <div className="flex flex-col justify-center">
            <div className="max-w-[550px]">
              <motion.p
                {...fadeInUpText}
                transition={{ ...fadeInUpText.transition, delay: 0.1 }}
                className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-4"
              >
                {settings?.home_form_subtitle || "GET IN TOUCH"}
              </motion.p>
              <motion.h2
                {...fadeInUpTitle}
                transition={{ ...fadeInUpTitle.transition, delay: 0.2 }}
                className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
              >
                {settings?.home_form_title || "Let's discuss further to get better results"}
              </motion.h2>
              <motion.p
                {...fadeInUpText}
                transition={{ ...fadeInUpText.transition, delay: 0.3 }}
                className="text-slate-300 text-lg mb-8 leading-relaxed"
              >
                {settings?.home_form_desc || (
                  <>Our <span className="text-cyan-400">mission</span> is to empower businesses of our all sizes too thrive in an immersive ever-changing and fast-paced. In today's dynamic business environment, the key to <span className="text-cyan-400">success lies</span>.</>
                )}
              </motion.p>
              <motion.div
                {...fadeInUpText}
                transition={{ ...fadeInUpText.transition, delay: 0.4 }}
              >
                <Link
                  to="/contact-us"
                  className="group flex items-center gap-3 pl-10 pr-2 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 w-fit hover:scale-105"
                >
                  <span className="text-base">{settings?.home_contact_btn || "Contact us"}</span>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-cyan-500 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            {...fadeInUpImage}
            transition={{ ...fadeInUpImage.transition, delay: 0.3 }}
            className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5"
          >
            <h3 className="text-white text-base font-bold mb-3">
              Feel free to get in touch or<br />visit our location.
            </h3>

            {/* Contact Info Pills */}
            <div className="flex flex-wrap gap-3 mb-4">
              <a href={`tel:${settings?.contact_phone_1?.replace(/\s/g, '') || ''}`} className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">{settings?.contact_phone_1 || '+880 16014 19997'}</span>
              </a>
              <a href={`mailto:${settings?.contact_email_1 || 'info@cibato.com'}`} className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">{settings?.contact_email_1 || 'info@cibato.com'}</span>
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block text-slate-400 text-sm mb-2">
                    {settings?.form_label_name_first || "First Name *"}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                    placeholder={settings?.form_ph_name_first || "First Name"}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-slate-400 text-sm mb-2">
                    {settings?.form_label_name_last || "Last Name *"}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                    placeholder={settings?.form_ph_name_last || "Last Name"}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="block text-slate-400 text-sm mb-2">
                  {settings?.form_label_email || "Your Email *"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                  placeholder={settings?.form_ph_email || "info@cibato.com"}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="phone" className="block text-slate-400 text-sm mb-2">
                    {settings?.form_label_phone || "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                    placeholder={settings?.form_ph_phone || "+880 16014 19997"}
                  />
                </div>
                <div>
                  <MultiSelect
                    label={settings?.form_label_service || "Services Required *"}
                    options={serviceOptions}
                    value={formData.service}
                    onChange={(val) => setFormData({ ...formData, service: val })}
                    placeholder={settings?.form_ph_service || "Select services..."}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-400 text-sm mb-2">
                  {settings?.form_label_message || "Your Message *"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none text-sm"
                  placeholder={settings?.form_ph_message || "Tell us about your project..."}
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm font-medium text-center">
                  Message sent successfully!
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium text-center">
                  Something went wrong. Please try again.
                </div>
              )}

              <div className="flex justify-center mt-[20px]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center gap-3 pl-8 pr-2 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 w-fit hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 text-base">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="text-base">{settings?.home_form_submit_btn || "Send message"}</span>
                  )}
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-cyan-500 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section >
  );
};

export default Contact;
