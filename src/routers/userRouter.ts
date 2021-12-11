import { Router } from "express";
import signUp from "../controllers/userController/sign-up";

const userRouter = new (Router() as any);

userRouter.post('/users', signUp)

export default userRouter;