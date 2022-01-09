import Victor from "victor";
import { ZIndexes } from "../config";
import { Components, Entity } from "../game";
import { Weapon } from "../Items/Weapons";
import { BaseFactory } from "./BaseFactory";

type BulletComponents = Components<"Body" | "Bullet" | "Sprite">;

export type BulletEntity = Entity<BulletComponents[keyof BulletComponents]["kind"]>;

export class BulletFactory extends BaseFactory {
  public create(position: Victor, yaw: number, weaponType: Weapon, target?: number) {
    const bulletComponents: BulletComponents = {
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
        target: target ?? null,
        turnRate: weaponType.turnRate ?? null,
      },
      sprite: {
        kind: "Sprite",
        name: weaponType.sprite,
        zIndex: ZIndexes.Bullet,
      },
    };

    this.game.entities.add(bulletComponents, {
      lifespan: weaponType.lifespan,
      archetype: "BulletEntity",
    });
  }
}
