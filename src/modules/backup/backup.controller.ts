import { Response } from "express";

import Patient from "../patients/patient.model";
import Appointment from "../appointments/appointment.model";
import Bill from "../billing/billing.model";

import { AuthRequest } from "../../types/request.types";

const parseBackupPayload = (payload: unknown) => {
    if (!payload) {
        throw new Error("Backup payload is required.");
    }

    const backup =
        typeof payload === "string"
            ? JSON.parse(payload)
            : payload;

    if (!backup || typeof backup !== "object") {
        throw new Error("Backup payload must be an object.");
    }

    if (!backup.data || typeof backup.data !== "object") {
        throw new Error("Backup payload is missing the data object.");
    }

    return backup;
};

export const exportBackup = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user.userId;

        const [patients, appointments, bills] =
            await Promise.all([
                Patient.find({
                    isActive: true,
                }).lean(),

                Appointment.find().lean(),

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

        const fileName = `clinic-backup-${Date.now()}.json`;

        res.setHeader("Content-Type", "application/json");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${fileName}"`
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

export const importBackup = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const backup = parseBackupPayload(req.body);

        const patients = Array.isArray(backup.data.patients)
            ? backup.data.patients
            : [];
        const appointments = Array.isArray(
            backup.data.appointments
        )
            ? backup.data.appointments
            : [];
        const bills = Array.isArray(backup.data.bills)
            ? backup.data.bills
            : [];

        await Promise.all([
            Patient.deleteMany({}),
            Appointment.deleteMany({}),
            Bill.deleteMany({}),
        ]);

        if (patients.length > 0) {
            await Patient.insertMany(patients);
        }

        if (appointments.length > 0) {
            await Appointment.insertMany(appointments);
        }

        if (bills.length > 0) {
            await Bill.insertMany(bills);
        }

        return res.status(200).json({
            success: true,
            message: "Backup restored successfully.",
            restored: {
                patients: patients.length,
                appointments: appointments.length,
                bills: bills.length,
            },
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message:
                error.message ||
                "Invalid backup file. Please upload a valid clinic backup JSON.",
        });
    }
};