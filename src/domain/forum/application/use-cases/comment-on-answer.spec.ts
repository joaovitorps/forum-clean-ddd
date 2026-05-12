import { makeAnswer } from "@test/factories/make-answer";
import { InMemoryAnswerCommentsRepository } from "@test/repositories/in-memory-answer-comments-repository";
import { InMemoryAnswer } from "@test/repositories/in-memory-answers-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";

describe("Comment on answer use case", () => {
  let answerRepo: InMemoryAnswer;
  let answerCommentsRepo: InMemoryAnswerCommentsRepository;
  let sut: CommentOnAnswerUseCase;

  beforeEach(() => {
    answerRepo = new InMemoryAnswer();
    answerCommentsRepo = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerUseCase(answerRepo, answerCommentsRepo);
  });

  test("it should be able to comment on a answer", async () => {
    const { newAnswer } = makeAnswer();

    const { answerComment } = await sut.execute({
      authorId: "new-author",
      answerId: newAnswer.id.toString(),
      content: "New comment",
    });

    expect(answerComment.content).toEqual("New comment");
  });
});
