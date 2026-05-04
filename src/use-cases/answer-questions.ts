import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "@/entities/answer";
import type { AnswerRepository } from "@/repositories/answer-repository";

interface AnswerQuestionUseCaseParams {
  instructorId: string;
  questionId: string;
  content: string;
}

interface AnswerQuestionUseCaseReturn {
  answer: Answer;
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseParams): Promise<AnswerQuestionUseCaseReturn> {
    const answer = Answer.create({
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.answerRepository.create(answer);

    return { answer };
  }
}
