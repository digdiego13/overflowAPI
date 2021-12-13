import ConflictError from "../errors/conflictError";
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

export {
    postQuestion
}