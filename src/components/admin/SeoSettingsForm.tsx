import React, { useState } from 'react';
import { Search, Code } from 'lucide-react';
import { API_URL, UPLOAD_URL } from '../../utils/api';
import ImagePicker from './ImagePicker';

interface SeoData {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    metaImage?: string;
    schemaMarkup?: string;
}

interface Props {
    data: SeoData;
    onChange: (data: SeoData) => void;
}

const SeoSettingsForm: React.FC<Props> = ({ data, onChange }) => {

    const handleChange = (key: keyof SeoData, value: string) => {
        onChange({ ...data, [key]: value });
    };

    return (
        <div className="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
                <Search className="w-5 h-5 text-cyan-600" />
                <h3 className="text-lg font-semibold text-slate-800">SEO Settings</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Meta Title</label>
                    <input
                        type="text"
                        value={data.metaTitle || ''}
                        onChange={e => handleChange('metaTitle', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        placeholder="Title for search engines"
                    />
                    <p className="text-xs text-slate-500 mt-1">Leave blank to use the default title.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Meta Description</label>
                    <textarea
                        value={data.metaDescription || ''}
                        onChange={e => handleChange('metaDescription', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none"
                        placeholder="Brief summary for search results..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Keywords</label>
                    <input
                        type="text"
                        value={data.keywords || ''}
                        onChange={e => handleChange('keywords', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        placeholder="keyword1, keyword2, keyword3"
                    />
                    <p className="text-xs text-slate-500 mt-1">Comma separated list of keywords.</p>
                </div>

                <div>
                    <ImagePicker
                        label="Meta Image (OG Image)"
                        value={data.metaImage}
                        onChange={(url) => handleChange('metaImage', url)}
                        helperText="Recommended: 1200x630px for social sharing"
                        previewHeight="h-32"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                        <Code className="w-4 h-4 text-slate-500" />
                        Schema Markup (JSON-LD)
                    </label>
                    <textarea
                        value={data.schemaMarkup || ''}
                        onChange={e => handleChange('schemaMarkup', e.target.value)}
                        rows={6}
                        className="w-full px-4 py-2 bg-slate-900 text-cyan-400 font-mono text-xs border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        placeholder='{ "@context": "https://schema.org", "@type": "Article", ... }'
                    />
                    <p className="text-xs text-slate-500 mt-1">Enter valid JSON-LD structure. Excluding &lt;script&gt; tags.</p>
                </div>
            </div>
        </div>
    );
};

export default SeoSettingsForm;
