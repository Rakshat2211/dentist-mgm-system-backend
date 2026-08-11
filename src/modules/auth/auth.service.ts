import bcrypt from "bcrypt";

import User from "../users/user.model";

import { generateToken } from "../../utils/jwt";

import type {
    LoginInput,
    RegisterInput,
} from "./auth.validation";

const SALT_ROUNDS = 10;

export const register = async (
    data: RegisterInput
) => {
    const existingUser =
        await User.findOne({
            email: data.email,
        });

    if (existingUser) {
        throw new Error(
            "Email already registered."
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            data.password,
            SALT_ROUNDS
        );

    const user = await User.create({
        ...data,
        password: hashedPassword,
    });

    const token = generateToken(
        user._id.toString()
    );

    return {
        token,

        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            isActive: user.isActive,
            createdAt: user.createdAt,
        },
    };
};

export const login = async (
    data: LoginInput
) => {
    const user =
        await User.findOne({
            email: data.email,
        });

    if (!user) {
        throw new Error(
            "Invalid email or password."
        );
    }

    const isPasswordCorrect =
        await bcrypt.compare(
            data.password,
            user.password
        );

    if (!isPasswordCorrect) {
        throw new Error(
            "Invalid email or password."
        );
    }

    if (!user.isActive) {
        throw new Error(
            "Account has been disabled."
        );
    }

    const token = generateToken(
        user._id.toString()
    );

    return {
        token,

        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            isActive: user.isActive,
            createdAt: user.createdAt,
        },
    };
};

export const getCurrentUser =
    async (userId: string) => {
        const user =
            await User.findById(userId).select(
                "-password"
            );

        if (!user) {
            throw new Error(
                "User not found."
            );
        }

        return user;
    };