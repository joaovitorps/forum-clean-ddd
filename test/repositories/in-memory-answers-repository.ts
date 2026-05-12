import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswer implements AnswerRepository {
  answers: Answer[] = [];

  async getById(answerId: string): Promise<Answer | null> {
    const answer = this.answers.find(
      (answer) => answer.id.toString() === answerId,
    );

    if (!answer) {
      return null;
    }

    return answer;
  }

  async findManyByQuestion(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.answers
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async create(data: Answer) {
    this.answers.push(data);
  }

  async edit(answer: Answer) {
    const index = this.answers.findIndex((value) => value.id === answer.id);

    if (index >= 0) {
      this.answers[index] = answer;
    }
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.answers.findIndex((value) => value.id === answer.id);

    if (index >= 0) {
      this.answers.splice(index, 1);
    }
  }
}
