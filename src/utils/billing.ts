export type PaymentStatus =
    | "Pending"
    | "Partial"
    | "Paid";

export const getPaymentStatus = (
    amount: number,
    paid: number
): PaymentStatus => {
    if (paid <= 0) {
        return "Pending";
    }

    if (paid >= amount) {
        return "Paid";
    }

    return "Partial";
};