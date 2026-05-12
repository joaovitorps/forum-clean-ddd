import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import type { QuestionRepository } from "../repositories/question-repository";

interface CommentOnQuestionUseCaseParams {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseReturn {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseParams): Promise<CommentOnQuestionUseCaseReturn> {
    const question = this.questionRepository.getById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment);

    return { questionComment };
  }
}
