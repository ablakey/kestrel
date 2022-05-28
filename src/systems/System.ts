import { Engine } from "../Engine";
import { Entity } from "../types/Entity";

export class System {
  engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  update(entity: Entity, delta: number) {
    console.error("update() not implemented.", entity, delta);
  }

  updateAll(entities: Entity[], delta: number) {
    entities.forEach((e) => this.update(e, delta));
  }
}
