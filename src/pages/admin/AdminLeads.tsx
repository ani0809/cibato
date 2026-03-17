import React, { useState, useEffect } from 'react';
import { Mail, Search, Trash2, Expand, Download, X, Phone, Tag } from 'lucide-react';
import { API_URL } from '../../utils/api';

const AdminLeads = () => {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLead, setSelectedLead] = useState<any | null>(null);
    const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

    useEffect(() => {
        fetchLeads();
    }, []);

    // ... fetchLeads ... (omitted for brevity, will match existing)

    const handleBulkDelete = async () => {
        if (selectedLeads.length === 0) return;
        if (!window.confirm(`Are you sure you want to delete ${selectedLeads.length} leads?`)) return;

        try {
            // Delete sequentially or parallel
            await Promise.all(selectedLeads.map(id => fetch(`${API_URL}/leads/${id}`, { method: 'DELETE' })));

            setLeads(prev => prev.filter(l => !selectedLeads.includes(l.id)));
            setSelectedLeads([]);
            if (selectedLead && selectedLeads.includes(selectedLead.id)) setSelectedLead(null);
        } catch (error) {
            console.error("Failed to bulk delete", error);
            alert("Failed to delete some items");
        }
    };

    const toggleSelectAll = () => {
        if (selectedLeads.length === filteredLeads.length) {
            setSelectedLeads([]);
        } else {
            setSelectedLeads(filteredLeads.map(l => l.id));
        }
    };

    const toggleSelectLead = (id: string) => {
        if (selectedLeads.includes(id)) {
            setSelectedLeads(prev => prev.filter(l => l !== id));
        } else {
            setSelectedLeads(prev => [...prev, id]);
        }
    };

    const fetchLeads = async () => {
        try {
            const res = await fetch(`${API_URL}/leads`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setLeads(data);
            }
        } catch (error) {
            console.error("Failed to fetch leads", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this lead?")) return;

        try {
            await fetch(`${API_URL}/leads/${id}`, { method: 'DELETE' });
            setLeads(leads.filter(l => l.id !== id));
            if (selectedLead?.id === id) setSelectedLead(null);
        } catch (error) {
            console.error("Failed to delete lead", error);
        }
    };

    const handleExport = () => {
        const headers = ["Name", "Email", "Phone", "Service", "Message", "Date"];
        const csvContent = [
            headers.join(','),
            ...leads.map(lead => [
                `"${lead.name}"`,
                `"${lead.email}"`,
                `"${lead.phone || ''}"`,
                `"${lead.service}"`,
                `"${lead.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`, // Escape specific chars
                `"${new Date(lead.createdAt).toLocaleString()}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.click();
    };

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.service.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Leads & Inquiries</h1>
                    <p className="text-slate-500 text-lg">Manage messages from your contact forms.</p>
                </div>
                <div className="flex gap-2">
                    {selectedLeads.length > 0 && (
                        <button
                            onClick={handleBulkDelete}
                            className="flex items-center gap-2 px-5 py-2.5 bg-red-50 border border-red-100 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-all shadow-sm"
                        >
                            <Trash2 className="w-5 h-5" />
                            Delete ({selectedLeads.length})
                        </button>
                    )}
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:text-cyan-600 transition-all shadow-sm"
                    >
                        <Download className="w-5 h-5" />
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_2px_20px_0_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
                {/* Toolbar */}
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                        />
                    </div>
                    <div className="text-sm font-semibold text-slate-500">
                        Total Leads: <span className="text-slate-900">{filteredLeads.length}</span>
                    </div>
                </div>

                {/* List */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4 w-12">
                                    <input
                                        type="checkbox"
                                        checked={filteredLeads.length > 0 && selectedLeads.length === filteredLeads.length}
                                        onChange={toggleSelectAll}
                                        className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                                    />
                                </th>
                                <th className="px-6 py-4 w-12">#</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Service</th>
                                <th className="px-6 py-4">Message Preview</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        Loading leads...
                                    </td>
                                </tr>
                            ) : filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No leads found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map((lead, index) => (
                                    <tr
                                        key={lead.id}
                                        onClick={() => setSelectedLead(lead)}
                                        className={`group transition-colors cursor-pointer ${selectedLeads.includes(lead.id) ? 'bg-cyan-50' : 'hover:bg-cyan-50/30'}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                checked={selectedLeads.includes(lead.id)}
                                                onChange={() => toggleSelectLead(lead.id)}
                                                className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 font-mono">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                            <div className="text-xs text-slate-400">{new Date(lead.createdAt).toLocaleTimeString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-bold text-slate-900">{lead.name}</div>
                                            <div className="text-sm text-slate-500">{lead.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {lead.service}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 relative max-w-xs">
                                            <div className="truncate text-slate-600 font-medium text-sm">
                                                {lead.message}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}
                                                    className="p-2 text-cyan-600 hover:bg-cyan-100 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Expand className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(lead.id, e)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
                    <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 animate-scale-in" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedLead(null)}
                            className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">{selectedLead.name}</h2>
                                <p className="text-slate-500 text-sm">Submitted on {new Date(selectedLead.createdAt).toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</div>
                                    <a href={`mailto:${selectedLead.email}`} className="text-cyan-600 hover:underline font-medium">{selectedLead.email}</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</div>
                                    <div className="text-slate-900 font-medium">{selectedLead.phone || 'N/A'}</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Tag className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Service Interest</div>
                                    <div className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 rounded-lg text-sm font-semibold">
                                        {selectedLead.service}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Message</div>
                            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 leading-relaxed border border-slate-100">
                                {selectedLead.message}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Close
                            </button>
                            <a
                                href={`mailto:${selectedLead.email}`}
                                className="px-5 py-2.5 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Reply via Email
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLeads;
