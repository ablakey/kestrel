import { Engine } from "../Engine";

export class BaseFactory {
  protected engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }
}
