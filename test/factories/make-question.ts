import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Question,
  type QuestionProps,
} from "@/domain/forum/enterprise/entities/question";

export function makeQuestion(
  overwrite: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const newQuestion = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...overwrite,
    },
    id,
  );

  return { newQuestion };
}
