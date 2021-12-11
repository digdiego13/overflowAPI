import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';
import signUp from './controllers/userController/sign-up';
const app = express();
app.use(cors());
app.use(express.json());

app.post('/users', signUp)
//app.use(userRouter);

export default app;
