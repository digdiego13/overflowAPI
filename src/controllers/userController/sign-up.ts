import { Request, Response } from 'express';

async function signUp(req: Request, res: Response) {
    

    return res.send("Server online")
}

export default signUp