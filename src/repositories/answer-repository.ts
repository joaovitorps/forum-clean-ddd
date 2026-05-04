import type { Answer } from "../entities/answer";

export interface AnswerRepository {
    create(data: Answer): Promise<void>
}