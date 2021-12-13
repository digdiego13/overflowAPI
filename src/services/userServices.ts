import { User } from '../interfaces/userInterfaces';
import ConflictError from '../errors/conflictError';
import * as userRepository from '../repositories/userRepository';
import { v4 as uuid } from 'uuid';

async function postUser({ name, classroom }: User) {
  const thereIsRepeatedUser = await userRepository.selectUser({
    name,
    classroom,
  });
  console.log('chegou no service');
  if (thereIsRepeatedUser) {
    throw new ConflictError('Name already exists');
  }

  const token: string = uuid();

  const newUser = await userRepository.insertUser({ name, classroom, token });
  return newUser.token;
}

export { postUser };
