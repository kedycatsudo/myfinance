import { SourceBase } from "./shared";

// Optionally: extend to include source-level total
export type PaymentStatus = "paid" | "coming";

export type FinancePayment = {
    id: string;
    name: string;
    type: string;
    amount: number;
    date: string;
    loop: boolean;
    status: PaymentStatus;
};

export type FinanceSource = SourceBase & {
    payments: FinancePayment[];
    // Optionally add this, or compute on the fly:
    // totalAmount?: number;
};