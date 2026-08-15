import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";
import { getDoctors } from "./user.controller";

const router = Router();

router.use(authMiddleware);
router.get("/doctors", getDoctors);

export default router;
