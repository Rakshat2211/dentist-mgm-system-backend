import Patient from "./patient.model";

import type {
    CreatePatientInput,
    UpdatePatientInput,
} from "./patient.validation";

export const createPatient = async (
    data: CreatePatientInput
) => {
    return await Patient.create(data);
};

export const getPatients = async () => {
    return await Patient.find({
        isActive: true,
    }).sort({
        createdAt: -1,
    });
};

export const getPatientById = async (
    id: string
) => {
    const patient =
        await Patient.findOne({
            _id: id,
            isActive: true,
        });

    if (!patient) {
        throw new Error(
            "Patient not found."
        );
    }

    return patient;
};

export const updatePatient = async (
    id: string,
    data: UpdatePatientInput
) => {
    const patient =
        await Patient.findOneAndUpdate(
            {
                _id: id,
                isActive: true,
            },
            data,
            {
                new: true,
                runValidators: true,
            }
        );

    if (!patient) {
        throw new Error(
            "Patient not found."
        );
    }

    return patient;
};

export const deletePatient = async (
    id: string
) => {
    const patient =
        await Patient.findOneAndUpdate(
            {
                _id: id,
                isActive: true,
            },
            {
                isActive: false,
            },
            {
                new: true,
            }
        );

    if (!patient) {
        throw new Error(
            "Patient not found."
        );
    }
};