import express from "express";
import { connectToDatabase, disconnectFromDatabase } from "./db/connection.js";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import expres, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
config();

const PORT = process.env.PORT || 5000;

const app = expres();

app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(expres.json());
app.use(expres.urlencoded({ extended: true }));
app.use("/api/v1", appRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: error.message,
  });
});

connectToDatabase().then(() => {
  app
    .listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
    .on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use.`);
        process.exit(1);
      } else {
        throw err;
      }
    });
});

