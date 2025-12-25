'use client';

import { useModelSelection } from '@/hooks/useModelSelection';

export default function ModelSelector() {
    const { selectedModel, models, setSelectedModelId, loading } = useModelSelection();

    if (loading) {
        return (
            <div className="h-10 w-64 bg-slate-100 animate-pulse rounded-md" role="status">
                <span className="sr-only">Loading models...</span>
            </div>
        );
    }

    return (
        <div className="relative inline-block text-left">
            <select
                value={selectedModel?.id}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white shadow-sm cursor-pointer"
                aria-label="Select Aircraft Model"
            >
                {models.map((model) => (
                    <option key={model.id} value={model.id}>
                        {model.manufacturer} {model.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
