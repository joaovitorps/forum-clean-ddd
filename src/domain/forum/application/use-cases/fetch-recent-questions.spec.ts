import { makeQuestion } from "@test/factories/make-question";
import { InMemoryQuestion } from "@test/repositories/in-memory-questions-repository";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";

describe("Fetch recent questions use case", () => {
  let questionRepo: InMemoryQuestion;
  let sut: FetchRecentQuestionsUseCase;

  beforeEach(() => {
    questionRepo = new InMemoryQuestion();
    sut = new FetchRecentQuestionsUseCase(questionRepo);
  });

  test("it should be able to fetch recent questions", async () => {
    questionRepo.create(
      makeQuestion({ createdAt: new Date(2026, 0, 1) }).newQuestion,
    );
    questionRepo.create(
      makeQuestion({ createdAt: new Date(2026, 0, 3) }).newQuestion,
    );
    questionRepo.create(
      makeQuestion({ createdAt: new Date(2026, 0, 2) }).newQuestion,
    );

    const { questions } = await sut.execute({ page: 1 });

    expect(questions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ createdAt: new Date(2026, 0, 3) }),
        expect.objectContaining({ createdAt: new Date(2026, 0, 2) }),
        expect.objectContaining({ createdAt: new Date(2026, 0, 1) }),
      ]),
    );
  });

  test("it should be able to paginate questions", async () => {
    for (let i = 1; i <= 22; i++) {
      questionRepo.create(makeQuestion().newQuestion);
    }

    const { questions } = await sut.execute({ page: 2 });

    expect(questions).toHaveLength(2);
  });
});
