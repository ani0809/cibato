import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, FileInput, MessageSquare, GripHorizontal } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import SeoHead from '../../components/SeoHead';

const AdminForms = () => {
    const { settings, updateSettings, loading } = useSettings();
    const [formValues, setFormValues] = useState<any>({});
    const [saving, setSaving] = useState<string | null>(null);

    useEffect(() => {
        if (settings) {
            setFormValues(settings);
        }
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSaveSection = async (section: string, keys: string[]) => {
        setSaving(section);
        const updates: any = {};
        keys.forEach(key => {
            updates[key] = formValues[key];
        });

        await updateSettings(updates);
        setTimeout(() => setSaving(null), 1000);
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading settings...</div>;

    const InputField = ({ label, name, placeholder, type = "text", help }: { label: string, name: string, placeholder?: string, type?: string, help?: string }) => (
        <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">{label}</label>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={formValues[name] || ''}
                    onChange={handleChange}
                    placeholder={placeholder}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 text-slate-700 resize-none"
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={formValues[name] || ''}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 text-slate-700"
                />
            )}
            {help && <p className="text-xs text-slate-500">{help}</p>}
        </div>
    );

    const SaveButton = ({ section, keys }: { section: string, keys: string[] }) => (
        <div className="mt-8 flex justify-end">
            <button
                onClick={() => handleSaveSection(section, keys)}
                disabled={saving === section}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg shadow-cyan-500/20 ${saving === section
                    ? 'bg-green-500 pointer-events-none'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 active:scale-95'
                    }`}
            >
                {saving === section ? (
                    <>
                        <CheckCircle2 className="w-4 h-4" />
                        Saved!
                    </>
                ) : (
                    <>
                        <Save className="w-4 h-4" />
                        Save Changes
                    </>
                )}
            </button>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto pb-20 space-y-8">
            <SeoHead title="Form Settings - Admin" />

            <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-50 rounded-2xl text-cyan-600">
                    <FileInput className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Form Manager</h1>
                    <p className="text-slate-500 text-lg">Customize labels, placeholders, and structure of contact forms.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. Main Page Form */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                        <MessageSquare className="w-5 h-5 text-cyan-500" />
                        <h2 className="text-lg font-bold text-slate-800">Home Page Form</h2>
                    </div>
                    <div className="space-y-5">
                        <InputField label="Section Subtitle" name="home_form_subtitle" placeholder="GET IN TOUCH" />
                        <InputField label="Main Title" name="home_form_title" placeholder="Let's discuss further to get better results" />
                        <InputField label="Description Text" name="home_form_desc" type="textarea" placeholder="Our mission is to empower..." />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Contact Button Text" name="home_contact_btn" placeholder="Contact us" />
                            <InputField label="Submit Button Text" name="home_form_submit_btn" placeholder="Send message" />
                        </div>
                    </div>
                    <SaveButton section="home_form" keys={['home_form_subtitle', 'home_form_title', 'home_form_desc', 'home_contact_btn', 'home_form_submit_btn']} />
                </div>

                {/* 2. Popup Form */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                        <MessageSquare className="w-5 h-5 text-purple-500" />
                        <h2 className="text-lg font-bold text-slate-800">Popup Form</h2>
                    </div>
                    <div className="space-y-5">
                        <InputField label="Popup Title" name="popup_form_title" placeholder="Get A Free Consultancy" />
                        <InputField label="Submit Button Text" name="popup_form_submit_btn" placeholder="Send Message" />

                        <div className="pt-4 border-t border-slate-100 mt-4">
                            <div className="flex items-center gap-3 mb-4">
                                <GripHorizontal className="w-5 h-5 text-orange-500" />
                                <h2 className="text-lg font-bold text-slate-800">Service Options</h2>
                            </div>
                            <InputField
                                label="Available Services (Comma Separated)"
                                name="form_service_options"
                                type="textarea"
                                placeholder="Web Design, App Development, SEO Marketing"
                                help="These options will appear in the MultiSelect dropdown on both forms."
                            />
                        </div>
                    </div>
                    <SaveButton section="popup_form" keys={['popup_form_title', 'popup_form_submit_btn', 'form_service_options']} />
                </div>

                {/* 3. Field Labels */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                        <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center font-bold text-xs text-slate-600">Ab</div>
                        <h2 className="text-lg font-bold text-slate-800">Field Labels</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <InputField label="First Name Label" name="form_label_name_first" placeholder="First Name *" />
                        <InputField label="Last Name Label" name="form_label_name_last" placeholder="Last Name *" />
                        <InputField label="Email Label" name="form_label_email" placeholder="Your Email *" />
                        <InputField label="Phone Label" name="form_label_phone" placeholder="Phone Number" />
                        <InputField label="Service Label" name="form_label_service" placeholder="Services Required *" />
                        <InputField label="Message Label" name="form_label_message" placeholder="Your Message *" />
                    </div>
                    <SaveButton
                        section="labels"
                        keys={['form_label_name_first', 'form_label_name_last', 'form_label_email', 'form_label_phone', 'form_label_service', 'form_label_message']}
                    />
                </div>

                {/* 4. Placeholders */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                        <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center text-slate-400 italic font-serif">I</div>
                        <h2 className="text-lg font-bold text-slate-800">Field Placeholders</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <InputField label="First Name Placeholder" name="form_ph_name_first" placeholder="First Name" />
                        <InputField label="Last Name Placeholder" name="form_ph_name_last" placeholder="Last Name" />
                        <InputField label="Email Placeholder" name="form_ph_email" placeholder="info@cibato.com" />
                        <InputField label="Phone Placeholder" name="form_ph_phone" placeholder="+880 16014 19997" />
                        <InputField label="Service Placeholder" name="form_ph_service" placeholder="Select services..." />
                        <InputField label="Message Placeholder" name="form_ph_message" placeholder="Tell us about your project..." />
                    </div>
                    <SaveButton
                        section="placeholders"
                        keys={['form_ph_name_first', 'form_ph_name_last', 'form_ph_email', 'form_ph_phone', 'form_ph_service', 'form_ph_message']}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminForms;
