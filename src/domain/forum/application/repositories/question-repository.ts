import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Question } from "../../enterprise/entities/question";

export interface QuestionRepository {
  getById(questionId: string): Promise<Question | null>;
  findManyRecent(params: PaginationParams): Promise<Question[]>;
  create(data: Question): Promise<void>;
  getBySlug(slug: string): Promise<Question | null>;
  edit(question: Question): Promise<void>;
  delete(question: Question): Promise<void>;
}
