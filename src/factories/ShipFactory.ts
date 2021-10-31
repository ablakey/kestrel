import Victor from "victor";
import { Direction, Tag, Thrust } from "../enum";
import { BaseFactory } from "./BaseFactory";

export class ShipFactory extends BaseFactory {
  create(opts: { x?: number; y?: number; tags?: Tag[] }) {
    return this.ecs.addEntity(
      {
        engine: {
          kind: "Engine",
          direction: Direction.Right,
          thrust: Thrust.None,
        },
        body: {
          kind: "Body",
          pos: new Victor(opts.x ?? 0, opts.y ?? 0),
          yaw: 0,
          vel: new Victor(0, 0),
        },
        weapons: {
          kind: "Weapons",
          laserCharge: 100,
          fireLaser: false,
        },
      },
      opts.tags
    );
  }
}
