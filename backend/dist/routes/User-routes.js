import { Router } from "express";
import { getAllUsers, signIn, signUp, signOut, refresh, authStatus } from "../controllers/user-controller.js";
import validateResource from "../middleware/validateResource.js";
import { signUpSchema, signInSchema } from "../schema/user-schema.js";
import { protectedRoute } from "../middleware/protected.js";
const userRoutes = Router();
userRoutes.get("/", protectedRoute, getAllUsers);
userRoutes.post("/signup", validateResource(signUpSchema), signUp);
userRoutes.post("/signin", validateResource(signInSchema), signIn);
userRoutes.get("/logout", signOut);
userRoutes.get("/refresh", protectedRoute, refresh);
// this route assumes you have no token but only the refresh token
userRoutes.get('/auth-status', authStatus);
export default userRoutes;
//# sourceMappingURL=User-routes.js.map