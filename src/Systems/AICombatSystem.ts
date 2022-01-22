import { Game, Entity, System } from "../game";
import { Weapons } from "../Inventory/Weapons";
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
     * Do no combat AI if the CombatBehaviour is None.
     */
    if (ai.combatAction === "None") {
      if (!Entity.isPlayer(entity) && (offensive.firePrimary || offensive.fireSecondary)) {
        offensive.firePrimary = false;
        offensive.fireSecondary = false;
      }
      return;
    }

    /**
     * Calculate if primary weapons should be firing.
     */
    const target = game.entities.get(offensive.target);

    if (target === null) {
      return;
    }

    assert(target.components.body);

    const facing = Body.isFacing(body, target.components.body.position);
    const distance = body.position.distance(target.components.body.position);
    const maxRanges = inventory.weapons.map((w) => Weapons[w.name].maxRange);
    const inRange = distance < maxRanges[0]; // TODO: filter by weapons that are available.
    // TODO: we should only fire if at least one weapon is in range.

    offensive.firePrimary = facing && inRange;
  }
  return { update, kindsOrArchetype: ["Offensive", "Body", "Inventory", "Ai"] };
};
