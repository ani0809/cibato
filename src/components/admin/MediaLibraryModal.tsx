import { useState, useEffect, useMemo } from 'react';
import { Search, Image as ImageIcon, X, Check, RefreshCw, Upload } from 'lucide-react';
import { UPLOAD_URL, fetchWithAuth } from '../../utils/api';

interface MediaLibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
}

const MediaLibraryModal = ({ isOpen, onClose, onSelect }: MediaLibraryModalProps) => {
    const [media, setMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadMedia();
            setSelectedUrl(null);
        }
    }, [isOpen]);

    const loadMedia = async () => {
        try {
            setLoading(true);
            const res = await fetchWithAuth(`/media?t=${Date.now()}`);
            if (res.ok) {
                const data = await res.json();
                setMedia(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error('Failed to load media', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        setUploading(true);
        const file = e.target.files[0];
        const form = new FormData();
        form.append('file', file);

        try {
            const res = await fetchWithAuth('/upload', {
                method: 'POST',
                body: form
            });

            if (res.ok) {
                // Refresh list after upload
                await loadMedia();
            }
        } catch (error) {
            console.error('Upload failed', error);
        } finally {
            setUploading(false);
            if (e.target) e.target.value = '';
        }
    };

    const filteredMedia = useMemo(() => {
        return media.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [media, search]);

    const handleConfirm = () => {
        if (selectedUrl) {
            onSelect(selectedUrl);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white w-full max-w-5xl h-[80vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
                    <h3 className="font-bold text-slate-800 text-lg">Select Media</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex gap-3 items-center">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search media..."
                            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="h-6 w-px bg-slate-300 mx-2"></div>

                    <div className="relative">
                        <input
                            type="file"
                            id="modal-upload-btn"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                        <label
                            htmlFor="modal-upload-btn"
                            className={`inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium transition-colors cursor-pointer ${uploading
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                : 'bg-white border-cyan-500 text-cyan-600 hover:bg-cyan-50 shadow-sm'
                                }`}
                        >
                            {uploading ? (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload New
                                </>
                            )}
                        </label>
                    </div>

                    <button
                        onClick={loadMedia}
                        className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-white rounded border border-transparent hover:border-slate-200"
                        title="Refresh"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-4 bg-slate-100">
                    {loading && media.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-slate-400">
                            <RefreshCw className="w-6 h-6 animate-spin mr-2" /> Loading...
                        </div>
                    ) : filteredMedia.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                            <p>No images found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {filteredMedia.map((item) => {
                                const fullUrl = item.url.startsWith('http') ? item.url : `${UPLOAD_URL}${item.url}`;
                                const isSelected = selectedUrl === fullUrl;

                                return (
                                    <div
                                        key={item.name}
                                        onClick={() => setSelectedUrl(fullUrl)}
                                        className={`relative aspect-square group cursor-pointer bg-white rounded-lg overflow-hidden border-2 transition-all ${isSelected ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-transparent hover:border-slate-300'
                                            }`}
                                    >
                                        <img
                                            src={fullUrl}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 bg-cyan-500 text-white p-1 rounded-full shadow-md z-10">
                                                <Check className="w-3 h-3" />
                                            </div>
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 bg-black/50 p-1 text-[10px] text-white truncate opacity-0 group-hover:opacity-100 transition-opacity">
                                            {item.name}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 bg-white flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedUrl}
                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Select Image
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MediaLibraryModal;
