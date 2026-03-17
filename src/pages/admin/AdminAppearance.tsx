import React, { useState, useEffect } from 'react';
import { Save, Type, Palette, Code, X, Globe } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { API_URL, UPLOAD_URL } from '../../utils/api';
import ImagePicker from '../../components/admin/ImagePicker';

const AdminAppearance = () => {
    const { settings, updateSettings, loading } = useSettings();
    const [localSettings, setLocalSettings] = useState(settings);
    const [saving, setSaving] = useState(false);

    // Sync local state when settings load
    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleChange = (key: string, value: string) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        await updateSettings(localSettings);
        setSaving(false);
        alert('Settings saved successfully!');
    };

    if (loading) return <div className="p-8 text-slate-800">Loading settings...</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-6 -m-6">
            <div className="max-w-4xl mx-auto pb-20 space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                            Appearance
                        </h1>
                        <p className="text-slate-500 mt-1">Customize your site's look and feel</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                {/* General Information */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Globe className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-800">General Information</h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Site Title</label>
                                <input
                                    type="text"
                                    value={localSettings.site_title || ''}
                                    onChange={e => handleChange('site_title', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none text-slate-800 placeholder-slate-400 transition-all font-medium"
                                    placeholder="e.g. Cibato"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Site Tagline / Description</label>
                                <input
                                    type="text"
                                    value={localSettings.site_description || ''}
                                    onChange={e => handleChange('site_description', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none text-slate-800 placeholder-slate-400 transition-all font-medium"
                                    placeholder="e.g. Building Your Digital Presence"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Settings */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-cyan-50 rounded-lg">
                            <Type className="w-5 h-5 text-cyan-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-800">System Settings</h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            {/* Site Icon */}
                            <ImagePicker
                                label="Site Icon (Favicon)"
                                value={localSettings.siteIcon || ''}
                                onChange={(url) => handleChange('siteIcon', url)}
                                helperText="Rec: 32x32px .png or .ico"
                                previewHeight="h-20"
                            />

                            {/* System Logo */}
                            <ImagePicker
                                label="Admin Dashboard Logo"
                                value={localSettings.systemLogo || ''}
                                onChange={(url) => handleChange('systemLogo', url)}
                                helperText="Rec: Transparent PNG (White/Light)"
                                previewHeight="h-20"
                            />

                            {/* Admin Logo Size */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700">Logo Size (Height px)</label>
                                <input
                                    type="number"
                                    value={localSettings.adminLogoSize || '32'}
                                    onChange={e => handleChange('adminLogoSize', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-500 outline-none text-slate-800 font-medium"
                                    placeholder="e.g. 32"
                                />
                                <p className="text-xs text-slate-500">Default: 32px</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* General Settings (Colors) */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <Palette className="w-5 h-5 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-800">Theme Colors</h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {/* Base Color */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700">Primary Color</label>
                                <div className="flex gap-4 items-center">
                                    <div className="relative flex-1">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg border border-slate-200 shadow-sm" style={{ backgroundColor: localSettings.baseColor || '#000000' }}></div>
                                        <input
                                            type="text"
                                            value={localSettings.baseColor || ''}
                                            onChange={e => handleChange('baseColor', e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-500 outline-none text-slate-800 font-mono uppercase"
                                            placeholder="#0080FF"
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="color"
                                            value={localSettings.baseColor || '#000000'}
                                            onChange={e => handleChange('baseColor', e.target.value)}
                                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                        />
                                        <div className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center bg-white cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                                            <Palette className="w-5 h-5 text-slate-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Base Hover Color */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700">Primary Hover</label>
                                <div className="flex gap-4 items-center">
                                    <div className="relative flex-1">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg border border-slate-200 shadow-sm" style={{ backgroundColor: localSettings.baseHoverColor || '#000000' }}></div>
                                        <input
                                            type="text"
                                            value={localSettings.baseHoverColor || ''}
                                            onChange={e => handleChange('baseHoverColor', e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-cyan-500 outline-none text-slate-800 font-mono uppercase"
                                            placeholder="#0066CC"
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="color"
                                            value={localSettings.baseHoverColor || '#000000'}
                                            onChange={e => handleChange('baseHoverColor', e.target.value)}
                                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                        />
                                        <div className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center bg-white cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                                            <Palette className="w-5 h-5 text-slate-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Color */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700">Secondary Color</label>
                                <div className="flex gap-4 items-center">
                                    <div className="relative flex-1">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg border border-slate-200 shadow-sm" style={{ backgroundColor: localSettings.secondaryBaseColor || '#000000' }}></div>
                                        <input
                                            type="text"
                                            value={localSettings.secondaryBaseColor || ''}
                                            onChange={e => handleChange('secondaryBaseColor', e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-200 rounded-xl focus:border-cyan-500 outline-none text-slate-800 font-mono uppercase"
                                            placeholder="#FF5500"
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="color"
                                            value={localSettings.secondaryBaseColor || '#000000'}
                                            onChange={e => handleChange('secondaryBaseColor', e.target.value)}
                                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                        />
                                        <div className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center bg-white cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                                            <Palette className="w-5 h-5 text-slate-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminAppearance;
