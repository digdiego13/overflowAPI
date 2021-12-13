import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';
import questionsRouter from './routers/questionsRouter';
import middlewareError from './middlewares/errorMiddleware';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/questions', questionsRouter);
app.use('/users', userRouter);
app.use(middlewareError);

export default app;
