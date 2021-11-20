import { ECS } from "../ecs";

export class BaseUtility {
  protected ecs: ECS;

  constructor(ecs: ECS) {
    this.ecs = ecs;
  }
}
