import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical, Check } from 'lucide-react';

interface PricingTier {
    name: string;
    price: string;
    originalPrice?: string;
    currency: string; // '$' or '৳' or 'BDT'
    period?: string; // e.g. /month, /year, one-time
    badge?: string; // e.g. SALE, POPULAR
    features: string[];
    buttonText: string;
    buttonLink?: string;
    footerText?: string;
}

interface PricingEditorProps {
    value: PricingTier[];
    onChange: (value: PricingTier[]) => void;
}

const PricingEditor = ({ value = [], onChange }: PricingEditorProps) => {
    // Ensure value is always an array
    const tiers = Array.isArray(value) ? value : [];

    const addTier = () => {
        onChange([
            ...tiers,
            {
                name: 'New Package',
                price: '99',
                originalPrice: '',
                currency: '$',
                features: ['Feature 1', 'Feature 2'],
                buttonText: 'Get Started'
            }
        ]);
    };

    const updateTier = (index: number, updates: Partial<PricingTier>) => {
        const newTiers = [...tiers];
        newTiers[index] = { ...newTiers[index], ...updates };
        onChange(newTiers);
    };

    const removeTier = (index: number) => {
        if (confirm('Are you sure you want to remove this package?')) {
            const newTiers = tiers.filter((_, i) => i !== index);
            onChange(newTiers);
        }
    };

    const addFeature = (tierIndex: number) => {
        const newTiers = [...tiers];
        newTiers[tierIndex].features.push('New Feature');
        onChange(newTiers);
    };

    const updateFeature = (tierIndex: number, featureIndex: number, text: string) => {
        const newTiers = [...tiers];
        newTiers[tierIndex].features[featureIndex] = text;
        onChange(newTiers);
    };

    const removeFeature = (tierIndex: number, featureIndex: number) => {
        const newTiers = [...tiers];
        newTiers[tierIndex].features = newTiers[tierIndex].features.filter((_, i) => i !== featureIndex);
        onChange(newTiers);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">Pricing Packages</h3>
                <button
                    onClick={addTier}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-600 rounded-lg hover:bg-cyan-100 transition-colors font-bold text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Package
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {tiers.map((tier, index) => (
                    <div key={index} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                        {/* Header */}
                        <div className="bg-white p-4 border-b border-slate-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 rounded text-slate-400 cursor-move">
                                    <GripVertical className="w-4 h-4" />
                                </div>
                                <span className="font-bold text-slate-700">Package {index + 1}</span>
                            </div>
                            <button
                                onClick={() => removeTier(index)}
                                className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Package Name</label>
                                    <input
                                        type="text"
                                        value={tier.name}
                                        onChange={(e) => updateTier(index, { name: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                                        placeholder="e.g. Starter Package"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Price</label>
                                        <div className="flex">
                                            <select
                                                value={tier.currency}
                                                onChange={(e) => updateTier(index, { currency: e.target.value })}
                                                className="bg-slate-100 border border-slate-200 border-r-0 rounded-l-lg px-2 py-2 text-slate-700 text-sm focus:ring-2 focus:ring-cyan-500 outline-none cursor-pointer"
                                            >
                                                <option value="$">$</option>
                                                <option value="৳">৳</option>
                                                <option value="£">£</option>
                                                <option value="€">€</option>
                                            </select>
                                            <input
                                                type="text"
                                                value={tier.price}
                                                onChange={(e) => updateTier(index, { price: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-r-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Orig. Price (Optional)</label>
                                        <div className="flex">
                                            <select
                                                value={tier.currency}
                                                onChange={(e) => updateTier(index, { currency: e.target.value })}
                                                className="bg-slate-100 border border-slate-200 border-r-0 rounded-l-lg px-2 py-2 text-slate-700 text-sm focus:ring-2 focus:ring-cyan-500 outline-none cursor-pointer"
                                            >
                                                <option value="$">$</option>
                                                <option value="৳">৳</option>
                                                <option value="£">£</option>
                                                <option value="€">€</option>
                                            </select>
                                            <input
                                                type="text"
                                                value={tier.originalPrice || ''}
                                                onChange={(e) => updateTier(index, { originalPrice: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-r-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Badge Label (Optional)</label>
                                    <input
                                        type="text"
                                        value={tier.badge || ''}
                                        onChange={(e) => updateTier(index, { badge: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                                        placeholder="e.g. SALE"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Button Text</label>
                                    <input
                                        type="text"
                                        value={tier.buttonText}
                                        onChange={(e) => updateTier(index, { buttonText: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Button Link (Optional)</label>
                                    <input
                                        type="text"
                                        value={tier.buttonLink || ''}
                                        onChange={(e) => updateTier(index, { buttonLink: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                                        placeholder="e.g. /contact or https://example.com"
                                    />
                                </div>
                            </div>

                            <div className="border border-slate-200 rounded-xl p-4 bg-white">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-3 flex justify-between items-center">
                                    <span>Features List</span>
                                    <button onClick={() => addFeature(index)} className="text-cyan-600 text-xs hover:underline">+ Add Feature</button>
                                </label>
                                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                                    {tier.features.map((feature, fIndex) => (
                                        <div key={fIndex} className="flex gap-2">
                                            <div className="w-6 h-8 flex items-center justify-center text-slate-300">
                                                <Check className="w-4 h-4" />
                                            </div>
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => updateFeature(index, fIndex, e.target.value)}
                                                className="flex-1 px-2 py-1 text-sm border-b border-slate-200 focus:border-cyan-500 outline-none bg-transparent"
                                                placeholder="Feature description"
                                            />
                                            <button
                                                onClick={() => removeFeature(index, fIndex)}
                                                className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    {tier.features.length === 0 && (
                                        <div className="text-center py-4 text-xs text-slate-400 italic">
                                            No features added yet.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {tiers.length === 0 && (
                    <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-500 mb-4">No pricing packages added yet.</p>
                        <button
                            onClick={addTier}
                            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 font-bold text-sm hover:border-cyan-500 hover:text-cyan-500 transition-colors"
                        >
                            Create First Package
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PricingEditor;
