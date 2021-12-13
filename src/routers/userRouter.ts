import { Router } from 'express';
import signUp from '../controllers/sign-up';

const userRouter = Router();

userRouter.post('', signUp);

export default userRouter;
