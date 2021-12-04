import { Game, Entity, System } from "../game";

export const BulletSystem = (game: Game): System => {
  function update(entity: Entity<"Damage" | "Body">) {
    /**
     * Detect collisions.
     */
    game.entities.query(["Body", "Health"]).forEach((e) => {
      const distance = entity.components.Body.position.distance(e.components.Body.position);
      if (distance < 50) {
        entity.destroyed = true;
        e.components.Health.effects.push({ damage: entity.components.Damage.damage });
      }
    });
  }

  return { update, componentKinds: ["Damage", "Body"] };
};
