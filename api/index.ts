import dotenv from "dotenv";

dotenv.config();

import app from "../src/app";
import connectDB from "../src/config/db";

let isConnected = false;

const handler = async (req: any, res: any) => {
    try {
        if (!isConnected) {
            await connectDB();
            isConnected = true;
        }

        return app(req, res);
    } catch (error) {
        console.error("Database connection failed:", error);

        return res.status(500).json({
            success: false,
            message: "Database connection failed",
        });
    }
};

export default handler;