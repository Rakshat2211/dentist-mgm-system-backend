import { Schema, model, Document } from "mongoose";

export type Gender =
    | "Male"
    | "Female"
    | "Other";

export interface IPatient extends Document {
    name: string;
    phone: string;
    age: number;
    gender: Gender;
    complaint: string;
    notes?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const patientSchema = new Schema<IPatient>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        age: {
            type: Number,
            required: true,
            min: 0,
        },

        gender: {
            type: String,
            enum: [
                "Male",
                "Female",
                "Other",
            ],
            required: true,
        },

        complaint: {
            type: String,
            required: true,
            trim: true,
        },

        notes: {
            type: String,
            default: "",
            trim: true,
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

const Patient = model<IPatient>(
    "Patient",
    patientSchema
);

export default Patient;