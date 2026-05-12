import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepository {
  getById(questionCommentId: string): Promise<QuestionComment | null>;
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>;
  create(data: QuestionComment): Promise<void>;
  delete(questionComment: QuestionComment): Promise<void>;
}
