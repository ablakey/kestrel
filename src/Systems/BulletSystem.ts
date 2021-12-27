import { Game, Entity, System } from "../game";

export const BulletSystem = (game: Game): System => {
  function update(entity: Entity<"Bullet" | "Body">) {
    const { body, bullet } = entity.components;

    // TODO: this is also where we will affect bullet that tracks a target.
    /**
     * Detect collisions.
     */
    game.entities.query(["Body", "Health"]).forEach((e) => {
      const distance = body.position.distance(e.components.body.position);
      if (distance < 50) {
        entity.destroyed = true;
        e.components.health.effects.push({ damage: bullet.damage });
      }
    });
  }

  return { update, componentKinds: ["Bullet", "Body"] };
};
