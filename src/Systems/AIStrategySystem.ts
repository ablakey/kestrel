import { Body, Politics } from "../Components";
import { CombatBehaviour, MovementBehaviour } from "../enum";
import { Entity, Game, System } from "../game";
import { pickRandom } from "../utils";

export const AIStrategySystem = (game: Game): System => {
  function update(entity: Entity<"Body" | "Ai" | "Politics" | "Offensive" | "Navigation">) {
    const { ai, offensive, body, navigation } = entity.components;

    // // If ship already has a target, don't do any strategy.  TODO: this should be more complex.
    // if (entity.components.offensive.target) {
    //   return;
    // }

    const hostileTeams = Politics.getHostileTeams(entity);

    const ships = game.entities.query(["Politics", "Body"]);

    const target = game.entities.get(offensive.target);
    /**
     * Pick a hostile target?
     * If there's something to fight, do that first.
     */
    if (!target) {
      for (const team of hostileTeams) {
        const worstEnemies = ships.filter((s) => s.components.politics.team === team);
        if (worstEnemies.length) {
          const target = pickRandom(worstEnemies).id;
          console.log(`Ship ${entity.id} become hostile towards Ship ${target}`);
          offensive.target = target;
          navigation.target = target;
        }
      }
    }

    /**
     * Point towards?
     */
    if (target) {
      ai.combatBehaviour = CombatBehaviour.Aggressive;
      ai.movementBehaviour = MovementBehaviour.PointAt;
    }

    /**
     * Fly at?
     */
    if (target && Body.isFacing(body, target.components.body!)) {
      ai.movementBehaviour = MovementBehaviour.FlyThrough;
    }

    /**
     * No AI strategy determined. Reset AI.
     */
    if (
      offensive.target === null &&
      (ai.combatBehaviour !== CombatBehaviour.None ||
        ai.movementBehaviour !== MovementBehaviour.None)
    ) {
      console.log(`Ship ${entity.id} stop AI.`);
      ai.combatBehaviour = CombatBehaviour.None;
      ai.movementBehaviour = MovementBehaviour.None;
    }
  }
  return { update, componentKinds: ["Body", "Ai", "Politics", "Offensive", "Navigation"] };
};
