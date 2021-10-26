import { Position } from "../components";
import { System } from "../ecs";

export const renderSystem: System = {
  componentTypes: ["Position"],
  update: function (delta, entities) {
    entities[0].components.Position;
  },
};

export class RenderSys {
  componentTypes: ["Position"];

  public update(delta: number, entities: Entity<Position & Rect>) {}
}
