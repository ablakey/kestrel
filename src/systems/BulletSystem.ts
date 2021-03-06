import Victor from "victor";
import { InertiaFactor, MIN_HIT_DISTANCE } from "../config";
import { Bullet } from "../entities/Bullet";
import { Ship } from "../entities/Ship";
import { getAngle } from "../utils";
import { System } from "./System";

export class BulletSystem extends System {
  update() {
    this.engine.entities.bullets.forEach(this.updateOne);
  }

  private updateOne(bullet: Bullet) {
    const { blastRadius, damage, hitSound, dumbfire, turnRate } = bullet.definition;

    const deltaSeconds = this.engine.delta / 1000;
    const target = this.engine.entities.ships.get(bullet.target);
    let targetHit: number | null = null;

    /**
     * Detect collisions.
     * If the target is dumbfire, get any entities it could hit.  Otherwise get only the target.
     * If there is no target and it's not dumbfire, there will be no collision candidates.
     */
    const collisionCandidates = dumbfire
      ? this.engine.entities.ships.values()
      : target
      ? [target]
      : [];

    for (const candidate of collisionCandidates) {
      if (candidate === null) {
        return;
      }

      const distance = bullet.position.distance(candidate.position);

      if (distance < MIN_HIT_DISTANCE) {
        targetHit = bullet.id;
        bullet.destroyed = true;

        const interiaFactor = InertiaFactor[candidate.definition.size];
        this.applyHit(candidate, damage, bullet.position, (blastRadius * interiaFactor) / 2);

        if (hitSound) {
          this.engine.soundFactory.playSound(hitSound, {
            position: candidate.position,
          });
        }

        break;
      }
    }

    /**
     * If splash damage, find candidates and apply.
     * Do not double count the main target that was hit.
     */
    if (targetHit && blastRadius) {
      const nearbyShips = this.engine.entities.getNearbyShips(bullet.position, blastRadius);

      nearbyShips
        .filter((ship) => ship.id !== targetHit)
        .forEach((ship) => {
          const distance = bullet.position.distance(ship.position);
          const interiaFactor = InertiaFactor[ship.definition.size];
          const damageFactor = (blastRadius - distance) / blastRadius;
          this.applyHit(
            ship,
            damage * damageFactor,
            bullet.position,
            (blastRadius - distance) * interiaFactor
          );
        });
    }

    /**
     * Adjust bullet's trajectory.
     */
    if (turnRate && bullet.target) {
      if (target) {
        const turnDirection = bullet.getTurn(target.position);
        if (turnDirection !== "None") {
          bullet.yaw.rotate(turnRate * deltaSeconds * (turnDirection === "Left" ? 1 : -1));
          bullet.velocity = new Victor(1, 0)
            .multiplyScalar(bullet.velocity.magnitude())
            .rotate(bullet.yaw.angle());
        }
      }
    }
  }

  /**
   * Apply damage to a given ship. If a force is applied, adjust the ship's velocity by that amount.
   */
  private applyHit(ship: Ship, damage: number, origin?: Victor, force?: number) {
    ship.effects.push({ damage });

    /**
     * If an explosion origin and a force, Apply an impulse.
     */
    if (origin && force) {
      const angle = getAngle(origin, ship.position);
      const vector = new Victor(1, 0).rotate(angle).multiplyScalar(Math.max(force, 0));
      ship.velocity.add(vector);
    }
  }
}
