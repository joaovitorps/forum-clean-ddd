import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { Question } from "../../enterprise/entities/question";
import type { AnswerRepository } from "../repositories/answer-repository";
import type { QuestionRepository } from "../repositories/question-repository";

interface ChooseBestAnswerUseCaseParams {
  answerId: string;
  authorId: string;
}

interface ChooseBestAnswerUseCaseReturn {
  question: Question;
}

export class ChooseBestAnswerUseCase {
  constructor(
    private questionRepo: QuestionRepository,
    private answerRepo: AnswerRepository,
  ) {}
  async execute({
    answerId,
    authorId,
  }: ChooseBestAnswerUseCaseParams): Promise<ChooseBestAnswerUseCaseReturn> {
    const answer = await this.answerRepo.getById(answerId);

    if (!answer) {
      throw new Error("Not found.");
    }

    const question = await this.questionRepo.getById(
      answer.questionId.toString(),
    );

    if (!question) {
      throw new Error("Not found.");
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error("Not allowed.");
    }

    question.bestAnswerId = new UniqueEntityID(answerId);

    return { question };
  }
}
