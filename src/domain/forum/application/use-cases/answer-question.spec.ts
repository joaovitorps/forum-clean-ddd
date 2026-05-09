import { InMemoryAnswer } from "@test/repositories/in-memory-answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswerQuestionUseCase } from "./answer-questions";

describe("Create question use case", () => {
  let answerRepo: InMemoryAnswer;
  let sut: AnswerQuestionUseCase;

  beforeEach(() => {
    answerRepo = new InMemoryAnswer();
    sut = new AnswerQuestionUseCase(answerRepo);
  });

  test("it should be able to answer a question", async () => {
    const answerData = {
      instructorId: "1",
      questionId: "1",
      content: "New answer",
    };

    const { answer } = await sut.execute(answerData);

    expect(answer).toBeInstanceOf(Answer);
    expect(answer.id.toString()).toEqual(expect.any(String));
    expect(answer.content).toEqual(answerData.content);
    expect(answerRepo.answers).toHaveLength(1);
  });
});
