
interface Question {
    question: string,
    student: string,
    classroom: string,
    tags?: string,
}

interface QuestionDB extends Question {
  id: number,
  answered: boolean,
  submitAt: string,
  answeredAt?: string,
  answeredBy?: string,
  answer?: string
}

export {
    Question,
    QuestionDB
}