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
    const { newQuestionComment } = makeQuestionComment();

    questionCommentRepo.create(newQuestionComment);

    expect(questionCommentRepo.questionComments).toHaveLength(1);

    await sut.execute({
      questionCommentId: newQuestionComment.id.toString(),
      authorId: newQuestionComment.authorId.toString(),
    });

    expect(questionCommentRepo.questionComments).toHaveLength(0);
  });

  test("it not should be able to delete a question if has a different authorId", async () => {
    const { newQuestionComment } = makeQuestionComment({
      authorId: new UniqueEntityID("author-1"),
    });

    questionCommentRepo.create(newQuestionComment);

    expect(questionCommentRepo.questionComments).toHaveLength(1);

    await expect(() =>
      sut.execute({
        questionCommentId: newQuestionComment.id.toString(),
        authorId: "author-2",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
