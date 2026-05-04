import type { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswerQuestionUseCase } from "./answer-questions";

class FakeRepository implements AnswerRepository {
  create = async (_data: Answer) => {
    return;
  };
}

test("it should be able to answer a question", async () => {
  const sut = new AnswerQuestionUseCase(new FakeRepository());

  const answerData = {
    instructorId: "1",
    questionId: "1",
    content: "New answer",
  };

  const { answer } = await sut.execute(answerData);

  expect(answer).toBeInstanceOf(Answer);
  expect(answer.id.toString()).toEqual(expect.any(String));
  expect(answer.content).toEqual(answerData.content);
});
