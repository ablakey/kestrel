import Victor from "victor";
import { ZIndexes } from "../config";
import { WeaponName, Weapons } from "../Items/Weapons";
import { BaseFactory } from "./BaseFactory";

export class BulletFactory extends BaseFactory {
  create(opts: { position: Victor; yaw?: number; weaponName: WeaponName }) {
    const { position, yaw, weaponName } = opts;
    const weaponType = Weapons[weaponName];

    this.game.soundFactory.playSound(weaponType.sound, { position });

    this.game.entities.add(
      {
        body: {
          kind: "Body",
          position,
          yaw: new Victor(1, 0).rotate(yaw ?? 0),
          velocity: new Victor(1, 0).multiplyScalar(weaponType.speed).rotate(yaw ?? 0),
          angularVelocity: 0,
        },
        ammo: {
          kind: "Ammo",
          damage: weaponType.damage,
          trackable: weaponType.trackable,
        },
        sprite: {
          kind: "Sprite",
          name: weaponType.sprite,
          zIndex: ZIndexes.Bullet,
        },
      },
      { lifespan: weaponType.lifespan }
    );
  }
}
