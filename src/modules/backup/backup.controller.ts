import { Response } from "express";

import Patient from "../patients/patient.model";
import Appointment from "../appointments/appointment.model";
import Bill from "../billing/billing.model";

import { AuthRequest } from "../../types/request.types";

export const exportBackup = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user.userId;

        const [patients, appointments, bills] =
            await Promise.all([
                Patient.find({
                    createdBy: userId,
                    isActive: true,
                }).lean(),

                Appointment.find({
                    createdBy: userId,
                    isActive: true,
                }).lean(),

                Bill.find({
                    createdBy: userId,
                    isActive: true,
                }).lean(),
            ]);

        const backup = {
            exportedAt: new Date().toISOString(),
            version: "1.0",
            data: {
                patients,
                appointments,
                bills,
            },
        };

        res.setHeader(
            "Content-Type",
            "application/json"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=clinic-backup-${Date.now()}.json`
        );

        return res.status(200).send(
            JSON.stringify(backup, null, 2)
        );
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};