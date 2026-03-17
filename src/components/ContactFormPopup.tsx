import { useState, useMemo } from 'react';
import { X, Loader2 } from 'lucide-react';
import CibatoSlideButton from './CibatoSlideButton';
import { API_URL } from '../utils/api';
import { MultiSelect } from './ui/MultiSelect';
import { useSettings } from '../context/SettingsContext';

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

interface ContactFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormPopup = ({ isOpen, onClose }: ContactFormPopupProps) => {
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', service: [], message: '' });
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>

      <div
        className="relative w-full max-w-2xl bg-gradient-to-br from-slate-50 to-white rounded-3xl shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-xl z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {settings?.popup_form_title || "Get A Free Consultancy"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2">
                  {settings?.form_label_name_first || "First Name *"}
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all duration-200"
                  placeholder={settings?.form_ph_name_first || "First Name"}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">
                  {settings?.form_label_name_last || "Last Name *"}
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all duration-200"
                  placeholder={settings?.form_ph_name_last || "Last Name"}
                />
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                {settings?.form_label_email || "Your Email *"}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all duration-200"
                placeholder={settings?.form_ph_email || "info@cibato.com"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                  {settings?.form_label_phone || "Phone Number"}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all duration-200"
                  placeholder={settings?.form_ph_phone || "+880 16014 19997"}
                />
              </div>

              <div>
                <div>
                  <MultiSelect
                    label={settings?.form_label_service || "Services Required *"}
                    options={serviceOptions}
                    value={formData.service}
                    onChange={(val) => setFormData(prev => ({ ...prev, service: val }))}
                    placeholder={settings?.form_ph_service || "Select services..."}
                    variant="inverted"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                {settings?.form_label_message || "Your Message *"}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all duration-200 resize-none"
                placeholder={settings?.form_ph_message || "Tell us about your project..."}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-semibold text-center">
                Message sent successfully! We'll contact you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold text-center">
                Failed to send message. Please try again.
              </div>
            )}

            {isSubmitting ? (
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled
                  className="px-8 py-2 bg-slate-400 text-white rounded-full font-medium text-base opacity-50 cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <CibatoSlideButton
                  type="submit"
                  label={settings?.popup_form_submit_btn || "Send Message"}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactFormPopup;
