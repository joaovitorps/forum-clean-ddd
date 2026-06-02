import { type Either, left, right } from "@/core/either";
import type { AnswerRepository } from "../repositories/answer-repository";
import { NotAllowedError } from "./error/not-allowed-error";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface DeleteAnswerUseCaseParams {
  answerId: string;
  authorId: string;
}

type DeleteAnswerCommentReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseParams): Promise<DeleteAnswerCommentReturn> {
    const answer = await this.answerRepository.getById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.answerRepository.delete(answer);

    return right({});
  }
}
