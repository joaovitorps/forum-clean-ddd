import type { AnswerRepository } from "../repositories/answer-repository";

interface DeleteAnswerUseCaseParams {
  answerId: string;
  authorId: string;
}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseParams): Promise<void> {
    const answer = await this.answerRepository.getById(answerId);

    if (!answer) {
      throw new Error("Entity not found.");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.answerRepository.delete(answer);
  }
}
