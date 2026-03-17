
import { useState, useRef, useEffect, useCallback } from 'react';
import {
    Bold, Italic, List, ListOrdered, Quote, AlignLeft,
    AlignCenter, AlignRight, Link as LinkIcon, Image as ImageIcon,
    Type, ChevronDown, Check, X, Edit2, Unlink, Trash2, Maximize
} from 'lucide-react';
import { createPortal } from 'react-dom';

interface TextEditorProps {
    value: string;
    onChange: (value: string) => void;
    onImageUpload?: (file: File) => Promise<string>;
}

const TextEditor = ({ value = '', onChange, onImageUpload }: TextEditorProps) => {
    const [mode, setMode] = useState<'visual' | 'code'>('visual');
    const [showDropdown, setShowDropdown] = useState(false);
    const [currentFormat, setCurrentFormat] = useState('Paragraph');

    // Selection / Toolbar State
    const [activeLink, setActiveLink] = useState<HTMLAnchorElement | null>(null);
    const [activeImg, setActiveImg] = useState<HTMLImageElement | null>(null);
    const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });

    // Modals
    const [showImageModal, setShowImageModal] = useState(false);

    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const savedSelection = useRef<Range | null>(null);

    // Sync initial value
    useEffect(() => {
        if (mode === 'visual' && editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [mode]);

    // Check Selection for Links/Images
    const checkSelection = useCallback(() => {
        if (!editorRef.current) return;

        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;

        // 1. Check for Link
        let node = sel.anchorNode;
        let foundLink: HTMLAnchorElement | null = null;
        while (node && node !== editorRef.current) {
            if (node.nodeName === 'A') {
                foundLink = node as HTMLAnchorElement;
                break;
            }
            node = node.parentNode;
        }

        if (foundLink) {
            setActiveLink(foundLink);
            const rect = foundLink.getBoundingClientRect();
            const editorRect = editorRef.current.getBoundingClientRect();
            setToolbarPos({
                top: rect.bottom - editorRect.top + 10,
                left: rect.left - editorRect.left
            });
        } else {
            setActiveLink(null);
        }

        // 2. Update Dropdown Label
        updateCurrentFormat();
    }, []);

    // Handle Click (Separate from Selection to catch Images better)
    const handleClick = useCallback((e: React.MouseEvent) => {
        const target = e.target as HTMLElement;

        if (target.tagName === 'IMG') {
            setActiveImg(target as HTMLImageElement);
            setActiveLink(null); // Deselect link if img clicked
            const rect = target.getBoundingClientRect();
            const editorRect = editorRef.current?.getBoundingClientRect();
            if (editorRect) {
                setToolbarPos({
                    top: rect.top - editorRect.top + 10,
                    left: rect.left - editorRect.left
                });
            }
        } else {
            setActiveImg(null); // Deselect img if clicked elsewhere
            checkSelection(); // Re-check standard selection
        }
    }, [checkSelection]);

    const updateCurrentFormat = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            let node = selection.anchorNode;
            while (node && node !== editorRef.current) {
                if (node.nodeType === 1) {
                    const tagName = (node as Element).tagName.toLowerCase();
                    const map: Record<string, string> = {
                        'p': 'Paragraph', 'div': 'Paragraph',
                        'h1': 'Heading 1', 'h2': 'Heading 2', 'h3': 'Heading 3',
                        'h4': 'Heading 4', 'h5': 'Heading 5', 'h6': 'Heading 6',
                        'pre': 'Preformatted', 'blockquote': 'Quote'
                    };
                    if (map[tagName]) {
                        setCurrentFormat(map[tagName]);
                        return;
                    }
                }
                node = node.parentNode;
            }
            setCurrentFormat('Paragraph');
        }
    };

    const saveSelection = () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
            savedSelection.current = sel.getRangeAt(0);
        }
    };

    const restoreSelection = () => {
        const sel = window.getSelection();
        if (sel && savedSelection.current) {
            sel.removeAllRanges();
            sel.addRange(savedSelection.current);
        }
    };

    const execCmd = (command: string, value: string | undefined = undefined) => {
        if (mode !== 'visual') return;
        if (savedSelection.current) restoreSelection();
        editorRef.current?.focus();
        document.execCommand(command, false, value);
        if (editorRef.current) onChange(editorRef.current.innerHTML);
        saveSelection();
        checkSelection();
    };

    // --- Link Actions ---
    const updateLink = () => {
        if (!activeLink) return;
        const newUrl = prompt("Enter URL:", activeLink.href);
        if (newUrl) {
            let finalUrl = newUrl;
            if (!/^https?:\/\//i.test(newUrl) && !/^mailto:/i.test(newUrl) && !/^tel:/i.test(newUrl) && !/^\//.test(newUrl) && !/^#/.test(newUrl)) {
                finalUrl = 'https://' + newUrl;
            }
            activeLink.href = finalUrl;
            if (editorRef.current) onChange(editorRef.current.innerHTML);
            checkSelection();
        }
    };

    const removeLink = () => {
        if (!activeLink) return;
        savedSelection.current = null; // Reset selection so we don't restore old range
        // Select the link node entirely
        const range = document.createRange();
        range.selectNode(activeLink);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);

        document.execCommand('unlink');
        setActiveLink(null);
        if (editorRef.current) onChange(editorRef.current.innerHTML);
    };

    // --- Image Actions ---
    const updateImage = (updatedAttrs: any) => {
        if (!activeImg) return;

        if (updatedAttrs.alt) activeImg.alt = updatedAttrs.alt;
        if (updatedAttrs.width && updatedAttrs.width !== 'auto') activeImg.style.width = updatedAttrs.width + 'px';
        if (updatedAttrs.width === 'auto') activeImg.style.width = 'auto'; // Reset

        // Alignment
        if (updatedAttrs.align === 'left') {
            activeImg.style.float = 'left';
            activeImg.style.margin = '0 1em 1em 0';
            activeImg.style.display = 'inline';
        } else if (updatedAttrs.align === 'right') {
            activeImg.style.float = 'right';
            activeImg.style.margin = '0 0 1em 1em';
            activeImg.style.display = 'inline';
        } else if (updatedAttrs.align === 'center') {
            activeImg.style.float = 'none';
            activeImg.style.display = 'block';
            activeImg.style.margin = '1em auto';
        } else {
            activeImg.style.float = 'none';
            activeImg.style.display = 'inline';
            activeImg.style.margin = '0';
        }

        if (editorRef.current) onChange(editorRef.current.innerHTML);
        setShowImageModal(false);
    };

    const alignImage = (align: 'left' | 'center' | 'right' | 'none') => {
        if (!activeImg) return;
        updateImage({ align });
    }

    const deleteImage = () => {
        if (!activeImg) return;
        activeImg.remove();
        setActiveImg(null);
        if (editorRef.current) onChange(editorRef.current.innerHTML);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && onImageUpload) {
            const file = e.target.files[0];
            restoreSelection();
            editorRef.current?.focus();
            try {
                const placeholderId = 'img-' + Date.now();
                document.execCommand('insertHTML', false, `<img id="${placeholderId}" src="https://placehold.co/100x100?text=Uploading..." />`);
                const url = await onImageUpload(file);
                const img = document.getElementById(placeholderId);
                if (img && url) {
                    img.setAttribute('src', url);
                    img.removeAttribute('id');
                    if (editorRef.current) onChange(editorRef.current.innerHTML);
                } else if (img) img.remove();
            } catch (err) { console.error("Upload error", err); }
        }
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="border border-slate-300 bg-white rounded-sm shadow-sm flex flex-col relative group">
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

            {/* Top Bar */}
            <div className="flex items-center justify-between p-2 border-b border-slate-200 bg-slate-50">
                <button type="button" onMouseDown={(e) => { e.preventDefault(); fileInputRef.current?.click(); }} className="flex items-center gap-1 text-sm font-semibold text-slate-700 px-3 py-1 border border-slate-300 rounded hover:bg-slate-100 bg-gradient-to-b from-white to-slate-100">
                    <ImageIcon className="w-4 h-4 text-cyan-500" /> <span>Add Media</span>
                </button>
                <div className="flex border border-slate-300 rounded overflow-hidden">
                    <button type="button" onClick={() => setMode('visual')} className={`px-3 py-1 text-xs font-medium ${mode === 'visual' ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-500'}`}>Visual</button>
                    <button type="button" onClick={() => setMode('code')} className={`px-3 py-1 text-xs font-medium ${mode === 'code' ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-500'}`}>Code</button>
                </div>
            </div>

            {/* Toolbar */}
            {mode === 'visual' && (
                <div className="border-b border-slate-200 p-1 flex flex-wrap gap-1 bg-white relative z-20">
                    <div className="relative">
                        <button type="button" onMouseDown={(e) => { e.preventDefault(); setShowDropdown(!showDropdown); }} className="flex items-center justify-between w-36 px-2 py-1.5 text-sm border border-slate-200 rounded text-slate-700 hover:bg-slate-50">
                            <span className="truncate">{currentFormat}</span>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>
                        {showDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                                <DropdownItem label="Paragraph" tag="p" onClick={() => { execCmd('formatBlock', 'p'); setShowDropdown(false); }} isActive={currentFormat === 'Paragraph'} />
                                <DropdownItem label="Heading 1" tag="h1" className="text-2xl font-bold" onClick={() => { execCmd('formatBlock', 'h1'); setShowDropdown(false); }} isActive={currentFormat === 'Heading 1'} />
                                <DropdownItem label="Heading 2" tag="h2" className="text-xl font-bold" onClick={() => { execCmd('formatBlock', 'h2'); setShowDropdown(false); }} isActive={currentFormat === 'Heading 2'} />
                                <DropdownItem label="Heading 3" tag="h3" className="text-lg font-bold" onClick={() => { execCmd('formatBlock', 'h3'); setShowDropdown(false); }} isActive={currentFormat === 'Heading 3'} />
                                <DropdownItem label="Heading 4" tag="h4" className="text-base font-bold" onClick={() => { execCmd('formatBlock', 'h4'); setShowDropdown(false); }} isActive={currentFormat === 'Heading 4'} />
                                <DropdownItem label="Heading 5" tag="h5" className="text-sm font-bold" onClick={() => { execCmd('formatBlock', 'h5'); setShowDropdown(false); }} isActive={currentFormat === 'Heading 5'} />
                                <DropdownItem label="Heading 6" tag="h6" className="text-xs font-bold" onClick={() => { execCmd('formatBlock', 'h6'); setShowDropdown(false); }} isActive={currentFormat === 'Heading 6'} />
                                <DropdownItem label="Preformatted" tag="pre" className="font-mono bg-slate-100 p-1" onClick={() => { execCmd('formatBlock', 'pre'); setShowDropdown(false); }} isActive={currentFormat === 'Preformatted'} />
                            </div>
                        )}
                        {showDropdown && <div className="fixed inset-0 z-40" onMouseDown={(e) => { e.preventDefault(); setShowDropdown(false); }}></div>}
                    </div>

                    <div className="w-px h-6 bg-slate-200 mx-1 self-center"></div>
                    <ToolbarBtn icon={Bold} onAction={() => execCmd('bold')} label="Bold" />
                    <ToolbarBtn icon={Italic} onAction={() => execCmd('italic')} label="Italic" />
                    <div className="w-px h-6 bg-slate-200 mx-1 self-center"></div>
                    <ToolbarBtn icon={List} onAction={() => execCmd('insertUnorderedList')} label="Bullet List" />
                    <ToolbarBtn icon={ListOrdered} onAction={() => execCmd('insertOrderedList')} label="Numbered List" />
                    <ToolbarBtn icon={Quote} onAction={() => execCmd('formatBlock', 'blockquote')} label="Quote" />
                    <div className="w-px h-6 bg-slate-200 mx-1 self-center"></div>
                    <ToolbarBtn icon={AlignLeft} onAction={() => execCmd('justifyLeft')} label="Align Left" />
                    <ToolbarBtn icon={AlignCenter} onAction={() => execCmd('justifyCenter')} label="Align Center" />
                    <ToolbarBtn icon={AlignRight} onAction={() => execCmd('justifyRight')} label="Align Right" />
                    <div className="w-px h-6 bg-slate-200 mx-1 self-center"></div>
                    <button type="button" onMouseDown={(e) => {
                        e.preventDefault();
                        saveSelection();
                        setTimeout(() => {
                            const url = prompt('Enter URL:');
                            if (url) {
                                restoreSelection();
                                let finalUrl = url;
                                if (!/^https?:\/\//i.test(url) && !/^mailto:/i.test(url) && !/^tel:/i.test(url) && !/^\//.test(url) && !/^#/.test(url)) {
                                    finalUrl = 'https://' + url;
                                }
                                execCmd('createLink', finalUrl);
                            }
                        }, 10);
                    }} title="Insert Link" className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors">
                        <LinkIcon className="w-4 h-4" />
                    </button>
                    <ToolbarBtn icon={Type} onAction={() => execCmd('removeFormat')} label="Clear Formatting" />
                </div>
            )}

            {/* Editor Area */}
            <div className="flex-1 bg-white relative min-h-[400px]">
                {mode === 'visual' ? (
                    <div
                        ref={editorRef}
                        contentEditable
                        onInput={() => { if (editorRef.current) onChange(editorRef.current.innerHTML); checkSelection(); }}
                        onKeyUp={() => { saveSelection(); checkSelection(); }}
                        onMouseUp={() => { saveSelection(); checkSelection(); }}
                        onClick={handleClick}
                        onBlur={() => saveSelection()}
                        className="w-full h-full p-4 focus:outline-none prose prose-slate max-w-none overflow-y-auto min-h-[400px]"
                        style={{ minHeight: '400px' }}
                    />
                ) : (
                    <textarea value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-full p-4 focus:outline-none font-mono text-sm resize-none border-none min-h-[400px]" style={{ minHeight: '400px' }} />
                )}

                {/* Floating Toolbars */}
                {activeLink && mode === 'visual' && (
                    <div className="absolute z-50 bg-white shadow-lg border border-slate-200 rounded-md p-1.5 flex items-center gap-1 animate-in fade-in zoom-in-95 duration-200" style={{ top: toolbarPos.top, left: toolbarPos.left }}>
                        <a href={activeLink.href} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline max-w-[150px] truncate px-2">{activeLink.href}</a>
                        <div className="w-px h-4 bg-slate-200 mx-0.5"></div>
                        <button onClick={updateLink} className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-500"><Edit2 className="w-3 h-3" /></button>
                        <button onClick={removeLink} className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-red-500"><Unlink className="w-3 h-3" /></button>
                    </div>
                )}

                {activeImg && mode === 'visual' && (
                    <div className="absolute z-50 bg-white shadow-lg border border-slate-200 rounded-md p-1 flex items-center gap-1 animate-in fade-in zoom-in-95 duration-200" style={{ top: toolbarPos.top, left: toolbarPos.left - 20 }}>
                        <button onClick={() => alignImage('left')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
                        <button onClick={() => alignImage('center')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
                        <button onClick={() => alignImage('right')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500" title="Align Right"><AlignRight className="w-4 h-4" /></button>
                        <div className="w-px h-4 bg-slate-200 mx-0.5"></div>
                        <button onClick={() => setShowImageModal(true)} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-500" title="Edit Image"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={deleteImage} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-red-500" title="Remove"><X className="w-4 h-4" /></button>
                    </div>
                )}
            </div>

            <div className="border-t border-slate-200 p-1 px-3 bg-slate-50 text-xs text-slate-500 flex justify-between items-center">
                <span>{currentFormat}</span>
                <span>Word count: {(value || '').replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(w => w.length > 0).length}</span>
            </div>

            {/* Image Modal */}
            {showImageModal && activeImg && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <ImageDetailsModal
                        img={activeImg}
                        onClose={() => setShowImageModal(false)}
                        onSave={updateImage}
                    />
                </div>,
                document.body
            )}
        </div>
    );
};

const ImageDetailsModal = ({ img, onClose, onSave }: { img: HTMLImageElement, onClose: () => void, onSave: (data: any) => void }) => {
    const [alt, setAlt] = useState(img.alt || '');
    const [width, setWidth] = useState(img.style.width ? parseInt(img.style.width) : img.width || '');
    const [align, setAlign] = useState(img.style.float === 'left' ? 'left' : img.style.float === 'right' ? 'right' : img.style.display === 'block' ? 'center' : 'none');

    return (
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h3 className="font-bold text-lg text-slate-800">Image Details</h3>
                <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Alternative Text</label>
                        <input value={alt} onChange={(e) => setAlt(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none" placeholder="Describe the image..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Caption</label>
                        <textarea className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none h-20 resize-none" placeholder="Write a caption..." disabled />
                        <p className="text-xs text-slate-400 mt-1">Captions not supported in this version.</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-center min-h-[160px] border border-slate-100">
                        <img src={img.src} alt="Preview" className="max-h-32 object-contain" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Alignment</label>
                        <div className="flex gap-2">
                            {['left', 'center', 'right', 'none'].map((a) => (
                                <button key={a} onClick={() => setAlign(a)} className={`px-3 py-1.5 text-xs font-medium rounded border ${align === a ? 'bg-cyan-50 border-cyan-500 text-cyan-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                                    {a.charAt(0).toUpperCase() + a.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Width (px)</label>
                        <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none" placeholder="auto" />
                    </div>
                </div>
            </div>
            <div className="bg-slate-50 p-4 flex justify-end gap-2 border-t border-slate-100">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-md transition-colors">Cancel</button>
                <button onClick={() => onSave({ alt, width: width || 'auto', align })} className="px-4 py-2 text-sm font-medium bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors shadow-sm">Update Image</button>
            </div>
        </div>
    );
}

const DropdownItem = ({ label, tag, className = '', onClick, isActive }: any) => (
    <button type="button" onMouseDown={(e) => { e.preventDefault(); onClick(); }} className={`w-full text-left px-4 py-2 hover:bg-cyan-50 flex items-center justify-between group ${isActive ? 'bg-cyan-50 text-cyan-700' : 'text-slate-700'}`}>
        <span className={className}>{label}</span>
        <span className="text-xs text-slate-400 opacity-50 font-mono hidden group-hover:block">&lt;{tag}&gt;</span>
    </button>
);

const ToolbarBtn = ({ icon: Icon, onAction, label }: { icon: any, onAction: () => void, label: string }) => (
    <button type="button" onMouseDown={(e) => { e.preventDefault(); onAction(); }} title={label} className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors">
        <Icon className="w-4 h-4" />
    </button>
);

export default TextEditor;
