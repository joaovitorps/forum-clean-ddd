import { type Either, left, right } from "@/core/either";
import type { Answer } from "../../enterprise/entities/answer";
import type { AnswerRepository } from "../repositories/answer-repository";
import { NotAllowedError } from "./error/not-allowed-error";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface EditAnswerUseCaseParams {
  answerId: string;
  authorId: string;
  content?: string;
}

type EditAnswerUseCaseReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseParams): Promise<EditAnswerUseCaseReturn> {
    const answer = await this.answerRepository.getById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    answer.content = content ?? answer.content;

    await this.answerRepository.edit(answer);

    return right({ answer });
  }
}
