import { makeQuestion } from "@test/factories/make-question";
import { InMemoryQuestionCommentsRepository } from "@test/repositories/in-memory-question-comments-repository";
import { InMemoryQuestion } from "@test/repositories/in-memory-questions-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";

describe("Comment on question use case", () => {
  let questionRepo: InMemoryQuestion;
  let questionCommentsRepo: InMemoryQuestionCommentsRepository;
  let sut: CommentOnQuestionUseCase;

  beforeEach(() => {
    questionRepo = new InMemoryQuestion();
    questionCommentsRepo = new InMemoryQuestionCommentsRepository();
    sut = new CommentOnQuestionUseCase(questionRepo, questionCommentsRepo);
  });

  test("it should be able to comment on a question", async () => {
    const { newQuestion } = makeQuestion();

    const { questionComment } = await sut.execute({
      authorId: "new-author",
      questionId: newQuestion.id.toString(),
      content: "New comment",
    });

    expect(questionComment.content).toEqual("New comment");
  });
});
