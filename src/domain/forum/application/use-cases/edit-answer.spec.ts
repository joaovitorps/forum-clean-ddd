import { makeAnswer } from "@test/factories/make-answer";
import { InMemoryAnswer } from "@test/repositories/in-memory-answers-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { EditAnswerUseCase } from "./edit-answer";

describe("Edit answer use case", () => {
  let answerRepo: InMemoryAnswer;
  let sut: EditAnswerUseCase;

  beforeEach(() => {
    answerRepo = new InMemoryAnswer();
    sut = new EditAnswerUseCase(answerRepo);
  });

  test("it should be able to edit a answer", async () => {
    const { newAnswer } = makeAnswer();

    answerRepo.create(newAnswer);

    expect(answerRepo.answers).toHaveLength(1);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
      content: "new content",
    });

    expect(answerRepo.answers[0]).toMatchObject({ content: "new content" });
  });

  test("it should not be able to edit a answer if has a different authorId", async () => {
    const { newAnswer } = makeAnswer({
      authorId: new UniqueEntityID("author-1"),
    });

    answerRepo.create(newAnswer);

    expect(answerRepo.answers).toHaveLength(1);

    await expect(() =>
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: "author-2",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
