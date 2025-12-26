'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const GeoJSON = dynamic(
    () => import('react-leaflet').then((mod) => mod.GeoJSON),
    { ssr: false }
);

interface RegionData {
    region: string;
    percentage: number;
    color: string;
    countries: string[];
}

// Regional mapping with country codes
const REGION_DATA: RegionData[] = [
    {
        region: 'North America',
        percentage: 40,
        color: '#1e40af',
        countries: ['USA', 'CAN', 'MEX', 'GRL', 'SPM']
    },
    {
        region: 'Europe',
        percentage: 30,
        color: '#1e3a8a',
        countries: ['GBR', 'FRA', 'DEU', 'ITA', 'ESP', 'POL', 'ROU', 'NLD', 'BEL', 'CZE', 'GRC', 'PRT', 'SWE', 'HUN', 'AUT', 'BGR', 'DNK', 'FIN', 'SVK', 'IRL', 'HRV', 'LTU', 'SVN', 'LVA', 'EST', 'CYP', 'LUX', 'MLT', 'NOR', 'CHE', 'ISL', 'ALB', 'MKD', 'SRB', 'MNE', 'BIH', 'UKR', 'BLR', 'MDA', 'RUS']
    },
    {
        region: 'Middle East',
        percentage: 20,
        color: '#93c5fd',
        countries: ['SAU', 'ARE', 'QAT', 'KWT', 'BHR', 'OMN', 'JOR', 'LBN', 'ISR', 'PSE', 'IRQ', 'SYR', 'YEM', 'TUR', 'IRN', 'AFG', 'ARM', 'AZE', 'GEO']
    },
    {
        region: 'LATAM',
        percentage: 5,
        color: '#60a5fa',
        countries: ['BRA', 'ARG', 'CHL', 'COL', 'PER', 'VEN', 'ECU', 'BOL', 'PRY', 'URY', 'GUY', 'SUR', 'GUF', 'CRI', 'PAN', 'NIC', 'HND', 'SLV', 'GTM', 'BLZ', 'CUB', 'DOM', 'HTI', 'JAM', 'TTO', 'BHS', 'BRB']
    },
    {
        region: 'APAC',
        percentage: 5,
        color: '#1e293b',
        countries: ['CHN', 'JPN', 'IND', 'IDN', 'THA', 'MYS', 'SGP', 'PHL', 'VNM', 'KOR', 'AUS', 'NZL', 'PAK', 'BGD', 'MMR', 'KHM', 'LAO', 'NPL', 'LKA', 'PRK', 'MNG', 'TWN', 'BRN', 'TLS', 'PNG', 'FJI', 'NCL', 'SLB', 'VUT']
    },
];

export default function GeographicMap() {
    const [isClient, setIsClient] = useState(false);
    const [geoData, setGeoData] = useState<any>(null);

    useEffect(() => {
        setIsClient(true);
        // Load GeoJSON data
        fetch('/countries.geojson')
            .then(res => res.json())
            .then(data => setGeoData(data))
            .catch(err => console.error('Failed to load GeoJSON:', err));
    }, []);

    const getRegionColor = (countryCode: string): string => {
        if (!countryCode) return '#e5e7eb';

        for (const region of REGION_DATA) {
            if (region.countries.includes(countryCode)) {
                return region.color;
            }
        }
        return '#e5e7eb'; // Default gray for unmapped countries
    };

    const styleFeature = (feature: any) => {
        // This GeoJSON uses 'id' for ISO-3 country codes
        const countryCode = feature.id ||
            feature.properties?.ISO_A3 ||
            feature.properties?.iso_a3 ||
            '';

        const color = getRegionColor(countryCode);

        return {
            fillColor: color,
            fillOpacity: 0.7,
            color: '#ffffff',
            weight: 0.5,
            opacity: 0.5
        };
    };

    if (!isClient || !geoData) {
        return (
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-8 h-64 flex items-center justify-center border border-blue-100">
                <div className="text-center">
                    <div className="text-blue-600 text-6xl mb-2 opacity-80">🌎</div>
                    <p className="text-sm text-gray-600 font-medium">Loading Map...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative rounded-lg overflow-hidden border border-blue-100" style={{ height: '400px' }}>
            <MapContainer
                key={`map-${isClient}`}
                center={[20, 0]}
                zoom={1.2}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                dragging={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                attributionControl={false}
                minZoom={1.2}
                maxZoom={1.2}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    opacity={0.15}
                />

                {/* GeoJSON layer with regional coloring */}
                <GeoJSON
                    key="geojson-layer"
                    data={geoData}
                    style={styleFeature}
                />
            </MapContainer>

            {/* Embedded Legend on Map */}
            <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md z-[1000]">
                <div className="flex flex-wrap gap-2">
                    {REGION_DATA.map((region) => (
                        <div key={region.region} className="flex items-center gap-1">
                            <div
                                className="w-3 h-3 rounded-sm"
                                style={{ backgroundColor: region.color }}
                            />
                            <span className="text-[10px] text-gray-700 font-medium whitespace-nowrap">
                                {region.region}-{region.percentage}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
