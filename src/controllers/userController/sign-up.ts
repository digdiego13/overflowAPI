import { Request, Response } from 'express';
import { User } from './interfaces'
import signUpSchema from '../../schemas/signUpSchema'
async function signUp(req: Request, res: Response) {
    
    const user: User = req.body;
    const isCorrectBody = signUpSchema.validate(user);
    if (isCorrectBody.error) {
        return res.status(400).send(`${isCorrectBody.error.details[0].message}`);
    }
    try {
        
    }
    catch (error) {

    }
    return res.send("Server online")
}

export default signUp