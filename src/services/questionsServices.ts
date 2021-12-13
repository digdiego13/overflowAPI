import ConflictError from '../errors/conflictError';
import NotFoundError from '../errors/notFoundError';
import {
  Question,
  QuestionAnswer,
  QuestionDB,
} from '../interfaces/questionsInterfaces';
import * as questionRepository from '../repositories/questionsRepository';
import * as userRepository from '../repositories/userRepository';

async function postQuestion({
  question,
  student,
  classroom,
  tags,
}: Question): Promise<number> {
  const thereIsAQuestion = await questionRepository.selectQuestion({
    question,
    student,
    classroom,
  });
  if (thereIsAQuestion) {
    throw new ConflictError('This question already exists');
  }
  const questionInfo = await questionRepository.InsertQuestion({
    question,
    student,
    classroom,
    tags,
  });
  const questionId: number = Number(questionInfo.id);
  return questionId;
}

async function selectQuestionById(id: number) {
  const question = await questionRepository.selectQuestionById(id);

  if (!question) {
    throw new NotFoundError('Question not found');
  }
  delete question.id;
  if (question.answered === 'true') {
    return question;
  }
  delete question.answeredAt;
  delete question.answer;
  delete question.answeredBy;

  return question;
}

async function selectNotAnswered(): Promise<QuestionDB[]> {
  const questionsNotAnswered = await questionRepository.selectNotAnswered();
  if (questionsNotAnswered.length === 0) {
    throw new NotFoundError(' Question not found');
  }
  return questionsNotAnswered;
}

async function postQuestionAnswer({
  answer,
  questionId,
  token,
}: QuestionAnswer): Promise<string> {
  const chosenQuestion = await questionRepository.selectQuestionById(
    questionId,
  );

  console.log(chosenQuestion);
  if (!chosenQuestion) {
    throw new NotFoundError('question Not found');
  }
  if (chosenQuestion.answered === 'true') {
    throw new ConflictError('this question is already aswered');
  }
  const user = await userRepository.selectUserByToken({ token });
  console.log(Boolean(user));
  if (!user) {
    throw new NotFoundError('User not found');
  }
  console.log('passou do if');
  const answerQuestion = await questionRepository.answerQuestion({
    questionId,
    answer,
    userName: user.name,
  });
  return 'question answered';
}

export {
  postQuestion,
  selectQuestionById,
  selectNotAnswered,
  postQuestionAnswer,
};
