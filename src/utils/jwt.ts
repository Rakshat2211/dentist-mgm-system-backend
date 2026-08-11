import jwt from "jsonwebtoken";

import { env } from "../config/env";
import type { JwtPayload } from "../types/jwt.types";

export const generateToken = (
    userId: string
): string => {
    return jwt.sign(
        { userId },
        env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

export const verifyToken = (
    token: string
): JwtPayload => {
    return jwt.verify(
        token,
        env.JWT_SECRET
    ) as JwtPayload;
};