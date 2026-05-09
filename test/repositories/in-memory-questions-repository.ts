import type { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import type { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestion implements QuestionRepository {
  questions: Question[] = [];

  async create(data: Question) {
    this.questions.push(data);
  }

  async getBySlug(slug: string) {
    const question = this.questions.find(
      (question) => question.slug.text === slug,
    );

    if (!question) {
      return null;
    }

    return question;
  }
}
