import { Request, Response } from 'express';
import { User } from '../../interfaces/userInterfaces'
import signUpSchema from '../../schemas/signUpSchema'
import * as userServices from '../../services/userServices'
import ConflictError from '../../errors/conflictError';
import httpStatusCode from '../../enums/httpStatusCode';
async function signUp(req: Request, res: Response) {
    
    const {name, classroom}: User = req.body;
    const isCorrectBody = signUpSchema.validate(req.body);
    if (isCorrectBody.error) {
        return res.status(439).send(`${isCorrectBody.error.details[0].message}`);
    }
    try {
        console.log("chegou no controller")
       const userToken: string =  await userServices.postUser({name, classroom});
        return res.status(201).send(userToken);
    }
    catch (error: any) {
        if (error.name === "ConflictError") {
            return res.status(httpStatusCode.CONFLICT).send(error.message);
        }
        return res.sendStatus(httpStatusCode.SERVER_ERROR)
    }
}

export default signUp