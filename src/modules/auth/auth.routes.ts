import { Router } from "express";

import {
    signin,
    signup,
    me,
} from "./auth.controller";

import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", authMiddleware, me);

export default router;