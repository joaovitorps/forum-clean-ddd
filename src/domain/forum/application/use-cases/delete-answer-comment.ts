import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseParams {
  answerCommentId: string;
  authorId: string;
}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseParams): Promise<void> {
    const answerComment =
      await this.answerCommentRepository.getById(answerCommentId);

    if (!answerComment) {
      throw new Error("Entity not found.");
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.answerCommentRepository.delete(answerComment);
  }
}
