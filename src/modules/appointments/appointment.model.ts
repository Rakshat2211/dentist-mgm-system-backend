import {
    Schema,
    model,
    Document,
    Types,
} from "mongoose";

export type AppointmentStatus =
    | "Scheduled"
    | "Completed"
    | "Cancelled";

export interface IAppointment
    extends Document {
    patientId: Types.ObjectId;
    doctorId: Types.ObjectId;
    date: Date;
    time: string;
    purpose: string;
    status: AppointmentStatus;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const appointmentSchema =
    new Schema<IAppointment>(
        {
            patientId: {
                type: Schema.Types.ObjectId,
                ref: "Patient",
                required: true,
            },

            doctorId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            date: {
                type: Date,
                required: true,
            },

            time: {
                type: String,
                required: true,
                trim: true,
            },

            purpose: {
                type: String,
                required: true,
                trim: true,
            },

            status: {
                type: String,
                enum: [
                    "Scheduled",
                    "Completed",
                    "Cancelled",
                ],
                default: "Scheduled",
            },

            notes: {
                type: String,
                trim: true,
                default: "",
            },
        },
        {
            timestamps: true,
        }
    );

const Appointment = model<IAppointment>(
    "Appointment",
    appointmentSchema
);

export default Appointment;