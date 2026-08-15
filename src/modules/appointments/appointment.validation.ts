import { z } from "zod";

export const createAppointmentSchema =
    z.object({
        patientId: z
            .string()
            .min(1, "Patient is required"),

        doctorId: z
            .string()
            .min(1, "Doctor is required"),

        date: z.coerce.date(),

        time: z
            .string()
            .trim()
            .min(1, "Time is required"),

        purpose: z
            .string()
            .trim()
            .optional()
            .default(""),

        status: z
            .enum([
                "Scheduled",
                "Completed",
                "Cancelled",
            ])
            .optional()
            .default("Scheduled"),

        notes: z
            .string()
            .trim()
            .optional()
            .default(""),
    });

export const updateAppointmentSchema =
    createAppointmentSchema.partial();

export type CreateAppointmentInput =
    z.infer<
        typeof createAppointmentSchema
    >;

export type UpdateAppointmentInput =
    z.infer<
        typeof updateAppointmentSchema
    >;