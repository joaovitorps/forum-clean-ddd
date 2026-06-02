import { type Either, left, right } from "@/core/either";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionRepository } from "../repositories/question-repository";
import { NotAllowedError } from "./error/not-allowed-error";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface EditQuestionUseCaseParams {
  questionId: string;
  authorId: string;
  title?: string;
  content?: string;
}

type EditQuestionUseCaseReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseParams): Promise<EditQuestionUseCaseReturn> {
    const question = await this.questionRepository.getById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    question.title = title ?? question.title;
    question.content = content ?? question.content;

    await this.questionRepository.edit(question);

    return right({ question });
  }
}
