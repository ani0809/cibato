import { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Edit, Globe, FileText, RotateCcw, AlertOctagon } from 'lucide-react';
import { API_URL, fetchWithAuth } from '../../utils/api';

const AdminPages = () => {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'active' | 'trash'>('active');

    useEffect(() => {
        // Reset selection and page on mode switch
        setSelectedIds([]);
        setCurrentPage(1);
        fetchPages();
    }, [viewMode]);

    const fetchPages = async () => {
        setLoading(true);
        try {
            const endpoint = viewMode === 'active' ? '/pages' : '/pages/trash';
            const res = await fetchWithAuth(endpoint); // Use fetchWithAuth for both now (consistent)
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    setPages(data);
                } else {
                    console.error("API returned non-array:", data);
                    setPages([]);
                }
            }
        } catch (err) {
            console.error(err);
            setPages([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, updateState = true) => {
        if (viewMode === 'active') {
            // Soft Delete
            if (updateState && !window.confirm('Are you sure you want to move this page to trash?')) return;
            try {
                await fetchWithAuth(`/pages/${id}`, { method: 'DELETE' });
                if (updateState) fetchPages();
            } catch (err) {
                console.error(err);
                alert('Failed to delete page');
            }
        } else {
            // Force Delete
            if (updateState && !window.confirm('Are you sure you want to PERMANENTLY delete this page? This action cannot be undone.')) return;
            try {
                await fetchWithAuth(`/pages/${id}/force`, { method: 'DELETE' });
                if (updateState) fetchPages();
            } catch (err) {
                console.error(err);
                alert('Failed to permanently delete page');
            }
        }
    };

    const handleRestore = async (id: string, updateState = true) => {
        try {
            await fetchWithAuth(`/pages/${id}/restore`, { method: 'POST' });
            if (updateState) fetchPages();
        } catch (err) {
            console.error(err);
            alert('Failed to restore page');
        }
    }

    const handleBulkAction = async (action: 'delete' | 'restore') => {
        const count = selectedIds.length;
        if (count === 0) return;

        let confirmMsg = '';
        if (action === 'delete') {
            confirmMsg = viewMode === 'active'
                ? `Are you sure you want to move ${count} pages to trash?`
                : `Are you sure you want to PERMANENTLY delete ${count} pages? Undone!`;
        } else {
            confirmMsg = `Are you sure you want to restore ${count} pages?`;
        }

        if (!window.confirm(confirmMsg)) return;

        // Execute sequentially
        for (const id of selectedIds) {
            if (action === 'delete') {
                await handleDelete(id, false);
            } else if (action === 'restore') {
                await handleRestore(id, false);
            }
        }

        setSelectedIds([]);
        fetchPages();
    };

    const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(pages.map(p => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(itemId => itemId !== id));
        } else {
            setSelectedIds(prev => [...prev, id]);
        }
    };

    const handleCreate = async () => {
        const title = window.prompt('Enter Page Title:');
        if (!title) return;

        try {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const res = await fetchWithAuth(`/pages`, {
                method: 'POST',
                body: JSON.stringify({ title, slug })
            });

            if (res.ok) {
                if (viewMode === 'trash') setViewMode('active'); // Switch to active to see new page
                else fetchPages();
            } else {
                alert('Failed to create page (Slug might exist)');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const safePages = Array.isArray(pages) ? pages : [];
    const totalPages = Math.ceil(safePages.length / itemsPerPage);
    const paginatedPages = safePages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Pages</h1>
                    <p className="text-slate-500 mt-1">Manage custom dynamic pages</p>
                </div>
                <div className="flex gap-3">
                    {selectedIds.length > 0 && (
                        <>
                            {viewMode === 'trash' && (
                                <button
                                    onClick={() => handleBulkAction('restore')}
                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    <span>Restore ({selectedIds.length})</span>
                                </button>
                            )}
                            <button
                                onClick={() => handleBulkAction('delete')}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
                            >
                                {viewMode === 'active' ? <Trash2 className="w-4 h-4" /> : <AlertOctagon className="w-4 h-4" />}
                                <span>{viewMode === 'active' ? 'Trash' : 'Delete Forever'} ({selectedIds.length})</span>
                            </button>
                        </>
                    )}
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-6 py-2 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                        <Plus className="w-5 h-5" /> Create New Page
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-slate-200">
                <button
                    onClick={() => setViewMode('active')}
                    className={`pb-3 px-1 font-bold text-sm transition-colors relative ${viewMode === 'active' ? 'text-cyan-500' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Active Pages
                    {viewMode === 'active' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 rounded-full" />
                    )}
                </button>
                <button
                    onClick={() => setViewMode('trash')}
                    className={`pb-3 px-1 font-bold text-sm transition-colors relative ${viewMode === 'trash' ? 'text-red-500' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Trash Bin
                    {viewMode === 'trash' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full" />
                    )}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
                {loading ? (
                    <div className="p-12 text-center text-slate-400">Loading...</div>
                ) : (
                    <div className="flex-1">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 w-12">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                                            checked={pages.length > 0 && selectedIds.length === pages.length}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th className="px-6 py-4 font-bold text-slate-700">Title</th>
                                    <th className="px-6 py-4 font-bold text-slate-700">URL Slug</th>
                                    <th className="px-6 py-4 font-bold text-slate-700">
                                        {viewMode === 'active' ? 'Last Updated' : 'Deleted At'}
                                    </th>
                                    <th className="px-6 py-4 font-bold text-slate-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paginatedPages.map(page => (
                                    <tr key={page.id} className={`hover:bg-slate-50 ${selectedIds.includes(page.id) ? 'bg-cyan-50/30' : ''}`}>
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                                                checked={selectedIds.includes(page.id)}
                                                onChange={() => handleSelectOne(page.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${viewMode === 'active' ? 'bg-cyan-50 text-cyan-600' : 'bg-red-50 text-red-500'}`}>
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <span className={`font-bold ${viewMode === 'active' ? 'text-slate-900' : 'text-slate-500 line-through'}`}>
                                                    {page.title}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-mono">
                                                /{page.slug}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 text-sm">
                                            {(() => {
                                                try {
                                                    const dateStr = viewMode === 'active' ? page.updatedAt : page.deletedAt;
                                                    const d = dateStr ? new Date(dateStr) : new Date();
                                                    return isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString();
                                                } catch (e) { return 'N/A'; }
                                            })()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {viewMode === 'active' ? (
                                                    <>
                                                        <Link
                                                            to={`/${page.slug}`}
                                                            target="_blank"
                                                            className="p-2 text-slate-400 hover:text-cyan-600 transition-colors"
                                                            title="View Page"
                                                        >
                                                            <Globe className="w-4 h-4" />
                                                        </Link>
                                                        <Link
                                                            to={`/admin/pages/edit/${page.id}`}
                                                            className="p-2 text-slate-400 hover:text-amber-500 transition-colors"
                                                            title="Edit Page"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(page.id)}
                                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                                            title="Move to Trash"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleRestore(page.id)}
                                                            className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"
                                                            title="Restore Page"
                                                        >
                                                            <RotateCcw className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(page.id)}
                                                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                                            title="Delete Permanently"
                                                        >
                                                            <AlertOctagon className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {pages.length === 0 && (
                            <div className="p-12 text-center text-slate-400">
                                {viewMode === 'active'
                                    ? "No pages found. Create one to get started!"
                                    : "Trash is empty."
                                }
                            </div>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-slate-200 flex justify-between items-center bg-slate-50">
                        <div className="text-sm text-slate-500">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, pages.length)} of {pages.length} pages
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPages;
