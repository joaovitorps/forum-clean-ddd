import { makeQuestion } from "@test/factories/make-question";
import { InMemoryQuestion } from "@test/repositories/in-memory-questions-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeleteQuestionUseCase } from "./delete-question";

describe("Delete question use case", () => {
  let questionRepo: InMemoryQuestion;
  let sut: DeleteQuestionUseCase;

  beforeEach(() => {
    questionRepo = new InMemoryQuestion();
    sut = new DeleteQuestionUseCase(questionRepo);
  });

  test("it should be able to delete a question", async () => {
    const { newQuestion } = makeQuestion();

    questionRepo.create(newQuestion);

    expect(questionRepo.questions).toHaveLength(1);

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
    });

    expect(questionRepo.questions).toHaveLength(0);
  });

  test("it not should be able to delete a question if has a different authorId", async () => {
    const { newQuestion } = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    });

    questionRepo.create(newQuestion);

    expect(questionRepo.questions).toHaveLength(1);

    await expect(() =>
      sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: "author-2",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
