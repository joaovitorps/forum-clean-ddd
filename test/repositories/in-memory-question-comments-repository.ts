import type { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  questionComments: QuestionComment[] = [];

  async getById(questionCommentId: string): Promise<QuestionComment | null> {
    const question = this.questionComments.find(
      (questionComment) => questionComment.id.toString() === questionCommentId,
    );

    if (!question) {
      return null;
    }

    return question;
  }

  async create(data: QuestionComment) {
    this.questionComments.push(data);
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const index = this.questionComments.findIndex(
      (value) => value.id === questionComment.id,
    );

    if (index >= 0) {
      this.questionComments.splice(index, 1);
    }
  }
}
