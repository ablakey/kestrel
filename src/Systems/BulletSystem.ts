import { Game, Entity, System } from "../game";

export const BulletSystem = (game: Game): System => {
  function update(entity: Entity<"Damage" | "Body">) {
    const { body, damage } = entity.components;
    /**
     * Detect collisions.
     */
    game.entities.query(["Body", "Health"]).forEach((e) => {
      const distance = body.position.distance(e.components.body.position);
      if (distance < 50) {
        entity.destroyed = true;
        e.components.health.effects.push({ damage: damage.damage });
      }
    });
  }

  return { update, componentKinds: ["Damage", "Body"] };
};
