import Victor from "victor";
import { Body } from "../Components";
import { BulletEntity } from "../Factories/BulletFactory";
import { ShipEntity } from "../Factories/ShipFactory";
import { Game, System } from "../game";

export const BulletSystem = (game: Game): System => {
  function update(entity: BulletEntity, delta: number) {
    const { body, bullet } = entity.components;
    const deltaSeconds = delta / 1000;

    /**
     * Detect collisions.
     * If the bullet has a target, it can only hit that target if it's not dumbfire.
     */
    const collisionCandidates =
      bullet.target && !bullet.dumbfire
        ? [game.entities.get<ShipEntity>(bullet.target)]
        : game.entities.query(["Body", "Health"]);

    collisionCandidates.forEach((e) => {
      if (e === null) {
        return;
      }

      const distance = body.position.distance(e.components.body.position);
      if (distance < 50) {
        entity.destroyed = true;
        e.components.health.effects.push({ damage: bullet.damage });
        if (bullet.hitSound) {
          game.soundFactory.playSound(bullet.hitSound, {
            position: e.components.body.position,
          });
        }
      }
    });

    /**
     * If splash damage, find candidates and apply.
     */
    if (bullet.blastRadius) {
      // Get all hurtable targets within blastRadius
      const nearby = game.entities.queryByPosition(
        ["Body", "Health"],
        body.position,
        bullet.blastRadius
      );

      console.log(nearby.length);
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
