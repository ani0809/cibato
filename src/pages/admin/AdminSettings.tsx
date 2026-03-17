import React, { useState, useEffect } from 'react';
import { Save, LayoutDashboard, Globe, Share2, BarChart3, Video, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const AdminSettings = () => {
    const { settings, updateSettings, loading } = useSettings();
    const [formValues, setFormValues] = useState<any>({});
    const [saving, setSaving] = useState<string | null>(null);

    useEffect(() => {
        if (settings) {
            setFormValues(settings);
        }
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        // Fake delay for feedback
        setTimeout(() => setSaving(null), 1000);
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading settings...</div>;

    const InputField = ({ label, name, placeholder, type = "text" }: { label: string, name: string, placeholder?: string, type?: string }) => (
        <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">{label}</label>
            <input
                type={type}
                name={name}
                value={formValues[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 text-slate-700"
            />
        </div>
    );

    const SectionHeader = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
        <div className="flex items-start gap-4 mb-6 border-b border-slate-100 pb-6">
            <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h2 className="text-lg font-bold text-slate-800">{title}</h2>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
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
        <div className="max-w-6xl mx-auto pb-20 px-4 sm:px-6">
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Site Settings</h1>
                <p className="text-slate-500 text-lg">Manage your global website content and configurations.</p>
            </div>

            <div className="space-y-8">
                {/* Contact Information Section */}
                <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_0_rgba(0,0,0,0.05)] border border-slate-100">
                    <SectionHeader
                        icon={Globe}
                        title="Contact Information"
                        description="Update your company address and contact details appearing in the footer."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <InputField label="Physical Address" name="contact_address" placeholder="e.g. House-78, Block-K, South Banasree, Dhaka-1219" />
                        </div>
                        <InputField label="Phone Number 1" name="contact_phone_1" placeholder="e.g. +880 16014 19997" />
                        <InputField label="Phone Number 2" name="contact_phone_2" placeholder="e.g. +880 16245 43242" />
                        <InputField label="Email Address 1" name="contact_email_1" placeholder="e.g. info@cibato.com" />
                        <InputField label="Email Address 2" name="contact_email_2" placeholder="e.g. webcibato@gmail.com" />
                        <div className="md:col-span-2">
                            <InputField label="Footer Copyright Text" name="footer_copyright" placeholder="e.g. © 2020-2025 by Cibato. All rights reserved." />
                        </div>
                    </div>
                    <SaveButton section="contact" keys={['contact_address', 'contact_phone_1', 'contact_phone_2', 'contact_email_1', 'contact_email_2', 'footer_copyright']} />
                </div>

                {/* Social Media Section */}
                <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_0_rgba(0,0,0,0.05)] border border-slate-100">
                    <SectionHeader
                        icon={Share2}
                        title="Social Media Links"
                        description="Connect your social profiles. Leave empty to hide the icon."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Facebook URL" name="social_facebook" placeholder="https://facebook.com/..." />
                        <InputField label="Instagram URL" name="social_instagram" placeholder="https://instagram.com/..." />
                        <InputField label="LinkedIn URL" name="social_linkedin" placeholder="https://linkedin.com/..." />
                        <InputField label="Twitter / X URL" name="social_twitter" placeholder="https://x.com/..." />
                        <div className="md:col-span-2">
                            <InputField label="YouTube URL" name="social_youtube" placeholder="https://youtube.com/..." />
                        </div>
                    </div>
                    <SaveButton section="social" keys={['social_facebook', 'social_instagram', 'social_linkedin', 'social_twitter', 'social_youtube']} />
                </div>

                {/* Stats & Video Section */}
                <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_0_rgba(0,0,0,0.05)] border border-slate-100">
                    <SectionHeader
                        icon={BarChart3}
                        title="Homepage Stats & Video"
                        description="Update the numbers displayed on your homepage counters and the hero video."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4 text-cyan-500" />
                                Statistics
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField label="Projects Count" name="stat_projects" placeholder="e.g. 490+" />
                                <InputField label="Years Experience" name="stat_years" placeholder="e.g. 5+" />
                                <InputField label="Happy Clients" name="stat_clients" placeholder="e.g. 340+" />
                                <InputField label="Team Members" name="stat_team" placeholder="e.g. 15+" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                                <Video className="w-4 h-4 text-cyan-500" />
                                Hero Video
                            </h3>
                            <div className="space-y-4">
                                <InputField label="Video Embed URL" name="hero_video_url" placeholder="https://www.youtube.com/embed/..." />
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                                    <p className="font-semibold mb-2">Video Preview:</p>
                                    {formValues.hero_video_url ? (
                                        <div className="relative pt-[56.25%] bg-slate-200 rounded-lg overflow-hidden border border-slate-300 shadow-sm">
                                            <iframe
                                                src={formValues.hero_video_url}
                                                className="absolute top-0 left-0 w-full h-full"
                                                title="Video Preview"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-32 flex items-center justify-center bg-slate-100 rounded-lg">No video URL provided</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <SaveButton section="stats" keys={['stat_projects', 'stat_years', 'stat_clients', 'stat_team', 'hero_video_url']} />
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
