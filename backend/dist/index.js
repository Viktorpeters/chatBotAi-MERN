import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import expres from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
config();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(expres.json());
app.use(expres.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
//# sourceMappingURL=index.js.map