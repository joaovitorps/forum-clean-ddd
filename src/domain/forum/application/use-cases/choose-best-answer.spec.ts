import { makeAnswer } from "@test/factories/make-answer";
import { makeQuestion } from "@test/factories/make-question";
import { InMemoryAnswer } from "@test/repositories/in-memory-answers-repository";
import { InMemoryQuestion } from "@test/repositories/in-memory-questions-repository";
import { ChooseBestAnswerUseCase } from "./choose-best-answer";

describe("Choose best answer use case", () => {
  let sut: ChooseBestAnswerUseCase;
  let answerRepo: InMemoryAnswer;
  let questionRepo: InMemoryQuestion;

  beforeEach(() => {
    answerRepo = new InMemoryAnswer();
    questionRepo = new InMemoryQuestion();
    sut = new ChooseBestAnswerUseCase(questionRepo, answerRepo);
  });

  it("should be able to choose the best answer for a question", async () => {
    const { newQuestion } = makeQuestion();

    const { newAnswer } = makeAnswer({ questionId: newQuestion.id });
    const answerChosen = makeAnswer({ questionId: newQuestion.id });

    questionRepo.create(newQuestion);
    answerRepo.create(newAnswer);
    answerRepo.create(answerChosen.newAnswer);

    const { question } = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    });

    expect(question.bestAnswerId).toEqual(newAnswer.id);
    expect(answerRepo.answers).toHaveLength(2);
  });

  it("should not be able to choose the best answer for a question if the user is different from user that created the question", async () => {
    const { newQuestion } = makeQuestion();

    const { newAnswer } = makeAnswer({ questionId: newQuestion.id });
    const answerChosen = makeAnswer({ questionId: newQuestion.id });

    questionRepo.create(newQuestion);

    answerRepo.create(newAnswer);
    answerRepo.create(answerChosen.newAnswer);

    await expect(() =>
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: "non-existing-id",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
