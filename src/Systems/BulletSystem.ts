import Victor from "victor";
import { Body } from "../Components";
import { Direction } from "../enum";
import { ShipEntity } from "../Factories/ShipFactory";
import { Entity, Game, System } from "../game";

export const BulletSystem = (game: Game): System => {
  function update(entity: Entity<"Bullet" | "Body">, delta: number) {
    const { body, bullet } = entity.components;
    const deltaSeconds = delta / 1000;

    /**
     * Detect collisions.
     * If the bullet has a target, it can only hit that target.
     */
    const collisionCandidates = bullet.target
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
      }
    });

    /**
     * Adjust bullet's velocity
     */
    if (bullet.turnRate && bullet.target) {
      const target = game.entities.get<ShipEntity>(bullet.target);
      if (target) {
        const turnDirection = Body.getTurnDirection(body, target.components.body);
        if (turnDirection !== Direction.None) {
          body.yaw.rotate(
            bullet.turnRate * deltaSeconds * (turnDirection === Direction.Left ? 1 : -1)
          );
          body.velocity = new Victor(1, 0)
            .multiplyScalar(body.velocity.magnitude())
            .rotate(body.yaw.angle());
        }
      }
    }
  }

  return { update, componentKinds: ["Bullet", "Body"] };
};
