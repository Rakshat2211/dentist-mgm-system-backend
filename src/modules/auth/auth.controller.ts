import { Request, Response } from "express";

import * as authService from "./auth.service";
import {
    signinSchema,
    signupSchema,
} from "./auth.validation";

export const signup = async (
    req: Request,
    res: Response
) => {
    try {
        const payload = signupSchema.parse(req.body);
        const result = await authService.register(payload);

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: result,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const signin = async (
    req: Request,
    res: Response
) => {
    try {
        const payload = signinSchema.parse(req.body);
        const result = await authService.login(payload);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: result,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const me = async (
    req: Request,
    res: Response
) => {
    try {
        const user =
            await authService.getCurrentUser(
                req.user.userId!
            );

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};