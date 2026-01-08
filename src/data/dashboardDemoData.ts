import { DashboardItemsBase, RecentItem, FinancialSnapshotItem } from "@/types/dashboard";
const now = Date.now()

export const demoDashboardData = {
    recentInvestments: [
        { id: "1", name: "Stocks", amount: 2300.00, date: now },
        { id: "2", name: "Stocks", amount: 2300.00, date: now },
    ] as RecentItem[],
    recentMisc: [
        { id: "3", name: "Gift", amount: 2300, date: now },
        { id: "4", name: "Shopping", amount: 2300, date: now },
    ] as RecentItem[],
    currentOutcomes: [
        { id: "5", name: "Food", amount: 2300, date: now, description: "" },
        { id: "6", name: "Rent", amount: 2300, date: now, description: "Paid" },
    ] as FinancialSnapshotItem[],
    currentIncomes: [
        { id: "7", name: "Job", amount: 2300, date: now, description: "Salary" },
        { id: "8", name: "Freelance", amount: 2300, date: now, description: "Project" },
    ] as FinancialSnapshotItem[],
    pieChart: [
        { name: "Outcomes", amount: 1200 },
        { name: "Incomes", amount: 2500 },
    ] as DashboardItemsBase[],
    pieChartData: [
        { id: "9", name: "Summary", amount: 2300, date: now, description: "Monthly" },
        { id: "10", name: "Other", amount: 2300, date: now, description: "Side Job" },
    ] as FinancialSnapshotItem[],
    recentOutcomes: [
        { id: "11", name: "Groceries", amount: 2300, date: now, description: "Weekly shop" },
        { id: "12", name: "Taxi", amount: 2300, date: now, description: "Travel" },
    ] as FinancialSnapshotItem[],
    recentIncomes: [
        { id: "13", name: "Freelance", amount: 2300, date: now, description: "Side Project" },
        { id: "14", name: "Invest", amount: 2300, date: now, description: "Return" },
    ] as FinancialSnapshotItem[],
}