import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, ExternalLink, ChevronLeft, ChevronRight, CheckSquare, Square, RotateCcw, AlertOctagon } from 'lucide-react';
import { API_URL, fetchWithAuth } from '../../utils/api';

const AdminPortfolios = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const [viewMode, setViewMode] = useState<'active' | 'trash'>('active');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    // Bulk Selection State
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        // Reset selection and page on mode switch
        setSelectedIds([]);
        setCurrentPage(1);
        loadProjects();
    }, [viewMode]);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const endpoint = viewMode === 'active' ? '/portfolios' : '/portfolios/trash';
            const res = await fetchWithAuth(endpoint);
            if (res.ok) {
                const data = await res.json();
                const sortedData = (Array.isArray(data) ? data : [])
                    .sort((a: any, b: any) => new Date(b.createdAt || b.updated_at).getTime() - new Date(a.createdAt || a.updated_at).getTime());
                setProjects(sortedData);
            } else {
                setProjects([]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, updateState = true) => {
        if (viewMode === 'active') {
            if (updateState && !confirm('Are you sure you want to move this project to trash?')) return;
            await deleteProjectApi(id, updateState, false);
        } else {
            if (updateState && !confirm('Are you sure you want to PERMANENTLY delete this project?')) return;
            await deleteProjectApi(id, updateState, true);
        }
    };

    const handleRestore = async (id: string, updateState = true) => {
        try {
            await fetchWithAuth(`/portfolios/${id}/restore`, { method: 'POST' });
            if (updateState) loadProjects();
        } catch (err) {
            console.error(err);
            alert('Failed to restore project');
        }
    };

    const handleBulkAction = async (action: 'delete' | 'restore') => {
        const count = selectedIds.length;
        if (count === 0) return;

        let confirmMsg = '';
        if (action === 'delete') {
            confirmMsg = viewMode === 'active'
                ? `Are you sure you want to move ${count} projects to trash?`
                : `Are you sure you want to PERMANENTLY delete ${count} projects? Undone!`;
        } else {
            confirmMsg = `Are you sure you want to restore ${count} projects?`;
        }

        if (!window.confirm(confirmMsg)) return;

        for (const id of selectedIds) {
            if (action === 'delete') {
                await handleDelete(id, false);
            } else if (action === 'restore') {
                await handleRestore(id, false);
            }
        }

        setSelectedIds([]);
        loadProjects();
    };

    const deleteProjectApi = async (id: string, updateState = true, force = false) => {
        try {
            const endpoint = force ? `/portfolios/${id}/force` : `/portfolios/${id}`;
            await fetchWithAuth(endpoint, { method: 'DELETE' });
            if (updateState) {
                setProjects(prev => prev.filter(p => p.id !== id));
                setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
            }
        } catch (error) {
            console.error('Failed to delete', id, error);
            alert('Failed to delete project');
        }
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            // Select all visible items (or all existing? usually visible or all)
            // Let's select ALL matching the search filter for better UX in bulk actions
            const allIds = filteredProjects.map(p => p.id);
            setSelectedIds(allIds);
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

    // Filter Logic
    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.client && p.client.toLowerCase().includes(search.toLowerCase()))
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Reset pagination when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-slate-200">
                <button
                    onClick={() => setViewMode('active')}
                    className={`pb-3 px-1 font-bold text-sm transition-colors relative ${viewMode === 'active' ? 'text-cyan-500' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Active Projects
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

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-800">
                    {viewMode === 'active' ? 'Portfolio Projects' : 'Trash Bin'}
                    <span className="ml-3 text-sm font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        {filteredProjects.length} Total
                    </span>
                </h1>

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
                    {viewMode === 'active' && (
                        <Link
                            to="/admin/portfolio/new"
                            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors shadow-sm hover:shadow"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Project</span>
                        </Link>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Search & Toolbar */}
                <div className="p-4 border-b border-slate-200 flex justify-between items-center gap-4">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by title or client..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-sm font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-12">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                                        checked={filteredProjects.length > 0 && selectedIds.length === filteredProjects.length}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {loading ? (
                                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
                            ) : filteredProjects.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">No projects found</td></tr>
                            ) : (
                                currentItems.map(project => (
                                    <tr
                                        key={project.id}
                                        className={`hover:bg-slate-50 transition-colors ${selectedIds.includes(project.id) ? 'bg-cyan-50/30' : ''}`}
                                    >
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                                                checked={selectedIds.includes(project.id)}
                                                onChange={() => handleSelectOne(project.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900">{project.title}</div>
                                            {project.slug && <div className="text-xs text-slate-400">/{project.slug}</div>}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{project.client || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">

                                            {viewMode === 'active' ? (
                                                <>
                                                    <Link
                                                        to={`/portfolio/${project.id}`}
                                                        target="_blank"
                                                        className="inline-flex p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                                                        title="View Live"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        to={`/admin/portfolio/edit/${project.id}`}
                                                        className="inline-flex p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
                                                        className="inline-flex p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Move to Trash"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleRestore(project.id)}
                                                        className="inline-flex p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                        title="Restore"
                                                    >
                                                        <RotateCcw className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
                                                        className="inline-flex p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Permanently"
                                                    >
                                                        <AlertOctagon className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                {filteredProjects.length > 0 && (
                    <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                        <div className="text-sm text-slate-500">
                            Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredProjects.length)}</span> of <span className="font-medium">{filteredProjects.length}</span> results
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-slate-600" />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === number
                                        ? 'bg-cyan-500 text-white shadow-sm'
                                        : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    {number}
                                </button>
                            ))}

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-4 h-4 text-slate-600" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPortfolios;
