import { makeAnswerComment } from "@test/factories/make-answer-comment";
import { InMemoryAnswerCommentsRepository } from "@test/repositories/in-memory-answer-comments-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { NotAllowedError } from "./error/not-allowed-error";

describe("Delete answer comment use case", () => {
  let answerCommentRepo: InMemoryAnswerCommentsRepository;
  let sut: DeleteAnswerCommentUseCase;

  beforeEach(() => {
    answerCommentRepo = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(answerCommentRepo);
  });

  test("it should be able to delete a answer", async () => {
    const { newAnswerComment } = makeAnswerComment();

    answerCommentRepo.create(newAnswerComment);

    expect(answerCommentRepo.answerComments).toHaveLength(1);

    await sut.execute({
      answerCommentId: newAnswerComment.id.toString(),
      authorId: newAnswerComment.authorId.toString(),
    });

    expect(answerCommentRepo.answerComments).toHaveLength(0);
  });

  test("it should not be able to delete a answer if has a different authorId", async () => {
    const { newAnswerComment } = makeAnswerComment({
      authorId: new UniqueEntityID("author-1"),
    });

    await answerCommentRepo.create(newAnswerComment);

    const result = await sut.execute({
      answerCommentId: newAnswerComment.id.toString(),
      authorId: "author-2",
    });

    expect(answerCommentRepo.answerComments).toHaveLength(1);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
