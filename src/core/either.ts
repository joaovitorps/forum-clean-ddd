class Right<L, R> {
  constructor(readonly value: R) {
    this.value = value;
  }

  isRight(): this is Right<L, R> {
    return true;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }
}

class Left<L, R> {
  constructor(readonly value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value);
};

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value);
};
