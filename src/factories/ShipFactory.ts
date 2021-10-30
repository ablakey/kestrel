import Victor from "victor";
import { Direction, Tag, Thrust } from "../enum";
import { BaseFactory } from "./BaseFactory";

export class ShipFactory extends BaseFactory {
  create(opts: { x?: number; y?: number; tags?: Tag[] }) {
    return this.ecs.addEntity(
      {
        engine: {
          kind: "Engine",
          direction: Direction.None,
          thrust: Thrust.None,
        },
        body: {
          kind: "Body",
          pos: new Victor(opts.x ?? 0, opts.y ?? 0),
          yaw: 0,
          vel: new Victor(0, 0), // TODO  units/second.
        },
      },
      opts.tags
    );
  }
}
