import { Request } from "express";

export interface AuthRequest extends Request {
    user: {
        userId: string;
    };
}

export interface IdParams {
    id: string;
}