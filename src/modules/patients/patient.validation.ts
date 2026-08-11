import { z } from "zod";

export const createPatientSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name is required"),

    phone: z
        .string()
        .trim()
        .min(10, "Phone number is invalid"),

    age: z
        .number()
        .int()
        .min(0)
        .max(120),

    gender: z.enum([
        "Male",
        "Female",
        "Other",
    ]),

    complaint: z
        .string()
        .trim()
        .min(1, "Complaint is required"),

    notes: z
        .string()
        .trim()
        .optional()
        .default(""),
});

export const updatePatientSchema =
    createPatientSchema.partial();

export type CreatePatientInput = z.infer<
    typeof createPatientSchema
>;

export type UpdatePatientInput = z.infer<
    typeof updatePatientSchema
>;