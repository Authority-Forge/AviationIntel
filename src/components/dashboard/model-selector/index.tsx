'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { useModelSelection } from '@/hooks/useModelSelection';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ChevronDown, Check, Search, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function ModelSelector() {
    const { selectedModel, models, setSelectedModelId, loading, error } = useModelSelection();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    // Filter models
    const filteredModels = useMemo(() => {
        return models.filter(model =>
            model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            model.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [models, searchTerm]);

    // Virtualizer
    const rowVirtualizer = useVirtualizer({
        count: filteredModels.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 60,
    });

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            // Focus input on open
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    };

    const handleSelect = (modelId: string) => {
        setSelectedModelId(modelId);
        setIsOpen(false);
        setSearchTerm('');
    };

    const items = rowVirtualizer.getVirtualItems();

    if (loading) {
        return (
            <div className="h-10 w-64 bg-slate-100 animate-pulse rounded-md" role="status">
                <span className="sr-only">Loading models...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-10 w-64 border border-red-300 bg-red-50 text-red-600 rounded-md flex items-center px-3 gap-2 text-sm">
                <AlertCircle className="w-4 h-4" />
                Error loading models
            </div>
        );
    }

    return (
        <div className="relative inline-block text-left w-64" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleOpen}
                className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="truncate">
                    {selectedModel ? `${selectedModel.manufacturer} ${selectedModel.name}` : 'Select Aircraft'}
                </span>
                <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-2 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                className="w-full rounded-md border-0 py-1.5 pl-8 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Search models..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div
                        ref={parentRef}
                        className="h-[300px] overflow-y-auto"
                        role="listbox"
                    >
                        {filteredModels.length > 0 ? (
                            <div
                                style={{
                                    height: `${rowVirtualizer.getTotalSize()}px`,
                                    width: '100%',
                                    position: 'relative',
                                }}
                            >
                                {items.map((virtualRow) => {
                                    const model = filteredModels[virtualRow.index];
                                    const isSelected = selectedModel?.id === model.id;
                                    return (
                                        <div
                                            key={virtualRow.key}
                                            data-index={virtualRow.index}
                                            ref={rowVirtualizer.measureElement}
                                            className={clsx(
                                                "absolute top-0 left-0 w-full px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors",
                                                isSelected && "bg-blue-50 text-blue-700"
                                            )}
                                            style={{
                                                transform: `translateY(${virtualRow.start}px)`,
                                            }}
                                            onClick={() => handleSelect(model.id)}
                                            role="option"
                                            aria-selected={isSelected}
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">{model.manufacturer}</span>
                                                <span className="text-sm text-gray-500">{model.name}</span>
                                            </div>
                                            {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                                No models found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
