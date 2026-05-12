import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";

export interface AnswerRepository {
  getById(questionId: string): Promise<Answer | null>;
  findManyByQuestion(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>;
  create(data: Answer): Promise<void>;
  edit(answer: Answer): Promise<void>;
  delete(question: Answer): Promise<void>;
}
