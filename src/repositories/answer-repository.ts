import type { Answer } from "@/domain/entities/answer";

export interface AnswerRepository {
  create(data: Answer): Promise<void>;
}
