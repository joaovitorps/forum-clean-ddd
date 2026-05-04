import { Slug } from "./slug";

test("it should be able to create a slug from a text", () => {
  const slug = Slug.createFromText("This iS á slug ");

  expect(slug.text).toEqual("this-is-a-slug");

  const slug2 = Slug.createFromText("--This-iS á slug--");

  expect(slug2.text).toEqual("this-is-a-slug");

  const slug3 = Slug.createFromText("-This--iS á_slug-");

  expect(slug3.text).toEqual("this-is-a-slug");
});
