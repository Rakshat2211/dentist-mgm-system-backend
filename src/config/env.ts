const parseOrigins = (value?: string) =>
    value
        ? value
              .split(",")
              .map((origin) => origin.trim())
              .filter(Boolean)
        : [];

export const env = {
    PORT: Number(process.env.PORT) || 3000,
    CLIENT_URL:
        process.env.CLIENT_URL ?? "http://localhost:5173",
    CLIENT_URLS: [
        "http://localhost:5173",
        "http://localhost:3000",
        ...parseOrigins(process.env.CLIENT_URL),
        ...parseOrigins(process.env.CLIENT_URLS),
    ],
    MONGO_URI: process.env.MONGO_URI ?? "",
    JWT_SECRET: process.env.JWT_SECRET ?? "",
};