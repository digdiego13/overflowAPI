interface Question {
  question: string;
  student: string;
  classroom: string;
  tags?: string;
}

interface QuestionDB extends Question {
  id: number;
  answered: string;
  submitAt: string;
  answeredAt?: string;
  answeredBy?: string;
  answer?: string;
}

interface QuestionAnswer {
  answer: string;
  questionId: number;
  token?: string;
  userName?: string;
}

export { Question, QuestionDB, QuestionAnswer };
