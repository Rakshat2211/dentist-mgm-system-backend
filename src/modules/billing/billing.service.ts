import Bill from "../billing/billing.model";
import Patient from "../patients/patient.model";

import {
    CreateBillDto,
    UpdateBillDto,
} from "./billing.validation";

import { getPaymentStatus } from "../../utils/billing";

class BillingService {
    async create(
        userId: string,
        payload: CreateBillDto
    ) {
        const patient = await Patient.findOne({
            _id: payload.patientId,
            isActive: true,
        });

        if (!patient) {
            throw new Error("Patient not found.");
        }

        const bill = await Bill.create({
            ...payload,
            createdBy: userId,
        });

        return {
            ...bill.toObject(),
            status: getPaymentStatus(
                bill.amount,
                bill.paid
            ),
        };
    }

    async getAll(userId: string) {
        const bills = await Bill.find({
            createdBy: userId,
            isActive: true,
        })
            .populate("patientId", "name phone")
            .sort({
                date: -1,
            });

        return bills.map((bill) => ({
            ...bill.toObject(),
            status: getPaymentStatus(
                bill.amount,
                bill.paid
            ),
        }));
    }

    async getById(
        userId: string,
        id: string
    ) {
        const bill = await Bill.findOne({
            _id: id,
            createdBy: userId,
            isActive: true,
        }).populate("patientId", "name phone");

        if (!bill) {
            throw new Error("Bill not found.");
        }

        return {
            ...bill.toObject(),
            status: getPaymentStatus(
                bill.amount,
                bill.paid
            ),
        };
    }

    async update(
        userId: string,
        id: string,
        payload: UpdateBillDto
    ) {
        if (payload.patientId) {
            const patient = await Patient.findOne({
                _id: payload.patientId,
                isActive: true,
            });

            if (!patient) {
                throw new Error("Patient not found.");
            }
        }

        const bill = await Bill.findOneAndUpdate(
            {
                _id: id,
                createdBy: userId,
                isActive: true,
            },
            payload,
            {
                new: true,
                runValidators: true,
            }
        ).populate("patientId", "name phone");

        if (!bill) {
            throw new Error("Bill not found.");
        }

        return {
            ...bill.toObject(),
            status: getPaymentStatus(
                bill.amount,
                bill.paid
            ),
        };
    }

    async delete(
        userId: string,
        id: string
    ) {
        const bill = await Bill.findOneAndUpdate(
            {
                _id: id,
                createdBy: userId,
            },
            {
                isActive: false,
            },
            {
                new: true,
            }
        );

        if (!bill) {
            throw new Error("Bill not found.");
        }

        return bill;
    }
}

export default new BillingService();