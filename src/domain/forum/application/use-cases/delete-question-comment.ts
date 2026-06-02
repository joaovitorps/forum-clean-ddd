import { type Either, left, right } from "@/core/either";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { NotAllowedError } from "./error/not-allowed-error";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface DeleteQuestionCommentUseCaseParams {
  questionCommentId: string;
  authorId: string;
}

type DeleteAnswerCommentReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestionCommentUseCase {
  constructor(private questionComment: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseParams): Promise<DeleteAnswerCommentReturn> {
    const questionComment =
      await this.questionComment.getById(questionCommentId);

    if (!questionComment) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== questionComment.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.questionComment.delete(questionComment);

    return right({});
  }
}
