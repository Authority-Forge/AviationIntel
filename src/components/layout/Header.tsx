'use client';

import ModelSelector from '@/components/dashboard/model-selector';

export default function Header() {
    return (
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form className="relative flex flex-1" action="#" method="GET">
                    {/* Search or other header content */}
                </form>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    {/* F2: Model Selector Integration */}
                    <div className="w-64">
                        <ModelSelector />
                    </div>

                    <div className="h-6 w-px bg-gray-200" aria-hidden="true" />

                    {/* User Profile */}
                    <div className="flex items-center">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                            <span className="text-sm font-medium leading-none text-white">JD</span>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
