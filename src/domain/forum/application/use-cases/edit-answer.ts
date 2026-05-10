import type { Answer } from "../../enterprise/entities/answer";
import type { AnswerRepository } from "../repositories/answer-repository";

interface EditAnswerUseCaseParams {
  answerId: string;
  authorId: string;
  content?: string;
}

interface EditAnswerUseCaseReturn {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseParams): Promise<EditAnswerUseCaseReturn> {
    const answer = await this.answerRepository.getById(answerId);

    if (!answer) {
      throw new Error("Entity not found.");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    answer.content = content ?? answer.content;

    await this.answerRepository.edit(answer);

    return { answer };
  }
}
