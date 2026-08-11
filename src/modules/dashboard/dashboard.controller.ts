import { Request, Response } from "express";

import * as dashboardService from "./dashboard.service";

export const getDashboard = async (
    req: Request,
    res: Response
) => {
    try {
        const dashboard =
            await dashboardService.getDashboard();

        return res.json({
            success: true,
            data: dashboard,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to load dashboard.",
        });
    }
};