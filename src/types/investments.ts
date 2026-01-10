export type InvestmentResult = "profit" | "loss" | "none"
export type InvestmentStatus = "open" | "closed"
export type InvestmentTerm = "short" | "middle" | "long"

export type InvesmentItem = {
    id: string
    asetName: string
    term: InvestmentTerm
    InvestedAmount: number
    entryDate: string
    exitDate: string | null; // null means still open
    result: InvestmentResult
    resultAmount: number | null
    status: InvestmentStatus
}

export type InvestmentSource = {
    id: string
    name: string
    type: "crypto" | "forex"; // extend as needed
    description?: string
    items: InvesmentItem[]
}