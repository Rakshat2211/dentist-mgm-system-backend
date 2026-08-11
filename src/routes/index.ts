import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import patientRoutes from "../modules/patients/patient.routes";
import appointmentRoutes from "../modules/appointments/appointment.routes";
import billingRoutes from "../modules/billing/billing.routes";
import backupRoutes from "../modules/backup/backup.routes";
import dashboardRoutes from "../modules/dashboard/dashboard.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/patients", patientRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/billing", billingRoutes);
router.use("/backup", backupRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;