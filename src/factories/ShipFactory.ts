import Victor from "victor";
import { Direction, Tag, Thrust } from "../enum";
import { BaseFactory } from "./BaseFactory";

export class ShipFactory extends BaseFactory {
  create(opts: { pos?: Victor; yaw?: number; tags?: Tag[] }) {
    return this.ecs.addEntity(
      {
        engine: {
          kind: "Engine",
          direction: Direction.Right,
          thrust: Thrust.None,
        },
        body: {
          kind: "Body",
          pos: new Victor(opts.pos?.x ?? 0, opts.pos?.y ?? 0),
          yaw: opts.yaw ?? 0,
          vel: new Victor(0, 0),
        },
        armament: {
          kind: "Armament",
          primaryCooldownUntil: 0,
          primaryFire: false,
        },
        stats: {
          kind: "Stats",
          health: 100,
          damageEffects: [],
        },
      },
      opts.tags
    );
  }
}
