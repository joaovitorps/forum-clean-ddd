import type { Question } from "../../enterprise/entities/question";
import type { QuestionRepository } from "../repositories/question-repository";

interface GetQuestionBySlugUseCaseParams {
  slug: string;
}

interface GetQuestionBySlugUseCaseReturn {
  question: Question;
}

export class GetQuestionBySlug {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseParams): Promise<GetQuestionBySlugUseCaseReturn> {
    const question = await this.questionRepository.getBySlug(slug);

    if (!question) {
      throw new Error(`Question with slug '${slug}' not found.`);
    }

    return { question };
  }
}
