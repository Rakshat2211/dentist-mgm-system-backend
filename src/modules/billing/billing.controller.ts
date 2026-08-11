import {
    Request,
    Response,
} from "express";

import BillingService from "./billing.service";

import {
    createBillSchema,
    updateBillSchema,
} from "./billing.validation";

import {
    AuthRequest,
    IdParams,
} from "../../types/request.types";

export const createBill = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const payload =
            createBillSchema.parse(req.body);

        const bill =
            await BillingService.create(
                req.user.userId,
                payload
            );

        return res.status(201).json({
            success: true,
            data: bill,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getBills = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const bills =
            await BillingService.getAll(
                req.user.userId
            );

        return res.json({
            success: true,
            data: bills,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getBill = async (
    req: AuthRequest &
        Request<IdParams>,
    res: Response
) => {
    try {
        const bill =
            await BillingService.getById(
                req.user.userId,
                req.params.id
            );

        return res.json({
            success: true,
            data: bill,
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateBill = async (
    req: AuthRequest &
        Request<IdParams>,
    res: Response
) => {
    try {
        const payload =
            updateBillSchema.parse(req.body);

        const bill =
            await BillingService.update(
                req.user.userId,
                req.params.id,
                payload
            );

        return res.json({
            success: true,
            data: bill,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteBill = async (
    req: AuthRequest &
        Request<IdParams>,
    res: Response
) => {
    try {
        await BillingService.delete(
            req.user.userId,
            req.params.id
        );

        return res.json({
            success: true,
            message:
                "Bill deleted successfully.",
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};