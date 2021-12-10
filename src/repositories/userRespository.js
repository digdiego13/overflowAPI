import connection from '../database/database.js';

async function selectEmail({ email }) {
  const result = await connection.query(
    `
        SELECT * FROM users
        WHERE email = $1
    `,
    // eslint-disable-next-line comma-dangle
    [email],
  );
  return result.rows[0];
}

async function insertSession({ id, token }) {
  await connection.query(
    `
          INSERT INTO sessions ("user_id", token)
          VALUES ($1, $2)
        `,
    // eslint-disable-next-line comma-dangle
    [id, token],
  );
}

async function inserUser({ username, email, passwordHash }) {
  await connection.query(
    `
        INSERT INTO users
        (name, email, password)
        VALUES ($1, $2, $3)
    `,
    // eslint-disable-next-line comma-dangle
    [username, email, passwordHash],
  );
}

async function existEmail({ email }) {
  const result = await connection.query(
    `
        SELECT * FROM users
        WHERE email = $1
    `,
    // eslint-disable-next-line comma-dangle
    [email],
  );

  if (result.rowCount !== 0) {
    return true;
  }

  return false;
}

export { selectEmail, insertSession, inserUser, existEmail };
