import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, ArrowLeft, Image as ImageIcon, Upload } from 'lucide-react';
import { API_URL, UPLOAD_URL, fetchWithAuth } from '../../utils/api';
import TextEditor from '../../components/TextEditor';
import SeoSettingsForm from '../../components/admin/SeoSettingsForm';
import MediaLibraryModal from '../../components/admin/MediaLibraryModal';
import PricingEditor from '../../components/admin/PricingEditor';

// Configuration for special pages
interface PageImageConfig {
    title: string;
    images: {
        key: string;
        label: string;
        description?: string;
        recommendedSize?: string;
    }[];
    hasPricing?: boolean;
}

const PAGE_IMAGE_CONFIG: Record<string, PageImageConfig> = {
    'services-page-id': {
        title: 'Services Page',
        images: [
            { key: 'serviceHero', label: 'Hero Image', description: 'Main banner image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' },
            { key: 'businessGrowth', label: 'Business Growth Image', recommendedSize: '800x600px' }
        ]
    },
    'portfolio-page-id': {
        title: 'Portfolio Page',
        images: [
            { key: 'portfolioHero', label: 'Hero Image', description: 'Main banner image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' }
        ]
    },
    'contact-page-id': {
        title: 'Contact Page',
        images: [
            { key: 'contactHero', label: 'Hero Image', description: 'Main banner image', recommendedSize: '800x600px' }
        ]
    },
    'blog-page-id': {
        title: 'Blog Page',
        images: [
            { key: 'hero', label: 'Hero Image', description: 'Main banner for blog page', recommendedSize: '1920x600px' }
        ]
    },
    'team-page-id': {
        title: 'Team Page',
        images: [
            { key: 'hero', label: 'Hero Image', description: 'Main banner for team page', recommendedSize: '1920x600px' }
        ]
    },
    'testimonials-page-id': {
        title: 'Testimonials Page',
        images: [
            { key: 'hero', label: 'Hero Image', description: 'Main banner for testimonials page', recommendedSize: '1920x600px' }
        ]
    },
    'website-demos-page-id': {
        title: 'Website Demos Page',
        images: [
            { key: 'hero', label: 'Hero Image', description: 'Main banner for demos page', recommendedSize: '1920x600px' }
        ]
    },
    'home-page-id': {
        title: 'Home Page',
        images: [
            { key: 'hero', label: 'Hero Section Image', description: 'Main banner image', recommendedSize: '800x800px' },
            { key: 'about', label: 'About Section Image', description: 'About Us section image', recommendedSize: '600x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' },
            { key: 'businessGrowth', label: 'Business Growth Image', recommendedSize: '800x600px' }
        ]
    },
    'about-page-id': {
        title: 'About Page',
        images: [
            { key: 'aboutHero', label: 'Hero Section Image', recommendedSize: '800x600px' },
            { key: 'about', label: 'About Section Image', recommendedSize: '600x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' }
        ]
    },

    // Service Landing Pages
    'web-design-page-id': {
        title: 'Web Design & Development',
        hasPricing: true,
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'creative', label: 'Creative Services Image', recommendedSize: '800x600px' },
            { key: 'skilledTeam', label: 'Skilled Team Image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' },
            { key: 'whyBusiness', label: 'Why Every Business Needs Image', recommendedSize: '800x600px' },
            { key: 'leadingAgency', label: 'Leading Agency Image', recommendedSize: '800x600px' }
        ]
    },
    'business-website-page-id': {
        title: 'Business Website',
        hasPricing: true,
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'creative', label: 'What is Business Website Image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' }
        ]
    },
    'ecommerce-page-id': {
        title: 'E-commerce Website',
        hasPricing: true,
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'ecommerceServices', label: 'E-Commerce Services Image', recommendedSize: '800x600px' },
            { key: 'wordpressLogo', label: 'WordPress Logo', recommendedSize: '200x200px' },
            { key: 'shopifyLogo', label: 'Shopify Logo', recommendedSize: '200x200px' },
            { key: 'laravelLogo', label: 'Laravel Logo', recommendedSize: '200x200px' },
            { key: 'magentoLogo', label: 'Magento Logo', recommendedSize: '200x200px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' },
            { key: 'ecommerceQuality', label: 'Why Quality Website Image', recommendedSize: '800x600px' },
            { key: 'clutterFree', label: 'Clutter-Free Design Image', recommendedSize: '800x600px' },
            { key: 'cta', label: 'Call-to-Action Image', recommendedSize: '1920x600px' }
        ]
    },
    'software-page-id': {
        title: 'Business Software',
        hasPricing: true,
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'services', label: 'Business Software Services Image', recommendedSize: '800x600px' },
            { key: 'scalable', label: 'Scalable Software Image', recommendedSize: '800x600px' },
            { key: 'industrySpecific', label: 'Industry-Specific Software Image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' }
        ]
    },
    'digital-marketing-page-id': {
        title: 'Digital Marketing',
        hasPricing: true,
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'resultDriven', label: 'Result-Driven Image', recommendedSize: '800x600px' },
            { key: 'growBusiness', label: 'Grow Your Business Image', recommendedSize: '800x600px' },
            { key: 'leadingAgency', label: 'Leading Agency Image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' }
        ]
    },
    'seo-services-page-id': {
        title: 'SEO Services Page',
        hasPricing: true,
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'elevateBusiness', label: 'Elevate Business Image', recommendedSize: '800x600px' },
            { key: 'organicTraffic', label: 'Organic Traffic Image', recommendedSize: '800x600px' },
            { key: 'analyzeWebsite', label: 'Analyze Website Image', recommendedSize: '800x600px' },
            { key: 'keywordResearch', label: 'Keyword Research Image', recommendedSize: '800x600px' },
            { key: 'onPage', label: 'On-Page SEO Image', recommendedSize: '800x600px' },
            { key: 'technical', label: 'Technical SEO Image', recommendedSize: '800x600px' },
            { key: 'offPage', label: 'Off-Page SEO Image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' }
        ]
    },
    'social-media-page-id': {
        title: 'Social Media Marketing Page',
        hasPricing: true,
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'whatIsSMM', label: 'What is SMM Image', recommendedSize: '800x600px' },
            { key: 'growBusiness', label: 'Grow Your Business Image', recommendedSize: '800x600px' },
            { key: 'whyMatters', label: 'Why SMM Matters Image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' }
        ]
    },
    'email-marketing-page-id': {
        title: 'Email Marketing Page',
        hasPricing: true,
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'growth', label: 'Growth Image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' },
            { key: 'features', label: 'Features Image', recommendedSize: '800x600px' },
            { key: 'campaigns', label: 'Campaigns Image', recommendedSize: '800x600px' },
            { key: 'copywriting', label: 'Copywriting Image', recommendedSize: '800x600px' },
            { key: 'results', label: 'Results-Driven Image', recommendedSize: '800x600px' }
        ]
    },
    'content-writing-page-id': {
        title: 'Content Writing Service Page',
        hasPricing: true,
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'coreStrategy', label: 'Core Strategy Image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' },
            { key: 'process', label: 'Process Image', recommendedSize: '800x600px' },
            { key: 'results', label: 'Results Image', recommendedSize: '800x600px' }
        ]
    },

    'mobile-apps-page-id': {
        title: 'Mobile Apps Development Page',
        hasPricing: true,
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'appDevelopment', label: 'App Development Image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' },
            { key: 'expertServices', label: 'Expert Services Image', recommendedSize: '800x600px' },
            { key: 'crossPlatform', label: 'Cross-Platform Image', recommendedSize: '800x600px' }
        ]
    },
    'graphic-design-page-id': {
        title: 'Graphic Design Services Page',
        hasPricing: true,
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'transformBrand', label: 'Transform Brand Image', recommendedSize: '800x600px' },
            { key: 'creativeConsulting', label: 'Creative Consulting Image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' },
            { key: 'elevateBrand', label: 'Elevate Brand Image', recommendedSize: '800x600px' }
        ]
    },
    'video-editing-page-id': {
        title: 'Video Editing Services Page',
        hasPricing: true,
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'transformVideos', label: 'Transform Videos Image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' },
            { key: 'professionalService', label: 'Professional Service Image', recommendedSize: '800x600px' },
            { key: 'whyChooseVideo', label: 'Why Choose Video Image', recommendedSize: '800x600px' }
        ]
    },
    'voice-over-page-id': {
        title: 'Voice Over Services Page',
        hasPricing: true,
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'elevateContent', label: 'Elevate Content Image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' },
            { key: 'customizedVoiceOver', label: 'Customized Voice Over Image', recommendedSize: '800x600px' },
            { key: 'premium', label: 'Premium Voice Over Image', recommendedSize: '800x600px' }
        ]
    },
    'google-workspace-page-id': {
        title: 'Google Workspace Page',
        hasPricing: false, // No pricing table on this page
        images: [
            { key: 'hero', label: 'Hero Image', recommendedSize: '800x600px' },
            { key: 'businessNeeds', label: 'Business Needs Image', recommendedSize: '800x600px' },
            { key: 'whyChoose', label: 'Why Choose Us Image', recommendedSize: '800x600px' },
            { key: 'communication', label: 'Smart Communication Image', recommendedSize: '800x600px' },
            { key: 'productivity', label: 'Productivity Tools Image', recommendedSize: '800x600px' },
            { key: 'migration', label: 'Migration & Support Image', recommendedSize: '800x600px' }
        ]
    }
};

const SLUG_MAPPING: Record<string, string> = {
    '': 'home-page-id',
    'admin': 'ignore',
    'about-us': 'about-page-id',
    'services': 'services-page-id',
    'portfolio': 'portfolio-page-id',
    'contact-us': 'contact-page-id',
    'our-blogs': 'blog-page-id',
    'team': 'team-page-id',
    'testimonials': 'testimonials-page-id',
    'website-design-development': 'web-design-page-id',
    'business-website': 'business-website-page-id',
    'ecommerce-website': 'ecommerce-page-id',
    'business-software-services': 'software-page-id',
    'digital-marketing-services': 'digital-marketing-page-id',
    'seo-services': 'seo-services-page-id',
    'social-media-marketing': 'social-media-page-id',
    'email-marketing': 'email-marketing-page-id',
    'content-writing-service': 'content-writing-page-id',
    'mobile-apps-development': 'mobile-apps-page-id',
    'graphic-design-services': 'graphic-design-page-id',
    'video-editing-services': 'video-editing-page-id',
    'voice-over': 'voice-over-page-id',
    'google-workspace': 'google-workspace-page-id',
    'website-demos': 'website-demos-page-id'
};

const PageEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Media Library State
    const [showMediaModal, setShowMediaModal] = useState(false);
    const [activeKey, setActiveKey] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        seo: {}
    });

    // Structured content: { key: { imgUrl: "..." } }
    const [structuredContent, setStructuredContent] = useState<Record<string, any>>({});

    useEffect(() => {
        fetchPage();
    }, [id]);

    const getConfigKey = (slug: string) => {
        return SLUG_MAPPING[slug] || null;
    };

    const fetchPage = async () => {
        try {
            const res = await fetch(`${API_URL}/pages/${id}`);
            if (res.ok) {
                const data = await res.json();
                setFormData({
                    title: data.title || '',
                    slug: data.slug || '', // Normalize empty to empty string
                    content: data.content || '',
                    seo: data.seo || {}
                });

                const configKey = getConfigKey(data.slug || '');
                if (configKey && PAGE_IMAGE_CONFIG[configKey]) {
                    try {
                        const parsed = data.content ? (typeof data.content === 'string' ? JSON.parse(data.content) : data.content) : {};
                        setStructuredContent(parsed);
                    } catch (e) {
                        setStructuredContent({});
                    }
                }
            }
        } catch (err) {
            console.error('Error fetching page:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSaving(true);

        let contentToSave = formData.content;

        const configKey = getConfigKey(formData.slug);
        if (configKey && PAGE_IMAGE_CONFIG[configKey]) {
            contentToSave = JSON.stringify(structuredContent);
        }

        try {
            const res = await fetchWithAuth(`/pages/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...formData,
                    content: contentToSave
                })
            });

            if (!res.ok) {
                const text = await res.text();
                console.error('Save error:', res.status, text);
                alert(`Failed to save! Status: ${res.status}\nResponse: ${text.substring(0, 100)}`);
                setSaving(false);
                return;
            }

            alert('Saved successfully!');
        } catch (err: any) {
            console.error(err);
            alert(`Exception during save: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleImageSelect = (url: string) => {
        if (!activeKey) return;

        setStructuredContent(prev => ({
            ...prev,
            [activeKey]: {
                ...prev[activeKey],
                imgUrl: url
            }
        }));
        setShowMediaModal(false);
        setActiveKey(null);
    };

    const configKey = getConfigKey(formData.slug);
    const isStructuredPage = configKey && PAGE_IMAGE_CONFIG[configKey];

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/admin/pages" className="p-2 hover:bg-slate-100 rounded-lg">
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Edit Page: {formData.title}</h1>
                        <p className="text-sm text-slate-500">/{formData.slug}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleSave()}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                    >
                        <Save className="w-5 h-4" />
                        <span>{saving ? 'Saving...' : 'Save Page'}</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Page Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">URL Slug</label>
                        <div className="flex items-center">
                            <span className="text-slate-400 bg-slate-50 border border-r-0 border-slate-200 rounded-l-lg px-3 py-2 text-sm">/</span>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-r-lg focus:ring-2 focus:ring-cyan-500 outline-none font-mono text-sm text-slate-600"
                            />
                        </div>
                    </div>

                    {isStructuredPage ? (
                        <div className="mt-6 border-t border-slate-100 pt-6">
                            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-cyan-500" />
                                Page Images: {PAGE_IMAGE_CONFIG[configKey!].title}
                            </h2>
                            <p className="text-sm text-slate-500 mb-6">Manage the images displayed on this page.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {PAGE_IMAGE_CONFIG[configKey!].images.map((field) => {
                                    const currentVal = structuredContent[field.key]?.imgUrl;
                                    const previewUrl = currentVal ? (currentVal.startsWith('http') ? currentVal : `${UPLOAD_URL}${currentVal}`) : null;

                                    return (
                                        <div key={field.key} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700">
                                                        {field.label}
                                                        {field.recommendedSize && (
                                                            <span className="ml-2 text-xs font-mono bg-cyan-50 text-cyan-600 px-2 py-0.5 rounded border border-cyan-100">
                                                                {field.recommendedSize}
                                                            </span>
                                                        )}
                                                    </label>
                                                    {field.description && <p className="text-xs text-slate-500 mt-1">{field.description}</p>}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setActiveKey(field.key);
                                                        setShowMediaModal(true);
                                                    }}
                                                    className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors text-xs font-bold border border-cyan-200"
                                                >
                                                    Change Image
                                                </button>
                                            </div>

                                            <div
                                                className="relative aspect-video bg-white rounded-lg border border-slate-300 overflow-hidden flex items-center justify-center cursor-pointer group"
                                                onClick={() => {
                                                    setActiveKey(field.key);
                                                    setShowMediaModal(true);
                                                }}
                                            >
                                                {previewUrl ? (
                                                    <>
                                                        <img src={previewUrl} alt={field.label} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <Upload className="w-8 h-8 text-white" />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center text-slate-400">
                                                        <ImageIcon className="w-8 h-8 mb-2" />
                                                        <span className="text-xs">No Image Selected</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-2 text-xs text-slate-400 truncate font-mono">
                                                {currentVal || 'No file selected'}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Page Content</label>
                            <TextEditor
                                value={formData.content}
                                onChange={(content) => setFormData({ ...formData, content })}
                            />
                        </div>
                    )}

                    {isStructuredPage && PAGE_IMAGE_CONFIG[configKey!].hasPricing && (
                        <div className="mt-6 border-t border-slate-100 pt-6">
                            <PricingEditor
                                value={structuredContent.pricing || []}
                                onChange={(newPricing) => {
                                    setStructuredContent(prev => ({
                                        ...prev,
                                        pricing: newPricing
                                    }));
                                }}
                            />
                        </div>
                    )}

                </div>

                <div className="pt-6 border-t border-slate-100">
                    <SeoSettingsForm
                        data={formData.seo}
                        onChange={(seo) => setFormData({ ...formData, seo })}
                    />
                </div>
            </div>

            <MediaLibraryModal
                isOpen={showMediaModal}
                onClose={() => setShowMediaModal(false)}
                onSelect={handleImageSelect}
            />
        </div >
    );
};

export default PageEditor;
