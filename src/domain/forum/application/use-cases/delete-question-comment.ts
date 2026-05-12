import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseParams {
  questionCommentId: string;
  authorId: string;
}

export class DeleteQuestionCommentUseCase {
  constructor(private questionComment: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseParams): Promise<void> {
    const questionComment =
      await this.questionComment.getById(questionCommentId);

    if (!questionComment) {
      throw new Error("Entity not found.");
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.questionComment.delete(questionComment);
  }
}
