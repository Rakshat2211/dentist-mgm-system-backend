import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";
import {
    exportBackup,
    importBackup,
} from "./backup.controller";

const router = Router();

router.use(authMiddleware);

// GET /api/backup
router.get("/", exportBackup);

// POST /api/backup/import
router.post("/import", importBackup);

export default router;