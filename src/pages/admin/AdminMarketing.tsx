import { useState, useEffect } from 'react';
import { Mail, Send, Users, CheckSquare, Square, RefreshCw, Plus, Upload, Trash2, Filter, X } from 'lucide-react';
import { fetchWithAuth } from '../../utils/api';
import AdminLayout from './AdminLayout';

interface Contact {
    id?: string;
    name: string;
    email: string;
    category: string;
    source: 'lead' | 'manual' | 'imported' | 'imported_file';
}

const CATEGORIES = [
    'General',
    'Web Development',
    'App Development',
    'SEO & Marketing',
    'Content Writing',
    'Graphic Design',
    'Business Software',
    'Consultancy'
];

const AdminMarketing = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

    // Filters
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Campaign State
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [importing, setImporting] = useState(false);
    const [sendResult, setSendResult] = useState<{ success: number; failed: number } | null>(null);

    // Manual Add State
    const [manualName, setManualName] = useState('');
    const [manualEmail, setManualEmail] = useState('');
    const [manualCategory, setManualCategory] = useState('General');

    // Import Modal State
    const [showImportModal, setShowImportModal] = useState(false);
    const [importType, setImportType] = useState<'leads' | 'file'>('leads');
    const [importFile, setImportFile] = useState<File | null>(null);
    const [importCategory, setImportCategory] = useState('General');

    useEffect(() => {
        fetchContacts();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredContacts(contacts);
        } else {
            setFilteredContacts(contacts.filter(c => c.category === selectedCategory));
        }
        // Clear selection when filter changes to avoid confusion
        setSelectedContacts([]);
    }, [selectedCategory, contacts]);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth('/marketing/contacts');
            if (res.ok) {
                const data = await res.json();
                setContacts(data);
            }
        } catch (error) {
            console.error('Failed to fetch contacts', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImportSubmit = async () => {
        setImporting(true);
        try {
            if (importType === 'leads') {
                // Internal Lead Import
                const res = await fetchWithAuth('/marketing/import', { method: 'POST' });
                if (res.ok) {
                    const data = await res.json();
                    alert(data.message);
                    fetchContacts();
                    setShowImportModal(false);
                } else {
                    alert('Import failed');
                }
            } else {
                // File Import
                if (!importFile) return;

                const text = await importFile.text();
                const lines = text.split('\n');
                const parsedContacts: { name: string, email: string }[] = [];

                // Simple CSV/Text Parse: Expects "email,name" or just "email" per line
                lines.forEach(line => {
                    const trimmed = line.trim();
                    if (!trimmed) return;

                    const parts = trimmed.split(',');
                    // Naive check: is first part email or second? 
                    // Let's assume standard "email" or "name,email" or "email,name"
                    const p1 = parts[0]?.trim();
                    const p2 = parts[1]?.trim();

                    if (p1 && p1.includes('@')) {
                        parsedContacts.push({ email: p1, name: p2 || 'Unknown' });
                    } else if (p2 && p2.includes('@')) {
                        parsedContacts.push({ email: p2, name: p1 || 'Unknown' });
                    }
                });

                if (parsedContacts.length === 0) {
                    alert('No valid emails found in file. Please ensure format is CSV with "email,name" or just emails.');
                    return;
                }

                const res = await fetchWithAuth('/marketing/contacts/batch', {
                    method: 'POST',
                    body: JSON.stringify({
                        contacts: parsedContacts,
                        category: importCategory
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    alert(data.message);
                    fetchContacts();
                    setShowImportModal(false);
                } else {
                    let msg = res.statusText;
                    try {
                        const err = await res.json();
                        msg = err.message || msg;
                    } catch (e) { }
                    console.error('Batch import failed:', msg);
                    alert(`Import Failed: ${msg} (Status: ${res.status})`);
                }
            }
        } catch (error) {
            console.error('Import error', error);
            alert('Error: Could not connect to server.');
        } finally {
            setImporting(false);
            setImportFile(null);
        }
    };

    const handleAddManualContact = async () => {
        if (!manualEmail.trim()) return;
        if (!/\S+@\S+\.\S+/.test(manualEmail)) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            const res = await fetchWithAuth('/marketing/contacts', {
                method: 'POST',
                body: JSON.stringify({
                    name: manualName.trim(),
                    email: manualEmail.trim(),
                    category: manualCategory
                })
            });

            if (res.ok) {
                const newContact = await res.json();
                setContacts(prev => [...prev, newContact]);
                setManualName('');
                setManualEmail('');
                setManualCategory('General');
            } else {
                let msg = res.statusText;
                try {
                    const err = await res.json();
                    msg = err.message || msg;
                } catch (e) { }
                console.error('Add contact failed:', msg);
                alert(`Failed: ${msg} (Status: ${res.status})`);
            }
        } catch (error) {
            console.error('Add contact error', error);
            alert('Error: Could not connect to server. Ensure backend is running.');
        }
    };

    const handleDeleteContact = async (email: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm(`Delete ${email} from list?`)) return;

        try {
            const res = await fetchWithAuth(`/marketing/contacts/${email}`, { method: 'DELETE' });
            if (res.ok) {
                setContacts(prev => prev.filter(c => c.email !== email));
                setSelectedContacts(prev => prev.filter(e => e !== email));
            }
        } catch (error) {
            console.error('Delete error', error);
        }
    };

    const toggleSelectAll = () => {
        if (selectedContacts.length === filteredContacts.length) {
            setSelectedContacts([]);
        } else {
            setSelectedContacts(filteredContacts.map(c => c.email));
        }
    };

    const toggleContact = (email: string) => {
        if (selectedContacts.includes(email)) {
            setSelectedContacts(selectedContacts.filter(e => e !== email));
        } else {
            setSelectedContacts([...selectedContacts, email]);
        }
    };

    const handleSend = async () => {
        if (!subject.trim() || !message.trim() || selectedContacts.length === 0) return;

        if (!confirm(`Are you sure you want to send this email to ${selectedContacts.length} recipients?`)) {
            return;
        }

        setSending(true);
        setSendResult(null);

        try {
            const res = await fetchWithAuth('/marketing/send', {
                method: 'POST',
                body: JSON.stringify({
                    recipients: selectedContacts,
                    subject,
                    message
                })
            });

            const data = await res.json();
            if (res.ok) {
                setSendResult({ success: data.stats.success, failed: data.stats.failed });
                if (data.stats.success > 0) {
                    setSubject('');
                    setMessage('');
                    setSelectedContacts([]);
                }
            } else {
                alert('Failed to send campaign: ' + data.message);
            }
        } catch (error) {
            alert('Error sending campaign');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="text-slate-800 relative">
            {/* Import Modal */}
            {showImportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-800">Import Contacts</h3>
                            <button onClick={() => setShowImportModal(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Import Source</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setImportType('leads')}
                                        className={`px-4 py-2 rounded-lg text-sm border font-medium transition-colors ${importType === 'leads' ? 'bg-cyan-50 border-cyan-500 text-cyan-700' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                                    >
                                        Internal Leads
                                    </button>
                                    <button
                                        onClick={() => setImportType('file')}
                                        className={`px-4 py-2 rounded-lg text-sm border font-medium transition-colors ${importType === 'file' ? 'bg-cyan-50 border-cyan-500 text-cyan-700' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                                    >
                                        CSV File
                                    </button>
                                </div>
                            </div>

                            {importType === 'file' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Select Category</label>
                                        <select
                                            value={importCategory}
                                            onChange={(e) => setImportCategory(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                                        >
                                            {CATEGORIES.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Upload CSV</label>
                                        <input
                                            type="file"
                                            accept=".csv,.txt"
                                            onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer"
                                        />
                                        <p className="text-xs text-slate-400 mt-1">Format: email,name OR name,email</p>
                                    </div>
                                </>
                            )}

                            {importType === 'leads' && (
                                <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    This will import all unique emails from your "Leads" section that haven't been added yet. Categories will be auto-assigned based on service interest.
                                </p>
                            )}

                            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-2">
                                <button
                                    onClick={() => setShowImportModal(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                                    disabled={importing}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleImportSubmit}
                                    disabled={importing || (importType === 'file' && !importFile)}
                                    className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 flex items-center gap-2 font-medium transition-all"
                                >
                                    {importing && <RefreshCw className="w-4 h-4 animate-spin" />}
                                    Import Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Marketing Campaigns</h1>
                    <p className="text-slate-500 mt-1">Manage contacts and send bulk emails.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowImportModal(true)}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm font-medium"
                    >
                        <Upload className="w-4 h-4" />
                        Import / Upload
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
                {/* Contacts Sidebar */}
                <div className="space-y-6">
                    {/* Manual Add Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                            <Plus className="w-4 h-4 text-cyan-600" />
                            Add New Contact
                        </h3>
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Name"
                                value={manualName}
                                onChange={(e) => setManualName(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={manualEmail}
                                onChange={(e) => setManualEmail(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                            />
                            <select
                                value={manualCategory}
                                onChange={(e) => setManualCategory(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            <button
                                onClick={handleAddManualContact}
                                disabled={!manualEmail}
                                className="w-full bg-cyan-600 text-white hover:bg-cyan-700 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-cyan-200 disabled:opacity-50 disabled:shadow-none"
                            >
                                Add to List
                            </button>
                        </div>
                    </div>

                    {/* Contacts List Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col h-[600px]">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-2 text-slate-700 font-semibold">
                                <Users className="w-4 h-4" />
                                <span>Contacts ({filteredContacts.length})</span>
                            </div>
                            <button
                                onClick={fetchContacts}
                                className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-cyan-600 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Filter */}
                        <div className="mb-4">
                            <div className="relative">
                                <Filter className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
                                >
                                    <option value="All">All Categories</option>
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Select All */}
                        {filteredContacts.length > 0 && (
                            <div className="flex items-center gap-2 mb-3 px-2 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors" onClick={toggleSelectAll}>
                                {selectedContacts.length === filteredContacts.length && filteredContacts.length > 0 ? (
                                    <CheckSquare className="w-4 h-4 text-cyan-600" />
                                ) : (
                                    <Square className="w-4 h-4 text-slate-400" />
                                )}
                                <span className="text-sm font-medium text-slate-600">Select All</span>
                            </div>
                        )}

                        <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-1">
                            {loading ? (
                                <div className="text-center py-8 text-slate-400">Loading...</div>
                            ) : filteredContacts.length === 0 ? (
                                <div className="text-center py-10 text-slate-400 flex flex-col items-center">
                                    <Users className="w-8 h-8 opacity-20 mb-2" />
                                    <p className="text-sm">No contacts found</p>
                                </div>
                            ) : (
                                filteredContacts.map(contact => (
                                    <div
                                        key={contact.email}
                                        onClick={() => toggleContact(contact.email)}
                                        className={`group flex items-start gap-3 p-3 rounded-lg cursor-pointer border transition-all ${selectedContacts.includes(contact.email)
                                            ? 'bg-cyan-50 border-cyan-200'
                                            : 'border-transparent hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className="mt-0.5">
                                            {selectedContacts.includes(contact.email) ? (
                                                <CheckSquare className="w-4 h-4 text-cyan-600" />
                                            ) : (
                                                <Square className="w-4 h-4 text-slate-400 group-hover:text-slate-500" />
                                            )}
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex justify-between items-start">
                                                <p className="text-sm font-medium text-slate-800 truncate">{contact.name}</p>
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full truncate max-w-[80px] ${contact.category === 'General' ? 'bg-slate-100 text-slate-500' : 'bg-cyan-50 text-cyan-600'}`}>
                                                    {contact.category}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 truncate">{contact.email}</p>
                                        </div>
                                        <button
                                            onClick={(e) => handleDeleteContact(contact.email, e)}
                                            className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 text-slate-300 transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-500">
                            <span>{selectedContacts.length} selected</span>
                            <span>{filteredContacts.length} total</span>
                        </div>
                    </div>
                </div>

                {/* Composer */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex-1 flex flex-col">
                        <div className="space-y-6 flex-1 flex flex-col">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Subject Line</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="e.g., Special Offer for Web Development"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all placeholder:text-slate-400"
                                />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email Message (HTML supported)</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Write your message here..."
                                    className="w-full flex-1 min-h-[400px] bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all resize-none font-mono text-sm leading-relaxed placeholder:text-slate-400"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {sendResult && (
                        <div className={`p-4 rounded-xl border ${sendResult.failed === 0
                            ? 'bg-green-50 border-green-200 text-green-700'
                            : 'bg-orange-50 border-orange-200 text-orange-700'
                            }`}>
                            <h4 className="font-bold flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                Campaign Completed
                            </h4>
                            <p className="mt-1 text-sm">
                                Successfully sent to {sendResult.success} recipients.
                                {sendResult.failed > 0 && ` Failed to send to ${sendResult.failed} recipients.`}
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            onClick={handleSend}
                            disabled={sending || selectedContacts.length === 0 || !subject || !message}
                            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {sending ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Sending Campaign...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Send Campaign
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMarketing;
