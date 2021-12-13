import connection from '../database/database';
import {
  Question,
  QuestionAnswer,
  QuestionDB,
} from '../interfaces/questionsInterfaces';
import dayjs from 'dayjs';

async function selectQuestion({
  question,
  classroom,
  student,
}: Question): Promise<QuestionDB> {
  console.log('Chgou no rep');
  const questionInfo = await connection.query(
    `
    SELECT * FROM questions WHERE question = $1 AND classroom = $2;
    `,
    [question, classroom],
  );
  return questionInfo.rows[0];
}

async function InsertQuestion({
  question,
  classroom,
  student,
  tags,
}: Question): Promise<QuestionDB> {
  const today = dayjs().format('YYYY/MM/DD');
  const questionInfo = await connection.query(
    `
    INSERT INTO questions (question, classroom, student, tags, "submitAt", answered) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ;
    `,
    [question, classroom, student, tags, today, false],
  );
  console.log(questionInfo.rows[0]);
  return questionInfo.rows[0];
}

async function selectQuestionById(id: number): Promise<QuestionDB> {
  const questionInfo = await connection.query(
    `
    SELECT * FROM questions WHERE id = $1;
    `,
    [id],
  );
  return questionInfo.rows[0];
}

async function selectNotAnswered(): Promise<QuestionDB[]> {
  const questionsList = await connection.query(`
    SELECT id, question, student, classroom, "submitAt" FROM questions WHERE answered = 'false';
    `);

  return questionsList.rows;
}

async function answerQuestion({
  questionId,
  answer,
  userName,
}: QuestionAnswer): Promise<{ status: string }> {
  const today = dayjs().format('YYYY/MM/DD');
  console.log({ questionId, answer, userName });
  await connection.query(
    `
    UPDATE questions set answered = 'true', "answeredAt" = $1, "answeredBy" = $2, answer = $3 WHERE id = $4;
    `,
    [today, userName, answer, questionId],
  );

  console.log('passou da query');

  return { status: 'ok' };
}

export {
  selectQuestion,
  InsertQuestion,
  selectQuestionById,
  selectNotAnswered,
  answerQuestion,
};
