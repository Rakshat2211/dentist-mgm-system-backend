import { z } from "zod";

export const createBillSchema = z.object({
    patientId: z.string().min(1, "Patient is required"),

    treatment: z
        .string()
        .trim()
        .min(2, "Treatment is required"),

    amount: z
        .number()
        .positive("Amount must be greater than 0"),

    paid: z
        .number()
        .min(0, "Paid amount cannot be negative"),

    date: z.string().min(1, "Date is required"),

    notes: z.string().optional(),
});

export const updateBillSchema =
    createBillSchema.partial();

export type CreateBillDto =
    z.infer<typeof createBillSchema>;

export type UpdateBillDto =
    z.infer<typeof updateBillSchema>;