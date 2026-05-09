import { makeQuestion } from "@test/factories/make-question";
import { InMemoryQuestion } from "@test/repositories/in-memory-questions-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Slug } from "../../enterprise/entities/object-values/slug";
import { Question } from "../../enterprise/entities/question";
import { GetQuestionBySlug } from "./get-question-by-slug";

describe("Get question by slug use case", () => {
  let questionRepo: InMemoryQuestion;
  let sut: GetQuestionBySlug;

  beforeEach(() => {
    questionRepo = new InMemoryQuestion();
    sut = new GetQuestionBySlug(questionRepo);
  });

  test("it should be able to get a question by slug", async () => {
    const { newQuestion } = makeQuestion({ slug: Slug.create("new-question") });

    questionRepo.create(newQuestion);

    const { question } = await sut.execute({ slug: "new-question" });

    expect(question.authorId).toBeTruthy;
    expect(question.title).toEqual(newQuestion.title);
  });
});
