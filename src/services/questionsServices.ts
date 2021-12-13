import ConflictError from "../errors/conflictError";
import NotFoundError from "../errors/notFoundError";
import { Question } from "../interfaces/questionsInterfaces";
import * as questionRepository from '../repositories/questionsRepository'


async function postQuestion({question, student, classroom, tags}:Question): Promise<number> {
    const thereIsAQuestion = await questionRepository.selectQuestion({ question, student, classroom });
    if (thereIsAQuestion) {
        throw new ConflictError("This question already exists");
    }
    const questionInfo = await questionRepository.InsertQuestion({ question, student, classroom, tags });
    const questionId: number = Number(questionInfo.id);
    return questionId;
}

async function selectQuestionById(id:number) {
    const question = await questionRepository.selectQuestionById(id);

  if (!question) {
    throw new NotFoundError();
  }
    delete question.id;
    if (!question.answered) {
    return question;
    }
    delete question.answeredAt;
    delete question.answer;
    delete question.answeredBy;

    return question;
}

export {
    postQuestion,
    selectQuestionById
}