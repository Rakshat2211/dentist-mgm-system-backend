export const env = {
    PORT: Number(process.env.PORT) || 3000,
    CLIENT_URL:
        process.env.CLIENT_URL ?? "http://localhost:5173",
    MONGO_URI: process.env.MONGO_URI ?? "",
    JWT_SECRET: process.env.JWT_SECRET ?? "",
};