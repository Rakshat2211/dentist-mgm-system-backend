import { Request, Response } from "express";
import { ZodError } from "zod";

import * as appointmentService from "./appointment.service";

import {
    createAppointmentSchema,
    updateAppointmentSchema,
} from "./appointment.validation";

import type { IdParams } from "../../types/request.types";

export const createAppointment = async (
    req: Request,
    res: Response
) => {
    try {
        const payload =
            createAppointmentSchema.parse(req.body);

        const appointment =
            await appointmentService.createAppointment(
                payload
            );

        return res.status(201).json({
            success: true,
            message:
                "Appointment created successfully.",
            data: appointment,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.issues,
            });
        }

        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong.",
        });
    }
};

export const getAppointments = async (
    req: Request,
    res: Response
) => {
    try {
        const appointments =
            await appointmentService.getAppointments();

        return res.status(200).json({
            success: true,
            data: appointments,
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getAppointment = async (
    req: Request<IdParams>,
    res: Response
) => {
    try {
        const appointment =
            await appointmentService.getAppointmentById(
                req.params.id
            );

        return res.status(200).json({
            success: true,
            data: appointment,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Appointment not found.",
        });
    }
};

export const updateAppointment = async (
    req: Request<IdParams>,
    res: Response
) => {
    try {
        const payload =
            updateAppointmentSchema.parse(req.body);

        const appointment =
            await appointmentService.updateAppointment(
                req.params.id,
                payload
            );

        return res.status(200).json({
            success: true,
            message:
                "Appointment updated successfully.",
            data: appointment,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.issues,
            });
        }

        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong.",
        });
    }
};

export const deleteAppointment = async (
    req: Request<IdParams>,
    res: Response
) => {
    try {
        await appointmentService.deleteAppointment(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message:
                "Appointment deleted successfully.",
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Appointment not found.",
        });
    }
};