import { Politics } from "../Components";
import { CombatBehaviour, MovementBehaviour } from "../enum";
import { Entity, Game, System } from "../game";
import { pickRandom } from "../utils";

export const AIStrategySystem = (game: Game): System => {
  function update(entity: Entity<"Body" | "Ai" | "Politics" | "Offensive">) {
    const { ai, offensive } = entity.components;

    // Don't do AI strategy for player.
    if (entity.components.player) {
      return;
    }

    // If ship already has a target, don't do any strategy.  TODO: this should be more complex.
    if (entity.components.offensive.target) {
      return;
    }

    const hostileTeams = Politics.getHostileTeams(entity);

    const ships = game.entities.query(["Politics", "Body"]);

    /**
     * Combat?
     * If there's something to fight, do that first.
     */
    // By searching in order of hostileTeams, we attempt to get ships from the team we're most hostile with.
    for (const team of hostileTeams) {
      const worstEnemies = ships.filter((s) => s.components.politics.team === team);
      if (worstEnemies.length) {
        const target = pickRandom(worstEnemies).id;
        console.log(`Ship ${entity.id} become hostile towards Ship ${target}`);
        offensive.target = target;
        ai.combatBehaviour = CombatBehaviour.Aggressive;
        ai.movementBehaviour = MovementBehaviour.PointAt;
        return;
      }
    }

    /**
     * No AI strategy determined. Reset AI.
     */
    if (
      ai.combatBehaviour !== CombatBehaviour.None ||
      ai.movementBehaviour !== MovementBehaviour.None
    ) {
      console.log(`Ship ${entity.id} stop AI.`);
      ai.combatBehaviour = CombatBehaviour.None;
      ai.movementBehaviour = MovementBehaviour.None;
    }
  }
  return { update, componentKinds: ["Body", "Ai", "Politics"] };
};
