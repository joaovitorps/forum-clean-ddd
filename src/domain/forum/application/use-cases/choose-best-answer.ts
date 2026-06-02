import { type Either, left, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { Question } from "../../enterprise/entities/question";
import type { AnswerRepository } from "../repositories/answer-repository";
import type { QuestionRepository } from "../repositories/question-repository";
import { NotAllowedError } from "./error/not-allowed-error";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface ChooseBestAnswerUseCaseParams {
  answerId: string;
  authorId: string;
}

type ChooseBestAnswerUseCaseReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

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
      return left(new ResourceNotFoundError());
    }

    const question = await this.questionRepo.getById(
      answer.questionId.toString(),
    );

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = new UniqueEntityID(answerId);

    return right({ question });
  }
}
