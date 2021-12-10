import bcrypt from 'bcrypt';
import faker from 'faker';
import { v4 as uuid } from 'uuid';
import connection from '../database/database.js';

async function createUser() {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: '123456',
    hashedPassword: bcrypt.hashSync('123456', 10),
  };

  const insertedUser = await connection.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [user.name, user.email, user.hashedPassword],
  );

  user.id = insertedUser.rows[0].id;

  return user;
}

async function eraseUserAndSessionsTable() {
  await connection.query('DELETE FROM sessions;DELETE FROM users;');
}

async function userSession(id) {
  const token = uuid();
  await connection.query(
    `
          INSERT INTO sessions (user_id, token)
          VALUES ($1, $2) RETURNING *
        `,
    // eslint-disable-next-line comma-dangle
    [id, token],
  );
  return token;
}

export { createUser, eraseUserAndSessionsTable, userSession };
