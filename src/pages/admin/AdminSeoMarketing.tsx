import { useState, useEffect } from 'react';
import { Save, Globe, Code, FileCode } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const AdminSeoMarketing = () => {
    const { settings, updateSettings, loading } = useSettings();
    const [formValues, setFormValues] = useState<any>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (settings) {
            setFormValues(settings);
        }
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSettings({
                facebook_pixel_id: formValues.facebook_pixel_id,
                google_analytics_id: formValues.google_analytics_id,
                facebook_access_token: formValues.facebook_access_token,
                enable_capi: formValues.enable_capi,
                test_event_code: formValues.test_event_code,
                google_service_account_json: formValues.google_service_account_json,
                google_analytics_property_id: formValues.google_analytics_property_id,
                search_console_property: formValues.search_console_property,
                headerScript: formValues.headerScript,
                footerScript: formValues.footerScript,
                global_noindex: formValues.global_noindex
            });
            alert('SEO & Marketing settings saved!');
        } catch (error) {
            console.error(error);
            alert('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-8 flex items-center gap-4">
                <div className="p-3 bg-cyan-50 rounded-2xl text-cyan-600">
                    <Globe className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">SEO & Marketing</h1>
                    <p className="text-slate-500 text-lg">Configure tracking codes and analytics</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Site Visibility */}
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm border-l-4 border-l-red-500">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-red-500" />
                        Site Visibility
                    </h2>
                    <div className="flex items-start gap-4">
                        <div className="flex items-center h-5 mt-1">
                            <input
                                id="global_noindex"
                                name="global_noindex"
                                type="checkbox"
                                checked={formValues.global_noindex === 'true'}
                                onChange={(e) => setFormValues((prev: any) => ({ ...prev, global_noindex: e.target.checked ? 'true' : 'false' }))}
                                className="w-4 h-4 text-red-600 border-slate-300 rounded focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="global_noindex" className="font-semibold text-slate-800">
                                Discourage search engines from indexing this site
                            </label>
                            <p className="text-sm text-slate-500 mt-1">
                                It is up to search engines to honor this request. Checking this will add a "noindex, nofollow" meta tag to every page on your site.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tracking IDs */}
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Code className="w-5 h-5 text-cyan-500" />
                        Tracking IDs
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Facebook Pixel ID</label>
                            <input
                                name="facebook_pixel_id"
                                value={formValues.facebook_pixel_id || ''}
                                onChange={handleChange}
                                placeholder="e.g., 1234567890"
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                            />
                            <p className="mt-1 text-xs text-slate-400">Your Facebook Pixel ID (only the number).</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Google Analytics ID (G-Tag)</label>
                            <input
                                name="google_analytics_id"
                                value={formValues.google_analytics_id || ''}
                                onChange={handleChange}
                                placeholder="e.g., G-XXXXXXXXXX"
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                            />
                            <p className="mt-1 text-xs text-slate-400">Your Google Analytics 4 Measurement ID.</p>
                        </div>
                    </div>
                </div>

                {/* CAPI Config */}
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-cyan-500" />
                        Server Side Tracking (CAPI)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Enable CAPI</label>
                            <select
                                name="enable_capi"
                                value={formValues.enable_capi || 'false'}
                                onChange={(e) => setFormValues((prev: any) => ({ ...prev, enable_capi: e.target.value }))}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                            >
                                <option value="false">Disabled</option>
                                <option value="true">Enabled</option>
                            </select>
                            <p className="mt-1 text-xs text-slate-400">Enable Facebook Server Side tracking.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Test Event Code</label>
                            <input
                                name="test_event_code"
                                value={formValues.test_event_code || ''}
                                onChange={handleChange}
                                placeholder="e.g., TEST12345"
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                            />
                            <p className="mt-1 text-xs text-slate-400">Code from Facebook 'Test Events' tab (optional).</p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Facebook Access Token</label>
                            <input
                                type="password"
                                name="facebook_access_token"
                                value={formValues.facebook_access_token || ''}
                                onChange={handleChange}
                                placeholder="EAA..."
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                            />
                            <p className="mt-1 text-xs text-slate-400">Long-lived access token from Business Manager.</p>
                        </div>
                    </div>
                </div>

                {/* Google Integration */}
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <FileCode className="w-5 h-5 text-cyan-500" />
                        Google Integration (Site Kit)
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Service Account JSON Key</label>
                            <textarea
                                name="google_service_account_json"
                                value={formValues.google_service_account_json || ''}
                                onChange={handleChange}
                                rows={4}
                                placeholder='{"type": "service_account", ...}'
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs focus:ring-2 focus:ring-cyan-500/20"
                            />
                            <p className="mt-1 text-xs text-slate-400">Paste the entire content of your Google Cloud Service Account JSON key here.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">GA4 Property ID</label>
                            <input
                                name="google_analytics_property_id"
                                value={formValues.google_analytics_property_id || ''}
                                onChange={handleChange}
                                placeholder="e.g., 345678901"
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                            />
                            <p className="mt-1 text-xs text-slate-400">The numeric Property ID from Google Analytics 4 (Admin).</p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Search Console Property</label>
                            <input
                                name="search_console_property"
                                value={formValues.search_console_property || ''}
                                onChange={handleChange}
                                placeholder="e.g., https://example.com/ or sc-domain:example.com"
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20"
                            />
                            <p className="mt-1 text-xs text-slate-400">Your site URL or Domain Property as defined in Google Search Console.</p>
                        </div>
                    </div>
                </div>

                {/* Custom Scripts */}
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <FileCode className="w-5 h-5 text-cyan-500" />
                        Custom Scripts
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Header Scripts</label>
                            <textarea
                                name="headerScript"
                                value={formValues.headerScript || ''}
                                onChange={handleChange}
                                rows={6}
                                placeholder="<script>...</script>"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-cyan-500/20"
                            />
                            <p className="mt-1 text-xs text-slate-400">Scripts to be injected into the &lt;head&gt; section.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Body Scripts</label>
                            <textarea
                                name="footerScript"
                                value={formValues.footerScript || ''}
                                onChange={handleChange}
                                rows={6}
                                placeholder="<script>...</script>"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-cyan-500/20"
                            />
                            <p className="mt-1 text-xs text-slate-400">Scripts to be injected at the end of the &lt;body&gt; section.</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-xl font-bold hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminSeoMarketing;
