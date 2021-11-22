import { ECS, Entity, System } from "../ecs";
import { CombatBehaviour } from "../enum";
import { Weapons } from "../Items/Weapons";
import { assert, isFacing } from "../utils";

/**
 * System decides what weapons to fire and when.
 * This will involve concerns such as weapon range, direction facing, etc.
 */
export const AICombatSystem = (ecs: ECS): System => {
  function update(entity: Entity<"Offensive" | "Body" | "Inventory" | "AI">) {
    // Do not attempt to do any AI combat.
    if (entity.components.AI.combatBehaviour === CombatBehaviour.None) {
      return;
    }

    if (entity.components.Offensive.target === null) {
      // If an entity has no target, stop firing.
      if (entity.components.Offensive.primaryFire) {
        entity.components.Offensive.primaryFire = false;
      }
      return;
    }

    /**
     * Calculate if primary weapons should be firing.
     */
    const target = ecs.getEntity(entity.components.Offensive.target);
    assert(target);
    assert(target.components.Body);

    const facing = isFacing(entity.components.Body, target.components.Body, 0.1);
    const distance = entity.components.Body.position.distance(target.components.Body.position);
    const maxRanges = entity.components.Inventory.weapons.map((w) => Weapons[w.name].maxRange);
    const inRange = distance < maxRanges[0]; // TODO: filter by weapons that are available.
    // TODO: we should only fire if at least one weapon is in range.

    entity.components.Offensive.primaryFire = facing && inRange;
  }
  return { update, componentKinds: ["Offensive", "Body", "Inventory", "AI"] };
};
