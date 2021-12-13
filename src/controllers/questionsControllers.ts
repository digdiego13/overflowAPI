import { Request, Response } from 'express';
import httpStatusCode from '../enums/httpStatusCode';
import { Question } from '../interfaces/questionsInterfaces';
import questionSchema from '../schemas/questionSchema';
import * as questionsServices from '../services/questionsServices'

async function postQuestion(req: Request, res: Response) {
    
    const { question, student, classroom, tags }: Question = req.body;
    const isCorrectBody = questionSchema.validate(req.body);
    if (isCorrectBody.error) {
        return res.status(400).send(`${isCorrectBody.error.details[0].message}`);
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

export {postQuestion}