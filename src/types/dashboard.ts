//base fields for dashboard component's types, also used for PieChart
export type DashboardItemsBase = {
    id: string
    name: string
    amount: number
}
//RecentSideInfo component
export type RecentItem = DashboardItemsBase & {
    date: number
}
//FinancialSnapShot,PieChartData
export type FinancialSnapshotItem = DashboardItemsBase & {
    description?: string
    date: number

}

