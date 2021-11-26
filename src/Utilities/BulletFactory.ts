import Victor from "victor";
import { WeaponName, Weapons } from "../Items/Weapons";
import { BaseUtility } from "./BaseUtility";

export class BulletFactory extends BaseUtility {
  create(opts: { x: number; y: number; yaw: number; weaponName: WeaponName }) {
    const weaponType = Weapons[opts.weaponName];

    this.ecs.addEntity(
      {
        Body: {
          kind: "Body",
          position: new Victor(opts.x, opts.y),
          yaw: new Victor(1, 0).rotate(opts.yaw),
          velocity: new Victor(1, 0).multiplyScalar(weaponType.speed).rotate(opts.yaw),
          angularVelocity: 0,
        },
        Damage: {
          kind: "Damage",
          damage: weaponType.damage,
        },
        Sprite: {
          kind: "Sprite",
          texture: weaponType.bulletTexture,
          offsetX: 0.5,
          offsetY: 0.5,
        },
      },
      { lifespan: weaponType.lifespan }
    );
  }
}
