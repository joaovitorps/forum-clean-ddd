import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

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
