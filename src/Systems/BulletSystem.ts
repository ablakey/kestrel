import { RAD_TO_DEG } from "pixi.js";
import Victor from "victor";
import { Body } from "../Components";
import { InertiaFactors, MIN_HIT_DISTANCE } from "../config";
import { BulletEntity } from "../Factories/BulletFactory";
import { ShipEntity } from "../Factories/ShipFactory";
import { Entity, Game, System } from "../game";
import { getAngle, toDegrees } from "../utils";

export const BulletSystem = (game: Game): System => {
  /**
   * Apply damage to a given ship. If a force is applied, adjust the ship's velocity by that amount.
   */
  function applyHit(
    entity: Entity<"Body" | "Health">,
    damage: number,
    origin?: Victor,
    force?: number
  ) {
    entity.components.health.effects.push({ damage });

    /**
     * If an explosion origin and a force, Apply an impulse.
     */
    if (origin && force) {
      const angle = getAngle(origin, entity.components.body.position);
      const vector = new Victor(1, 0).rotate(angle).multiplyScalar(force);
      entity.components.body.velocity.add(vector);
    }
  }

  function update(entity: BulletEntity, delta: number) {
    const { body, bullet } = entity.components;
    const deltaSeconds = delta / 1000;
    let targetHit: number | null = null;

    /**
     * Detect collisions.
     * If the target is dumbfire, get any entities it could hit.  Otherwise get only the target.
     * If there is no target and it's not dumbfire, there will be no collision candidates.
     */
    const collisionCandidates = bullet.dumbfire
      ? game.entities.query(["Body", "Health", "Kinematics"])
      : [game.entities.get<Entity<"Body" | "Health" | "Kinematics">>(bullet.target)];

    for (const candidate of collisionCandidates) {
      if (candidate === null) {
        return;
      }

      const distance = body.position.distance(candidate.components.body.position);

      if (distance < MIN_HIT_DISTANCE) {
        targetHit = entity.id;
        entity.destroyed = true;

        const interiaFactor = InertiaFactors[candidate.components.kinematics.size];
        applyHit(candidate, bullet.damage, body.position, (bullet.blastRadius * interiaFactor) / 2);

        if (bullet.hitSound) {
          game.soundFactory.playSound(bullet.hitSound, {
            position: candidate.components.body.position,
          });
        }

        break;
      }
    }

    /**
     * If splash damage, find candidates and apply.
     * Do not double count the main target that was hit.
     */
    if (targetHit && bullet.blastRadius) {
      // Get all hurtable targets within blastRadius
      const nearby = game.entities.queryByPosition(
        ["Body", "Health", "Kinematics"],
        body.position,
        bullet.blastRadius
      );

      nearby
        .filter((e) => e.id !== targetHit)
        .forEach((e) => {
          const interiaFactor = InertiaFactors[e.components.kinematics.size];
          applyHit(e, bullet.damage, body.position, bullet.blastRadius * interiaFactor);
        });
    }

    /**
     * Adjust bullet's trajectory.
     */
    if (bullet.turnRate && bullet.target) {
      const target = game.entities.get<ShipEntity>(bullet.target);
      if (target) {
        const turnDirection = Body.getTurnDirection(body, target.components.body.position);
        if (turnDirection !== "None") {
          body.yaw.rotate(bullet.turnRate * deltaSeconds * (turnDirection === "Left" ? 1 : -1));
          body.velocity = new Victor(1, 0)
            .multiplyScalar(body.velocity.magnitude())
            .rotate(body.yaw.angle());
        }
      }
    }
  }

  return { update, kindsOrArchetype: "BulletEntity" };
};
