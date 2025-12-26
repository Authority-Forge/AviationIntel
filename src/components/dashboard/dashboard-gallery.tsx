import React from 'react';
import { type AircraftModel } from '@/lib/mock-data/models';
import { type MarketMetric } from '@/lib/schemas';
import { Download, X, Building2, Calendar, Plane } from 'lucide-react';

interface DashboardGalleryProps {
    selectedModel: AircraftModel | null;
    metrics: MarketMetric | null;
    onPrint?: () => void;
}

export default function DashboardGallery({ selectedModel, metrics, onPrint }: DashboardGalleryProps) {
    const [previewImage, setPreviewImage] = React.useState<string | null>(null);

    // Handle Esc key to close preview
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setPreviewImage(null);
        };
        if (previewImage) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [previewImage]);

    if (!selectedModel) return null;

    const metadataCards = [
        { label: 'OEM', value: selectedModel.manufacturer, icon: Building2 },
        { label: 'Entry into Service', value: selectedModel.yearStart, icon: Calendar },
        {
            label: 'Active Fleet Size',
            value: metrics?.activeListings || '...',
            icon: Plane,
            hasProgress: true
        },
    ];

    return (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 lg:p-12 overflow-hidden">
            {/* Image Preview Modal */}
            {previewImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 transition-opacity"
                    onClick={() => setPreviewImage(null)}
                >
                    <button
                        className="absolute right-8 top-8 text-white hover:text-gray-300 transition-all hover:rotate-90 active:scale-95"
                        onClick={() => setPreviewImage(null)}
                    >
                        <X className="h-10 w-10" />
                    </button>
                    <img
                        src={previewImage}
                        alt="Preview"
                        className="max-h-[92vh] max-w-full object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* Header Integrated */}
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        {selectedModel.name}
                    </h1>
                    <p className="mt-2 text-xl font-bold text-slate-600">
                        {selectedModel.category || 'Super-Midsize Jet'}
                    </p>
                </div>

                {onPrint && (
                    <button
                        onClick={onPrint}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-xl hover:bg-slate-800 transition-all active:scale-95 hover:shadow-slate-200"
                    >
                        <Download className="h-4 w-4 stroke-[3px]" />
                        Export Report
                    </button>
                )}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Images */}
                <div className="lg:col-span-2 space-y-6">
                    <div
                        className="aspect-video bg-slate-100 rounded-2xl overflow-hidden relative group cursor-pointer border border-slate-200 shadow-inner"
                        onClick={() => selectedModel.image && setPreviewImage(selectedModel.image)}
                    >
                        {selectedModel.image ? (
                            <img src={selectedModel.image} alt={selectedModel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-sm">Main Image</div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    </div>

                    <div className="grid grid-cols-2 gap-6 h-56">
                        {[
                            { src: selectedModel.interiorImage, label: 'Interior' },
                            { src: selectedModel.cockpitImage, label: 'Cockpit' }
                        ].map((img, i) => (
                            <div
                                key={i}
                                className="bg-slate-50 rounded-2xl overflow-hidden relative group cursor-pointer border border-slate-200"
                                onClick={() => img.src && setPreviewImage(img.src)}
                            >
                                {img.src ? (
                                    <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em]">{img.label}</div>
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Metadata & Specific Image */}
                <div className="space-y-6 flex flex-col">
                    {metadataCards.map((card, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
                            {/* Card Header */}
                            <div className="px-5 py-3.5 flex items-center gap-3 bg-white border-b border-slate-100">
                                <card.icon className="h-4 w-4 text-slate-400" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">{card.label}</span>
                            </div>
                            {/* Card Body */}
                            <div className="px-5 py-4 bg-slate-50/30 flex-grow">
                                <div className="text-xl font-bold text-slate-900 tracking-tight">
                                    {card.value}
                                </div>
                                {card.hasProgress && (
                                    <div className="mt-4 space-y-2">
                                        <div className="flex justify-between text-[11px] font-bold text-slate-500">
                                            <span>400</span>
                                            <span className="text-blue-600">450</span>
                                        </div>
                                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50 shadow-inner">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"
                                                style={{ width: `${((Number(card.value) || 0) / 450) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <div
                        className="flex-grow min-h-[180px] bg-slate-50 rounded-2xl overflow-hidden relative group cursor-pointer border border-slate-200 shadow-sm"
                        onClick={() => selectedModel.specImage && setPreviewImage(selectedModel.specImage)}
                    >
                        {selectedModel.specImage ? (
                            <img src={selectedModel.specImage} alt="Details" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-[10px]">Spec Image</div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
}
