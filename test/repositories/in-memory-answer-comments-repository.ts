import type { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  answerComments: AnswerComment[] = [];

  async getById(answerCommentId: string): Promise<AnswerComment | null> {
    const answer = this.answerComments.find(
      (answer) => answer.id.toString() === answerCommentId,
    );

    if (!answer) {
      return null;
    }

    return answer;
  }

  async create(data: AnswerComment) {
    this.answerComments.push(data);
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const index = this.answerComments.findIndex(
      (value) => value.id === answerComment.id,
    );

    if (index >= 0) {
      this.answerComments.splice(index, 1);
    }
  }
}
