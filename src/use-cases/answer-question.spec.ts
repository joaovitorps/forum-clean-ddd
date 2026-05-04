import type { AnswerRepository } from "@/repositories/answer-repository";
import { AnswerQuestionUseCase } from "./answer-questions";
import { Answer } from "@/domain/entities/answer";

class FakeRepository implements AnswerRepository {
  create = async (data: Answer) => {
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
