import Victor from "victor";
import { BaseFactory } from "./BaseFactory";

export class DoodadFactory extends BaseFactory {
  createExplosion(opts: { x: number; y: number; yaw: number }) {
    const position = new Victor(opts.x, opts.y);

    this.game.entities.add({
      body: {
        kind: "Body",
        position,
        yaw: new Victor(1, 0).rotate(opts.yaw),
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
