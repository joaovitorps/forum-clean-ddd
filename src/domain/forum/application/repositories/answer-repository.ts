import type { Answer } from "@/domain/forum/enterprise/entities/answer";

export interface AnswerRepository {
  create(data: Answer): Promise<void>;
}
