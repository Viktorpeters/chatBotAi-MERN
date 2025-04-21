import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
config();
const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));
app.use(cookieParser());
export default app;
//# sourceMappingURL=app.js.map