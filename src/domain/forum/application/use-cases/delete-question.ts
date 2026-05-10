import type { QuestionRepository } from "../repositories/question-repository";

interface DeleteQuestionUseCaseParams {
  questionId: string;
  authorId: string;
}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseParams): Promise<void> {
    const question = await this.questionRepository.getById(questionId);

    if (!question) {
      throw new Error("Entity not found.");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.questionRepository.delete(question);
  }
}
