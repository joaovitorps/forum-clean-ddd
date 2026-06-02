import { type Either, left, right } from "./either";

describe("Either", () => {
  function doSomething(assertion: boolean): Either<string, number> {
    if (assertion) {
      return right(2);
    } else {
      return left("error");
    }
  }
  test("success", () => {
    const result = doSomething(true);

    if (result.isLeft()) {
      console.log(result.value);
    }

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
  });

  test("error", () => {
    const result = doSomething(false);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
  });
});
