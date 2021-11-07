import Victor from "victor";
import { Body } from "../components";
import { ValueOf } from "../types";
import { BaseFactory } from "./BaseFactory";
import { BulletFactory } from "./BulletFactory";

export class WeaponFactory extends BaseFactory {
  create(opts: { origin: Body; bulletType: ValueOf<typeof WeaponFactory.WeaponTypes> }) {
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
