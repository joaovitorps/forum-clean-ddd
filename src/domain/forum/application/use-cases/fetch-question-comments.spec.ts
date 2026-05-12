import { makeQuestion } from "@test/factories/make-question";
import { makeQuestionComment } from "@test/factories/make-question-comment";
import { InMemoryQuestionCommentsRepository } from "@test/repositories/in-memory-question-comments-repository";
import { InMemoryQuestion } from "@test/repositories/in-memory-questions-repository";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments";

describe("Fetch question comments use case", () => {
  let questionRepo: InMemoryQuestion;
  let questionCommentsRepository: InMemoryQuestionCommentsRepository;
  let sut: FetchQuestionCommentsUseCase;

  beforeEach(() => {
    questionRepo = new InMemoryQuestion();
    questionCommentsRepository = new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsUseCase(questionCommentsRepository);
  });

  test("it should be able to fetch all comments of a questions", async () => {
    const { newQuestion } = makeQuestion();
    questionRepo.create(newQuestion);

    questionCommentsRepository.create(
      makeQuestionComment({ questionId: newQuestion.id }).newQuestionComment,
    );
    questionCommentsRepository.create(
      makeQuestionComment({ questionId: newQuestion.id }).newQuestionComment,
    );

    const { questionComments } = await sut.execute({
      questionId: newQuestion.id.toString(),
      page: 1,
    });

    expect(questionComments).toHaveLength(2);
  });

  test("it should be able to paginate all comments of a question", async () => {
    const { newQuestion } = makeQuestion();
    questionRepo.create(newQuestion);

    for (let i = 1; i <= 22; i++) {
      questionCommentsRepository.create(
        makeQuestionComment({ questionId: newQuestion.id }).newQuestionComment,
      );
    }

    const { questionComments } = await sut.execute({
      questionId: newQuestion.id.toString(),
      page: 2,
    });

    expect(questionComments).toHaveLength(2);
  });
});
