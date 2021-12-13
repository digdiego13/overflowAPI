import connection from '../database/database'
import { Question, QuestionDB } from '../interfaces/questionsInterfaces'
import dayjs from 'dayjs'

async function selectQuestion({ question, classroom, student }: Question): Promise<QuestionDB> {
    console.log("Chgou no rep")
    const questionInfo = await connection.query(`
    SELECT * FROM questions WHERE question = $1 AND classroom = $2;
    `, [question, classroom])
    return questionInfo.rows[0];
}

async function InsertQuestion({ question, classroom, student, tags }: Question): Promise<QuestionDB> {
    const today = dayjs().format('YYYY/MM/DD');
    console.log(today)
    const questionInfo = await connection.query(`
    INSERT INTO questions (question, classroom, student, tags, "submitAt", answered) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ;
    `, [question, classroom, student, tags, today, false])
    console.log(questionInfo.rows[0])
    return questionInfo.rows[0];
}

async function selectQuestionById(id:number): Promise<QuestionDB> {
    const questionInfo = await connection.query(`
    SELECT * FROM questions WHERE id = $1;
    `, [id])
    return questionInfo.rows[0];
}

export {
    selectQuestion,
    InsertQuestion,
    selectQuestionById
}