import { ECS } from "../ecs";

export class BaseFactory {
  protected ecs: ECS;

  constructor(ecs: ECS) {
    this.ecs = ecs;
  }
}
