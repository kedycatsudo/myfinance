import { InvestmentSource } from "@/types/investments";

type DataCalculationProps = {
    data: InvestmentSource[]
}

//investment calculations

export function RecentProfits({ data }: DataCalculationProps): object {
    return data.flatMap((investment) => investment.items).
        filter((item) => item.status === 'closed' && item.result === 'profit').
        map((i) => ({ name: i.assetName, data: i.resultAmount, date: i.exitDate, unit: '$' }))
}
export function RecentLoss({ data }: DataCalculationProps): object {
    return data.flatMap((investment) => investment.items).
        filter((item) => item.status === 'closed' && item.result === 'loss').
        map((i) => ({ name: i.assetName, data: i.resultAmount, date: i.exitDate, unit: '$' }))
}
export function ProfitsThisMonth({ data }: DataCalculationProps): object {
    return data.flatMap((investment) => investment.items).
        filter((item) => item.status === 'closed' && item.result === 'profit')

}
export function ProfitThisMonthAmount({ data }: DataCalculationProps): number {
    return data.flatMap((investment) => investment.items).
        filter((item) => item.status === 'closed' && item.result === 'profit').
        reduce((sum, item) => sum + item.resultAmount, 0)
}
export function LosesThisMonth({ data }: DataCalculationProps): object {
    return data.flatMap((investment) => investment.items).
        filter((item) => item.status === 'closed' && item.result === 'loss')
}
export function LosesThisMonthAmount({ data }: DataCalculationProps): number {
    return data.flatMap((investment) => investment.items).
        filter((item) => item.status === 'closed' && item.result === 'loss').
        reduce((sum, item) => sum + item.resultAmount, 0)
}
export function OpenPositions({ data }: DataCalculationProps): object {
    return data.flatMap((investment) => investment.items).
        filter((item) => item.status === 'open').map((i) => ({
            name: i.assetName, amount: i.investedAmount, unit: '$'

        }))
}
export function OpenPositionsAmount({ data }: DataCalculationProps): number {
    return data.flatMap((investment) => investment.items).
        filter((item) => item.status === 'open').
        reduce((sum, item) => sum + item.resultAmount, 0)
}
export function ClosedPositions({ data }: DataCalculationProps): object {
    return data.flatMap((investment) => investment.items).
        filter((item) => item.status === 'closed')
}
export function ClosedPositionsAmount({ data }: DataCalculationProps): number {
    return data.flatMap((investment) => investment.items).
        filter((item) => item.status === 'closed').
        reduce((sum, item) => sum + item.resultAmount, 0)
}
export function InvestmentSourcesList({ data }: DataCalculationProps): object {

    return data.map((d) => ({
        name: d.name,
        amount: d.items.reduce((sum, p) => sum + p.investedAmount, 0),
        unit: '$'
    }))
}