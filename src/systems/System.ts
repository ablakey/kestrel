import autoBind from "auto-bind";
import { Engine } from "../Engine";

export class System {
  engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
    autoBind(this);
  }
}
