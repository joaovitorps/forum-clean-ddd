import { makeQuestion } from "@test/factories/make-question";
import { InMemoryQuestion } from "@test/repositories/in-memory-questions-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { EditQuestionUseCase } from "./edit-question";

describe("Edit question use case", () => {
  let questionRepo: InMemoryQuestion;
  let sut: EditQuestionUseCase;

  beforeEach(() => {
    questionRepo = new InMemoryQuestion();
    sut = new EditQuestionUseCase(questionRepo);
  });

  test("it should be able to edit a question", async () => {
    const { newQuestion } = makeQuestion();

    questionRepo.create(newQuestion);

    expect(questionRepo.questions).toHaveLength(1);

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      title: "new title",
      content: "new content",
    });

    expect(questionRepo.questions[0]).toMatchObject({
      title: "new title",
      content: "new content",
    });
  });

  test("it should not be able to edit a question if has a different authorId", async () => {
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
