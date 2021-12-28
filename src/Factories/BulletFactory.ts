import Victor from "victor";
import { ZIndexes } from "../config";
import { CombatBehaviour, Direction, MovementBehaviour, StrategyBehaviour, Thrust } from "../enum";
import { Weapon, WeaponName, Weapons } from "../Items/Weapons";
import { BaseFactory } from "./BaseFactory";

export class BulletFactory extends BaseFactory {
  create(position: Victor, yaw: number, weaponName: WeaponName, target?: number) {
    const weaponType = Weapons[weaponName];

    this.game.soundFactory.playSound(weaponType.sound, { position });

    if (weaponType.turnRate === undefined) {
      this.createDumbfire(position, yaw, weaponType);
    } else {
      this.createSeeking(position, yaw, weaponType, target);
    }
  }

  private createSeeking(position: Victor, yaw: number, weaponType: Weapon, target?: number) {
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
        },
        sprite: {
          kind: "Sprite",
          name: weaponType.sprite,
          zIndex: ZIndexes.Bullet,
        },
        engine: {
          kind: "Engine",
          direction: Direction.None,
          thrust: Thrust.None, // Weapons do not have additional thrust beyond what they began with.
        },
        ai: {
          kind: "Ai",
          movementBehaviour: MovementBehaviour.PointAt,
          combatBehaviour: CombatBehaviour.None,
          strategy: StrategyBehaviour.None,
        },
        navigation: {
          kind: "Navigation",
          target: target ?? null,
        },
      },
      { lifespan: weaponType.lifespan }
    );
  }

  private createDumbfire(position: Victor, yaw: number, weaponType: Weapon) {
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
