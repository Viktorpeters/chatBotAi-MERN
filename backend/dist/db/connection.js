import { connect, disconnect } from "mongoose";
import { config } from "dotenv";
config();
const connectToDatabase = async () => {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Error connecting to MongoDb");
    }
};
const disconnectFromDatabase = async () => {
    try {
        await disconnect();
    }
    catch (error) {
        throw new Error("Error disconnecting from Mongo");
    }
};
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map