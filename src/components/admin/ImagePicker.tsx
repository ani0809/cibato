import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { API_URL, UPLOAD_URL } from '../../utils/api';
import MediaLibraryModal from './MediaLibraryModal';

interface ImagePickerProps {
    label: string;
    value?: string;
    onChange: (url: string) => void;
    helperText?: string;
    previewHeight?: string; // height class, e.g. "h-40"
}

const ImagePicker = ({ label, value, onChange, helperText, previewHeight = "h-40" }: ImagePickerProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const displayUrl = value?.startsWith('http') ? value : (value ? `${UPLOAD_URL}${value}` : null);

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">{label}</label>

            {/* Preview Area */}
            {displayUrl && (
                <div className={`relative ${previewHeight} bg-slate-100 border border-slate-200 rounded-xl p-2 flex items-center justify-center group overflow-hidden`}>
                    <img
                        src={displayUrl}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                    />
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        title="Remove Image"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Actions */}
            <div>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full flex items-center justify-center px-4 py-8 border-2 border-dashed border-slate-300 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition-all group gap-2"
                >
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                    <span className="text-sm text-slate-500 group-hover:text-cyan-600 transition-colors font-medium">
                        Upload Image
                    </span>
                </button>
            </div>

            {helperText && <p className="text-xs text-slate-500">{helperText}</p>}

            {/* Media Library Modal */}
            <MediaLibraryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={(url) => {
                    // Start relative path if host matches
                    // But usually we just store what we get. 
                    // The MediaModal returns full URLs if we coded it that way, let's fix MediaModal to return relative if possible or handle it here.
                    // MediaModal returns what we set in setSelectedUrl.
                    // Let's ensure consistency across the app. most app uses /uploads/filename.

                    // The modal currently constructs full URL for display.
                    // Let's make sure onSelect returns the format we want.
                    // Actually, let's parse it here.
                    let cleanUrl = url;
                    if (url.includes('localhost:8000')) {
                        cleanUrl = url.replace('http://localhost:8000', '');
                    }
                    onChange(cleanUrl);
                }}
            />
        </div>
    );
};

export default ImagePicker;
