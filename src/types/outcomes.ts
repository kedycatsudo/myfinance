// Every user has their own list of outcome sources
export type OutcomeSource = {
    id: string;           // unique within this user's outcome sources
    name: string;         // e.g., "Bills", "Mortgage"
    description?: string; // Optional source-level info
    payments: OutcomePayment[]; // Nested array of payments
};

export type OutcomePayment = {
    id: string;                  // unique within its parent OutcomeSource
    name: string;                // e.g., "Kub", "Cell"
    type: 'credit_card' | 'cash' | string;
    amount: number;              // store as number for logic, format for UI
    date: string;                // ISO string for easy parsing
    loop: boolean;
    status: 'paid' | 'coming';
};