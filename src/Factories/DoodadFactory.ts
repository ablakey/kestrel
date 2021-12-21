import Victor from "victor";
import { BaseFactory } from "./BaseFactory";

export class DoodadFactory extends BaseFactory {
  createExplosion(opts: { position: Victor; yaw?: number }) {
    this.game.entities.add({
      body: {
        kind: "Body",
        position: opts.position,
        yaw: new Victor(1, 0).rotate(opts.yaw ?? 0),
        velocity: new Victor(0, 0),
        angularVelocity: 0,
      },
      sprite: {
        kind: "Sprite",
        name: "Explosion",
      },
    });
  }
}
