import supertest from 'supertest';
import bcrypt from 'bcrypt';
import connection from '../src/database/database.js';
import app from '../src/app.js';

describe('POST /sign-up', () => {
  const password = '123456';
  const passwordHash = bcrypt.hashSync(password, 10);
  const correctBody = {
    name: 'teste',
    email: 'teste@gmail.com',
    password: passwordHash,
  };

  afterAll(async () => {
    await connection.query(`
    DELETE FROM users WHERE email = 'didi@gmail.com';
`);
    connection.end();
  });

  test('Returns 400 if there is an incorrect body', async () => {
    const incorrectBody = {
      name: 'teste',
      email: '',
      password: '',
    };
    const result = await supertest(app).post('/sign-up').send(incorrectBody);
    expect(result.status).toEqual(400);
  });

  test('Returns 200 if there is a correct body', async () => {
    const result = await supertest(app).post('/sign-up').send(correctBody);
    expect(result.status).toEqual(400);
  });

  test('Returns 403 if email is been used', async () => {
    const result = await supertest(app).post('/sign-up').send(correctBody);
    expect(result.status).toEqual(400);
  });
});
