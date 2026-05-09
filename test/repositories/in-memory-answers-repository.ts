import type { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswer implements AnswerRepository {
  answers: Answer[] = [];

  async create(data: Answer) {
    this.answers.push(data);
  }
}
