'use client';

export default function MethodologyConfidence() {
    return (
        <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 break-inside-avoid">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Methodology & Confidence</h2>

            <div className="space-y-8">
                {/* Data Sources */}
                <div>
                    <h3 className="text-sm font-bold text-blue-900 mb-3">Data Sources (High-Level)</h3>
                    <p className="text-sm text-gray-600 mb-3">Our analysis is informed by a combination of:</p>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                            OEM guidance and lifecycle economics
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                            Historical market data and transaction benchmarks
                        </li>
                    </ul>
                </div>

                {/* Update Cadence */}
                <div>
                    <h3 className="text-sm font-bold text-blue-900 mb-3">Update Cadence</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        This framework is reviewed periodically and refreshed as new market data, regulatory developments, or industry trends materially change underlying assumptions.
                    </p>
                </div>

                {/* Confidence Grading Approach */}
                <div>
                    <h3 className="text-sm font-bold text-blue-900 mb-3">Confidence Grading Approach</h3>
                    <p className="text-sm text-gray-600 mb-3">Confidence levels are assigned based on:</p>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                            Depth and consistency of available data
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                            Alignment across independent sources
                        </li>
                    </ul>
                </div>

                {/* Limitations & Blind Spots */}
                <div>
                    <h3 className="text-sm font-bold text-blue-900 mb-3">Limitations & Blind Spots</h3>
                    <p className="text-sm text-gray-600 mb-3">While robust, the analysis may be impacted by:</p>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                            Limited transparency in some private-market transactions
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                            Variability in operator practices and utilization patterns
                        </li>
                    </ul>
                </div>

                {/* Scope Disclaimer */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mt-8">
                    <h4 className="text-sm font-bold text-blue-900 mb-2">Scope Disclaimer</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        This assessment reflects model-level insights and directional market expectations. It is not an evaluation of any specific aircraft, operator, or ownership structure.
                    </p>
                </div>
            </div>
        </section>
    );
}
