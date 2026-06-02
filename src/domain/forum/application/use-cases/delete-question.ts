import { type Either, left, right } from "@/core/either";
import type { QuestionRepository } from "../repositories/question-repository";
import { NotAllowedError } from "./error/not-allowed-error";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface DeleteQuestionUseCaseParams {
  questionId: string;
  authorId: string;
}

type DeleteAnswerCommentReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseParams): Promise<DeleteAnswerCommentReturn> {
    const question = await this.questionRepository.getById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.questionRepository.delete(question);

    return right({});
  }
}
