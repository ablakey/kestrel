import { ECS, Entity, System } from "../ecs";
import { Weapons } from "../Items/Weapons";
import { assert, isFacing } from "../utils";

export const AICombatSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Offensive" | "Body" | "Inventory">) {
    // TODO: AI component to filter by. Then don't filter by player.
    if (entity.components.player || entity.components.offensive.target === null) {
      return;
    }

    /**
     * Calculate if primary weapons should be firing.
     */
    const target = ecs.entities.get(entity.components.offensive.target);
    assert(target);
    assert(target.components.body);

    const facing = isFacing(entity.components.body, target.components.body, 0.1);
    const distance = entity.components.body.position.distance(target.components.body.position);

    // Get range of available primary weapons.
    const maxRanges = entity.components.inventory.weapons.map((w) => Weapons[w.name].maxRange);
    const inRange = distance < maxRanges[0]; // TODO: filter by weapons that are available.
    // TODO: we should only fire if at least one weapon is in range.

    entity.components.offensive.primaryFire = facing && inRange;
  }
  return { update, componentKinds: ["Offensive", "Body", "Inventory"] };
};
