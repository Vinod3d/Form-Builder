import { config } from "dotenv";
config();
export const {
    APP_PORT,
    MONGO_URI,
    DEBUG_MODE,
    JWT_KEY,
    JWT_EXPIRES,
    COOKIE_EXPIRES,
    FRONTEND_URL
} = process.env;
