import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
export default app;
//# sourceMappingURL=app.js.map