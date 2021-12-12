import { User } from "../controllers/userController/interfaces";
import ConflictError from "../errors/conflictError";
import * as userRepository from '../repositories/userRepository'
import { v4 as uuid } from 'uuid';


async function postUser({name, classroom}: User) {

    const thereIsRepeatedUser = await userRepository.selectUser({name, classroom});

    if (thereIsRepeatedUser) {
        throw new ConflictError();
    }

    const token: string = uuid();

    const newUser = await userRepository.insertUser({ name, classroom, token });
    return newUser.token;
}

export {postUser}