import { z } from "zod";

export const signupSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters"),

    email: z
        .email("Invalid email")
        .transform((email) => email.toLowerCase()),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    phone: z
        .string()
        .trim()
        .optional(),

    role: z
        .enum([
            "Admin",
            "Doctor",
            "Receptionist",
        ])
        .optional(),
});

export const signinSchema = z.object({
    email: z
        .email("Invalid email")
        .transform((email) => email.toLowerCase()),

    password: z.string().min(1),
});

export type RegisterInput = z.infer<
    typeof signupSchema
>;

export type LoginInput = z.infer<
    typeof signinSchema
>;