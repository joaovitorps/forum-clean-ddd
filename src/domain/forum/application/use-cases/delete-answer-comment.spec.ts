import { makeAnswerComment } from "@test/factories/make-answer-comment";
import { InMemoryAnswerCommentsRepository } from "@test/repositories/in-memory-answer-comments-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";

describe("Delete answer comment use case", () => {
  let answerComment: InMemoryAnswerCommentsRepository;
  let sut: DeleteAnswerCommentUseCase;

  beforeEach(() => {
    answerComment = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(answerComment);
  });

  test("it should be able to delete a answer", async () => {
    const { newAnswerComment } = makeAnswerComment();

    answerComment.create(newAnswerComment);

    expect(answerComment.answerComments).toHaveLength(1);

    await sut.execute({
      answerCommentId: newAnswerComment.id.toString(),
      authorId: newAnswerComment.authorId.toString(),
    });

    expect(answerComment.answerComments).toHaveLength(0);
  });

  test("it should not be able to delete a answer if has a different authorId", async () => {
    const { newAnswerComment } = makeAnswerComment({
      authorId: new UniqueEntityID("author-1"),
    });

    answerComment.create(newAnswerComment);

    expect(answerComment.answerComments).toHaveLength(1);

    await expect(() =>
      sut.execute({
        answerCommentId: newAnswerComment.id.toString(),
        authorId: "author-2",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
