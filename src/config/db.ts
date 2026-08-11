import mongoose from "mongoose";
import { env } from "./env";

const connectDB = async (): Promise<void> => {
    try {
        const mongoUri = env.MONGO_URI;

        if (!mongoUri) {
            console.log(mongoUri)
            throw new Error("MONGO_URI is not defined");
        }

        await mongoose.connect(mongoUri);

        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed");
        console.error(error);

        process.exit(1);
    }
};

export default connectDB;