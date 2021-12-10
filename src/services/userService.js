import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import * as userRepository from '../repositories/userRespository.js';

async function loginService({ email, password }) {
  const user = await userRepository.selectEmail({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    // sucesso, usuário encontrado com este email e senha!
    const token = uuid();
    await userRepository.insertSession({ id: user.id, token });
    return {
      message: 'login realized',
      status: 0,
      email: user.email,
      adress: user.adress,
      name: user.name,
      token,
    };
  }
  // usuário não encontrado (email ou senha incorretos)
  return {
    message: 'user not found',
    status: 1,
  };
}

async function logonService({ email, password, username }) {
  const passwordHash = bcrypt.hashSync(password, 10);
  const existEmail = await userRepository.existEmail({ email });

  if (existEmail) {
    return { status: 1 };
  }

  await userRepository.inserUser({ email, passwordHash, username });
  return { status: 0 };
}

export { loginService, logonService };
