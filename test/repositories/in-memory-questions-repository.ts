import type { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import type { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestion implements QuestionRepository {
  questions: Question[] = [];

  async getById(questionId: string) {
    const question = this.questions.find(
      (question) => question.id.toString() === questionId,
    );

    if (!question) {
      return null;
    }

    return question;
  }

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

  async edit(question: Question) {
    const index = this.questions.findIndex((value) => value.id === question.id);

    if (index >= 0) {
      this.questions[index] = question;
    }
  }

  async delete(question: Question) {
    const index = this.questions.findIndex((value) => value.id === question.id);

    if (index >= 0) {
      this.questions.splice(index, 1);
    }
  }
}
