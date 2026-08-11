import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";

import {
    createPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient,
} from "./patient.controller";

const router = Router();

router.use(authMiddleware);
router.post("/", createPatient);
router.get("/", getPatients);
router.get("/:id", getPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;