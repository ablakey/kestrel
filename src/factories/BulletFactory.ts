import Victor from "victor";
import { Body } from "../components";
import { WeaponName, Weapons } from "../Items";
import { BaseFactory } from "./BaseFactory";

export class BulletFactory extends BaseFactory {
  create(opts: { origin: Body; weaponName: WeaponName }) {
    const weaponType = Weapons[opts.weaponName];

    return this.ecs.addEntity({
      body: {
        kind: "Body",
        pos: opts.origin.pos,
        yaw: opts.origin.yaw,
        vel: new Victor(1, 0).multiplyScalar(2000).rotate(opts.origin.yaw),
      },
      damage: {
        kind: "Damage",
        damage: 10,
      },
      sprite: {
        kind: "Sprite",
        texture: weaponType.bulletTexture,
      },
      shortLived: {
        kind: "ShortLived",
        lifespan: 500,
      },
    });
  }
}
