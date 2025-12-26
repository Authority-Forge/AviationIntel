// Aircraft model types and data
export interface AircraftModel {
    id: string;
    name: string;
    manufacturer: string;
    yearStart: number;
    yearEnd?: number;
    image?: string;
    interiorImage?: string;
    cockpitImage?: string;
    layoutImage?: string;
    specImage?: string;
    type?: string;
    category: string; // Required to match schema
}

// Real data from seed.sql
export const aircraftModels: AircraftModel[] = [
    {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Challenger 350',
        manufacturer: 'Bombardier',
        yearStart: 2014,
        image: 'https://d3lcr32v2pp4l1.cloudfront.net/Pictures/780xany/7/2/4/81724_challenger3500exteriorinflightbluewaterandmountains_284609.jpg',
        interiorImage: 'https://images.aircharterservice.com/content/bombardier-challenger-350-layout-slim.jpg',
        cockpitImage: 'https://bombardier.com/sites/default/files/styles/retina_1720x1000_desktop/public/2025-07/BBA_FW17_08-Challenger350cockpit_V4_0.jpg.webp?itok=Fa-F1-Kz',
        layoutImage: 'https://foreseeaviation.in/wp-content/uploads/2020/09/challenger-350-layout.png',
        specImage: 'https://images.aircharterservice.com/content/engines-spotlight-on-the-bombardier-challenger-350.jpg',
        type: 'Jet',
        category: 'Super-Midsize',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Citation Latitude',
        manufacturer: 'Cessna',
        yearStart: 2015,
        image: '/images/aircraft/citation-latitude.jpg',
        interiorImage: '',
        cockpitImage: '',
        layoutImage: '',
        specImage: '',
        type: 'Jet',
        category: 'Midsize',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Praetor 600',
        manufacturer: 'Embraer',
        yearStart: 2019,
        image: '/images/aircraft/praetor-500.jpg',
        interiorImage: '',
        cockpitImage: '',
        layoutImage: '',
        specImage: '',
        type: 'Jet',
        category: 'Super-Midsize',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Gulfstream G280',
        manufacturer: 'Gulfstream',
        yearStart: 2012,
        image: '/images/g280-ext.jpg',
        interiorImage: '/images/g280-int.jpg',
        cockpitImage: '/images/g280-cockpit.jpg',
        layoutImage: '/images/g280-layout.jpg',
        specImage: '/images/g280-specs.jpg',
        type: 'Jet',
        category: 'Super-Midsize',
    }
];

// Default model ID
export const DEFAULT_MODEL_ID = '550e8400-e29b-41d4-a716-446655440001';

export const getModelById = (id: string): AircraftModel | undefined =>
    aircraftModels.find(m => m.id === id);

export const getModelsByManufacturer = (manufacturer: string): AircraftModel[] =>
    aircraftModels.filter(m => m.manufacturer === manufacturer);
