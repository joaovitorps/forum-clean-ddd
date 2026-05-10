import type { Question } from "../../enterprise/entities/question";
import type { QuestionRepository } from "../repositories/question-repository";

interface EditQuestionUseCaseParams {
  questionId: string;
  authorId: string;
  title?: string;
  content?: string;
}

interface EditQuestionUseCaseReturn {
  question: Question;
}

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
      throw new Error("Entity not found.");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    question.title = title ?? question.title;
    question.content = content ?? question.content;

    await this.questionRepository.edit(question);

    return { question };
  }
}
