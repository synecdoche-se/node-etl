export default abstract class AbstractTransformer<T, D> {
  constructor(public key: string = "") {}

  abstract transform(data: T): D;
}
