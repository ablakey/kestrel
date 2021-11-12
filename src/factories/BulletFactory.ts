import Victor from "victor";
import { WeaponName, Weapons } from "../Items/Weapons";
import { BaseFactory } from "./BaseFactory";

export class BulletFactory extends BaseFactory {
  create(opts: { x: number; y: number; yaw: number; weaponName: WeaponName }) {
    const weaponType = Weapons[opts.weaponName];

    this.ecs.addEntity(
      {
        body: {
          kind: "Body",
          position: new Victor(opts.x, opts.y),
          yaw: opts.yaw,
          velocity: new Victor(1, 0).multiplyScalar(2000).rotate(opts.yaw),
          angularVelocity: 0,
        },
        damage: {
          kind: "Damage",
          damage: weaponType.damage,
        },
        sprite: {
          kind: "Sprite",
          texture: weaponType.bulletTexture,
        },
      },
      { lifespan: 500 }
    );
  }
}
