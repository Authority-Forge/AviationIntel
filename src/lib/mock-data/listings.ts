// Aircraft listings data
export type ListingStatus = 'active' | 'sold' | 'pending' | 'withdrawn';

export interface AircraftListing {
    id: string;
    modelId: string;
    serialNumber: string;
    year: number;
    totalHours: number;
    totalCycles: number;
    askingPrice: number;
    daysOnMarket: number;
    location: string;
    status: ListingStatus;
    listedAt: string;
}

// Challenger 350 listings Dec 2024 (from seed.sql - real data)
export const aircraftListings: AircraftListing[] = [
    { id: '1', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20509', year: 2014, totalHours: 1826, totalCycles: 1245, askingPrice: 15500000, daysOnMarket: 245, location: 'USA', status: 'active', listedAt: '2024-04-15' },
    { id: '2', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20532', year: 2014, totalHours: 3928, totalCycles: 2650, askingPrice: 14500000, daysOnMarket: 180, location: 'USA', status: 'pending', listedAt: '2024-06-28' },
    { id: '3', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20525', year: 2015, totalHours: 3396, totalCycles: 2280, askingPrice: 16200000, daysOnMarket: 120, location: 'Europe', status: 'active', listedAt: '2024-08-27' },
    { id: '4', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20632', year: 2016, totalHours: 2424, totalCycles: 1680, askingPrice: 17750000, daysOnMarket: 95, location: 'USA', status: 'active', listedAt: '2024-09-22' },
    { id: '5', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20698', year: 2017, totalHours: 2100, totalCycles: 1450, askingPrice: 18200000, daysOnMarket: 150, location: 'Middle East', status: 'active', listedAt: '2024-07-28' },
    { id: '6', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20752', year: 2018, totalHours: 1650, totalCycles: 1120, askingPrice: 18900000, daysOnMarket: 88, location: 'USA', status: 'active', listedAt: '2024-09-29' },
    { id: '7', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20806', year: 2019, totalHours: 809, totalCycles: 580, askingPrice: 20500000, daysOnMarket: 210, location: 'USA', status: 'active', listedAt: '2024-05-30' },
    { id: '8', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20808', year: 2019, totalHours: 1855, totalCycles: 1280, askingPrice: 19800000, daysOnMarket: 165, location: 'Europe', status: 'active', listedAt: '2024-07-14' },
    { id: '9', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20845', year: 2020, totalHours: 720, totalCycles: 510, askingPrice: 21200000, daysOnMarket: 75, location: 'USA', status: 'active', listedAt: '2024-10-12' },
    { id: '10', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20872', year: 2020, totalHours: 580, totalCycles: 420, askingPrice: 21800000, daysOnMarket: 45, location: 'Asia', status: 'active', listedAt: '2024-11-11' },
    { id: '11', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20901', year: 2021, totalHours: 450, totalCycles: 320, askingPrice: 22500000, daysOnMarket: 30, location: 'USA', status: 'active', listedAt: '2024-11-26' },
    { id: '12', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20915', year: 2021, totalHours: 380, totalCycles: 275, askingPrice: 22800000, daysOnMarket: 22, location: 'Europe', status: 'active', listedAt: '2024-12-04' },
    { id: '13', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20928', year: 2022, totalHours: 285, totalCycles: 205, askingPrice: 23000000, daysOnMarket: 320, location: 'USA', status: 'active', listedAt: '2024-02-08' },
    { id: '14', modelId: '550e8400-e29b-41d4-a716-446655440001', serialNumber: '20935', year: 2022, totalHours: 195, totalCycles: 145, askingPrice: 22500000, daysOnMarket: 280, location: 'Middle East', status: 'sold', listedAt: '2024-03-19' },
];

export const getListingsByModelId = (modelId: string): AircraftListing[] =>
    aircraftListings.filter(l => l.modelId === modelId);

export const getListingsByStatus = (modelId: string, status: ListingStatus): AircraftListing[] =>
    aircraftListings.filter(l => l.modelId === modelId && l.status === status);

export const getActiveListingsCount = (modelId: string): number =>
    aircraftListings.filter(l => l.modelId === modelId && l.status === 'active').length;
