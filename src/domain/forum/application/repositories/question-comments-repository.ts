import type { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepository {
  getById(questionCommentId: string): Promise<QuestionComment | null>;
  create(data: QuestionComment): Promise<void>;
  delete(questionComment: QuestionComment): Promise<void>;
}
