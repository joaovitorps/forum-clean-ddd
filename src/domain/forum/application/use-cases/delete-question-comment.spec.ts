import { makeQuestionComment } from "@test/factories/make-question-comment";
import { InMemoryQuestionCommentsRepository } from "@test/repositories/in-memory-question-comments-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";

describe("Delete question comment use case", () => {
  let questionCommentRepo: InMemoryQuestionCommentsRepository;
  let sut: DeleteQuestionCommentUseCase;

  beforeEach(() => {
    questionCommentRepo = new InMemoryQuestionCommentsRepository();
    sut = new DeleteQuestionCommentUseCase(questionCommentRepo);
  });

  test("it should be able to delete a question", async () => {
    const { newQuestion } = makeQuestionComment();

    questionCommentRepo.create(newQuestion);

    expect(questionCommentRepo.questionComments).toHaveLength(1);

    await sut.execute({
      questionCommentId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
    });

    expect(questionCommentRepo.questionComments).toHaveLength(0);
  });

  test("it not should be able to delete a question if has a different authorId", async () => {
    const { newQuestion } = makeQuestionComment({
      authorId: new UniqueEntityID("author-1"),
    });

    questionCommentRepo.create(newQuestion);

    expect(questionCommentRepo.questionComments).toHaveLength(1);

    await expect(() =>
      sut.execute({
        questionCommentId: newQuestion.id.toString(),
        authorId: "author-2",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
