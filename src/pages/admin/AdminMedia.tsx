import { useState, useEffect, useMemo } from 'react';
import { Upload, Trash2, Copy, Check, Search, Image as ImageIcon, X, LayoutGrid, List as ListIcon, RefreshCw } from 'lucide-react';
import { API_URL, UPLOAD_URL, fetchWithAuth } from '../../utils/api';

const AdminMedia = () => {
    const [media, setMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');

    // UI States
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [bulkSelectMode, setBulkSelectMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [dateFilter, setDateFilter] = useState('all');

    // Modal State
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    useEffect(() => {
        loadMedia();
    }, []);

    const loadMedia = async () => {
        try {
            setLoading(true);
            // Add timestamp to prevent caching
            const res = await fetch(`${API_URL}/media?t=${Date.now()}`);
            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error('Server API not found (404). Please RESTART your server terminal.');
                }
                throw new Error(`Server error: ${res.status}`);
            }
            const data = await res.json();
            setMedia(Array.isArray(data) ? data : []);
        } catch (error: any) {
            console.error('Failed to load media', error);
            if (error.message?.includes('RESTART')) alert(error.message);
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

            if (!res.ok) {
                // fetchWithAuth handles 401, but for other errors:
                const errText = await res.text();
                throw new Error(errText || 'Upload failed');
            }

            // Wait a moment for file system to sync
            setTimeout(async () => {
                await loadMedia();
                setUploading(false);
                if (e.target) e.target.value = '';
            }, 500);

        } catch (error: any) {
            alert(`Upload Error: ${error.message}`);
            setUploading(false);
            if (e.target) e.target.value = '';
        }
    };

    const handleDelete = async (filename: string) => {
        if (!confirm('Permanently delete this file?')) return;
        await performDelete(filename);
    };

    const performDelete = async (filename: string) => {
        try {
            await fetchWithAuth(`/media/${filename}`, { method: 'DELETE' });
            setMedia(prev => prev.filter(m => m.name !== filename));
            if (selectedItem?.name === filename) setSelectedItem(null);
        } catch (error) {
            console.error('Failed to delete', filename);
            alert('Failed to delete file');
        }
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Delete ${selectedIds.length} items permanently?`)) return;
        for (const name of selectedIds) {
            await performDelete(name);
        }
        setSelectedIds([]);
        setBulkSelectMode(false);
    };

    const toggleSelection = (name: string) => {
        if (selectedIds.includes(name)) {
            setSelectedIds(prev => prev.filter(id => id !== name));
        } else {
            setSelectedIds(prev => [...prev, name]);
        }
    };

    // Helper to update metadata
    const updateMetadata = async (key: string, value: string) => {
        if (!selectedItem) return;

        // Optimistic update
        const updatedItem = { ...selectedItem, [key]: value };
        setSelectedItem(updatedItem);

        // Send FULL payload to prevent race conditions
        const payload = {
            alt: updatedItem.alt || '',
            title: updatedItem.title || '',
            dimensions: updatedItem.dimensions || ''
        };

        try {
            const res = await fetch(`${API_URL}/media/${selectedItem.name}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                // Update the main list so it persists after re-open
                setMedia((prev) => prev.map(m =>
                    m.name === selectedItem.name ? { ...m, ...payload } : m
                ));
            }
        } catch (error) {
            console.error('Failed to save metadata', error);
        }
    };

    // Derived Data
    const uniqueDates = useMemo(() => {
        const dates = new Set<string>();
        media.forEach(item => {
            if (!item.date) return;
            try {
                const d = new Date(item.date);
                if (!isNaN(d.getTime())) {
                    dates.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
                }
            } catch (e) {
                // ignore invalid dates
            }
        });
        return Array.from(dates).sort().reverse();
    }, [media]);

    const filteredMedia = media.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());

        let matchesDate = true;
        if (dateFilter !== 'all' && item.date) {
            try {
                const itemDateStr = new Date(item.date).toISOString().slice(0, 7); // YYYY-MM
                matchesDate = itemDateStr === dateFilter;
            } catch (e) {
                matchesDate = false;
            }
        }

        return matchesSearch && matchesDate;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-slate-800">Media Library</h1>
                    <button
                        onClick={loadMedia}
                        className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-slate-100 rounded-full transition-colors"
                        title="Refresh List"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>

                    <div className="relative">
                        <input
                            type="file"
                            id="media-upload-btn"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                        <label
                            htmlFor="media-upload-btn"
                            className={`inline-flex items-center px-3 py-1.5 border rounded text-sm font-medium transition-colors cursor-pointer ${uploading
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                : 'bg-white border-cyan-500 text-cyan-600 hover:bg-cyan-50'
                                }`}
                        >
                            {uploading ? (
                                <>
                                    <Upload className="w-4 h-4 mr-2 animate-bounce" />
                                    Uploading...
                                </>
                            ) : (
                                'Add Media File'
                            )}
                        </label>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-2 rounded-md shadow-sm border border-slate-200 flex flex-col md:flex-row gap-3 justify-between items-center text-sm">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex border border-slate-300 rounded overflow-hidden">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 ${viewMode === 'list' ? 'bg-slate-100 text-cyan-600' : 'text-slate-500 hover:text-slate-800'}`}
                            title="List View"
                        >
                            <ListIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 ${viewMode === 'grid' ? 'bg-slate-100 text-cyan-600' : 'text-slate-500 hover:text-slate-800'}`}
                            title="Grid View"
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="h-6 w-px bg-slate-300 hidden md:block"></div>

                    <select
                        className="border border-slate-300 rounded px-2 py-1.5 text-slate-600 focus:outline-none focus:border-cyan-500"
                        value={dateFilter}
                        onChange={e => setDateFilter(e.target.value)}
                    >
                        <option value="all">All dates</option>
                        {uniqueDates.map(date => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>

                    <button
                        onClick={() => {
                            setBulkSelectMode(!bulkSelectMode);
                            setSelectedIds([]);
                        }}
                        className={`px-3 py-1.5 border rounded transition-colors ${bulkSelectMode
                            ? 'bg-cyan-50 border-cyan-500 text-cyan-700'
                            : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        {bulkSelectMode ? 'Cancel Selection' : 'Bulk Select'}
                    </button>

                    {bulkSelectMode && selectedIds.length > 0 && (
                        <button
                            onClick={handleBulkDelete}
                            className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 transition-colors"
                        >
                            Delete Selected ({selectedIds.length})
                        </button>
                    )}
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search media..."
                        className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {loading && media.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">Loading media library...</div>
                ) : filteredMedia.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                        <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No media found.</p>
                        {search && <p className="text-sm text-slate-400 mt-1">Try changing your search terms</p>}
                    </div>
                ) : viewMode === 'grid' ? (
                    /* GRID VIEW */
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                        {filteredMedia.map((item) => {
                            const isSelected = selectedIds.includes(item.name);
                            return (
                                <div
                                    key={item.name}
                                    className={`relative aspect-square bg-slate-100 border cursor-pointer group rounded-sm overflow-hidden ${isSelected
                                        ? 'border-cyan-500 ring-2 ring-cyan-500 ring-offset-2 z-10'
                                        : 'border-slate-200 hover:border-cyan-400'
                                        }`}
                                    onClick={() => {
                                        if (bulkSelectMode) {
                                            toggleSelection(item.name);
                                        } else {
                                            setSelectedItem(item);
                                        }
                                    }}
                                >
                                    <img
                                        src={item.url.startsWith('http') ? item.url : `${UPLOAD_URL}${item.url}`}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />

                                    {bulkSelectMode && (
                                        <div className={`absolute top-2 right-2 w-6 h-6 border-2 rounded-sm flex items-center justify-center transition-colors shadow-sm ${isSelected ? 'bg-cyan-500 border-cyan-500' : 'bg-white/80 border-slate-400'
                                            }`}>
                                            {isSelected && <Check className="w-4 h-4 text-white" />}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* LIST VIEW */
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                                <tr>
                                    <th className="p-3 w-16">
                                        {bulkSelectMode && (
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.length === filteredMedia.length && filteredMedia.length > 0}
                                                onChange={(e) => {
                                                    if (e.target.checked) setSelectedIds(filteredMedia.map(m => m.name));
                                                    else setSelectedIds([]);
                                                }}
                                            />
                                        )}
                                    </th>
                                    <th className="p-3 w-20">Preview</th>
                                    <th className="p-3">File</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Size</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredMedia.map(item => (
                                    <tr key={item.name} className="hover:bg-slate-50">
                                        <td className="p-3">
                                            {bulkSelectMode && (
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(item.name)}
                                                    onChange={() => toggleSelection(item.name)}
                                                />
                                            )}
                                        </td>
                                        <td className="p-3">
                                            <div className="w-12 h-12 bg-slate-100 rounded border border-slate-200 overflow-hidden cursor-pointer" onClick={() => setSelectedItem(item)}>
                                                <img
                                                    src={item.url.startsWith('http') ? item.url : `${UPLOAD_URL}${item.url}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-3 font-medium text-slate-700 cursor-pointer hover:text-cyan-600" onClick={() => setSelectedItem(item)}>
                                            {item.name}
                                        </td>
                                        <td className="p-3 text-slate-500">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="p-3 text-slate-500">{(item.size / 1024).toFixed(0)} KB</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* DETAIL MODAL */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
                    <div className="bg-white w-full max-w-6xl h-[85vh] rounded-lg shadow-2xl flex overflow-hidden flex-col md:flex-row" onClick={e => e.stopPropagation()}>

                        {/* Image Preview (Left - Large) */}
                        <div className="flex-1 bg-slate-100 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-slate-200 overflow-auto relative min-h-[50%] md:min-h-0">
                            <img
                                src={selectedItem.url.startsWith('http') ? selectedItem.url : `${UPLOAD_URL}${selectedItem.url}`}
                                className="max-w-full max-h-full object-contain shadow-md"
                                onLoad={(e) => {
                                    // Capture natural dimensions if not already set
                                    if (!selectedItem.dimensions) {
                                        const img = e.target as HTMLImageElement;
                                        const dims = `${img.naturalWidth} by ${img.naturalHeight} pixels`;
                                        updateMetadata('dimensions', dims);
                                    }
                                }}
                            />
                            <button
                                onClick={() => setSelectedItem(null)} // Close modal
                                className="absolute top-4 left-4 p-2 bg-white/50 hover:bg-white rounded-full text-slate-600 md:hidden"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Details Sidebar (Right - WordPress Style) */}
                        <div className="w-full md:w-[350px] flex flex-col bg-slate-50 border-l border-slate-200 h-[50%] md:h-auto overflow-hidden">

                            {/* Header */}
                            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
                                <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Attachment Details</h3>
                                <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-red-500 rounded p-1 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-slate-300">

                                {/* Metadata Section */}
                                <div className="mb-6 space-y-1 text-xs text-slate-600 border-b border-slate-200 pb-4">
                                    <div className="flex">
                                        <span className="font-bold w-24">Uploaded on:</span>
                                        <span>{new Date(selectedItem.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-bold w-24">Uploaded by:</span>
                                        <span className="text-cyan-600">{selectedItem.uploadedBy || 'Admin'}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-bold w-24">File name:</span>
                                        <span className="break-all">{selectedItem.name}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-bold w-24">File type:</span>
                                        <span className="uppercase">{selectedItem.type?.replace('.', '') || 'IMAGE'}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-bold w-24">File size:</span>
                                        <span>{(selectedItem.size / 1024).toFixed(0)} KB</span>
                                    </div>
                                    <div className="flex">
                                        <span className="font-bold w-24">Dimensions:</span>
                                        <span>{selectedItem.dimensions || 'Calculating...'}</span>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="block text-xs font-semibold text-slate-500">Alternative Text</label>
                                        <input
                                            type="text"
                                            className="w-full text-xs px-2 py-1.5 border border-slate-300 rounded focus:border-cyan-500 focus:outline-none"
                                            value={selectedItem.alt || ''}
                                            onChange={(e) => setSelectedItem((prev: any) => ({ ...prev, alt: e.target.value }))}
                                            onBlur={(e) => updateMetadata('alt', e.target.value)}
                                            placeholder="Describe the purpose of the image"
                                        />
                                        <p className="text-[10px] text-slate-400">Used for screen readers and SEO.</p>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-xs font-semibold text-slate-500">Title</label>
                                        <input
                                            type="text"
                                            className="w-full text-xs px-2 py-1.5 border border-slate-300 rounded focus:border-cyan-500 focus:outline-none"
                                            value={selectedItem.title || ''}
                                            onChange={(e) => setSelectedItem((prev: any) => ({ ...prev, title: e.target.value }))}
                                            onBlur={(e) => updateMetadata('title', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-1 pt-2">
                                        <label className="block text-xs font-semibold text-slate-500">File URL</label>
                                        <div className="flex gap-2">
                                            <input
                                                readOnly
                                                value={selectedItem.url.startsWith('http') ? selectedItem.url : `${UPLOAD_URL}${selectedItem.url}`}
                                                className="w-full text-xs px-2 py-1.5 bg-slate-100 border border-slate-200 rounded text-slate-500 select-all font-mono focus:outline-none"
                                            />
                                            <button
                                                onClick={() => {
                                                    const url = selectedItem.url.startsWith('http') ? selectedItem.url : `${UPLOAD_URL}${selectedItem.url}`;
                                                    navigator.clipboard.writeText(url);
                                                    alert('URL copied to clipboard!');
                                                }}
                                                className="px-2 py-1 border border-slate-300 rounded hover:bg-white text-slate-600 text-xs whitespace-nowrap"
                                            >
                                                Copy URL
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-4 border-t border-slate-200 bg-white">
                                <a
                                    href={selectedItem.url.startsWith('http') ? selectedItem.url : `${UPLOAD_URL}${selectedItem.url}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-cyan-600 hover:underline mr-4"
                                >
                                    View media file
                                </a>
                                <span className="text-slate-300">|</span>
                                <button
                                    onClick={() => handleDelete(selectedItem.name)}
                                    className="text-xs text-red-600 hover:text-red-700 hover:underline ml-4"
                                >
                                    Delete permanently
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMedia;
