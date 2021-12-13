import { Request, Response } from 'express';
import httpStatusCode from '../enums/httpStatusCode';
import { Question, QuestionAnswer } from '../interfaces/questionsInterfaces';
import answerSchema from '../schemas/answerSchema';
import questionSchema from '../schemas/questionSchema';
import * as questionsServices from '../services/questionsServices'

async function postQuestion(req: Request, res: Response) {
    
    const { question, student, classroom, tags }: Question = req.body;
    const isCorrectBody = questionSchema.validate(req.body);
    if (isCorrectBody.error) {
        return res.status(httpStatusCode.BAD_REQUEST).send(`${isCorrectBody.error.details[0].message}`);
    }
    try {
        const questionId = await questionsServices.postQuestion({ question, student, classroom, tags })
        console.log(questionId)
        return res.status(201).send({id: questionId});
    }
    catch (error: any) {
        if (error.name === "ConflictError") {
            return res.status(httpStatusCode.CONFLICT).send(error.message);
        }
        return res.sendStatus(httpStatusCode.SERVER_ERROR)
    }
}

async function getQuestions(req: Request, res: Response) {
    
    const { id } = req.params;
  const questionId = Number(id);
    try {
        const question= await questionsServices.selectQuestionById(questionId)
        
        return res.status(200).send(question);
    }
    catch (error: any) {
        if (error.name === "NotFoundError") {
            return res.status(httpStatusCode.NOT_FOUND).send(error.message);
        }
        return res.sendStatus(httpStatusCode.SERVER_ERROR)
    }
}

async function getNotAnswered(req: Request, res: Response) {
    
    try {
        const question= await questionsServices.selectNotAnswered()
        
        return res.status(200).send(question);
    }
    catch (error: any) {
        if (error.name === "NotFoundError") {
            return res.status(httpStatusCode.NOT_FOUND).send(error.message);
        }
        return res.sendStatus(httpStatusCode.SERVER_ERROR)
    }
}

async function postQuestionAnswer(req: Request, res: Response) {
    
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);
    const { id } = req.params;
    const questionId = Number(id);
    const { answer}: {answer: string} = req.body;
    const isCorrectBody = answerSchema.validate(req.body);
    if (isCorrectBody.error) {
        return res.status(httpStatusCode.BAD_REQUEST).send(`${isCorrectBody.error.details[0].message}`);
    }
    try {
        const answerQuestion = await questionsServices.postQuestionAnswer({ answer, questionId, token })
        return res.status(201).send(answerQuestion);
    }
    catch (error: any) {
        if (error.name === "ConflictError") {
            return res.status(httpStatusCode.CONFLICT).send(error.message);
        }
        if (error.name === "NotFoundError") {
            return res.status(httpStatusCode.NOT_FOUND).send(error.message);
        }
        return res.sendStatus(httpStatusCode.SERVER_ERROR)
    }
}

export {postQuestion, getQuestions, getNotAnswered, postQuestionAnswer}