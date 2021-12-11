import { Game, Entity, System } from "../game";

export const AmmoSystem = (game: Game): System => {
  function update(entity: Entity<"Ammo" | "Body">) {
    const { body, ammo } = entity.components;

    // TODO: this is also where we will affect ammo that tracks a target.
    /**
     * Detect collisions.
     */
    game.entities.query(["Body", "Health"]).forEach((e) => {
      const distance = body.position.distance(e.components.body.position);
      if (distance < 50) {
        entity.destroyed = true;
        e.components.health.effects.push({ damage: ammo.damage });
      }
    });
  }

  return { update, componentKinds: ["Ammo", "Body"] };
};
