import { Request, Response } from "express";

import User from "./user.model";

export const getDoctors = async (
    _req: Request,
    res: Response
) => {
    try {
        const doctors = await User.find({
            role: "Doctor",
        })
            .select("_id name email phone isActive role")
            .lean();

        return res.status(200).json({
            success: true,
            data: doctors.map((doctor) => ({
                _id: doctor._id.toString(),
                name: doctor.name,
                email: doctor.email,
                phone: doctor.phone,
                role: doctor.role,
                isActive: doctor.isActive,
            })),
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
