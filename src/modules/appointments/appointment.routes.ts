import { Router } from "express";

import {
    createAppointment,
    getAppointments,
    getAppointment,
    updateAppointment,
    deleteAppointment,
} from "./appointment.controller";

import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/", getAppointments);
router.get("/:id", getAppointment);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;