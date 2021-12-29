import Victor from "victor";
import { ZIndexes } from "../config";
import { Weapon } from "../Items/Weapons";
import { BaseFactory } from "./BaseFactory";

export class BulletFactory extends BaseFactory {
  public create(position: Victor, yaw: number, weaponType: Weapon, target?: number) {
    this.game.entities.add(
      {
        body: {
          kind: "Body",
          position,
          yaw: new Victor(1, 0).rotate(yaw ?? 0),
          velocity: new Victor(1, 0).multiplyScalar(weaponType.speed).rotate(yaw ?? 0),
          angularVelocity: 0,
        },
        bullet: {
          kind: "Bullet",
          damage: weaponType.damage,
          target,
          turnRate: weaponType.turnRate,
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
