import Appointment from "./appointment.model";
import Patient from "../patients/patient.model";
import User from "../users/user.model";

import type {
    CreateAppointmentInput,
    UpdateAppointmentInput,
} from "./appointment.validation";

export const createAppointment = async (
    data: CreateAppointmentInput
) => {
    const patient =
        await Patient.findById(data.patientId);

    if (!patient) {
        throw new Error(
            "Patient not found."
        );
    }

    const doctor =
        await User.findById(data.doctorId);

    if (!doctor) {
        throw new Error(
            "Doctor not found."
        );
    }

    if (doctor.role !== "Doctor") {
        throw new Error(
            "Selected user is not a doctor."
        );
    }

    return await Appointment.create(data);
};

export const getAppointments =
    async () => {
        return await Appointment.find()
            .populate(
                "patientId",
                "name phone age gender"
            )
            .populate(
                "doctorId",
                "name email"
            )
            .sort({
                date: 1,
                time: 1,
            });
    };

export const getAppointmentById =
    async (id: string) => {
        const appointment =
            await Appointment.findById(id)
                .populate(
                    "patientId",
                    "name phone age gender"
                )
                .populate(
                    "doctorId",
                    "name email"
                );

        if (!appointment) {
            throw new Error(
                "Appointment not found."
            );
        }

        return appointment;
    };

export const updateAppointment =
    async (
        id: string,
        data: UpdateAppointmentInput
    ) => {
        if (data.patientId) {
            const patient =
                await Patient.findById(
                    data.patientId
                );

            if (!patient) {
                throw new Error(
                    "Patient not found."
                );
            }
        }

        if (data.doctorId) {
            const doctor =
                await User.findById(
                    data.doctorId
                );

            if (!doctor) {
                throw new Error(
                    "Doctor not found."
                );
            }

            if (
                doctor.role !==
                "Doctor"
            ) {
                throw new Error(
                    "Selected user is not a doctor."
                );
            }
        }

        const appointment =
            await Appointment.findByIdAndUpdate(
                id,
                data,
                {
                    new: true,
                    runValidators: true,
                }
            )
                .populate(
                    "patientId",
                    "name phone age gender"
                )
                .populate(
                    "doctorId",
                    "name email"
                );

        if (!appointment) {
            throw new Error(
                "Appointment not found."
            );
        }

        return appointment;
    };

export const deleteAppointment =
    async (id: string) => {
        const appointment =
            await Appointment.findByIdAndDelete(
                id
            );

        if (!appointment) {
            throw new Error(
                "Appointment not found."
            );
        }
    };