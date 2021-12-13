import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';
import signUp from './controllers/userController/sign-up';
import * as questionController from './controllers/questionsControllers'
const app = express();
app.use(cors());
app.use(express.json());

app.post('/users', signUp)
app.post('/questions', questionController.postQuestion);
app.get('/questions/:id', questionController.getQuestions)
//app.use(userRouter);

export default app;
