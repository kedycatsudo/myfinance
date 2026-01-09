import { IncomesCatchUpTheMonth, IncomesSourceListItem } from "@/types/incomes"
export const demoIncomesData = {
    catchUptheMonth: [
        { name: 'Total Incoming', data: '500.00$' },
        { name: 'Got Paid Amount', data: '500.00$' },
        { name: 'Got Paid Earning', data: '4 earnings' },
        { name: 'Coming Earnings', data: '3 earnings' },
        { name: 'Income Sources', data: '4 sources' },
        { name: 'Reset Date', data: '-/01-' }
    ] as IncomesCatchUpTheMonth[],
    incomeSourceList: [
        { name: "Salary", amount: 5000.00 },
        { name: "Upwork", amount: 5000.00 },
        { name: "Investment", amount: 5000.00 },
    ] as IncomesSourceListItem[],
    pieDataRaw: [
        { name: "Outcomes", amount: 1200 },
        { name: "Incomes", amount: 1200 },

    ]
}

