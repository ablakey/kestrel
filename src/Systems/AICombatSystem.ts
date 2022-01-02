import { Game, Entity, System } from "../game";
import { CombatBehaviour } from "../enum";
import { Weapons } from "../Items/Weapons";
import { assert } from "../utils";
import { Body } from "../Components";

/**
 * System decides what weapons to fire and when.
 * This will involve concerns such as weapon range, direction facing, etc.
 */
export const AICombatSystem = (game: Game): System => {
  function update(entity: Entity<"Offensive" | "Body" | "Inventory" | "Ai">) {
    const { offensive, ai, body, inventory } = entity.components;

    /**
     * Stop firing if there is no target.
     */
    if (offensive.target === null) {
      // If an entity has no target, stop firing.
      if (offensive.firePrimary) {
        console.log(`Ship ${entity.id} stop firing.`);
        offensive.firePrimary = false;
      }
      return;
    }

    /**
     * Do no combat AI if the CombatBehaviour is None.
     */
    if (ai.combatBehaviour === CombatBehaviour.None) {
      return;
    }

    /**
     * Calculate if primary weapons should be firing.
     */
    const target = game.entities.get(offensive.target);
    assert(target);
    assert(target.components.body);

    const facing = Body.isFacing(body, target.components.body);
    const distance = body.position.distance(target.components.body.position);
    const maxRanges = inventory.weapons.map((w) => Weapons[w.name].maxRange);
    const inRange = distance < maxRanges[0]; // TODO: filter by weapons that are available.
    // TODO: we should only fire if at least one weapon is in range.

    offensive.firePrimary = facing && inRange;
  }
  return { update, kindsOrArchetype: ["Offensive", "Body", "Inventory", "Ai"] };
};
