import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use('/app/v1', appRouter);
export default app;
//# sourceMappingURL=app.js.map