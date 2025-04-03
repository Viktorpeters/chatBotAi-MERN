import { Router } from "express";
import userRoutes from "./User-routes.js";
import chatRoutes from "./Chat-routes.js";
const appRouter = Router();
appRouter.use('/user', userRoutes);
appRouter.use('/chats', chatRoutes);
export default appRouter;
//# sourceMappingURL=index.js.map