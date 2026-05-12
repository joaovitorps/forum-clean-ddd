import { makeAnswer } from "@test/factories/make-answer";
import { makeAnswerComment } from "@test/factories/make-answer-comment";
import { InMemoryAnswerCommentsRepository } from "@test/repositories/in-memory-answer-comments-repository";
import { InMemoryAnswer } from "@test/repositories/in-memory-answers-repository";
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments";

describe("Fetch answer comments use case", () => {
  let answerRepo: InMemoryAnswer;
  let answerCommentsRepository: InMemoryAnswerCommentsRepository;
  let sut: FetchAnswerCommentsUseCase;

  beforeEach(() => {
    answerRepo = new InMemoryAnswer();
    answerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchAnswerCommentsUseCase(answerCommentsRepository);
  });

  test("it should be able to fetch all comments of a answers", async () => {
    const { newAnswer } = makeAnswer();
    answerRepo.create(newAnswer);

    answerCommentsRepository.create(
      makeAnswerComment({ answerId: newAnswer.id }).newAnswerComment,
    );
    answerCommentsRepository.create(
      makeAnswerComment({ answerId: newAnswer.id }).newAnswerComment,
    );

    const { answerComments } = await sut.execute({
      answerId: newAnswer.id.toString(),
      page: 1,
    });

    expect(answerComments).toHaveLength(2);
  });

  test("it should be able to paginate all comments of a answer", async () => {
    const { newAnswer } = makeAnswer();
    answerRepo.create(newAnswer);

    for (let i = 1; i <= 22; i++) {
      answerCommentsRepository.create(
        makeAnswerComment({ answerId: newAnswer.id }).newAnswerComment,
      );
    }

    const { answerComments } = await sut.execute({
      answerId: newAnswer.id.toString(),
      page: 2,
    });

    expect(answerComments).toHaveLength(2);
  });
});
