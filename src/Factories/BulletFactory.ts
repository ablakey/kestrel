import Victor from "victor";
import { WeaponName, Weapons } from "../Items/Weapons";
import { BaseFactory } from "./BaseFactory";

export class BulletFactory extends BaseFactory {
  create(opts: { x: number; y: number; yaw: number; weaponName: WeaponName }) {
    const weaponType = Weapons[opts.weaponName];

    const position = new Victor(opts.x, opts.y);

    this.game.soundFactory.playSound(weaponType.sound, { position: position });

    this.game.entities.add(
      {
        body: {
          kind: "Body",
          position,
          yaw: new Victor(1, 0).rotate(opts.yaw),
          velocity: new Victor(1, 0).multiplyScalar(weaponType.speed).rotate(opts.yaw),
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
        },
      },
      { lifespan: weaponType.lifespan }
    );
  }
}
