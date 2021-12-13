import { User, UserDB } from '../interfaces/userInterfaces';
import connection from '../database/database';

async function selectUser({ name, classroom }: User): Promise<UserDB> {
  const selectedUser = await connection.query(
    `
    SELECT * FROM users WHERE name = $1 AND classroom = $2
    `,
    [name, classroom],
  );
  console.log(selectedUser.rows[0]);
  return selectedUser.rows[0];
}

async function insertUser({ name, classroom, token }: User): Promise<UserDB> {
  const newUser = await connection.query(
    `
    INSERT INTO users (name, classroom, token) VALUES ($1, $2, $3) RETURNING *;
    `,
    [name, classroom, token],
  );
  return newUser.rows[0];
}

async function selectUserByToken({ token }: { token: string }) {
  const user = await connection.query(
    `
    SELECT * FROM users WHERE token=$1
    `,
    [token],
  );

  return user.rows[0];
}

export { selectUser, insertUser, selectUserByToken };
