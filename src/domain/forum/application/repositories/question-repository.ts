import type { Question } from "../../enterprise/entities/question";

export interface QuestionRepository {
  create(data: Question): Promise<void>;
}
