import type { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
  getById(answerCommentId: string): Promise<AnswerComment | null>;
  create(data: AnswerComment): Promise<void>;
  delete(answerComment: AnswerComment): Promise<void>;
}
