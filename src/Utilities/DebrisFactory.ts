import Victor from "victor";
import { BaseUtility } from "./BaseUtility";

export class DebrisFactory extends BaseUtility {
  create(opts: { x: number; y: number; yaw: number }) {
    const position = new Victor(opts.x, opts.y);

    this.game.entities.add({
      body: {
        kind: "Body",
        position,
        yaw: new Victor(1, 0).rotate(opts.yaw),
        velocity: new Victor(0, 0),
        angularVelocity: 0,
      },
    });
  }
}
