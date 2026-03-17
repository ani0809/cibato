import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, ChevronRight, ChevronDown, Move, Edit2 } from 'lucide-react';
import { API_URL } from '../../utils/api';

interface MenuItem {
    id: string;
    title: string;
    path: string;
    type?: 'link' | 'dropdown';
    children?: MenuItem[];
    isOpen?: boolean; // UI state for admin
}

const AdminMenus = () => {
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [menuType, setMenuType] = useState<'main' | 'footer'>('main');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initial load & when menu type changes
    useEffect(() => {
        fetchMenus();
    }, [menuType]);

    const fetchMenus = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/menus?type=${menuType}`);
            if (!res.ok) {
                throw new Error(`Server returned ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            setMenus(data);
        } catch (error: any) {
            console.error("Failed to load menus", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Clean up UI state before saving (remove isOpen)
            const cleanMenus = JSON.parse(JSON.stringify(menus, (key, value) => {
                if (key === 'isOpen') return undefined;
                return value;
            }));

            await fetch(`${API_URL}/menus?type=${menuType}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanMenus)
            });
            alert('Menu saved successfully!');
        } catch (error) {
            console.error("Failed to save menus", error);
            alert('Failed to save menu');
        } finally {
            setSaving(false);
        }
    };

    // --- CRUD Handlers ---

    const updateItem = (items: MenuItem[], id: string, updates: Partial<MenuItem>): MenuItem[] => {
        return items.map(item => {
            if (item.id === id) {
                return { ...item, ...updates };
            }
            if (item.children) {
                return { ...item, children: updateItem(item.children, id, updates) };
            }
            return item;
        });
    };

    const deleteItem = (items: MenuItem[], id: string): MenuItem[] => {
        return items.filter(item => item.id !== id).map(item => {
            if (item.children) {
                return { ...item, children: deleteItem(item.children, id) };
            }
            return item;
        });
    };

    const addItem = (items: MenuItem[], parentId: string | null, newItem: MenuItem): MenuItem[] => {
        if (parentId === null) {
            return [...items, newItem];
        }
        return items.map(item => {
            if (item.id === parentId) {
                return {
                    ...item,
                    children: [...(item.children || []), newItem],
                    isOpen: true
                };
            }
            if (item.children) {
                return { ...item, children: addItem(item.children, parentId, newItem) };
            }
            return item;
        });
    };

    // --- UI Interactions ---

    const handleUpdate = (id: string, field: keyof MenuItem, value: any) => {
        setMenus(prev => updateItem(prev, id, { [field]: value }));
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setMenus(prev => deleteItem(prev, id));
        }
    };

    const handleAdd = (parentId: string | null) => {
        const title = prompt('Enter menu title:');
        if (!title) return;
        const path = prompt('Enter menu path:', '/');

        const newItem: MenuItem = {
            id: Date.now().toString(),
            title,
            path: path || '/',
            type: 'link',
            children: []
        };

        setMenus(prev => addItem(prev, parentId, newItem));
    };

    const toggleOpen = (id: string) => {
        setMenus(prev => updateItem(prev, id, { isOpen: !findItem(prev, id)?.isOpen }));
    };

    const findItem = (items: MenuItem[], id: string): MenuItem | undefined => {
        for (const item of items) {
            if (item.id === id) return item;
            if (item.children) {
                const found = findItem(item.children, id);
                if (found) return found;
            }
        }
        return undefined;
    };

    // --- Recursive Renderer ---

    const renderMenuTree = (items: MenuItem[], level = 0) => {
        return (
            <div className={`space-y-2 ${level > 0 ? 'ml-8 border-l border-slate-200 pl-4' : ''}`}>
                {items.map((item) => (
                    <div key={item.id} className="group">
                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-cyan-500 transition-colors">
                            <button
                                onClick={() => toggleOpen(item.id)}
                                className={`p-1 rounded hover:bg-slate-100 ${!item.children?.length ? 'invisible' : ''}`}
                            >
                                {item.isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                            </button>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    value={item.title}
                                    onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                                    className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                />
                                <input
                                    value={item.path}
                                    onChange={(e) => handleUpdate(item.id, 'path', e.target.value)}
                                    className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                />
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleAdd(item.id)}
                                    className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg"
                                    title="Add Sub-item"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {item.isOpen && item.children && item.children.length > 0 && (
                            <div className="mt-2">
                                {renderMenuTree(item.children, level + 1)}
                            </div>
                        )}
                    </div>
                ))}

                <button
                    onClick={() => handleAdd(null)} // This logic needs adjustment for nested adds. Actually renderMenuTree is called recursively, so this button should only be at the bottom of the CURRENT list context if I wanted to add to *that* list. 
                // But for now, let's just put a global "Add Top Level Item" button outside.
                // Instead, let's put an "Add Item" button at the end of every list?
                // No, cleaner to have just one "Add Top Level" and rely on row buttons for nesting.
                >
                </button>
            </div>
        );
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading menus: {error}</div>;

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Menu Management</h1>
                    <p className="text-slate-500 text-lg">Configure website navigation structure</p>
                </div>

                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg border border-slate-200">
                    <button
                        onClick={() => setMenuType('main')}
                        className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${menuType === 'main'
                                ? 'bg-white text-cyan-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Main Menu
                    </button>
                    <button
                        onClick={() => setMenuType('footer')}
                        className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${menuType === 'footer'
                                ? 'bg-white text-cyan-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Footer Menu
                    </button>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                {renderMenuTree(menus)}

                <button
                    onClick={() => handleAdd(null)}
                    className="mt-4 flex items-center gap-2 px-4 py-2 text-cyan-600 font-semibold bg-white border border-dashed border-cyan-200 rounded-xl hover:bg-cyan-50 hover:border-cyan-300 transition-all w-full justify-center"
                >
                    <Plus className="w-4 h-4" />
                    Add Top-Level Menu Item
                </button>
            </div>
        </div>
    );
};

export default AdminMenus;
