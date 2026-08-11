import { Router } from "express";

import {
    createBill,
    getBills,
    getBill,
    updateBill,
    deleteBill,
} from "./billing.controller";

import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/", getBills);
router.get("/:id", getBill);
router.post("/", createBill);
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);

export default router;