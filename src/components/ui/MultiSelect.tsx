import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface MultiSelectProps {
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    variant?: 'default' | 'inverted';
}

export const MultiSelect = ({
    options,
    value,
    onChange,
    placeholder = 'Select options...',
    label,
    error,
    variant = 'default'
}: MultiSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Styles based on variant
    const styles = {
        default: {
            input: 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600',
            activeInput: 'border-cyan-500 ring-1 ring-cyan-500',
            dropdown: 'bg-slate-800 border-slate-700',
            option: 'text-slate-300 hover:bg-slate-700/50 hover:text-white',
            selectedOption: 'bg-cyan-500/10 text-cyan-400',
            chip: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
            chipIcon: 'text-cyan-400 hover:text-cyan-300',
            placeholder: 'text-slate-500'
        },
        inverted: {
            input: 'bg-white border-slate-200 text-slate-700 hover:border-slate-300',
            activeInput: 'border-cyan-400 ring-2 ring-cyan-400/20',
            dropdown: 'bg-white border-slate-200 shadow-xl',
            option: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
            selectedOption: 'bg-cyan-50 text-cyan-600',
            chip: 'bg-cyan-50 text-cyan-600 border-cyan-100',
            chipIcon: 'text-cyan-400 hover:text-cyan-600',
            placeholder: 'text-slate-400'
        }
    };

    const currentStyles = styles[variant];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
        if (value.includes(optionValue)) {
            onChange(value.filter(v => v !== optionValue));
        } else {
            onChange([...value, optionValue]);
        }
    };

    const removeValue = (e: React.MouseEvent, val: string) => {
        e.stopPropagation();
        onChange(value.filter(v => v !== val));
    };

    return (
        <div className="w-full relative" ref={containerRef}>
            {label && (
                <label className={`block text-sm mb-2 font-semibold ${variant === 'inverted' ? 'text-slate-700' : 'text-slate-400'}`}>
                    {label}
                </label>
            )}
            <div
                className={`relative w-full min-h-[42px] px-3 py-2 border rounded-xl cursor-pointer flex items-center justify-between transition-all ${isOpen ? currentStyles.activeInput : currentStyles.input
                    }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-wrap gap-2 pr-6">
                    {value.length === 0 && (
                        <span className={`text-sm ${currentStyles.placeholder}`}>{placeholder}</span>
                    )}
                    {value.map((val) => {
                        const option = options.find(o => o.value === val);
                        return (
                            <span
                                key={val}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 border rounded text-xs ${currentStyles.chip}`}
                            >
                                {option ? option.label : val}
                                <X
                                    className={`w-3 h-3 transition-colors cursor-pointer ${currentStyles.chipIcon}`}
                                    onClick={(e) => removeValue(e, val)}
                                />
                            </span>
                        );
                    })}
                </div>
                <ChevronDown
                    className={`w-4 h-4 text-slate-400 absolute right-3 top-3 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </div>

            {isOpen && (
                <div className={`absolute z-50 mt-2 w-full max-h-60 overflow-auto border rounded-xl outline-none ${currentStyles.dropdown}`}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`flex items-center gap-2 px-3 py-2.5 text-sm cursor-pointer transition-colors ${value.includes(option.value)
                                ? currentStyles.selectedOption
                                : currentStyles.option
                                }`}
                            onClick={() => handleSelect(option.value)}
                        >
                            <div
                                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${value.includes(option.value)
                                    ? 'bg-cyan-500 border-cyan-500'
                                    : 'border-slate-400'
                                    }`}
                            >
                                {value.includes(option.value) && (
                                    <Check className="w-3 h-3 text-white" />
                                )}
                            </div>
                            <span>{option.label}</span>
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    );
};
