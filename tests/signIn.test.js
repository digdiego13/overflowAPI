import supertest from 'supertest';
import connection from '../src/database/database.js';
import app from '../src/app.js';
import { createUser } from '../src/factories/userFactory.js';

describe('POST /sign-in', () => {
  afterAll(async () => {
    //await eraseUserAndSessionsTable();
    connection.end();
  });
  test('returns 200 and body when login is correct', async () => {
    const user = await createUser();
    const result = await supertest(app)
      .post('/sign-in')
      .send({ email: user.email, password: user.password });
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({
      name: user.name,
      token: expect.any(String),
      email: user.email,
    });
  });

  test('returns 403 when login is NOT correct', async () => {
    const user = await createUser();
    const result = await supertest(app)
      .post('/sign-in')
      .send({ email: user.email, password: 'Incorrect Password' });
    expect(result.status).toEqual(403);
  });
});
