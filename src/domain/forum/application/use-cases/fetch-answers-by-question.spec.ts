import { makeAnswer } from "@test/factories/make-answer";
import { makeQuestion } from "@test/factories/make-question";
import { InMemoryAnswer } from "@test/repositories/in-memory-answers-repository";
import { InMemoryQuestion } from "@test/repositories/in-memory-questions-repository";
import { FetchAnswersByQuestionUseCase } from "./fetch-answers-by-question";

describe("Fetch answers by question use case", () => {
  let answerRepo: InMemoryAnswer;
  let questionRepo: InMemoryQuestion;
  let sut: FetchAnswersByQuestionUseCase;

  beforeEach(() => {
    answerRepo = new InMemoryAnswer();
    questionRepo = new InMemoryQuestion();
    sut = new FetchAnswersByQuestionUseCase(answerRepo);
  });

  test("it should be able to fetch all answers for a questions", async () => {
    const { newQuestion } = makeQuestion();
    questionRepo.create(newQuestion);

    answerRepo.create(makeAnswer({ questionId: newQuestion.id }).newAnswer);
    answerRepo.create(makeAnswer({ questionId: newQuestion.id }).newAnswer);

    const { answers } = await sut.execute({
      questionId: newQuestion.id.toString(),
      page: 1,
    });

    expect(answers).toHaveLength(2);
  });

  test("it should be able to paginate answers", async () => {
    const { newQuestion } = makeQuestion();
    questionRepo.create(newQuestion);

    for (let i = 1; i <= 22; i++) {
      answerRepo.create(makeAnswer({ questionId: newQuestion.id }).newAnswer);
    }

    const { answers } = await sut.execute({
      questionId: newQuestion.id.toString(),
      page: 2,
    });

    expect(answers).toHaveLength(2);
  });
});
