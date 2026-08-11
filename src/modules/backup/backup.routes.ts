import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";
import { exportBackup } from "./backup.controller";

const router = Router();

router.use(authMiddleware);

// GET /api/backup
router.get("/", exportBackup);

export default router;