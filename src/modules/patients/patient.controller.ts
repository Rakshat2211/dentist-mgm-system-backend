import { Request, Response } from "express";
import { ZodError } from "zod";

import * as patientService from "./patient.service";

import {
    createPatientSchema,
    updatePatientSchema,
} from "./patient.validation";

interface PatientParams {
    id: string;
}

export const createPatient = async (
    req: Request<PatientParams>,
    res: Response
) => {
    try {
        const payload =
            createPatientSchema.parse(req.body);

        const patient =
            await patientService.createPatient(
                payload
            );

        return res.status(201).json({
            success: true,
            message:
                "Patient created successfully.",
            data: patient,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.issues,
            });
        }

        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getPatients = async (
    req: Request<PatientParams>,
    res: Response
) => {
    try {
        const patients =
            await patientService.getPatients();

        return res.json({
            success: true,
            data: patients,
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getPatient = async (
    req: Request<PatientParams>,
    res: Response
) => {
    try {
        const patient =
            await patientService.getPatientById(
                req.params.id
            );

        return res.json({
            success: true,
            data: patient,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Patient not found.",
        });
    }
};

export const updatePatient = async (
    req: Request<PatientParams>,
    res: Response
) => {
    try {
        const payload =
            updatePatientSchema.parse(req.body);

        const patient =
            await patientService.updatePatient(
                req.params.id,
                payload
            );

        return res.json({
            success: true,
            message:
                "Patient updated successfully.",
            data: patient,
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

export const deletePatient = async (
    req: Request<PatientParams>,
    res: Response
) => {
    try {
        await patientService.deletePatient(
            req.params.id
        );

        return res.json({
            success: true,
            message:
                "Patient deleted successfully.",
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Patient not found.",
        });
    }
};