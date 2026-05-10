import { InMemoryQuestion } from "@test/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-questions";

describe("Create question use case", () => {
  let questionRepo: InMemoryQuestion;
  let sut: CreateQuestionUseCase;

  beforeEach(() => {
    questionRepo = new InMemoryQuestion();
    sut = new CreateQuestionUseCase(questionRepo);
  });

  test("it should be able to create a question", async () => {
    const questionData = {
      authorId: "1",
      title: "this is a new questions",
      content: "New question",
    };

    const { question } = await sut.execute(questionData);

    expect(question.authorId).toBeTruthy;
    expect(question.title).toEqual(questionData.title);
  });
});
