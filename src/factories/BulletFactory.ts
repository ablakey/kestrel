import Victor from "victor";
import { Body } from "../components";
import { Weapon } from "../structures/Weapons";
import { ValueOf } from "../types";
import { BaseFactory } from "./BaseFactory";

export class BulletFactory extends BaseFactory {
  create(opts: { origin: Body; weaponType: Weapon }) {
    return this.ecs.addEntity({
      body: {
        kind: "Body",
        pos: opts.origin.pos,
        yaw: opts.origin.yaw,
        vel: new Victor(1, 0).multiplyScalar(2000).rotate(opts.origin.yaw),
      },
      damage: {
        kind: "Damage",
        damage: opts.weaponType.damage,
      },
      sprite: {
        kind: "Sprite",
        texture: opts.weaponType.bulletTexture,
      },
    });
  }
}
