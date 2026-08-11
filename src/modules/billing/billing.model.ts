import { Schema, model, Types } from "mongoose";

export interface IBill {
    patientId: Types.ObjectId;
    treatment: string;
    amount: number;
    paid: number;
    date: Date;
    notes?: string;
    createdBy: Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const billingSchema = new Schema<IBill>(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },

        treatment: {
            type: String,
            required: true,
            trim: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        paid: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        date: {
            type: Date,
            required: true,
        },

        notes: {
            type: String,
            default: "",
            trim: true,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model<IBill>("Bill", billingSchema);