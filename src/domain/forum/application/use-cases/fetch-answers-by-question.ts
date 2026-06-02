import { type Either, right } from "@/core/either";
import type { Answer } from "../../enterprise/entities/answer";
import type { AnswerRepository } from "../repositories/answer-repository";

interface FetchAnswersByQuestionUseCaseParams {
  questionId: string;
  page: number;
}

type FetchAnswersByQuestionUseCaseReturn = Either<
  null,
  {
    answers: Answer[];
  }
>;

export class FetchAnswersByQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchAnswersByQuestionUseCaseParams): Promise<FetchAnswersByQuestionUseCaseReturn> {
    const answers = await this.answerRepository.findManyByQuestion(questionId, {
      page,
    });

    return right({ answers });
  }
}
