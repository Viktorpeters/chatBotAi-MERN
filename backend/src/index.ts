import app from "./app.js";
import { connectToDatabase, disconnectFromDatabase } from "./db/connection.js";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import expres from "express";

const PORT = process.env.PORT || 5000;

app.use(expres.json());
app.use(expres.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/api/v1", appRouter);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});