import { type Either, right } from "@/core/either";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionRepository } from "../repositories/question-repository";

interface FetchRecentQuestionsUseCaseParams {
  page: number;
}

type FetchRecentQuestionsUseCaseReturn = Either<
  null,
  {
    questions: Question[];
  }
>;

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseParams): Promise<FetchRecentQuestionsUseCaseReturn> {
    const questions = await this.questionRepository.findManyRecent({ page });

    return right({ questions });
  }
}
