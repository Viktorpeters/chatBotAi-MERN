import dotenv from "dotenv";
dotenv.config();
const appConfig = () => ({
    GOOGLE_AI_SECRET: getEnv("GOOGLE_AI_SECRET"),
    MONGODB_URL: getEnv("MONGODB_URL"),
    JWT_SECRET: getEnv("JWT_SECRET"),
    PORT: getEnv("PORT"),
    ACCESS_EXPIRY_TIME: getEnv("ACCESS_EXPIRY_TIME"),
    REFRESH_EXPIRY_TIME: getEnv("REFRESH_EXPIRY_TIME"),
    COOKIE_EXP_TIME: getEnv("COOKIE_EXP_TIME"),
    ORGANIZATION_ID: getEnv("ORGANIZATION_ID"),
});
const getEnv = (key, defaultValue = "") => {
    const value = process.env[key];
    if (value === undefined) {
        return defaultValue;
    }
    return value;
};
export const appCOnfigurations = appConfig();
//# sourceMappingURL=app.config.js.map