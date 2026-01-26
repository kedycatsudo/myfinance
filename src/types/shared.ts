export type SourceBase = {
    id: string;
    sourceName: string;
    description?: string;
    date?: string;
    type: 'finance' | 'investment'; // <-- add this!
};