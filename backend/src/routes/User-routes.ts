import { Router } from "express";
import { getAllUsers, signIn, signUp } from "../controllers/user-controller.js";
import validateResource from "../middleware/validateResource.js";
import { signUpSchema, signInSchema } from "../schema/user-schema.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validateResource(signUpSchema), signUp);
userRoutes.post("/signin", validateResource(signInSchema), signIn);



export default userRoutes;