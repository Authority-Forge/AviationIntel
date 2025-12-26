'use client';

import { useState } from 'react';

export default function SeedPage() {
    const [status, setStatus] = useState<string>('Idle');
    const [loading, setLoading] = useState(false);

    const seedData = async () => {
        setLoading(true);
        setStatus('Requesting server-side seed...');

        try {
            const response = await fetch('/api/seed', {
                method: 'POST',
            });

            const result = await response.json();

            if (!response.ok) {
                console.error('Seed error:', result);
                setStatus(`Error: ${result.error}`);
            } else {
                setStatus('Success! Database seeded securely via API.');
            }
        } catch (e) {
            setStatus('Network or Server Error: ' + (e as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Secure Database Seeder</h1>
            <div className="mb-4 text-sm text-gray-600">
                This utility uses your Service Role Key (server-side) to populate data.
                <ul className="list-disc ml-5 mt-2">
                    <li>Ensure <code>SUPABASE_SERVICE_ROLE_KEY</code> is in <code>.env.local</code></li>
                    <li>Row Level Security (RLS) can remain enabled.</li>
                </ul>
            </div>
            <button
                onClick={seedData}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Seeding...' : 'Seed Data (Secure)'}
            </button>
            {status && (
                <div className={`mt-4 p-4 rounded ${status.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                    {status}
                </div>
            )}
        </div>
    );
}
