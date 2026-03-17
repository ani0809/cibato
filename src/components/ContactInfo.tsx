import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, X, Youtube } from 'lucide-react';
import { fadeInUpTitle, fadeInUpText } from '../utils/animations';

const ContactInfo = () => {
    // Observer removed

    const contactDetails = [
        {
            icon: Phone,
            title: 'Phone Number',
            details: ['+880 16014 19997', '+880 1624543242'],
            gradient: 'from-cyan-500 to-blue-600',
            links: ['tel:+8801601419997', 'tel:+8801624543242']
        },
        {
            icon: Mail,
            title: 'Email Address',
            details: ['info@cibato.com', 'wecibato@gmail.com'],
            gradient: 'from-blue-600 to-purple-600',
            links: ['mailto:info@cibato.com', 'mailto:wecibato@gmail.com']
        },
        {
            icon: MapPin,
            title: 'Office Address',
            details: ['House-1/1, Baitul Atik Jame Mosque Road, Block A, Banasree, Dhaka-1229'],
            gradient: 'from-purple-600 to-pink-600',
            links: []
        }
    ];

    const socialLinks = [
        { icon: Facebook, link: 'https://www.facebook.com/wecibato', color: 'hover:bg-blue-600' },
        { icon: Instagram, link: 'https://www.instagram.com/wecibato', color: 'hover:bg-pink-600' },
        { icon: Linkedin, link: 'https://www.linkedin.com/company/cibato-com', color: 'hover:bg-blue-700' },
        { icon: X, link: 'https://x.com/CibatoC', color: 'hover:bg-slate-900' },
        { icon: Youtube, link: 'https://www.youtube.com/@cibato', color: 'hover:bg-red-600' }
    ];

    return (
        <section className="py-[10px] lg:py-[30px] mb-5 bg-gradient-to-b from-white via-slate-50/30 to-white relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-40 left-20 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
                {/* Header */}
                <motion.div
                    {...fadeInUpTitle}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                        Speak With Our <span className="text-cyan-500">Expert</span>
                    </h2>
                </motion.div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
                    {contactDetails.map((item, index) => (
                        <motion.div
                            key={index}
                            {...fadeInUpText}
                            transition={{ ...fadeInUpText.transition, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative bg-white rounded-3xl p-6 lg:p-8 shadow-md hover:shadow-lg transition-all duration-500 border-2 border-slate-200 h-full">
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className="w-7 h-7 text-white" strokeWidth={2} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-3">
                                        {item.title}
                                    </h3>

                                    {/* Details */}
                                    <div className="space-y-1">
                                        {item.details.map((detail, idx) => (
                                            item.links && item.links[idx] ? (
                                                <a
                                                    key={idx}
                                                    href={item.links[idx]}
                                                    className="block text-slate-700 text-sm lg:text-base hover:text-cyan-500 transition-colors duration-300"
                                                >
                                                    {detail}
                                                </a>
                                            ) : (
                                                <p
                                                    key={idx}
                                                    className="text-slate-700 text-sm lg:text-base"
                                                >
                                                    {detail}
                                                </p>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Social Media Links */}
                <motion.div
                    {...fadeInUpText}
                    transition={{ ...fadeInUpText.transition, delay: 0.4 }}
                    className="text-center"
                >
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Follow Us On Social Media</h3>
                    <div className="flex justify-center gap-4 flex-wrap">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                {...fadeInUpText}
                                transition={{ ...fadeInUpText.transition, delay: 0.5 + index * 0.05 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-12 h-12 bg-cyan-500 ${social.color} rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
                            >
                                <social.icon className="w-6 h-6" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Map Section */}
                <motion.div
                    {...fadeInUpText}
                    transition={{ ...fadeInUpText.transition, delay: 0.6 }}
                    className="mt-12"
                >
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-slate-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.4668178970983!2d90.42264061190588!3d23.766385578570596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9c125fff281%3A0xbceef608af22381c!2sCibato%20%7C%20SEO%2C%20Digital%20Marketing%20%26%20Web%20Development%20Company!5e0!3m2!1sen!2sbd!4v1764519745862!5m2!1sen!2sbd"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full"
                        ></iframe>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactInfo;
