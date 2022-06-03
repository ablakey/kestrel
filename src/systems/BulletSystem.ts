import { assert } from "ts-essentials";
import Victor from "victor";
import { InertiaFactors, MIN_HIT_DISTANCE } from "../config";
import { Bullet } from "../types/Bullet";
import { System } from "./System";

export class BulletSystem extends System {


  update(bullet: Bullet, delta: number) {

    const {blastRadius, damage, hitSound, dumbfire, turnRate} = bullet.definition;

    const deltaSeconds = delta / 1000;
    const target = this.engine.entities.getShip(bullet.target);
    let targetHit: number | null = null;

    /**
     * Detect collisions.
     * If the target is dumbfire, get any entities it could hit.  Otherwise get only the target.
     * If there is no target and it's not dumbfire, there will be no collision candidates.
     */
    const collisionCandidates = dumbfire
      ? this.engine.entities.ships.values() : target ? [target] : []


    for (const candidate of collisionCandidates) {
      if (candidate === null) {
        return;
      }

      const distance = bullet.position.distance(candidate.position);

      if (distance < MIN_HIT_DISTANCE) {
        targetHit = bullet.id;
        bullet.destroyed = true;

        const interiaFactor = InertiaFactors[candidate.definition.size];
        applyHit(candidate, damage, bullet.position, (blastRadius * interiaFactor) / 2);

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
      const nearbyShips = this.engine.entities.getNearbyShips(
        bullet.position,
        blastRadius
      );

      nearbyShips
        .filter((e) => e.id !== targetHit)
        .forEach((e) => {
          const distance = bullet.position.distance(e.position);
          const interiaFactor = InertiaFactors[e.definition.size];
          const damageFactor = (blastRadius - distance) / blastRadius;
          applyHit(
            e,
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
        const turnDirection = bullet.getTurn( target.position);
        if (turnDirection !== "None") {
          bullet.yaw.rotate(turnRate * deltaSeconds * (turnDirection === "Left" ? 1 : -1));
          bullet.velocity = new Victor(1, 0)
            .multiplyScalar(bullet.velocity.magnitude())
            .rotate(bullet.yaw.angle());
        }
      }
    }
  }
  }
}
