import { Request, Response } from 'express';
import { User } from './interfaces'
import signUpSchema from '../../schemas/signUpSchema'
import * as userServices from '../../services/userServices'
import ConflictError from '../../errors/conflictError';
import httpStatusCode from '../../enums/httpStatusCode';
async function signUp(req: Request, res: Response) {
    
    const user: User = req.body;
    const isCorrectBody = signUpSchema.validate(user);
    if (isCorrectBody.error) {
        return res.status(400).send(`${isCorrectBody.error.details[0].message}`);
    }
    try {
       const userToken: string =  await userServices.postUser(user);
        res.status(201).send(userToken);
    }
    catch (error) {
        if (error instanceof ConflictError) {
            return res.sendStatus(httpStatusCode.CONFLICT);
        }
    }
}

export default signUp