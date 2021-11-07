import Victor from "victor";
import { BaseFactory } from "./BaseFactory";
import laser from "../assets/pixel_laser_green.png";
import { Body } from "../components";
import { ValueOf } from "../types";

export class BulletFactory extends BaseFactory {
  public static readonly BulletTypes = {
    Laser: {
      damage: 10,
      texture: laser,
      speed: 100,
      lifespan: 500,
    },
  };

  create(opts: { origin: Body; bulletType: ValueOf<typeof BulletFactory.BulletTypes> }) {
    return this.ecs.addEntity({
      body: {
        kind: "Body",
        pos: opts.origin.pos,
        yaw: opts.origin.yaw,
        vel: new Victor(1, 0).multiplyScalar(2000).rotate(opts.origin.yaw),
      },
      bullet: {
        kind: "Bullet",
        speed: opts.bulletType.speed,
        lifespan: opts.bulletType.lifespan,
        damage: opts.bulletType.damage,
      },
      sprite: {
        kind: "Sprite",
        texture: opts.bulletType.texture,
      },
    });
  }
}
