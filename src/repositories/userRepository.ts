import { User, UserDB } from "../controllers/userController/interfaces";
import connection from "../database/database";


async function selectUser(user:User): Promise<UserDB> {
    const selectedUser = await connection.query(`
    SELECT * FROM users WHERE name = $1 AND class = $2
    `, [user.name, user.classroom])
    return selectedUser.rows[0];
}

async function insertUser(user:User): Promise<UserDB> {
    const newUser = await connection.query(`
    INSERT INTO users (name, class, token) VALUES ($1, $2, $3) RETURNING *;
    `, [user.name, user.classroom, user.token])
    return newUser.rows[0];
}


export {
    selectUser,
    insertUser
}