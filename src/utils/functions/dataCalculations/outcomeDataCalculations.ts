import { FinanceSource } from "@/types/finance";

type DataCalculationProps = {
    data: FinanceSource[];
};
// outcomes Calculations
export function RecentPaid({ data }: DataCalculationProps): object {
    return data.flatMap((outcome) => outcome.payments)
        .filter((payment) => payment.status === 'paid')
        .map((p) => ({ name: p.name, data: p.amount, unit: '$', date: p.date }))
}
export function UpcomingPayment({ data }: DataCalculationProps): object {
    return data.flatMap((outcome) => outcome.payments)
        .filter((payment) => payment.status === 'coming')
        .map((p) => ({ name: p.name, data: p.amount, unit: '$', date: p.date }))
}
export function TotalOutcomes({ data }: DataCalculationProps): number {
    return data.reduce(
        (sum, src) => sum + src.payments.reduce((s, p) => s + p.amount, 0),
        0

    );
}
export function PaidOutcomePayments({ data }: DataCalculationProps): object {
    return data.flatMap((outcome) => outcome.payments).filter((payment) => payment.status === 'paid')
}
export function TotalOutcomesPaidAmount({ data }: DataCalculationProps): number {
    return data.flatMap((outcome) => outcome.payments).filter((payment) => payment.status === 'paid').
        reduce((sum, payment) => sum + payment.amount, 0)
}
export function UpcomingPayments({ data }: DataCalculationProps): object {
    return data.flatMap((outcome) => outcome.payments).filter((payment) => payment.status === 'coming')
}
export function UpcomingAmount({ data }: DataCalculationProps): number {
    return data.flatMap((outcome) => outcome.payments).filter((payment) => payment.status === 'coming').
        reduce((sum, payment) => sum + payment.amount, 0)
}
export function OutcomeSourcesList({ data }: DataCalculationProps): object {
    return data.map((d) => ({
        name: d.sourceName,
        amount: d.payments.reduce((sum, p) => sum + p.amount, 0),
        unit: '$'
    }))
}
