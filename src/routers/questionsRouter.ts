import { Router } from 'express';
import * as questionController from '../controllers/questionsControllers';

const questionsRouter = Router();

questionsRouter.post('', questionController.postQuestion);
questionsRouter.get('/:id', questionController.getQuestions);
questionsRouter.get('', questionController.getNotAnswered);
questionsRouter.post('/:id', questionController.postQuestionAnswer);

export default questionsRouter;
