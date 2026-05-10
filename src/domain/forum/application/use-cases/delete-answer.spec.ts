import { makeAnswer } from "@test/factories/make-answer";
import { InMemoryAnswer } from "@test/repositories/in-memory-answers-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeleteAnswerUseCase } from "./delete-answer";

describe("Delete answer use case", () => {
  let answerRepo: InMemoryAnswer;
  let sut: DeleteAnswerUseCase;

  beforeEach(() => {
    answerRepo = new InMemoryAnswer();
    sut = new DeleteAnswerUseCase(answerRepo);
  });

  test("it should be able to delete a answer", async () => {
    const { newAnswer } = makeAnswer();

    answerRepo.create(newAnswer);

    expect(answerRepo.answers).toHaveLength(1);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
    });

    expect(answerRepo.answers).toHaveLength(0);
  });

  test("it should not be able to delete a answer if has a different authorId", async () => {
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
