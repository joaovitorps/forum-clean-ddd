import type { Answer } from "../../enterprise/entities/answer";
import type { AnswerRepository } from "../repositories/answer-repository";

interface FetchAnswersByQuestionUseCaseParams {
  questionId: string;
  page: number;
}

interface FetchAnswersByQuestionUseCaseReturn {
  answers: Answer[];
}

export class FetchAnswersByQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchAnswersByQuestionUseCaseParams): Promise<FetchAnswersByQuestionUseCaseReturn> {
    const answers = await this.answerRepository.findManyByQuestion(questionId, {
      page,
    });

    return { answers };
  }
}
