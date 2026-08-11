import { Schema, model, Document } from "mongoose";

export type UserRole =
    | "Admin"
    | "Doctor"
    | "Receptionist";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: [
                "Admin",
                "Doctor",
                "Receptionist",
            ],
            default: "Receptionist",
        },

        phone: {
            type: String,
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

const User = model<IUser>(
    "User",
    userSchema
);

export default User;