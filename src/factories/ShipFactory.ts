import Victor from "victor";
import { Tag } from "../enum";
import { BaseFactory } from "./BaseFactory";

export class ShipFactory extends BaseFactory {
  create(opts: { x?: number; y?: number; tags?: Tag[] }) {
    return this.ecs.addEntity(
      {
        Body: {
          type: "Body",
          pos: new Victor(opts.x ?? 0, opts.y ?? 0),
          yaw: 0,
          vel: new Victor(0, 0),
        },
      },
      opts.tags
    );
  }
}
