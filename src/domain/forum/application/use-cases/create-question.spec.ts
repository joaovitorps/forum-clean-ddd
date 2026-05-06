import type { Question } from "../../enterprise/entities/question";
import type { QuestionRepository } from "../repositories/question-repository";
import { CreateQuestionUseCase } from "./create-questions";

class FakeRepository implements QuestionRepository {
  create = async (_data: Question) => {};
}

test("it should be able to question a question", async () => {
  const sut = new CreateQuestionUseCase(new FakeRepository());

  const questionData = {
    authorId: "1",
    title: "this is a new questions",
    content: "New question",
  };

  const { question } = await sut.execute(questionData);

  expect(question.authorId).toBeTruthy;
});
