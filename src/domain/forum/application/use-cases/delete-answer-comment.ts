import { type Either, left, right } from "@/core/either";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseParams {
  answerCommentId: string;
  authorId: string;
}

type DeleteAnswerCommentUseCaseReturn = Either<"string", {}>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseParams): Promise<DeleteAnswerCommentUseCaseReturn> {
    const answerComment =
      await this.answerCommentRepository.getById(answerCommentId);

    if (!answerComment) {
      return left("Entity not found.");
    }

    if (authorId !== answerComment.authorId.toString()) {
      return left("Not allowed.");
    }

    await this.answerCommentRepository.delete(answerComment);

    return right({});
  }
}
