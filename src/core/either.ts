class Right<R> {
  constructor(readonly value: R) {
    this.value = value;
  }
}

class Left<L> {
  constructor(readonly value: L) {
    this.value = value;
  }
}

export type Either<L, R> = Left<L> | Right<R>;

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value);
};

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value);
};
