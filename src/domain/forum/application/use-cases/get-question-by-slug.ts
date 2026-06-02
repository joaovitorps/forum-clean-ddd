import { type Either, left, right } from "@/core/either";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionRepository } from "../repositories/question-repository";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface GetQuestionBySlugUseCaseParams {
  slug: string;
}

type GetQuestionBySlugUseCaseReturn = Either<
  ResourceNotFoundError,
  {
    question: Question;
  }
>;

export class GetQuestionBySlug {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseParams): Promise<GetQuestionBySlugUseCaseReturn> {
    const question = await this.questionRepository.getBySlug(slug);

    if (!question) {
      return left(
        new ResourceNotFoundError(`Question with slug '${slug}' not found.`),
      );
    }

    return right({ question });
  }
}
