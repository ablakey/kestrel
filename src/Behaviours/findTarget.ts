import { Politics } from "../Components";
import { ShipEntity } from "../Factories/ShipFactory";
import { Game } from "../game";
import { pickRandom } from "../utils";

/**
 * Find the most hostile target present and assign that to this entity's offensive.target
 */
export function findTarget(game: Game, entity: ShipEntity) {
  const ships = game.entities.getShips();
  const hostileTeams = Politics.getHostileTeams(entity);

  for (const team of hostileTeams) {
    const worstEnemies = ships.filter((s) => s.components.politics.team === team);
    if (worstEnemies.length) {
      const target = pickRandom(worstEnemies);
      console.log(`Ship ${entity.id} now targeting ${target.id}`);
      entity.components.offensive.target = target.id;
      entity.components.navigation.target = target.id;
    }
  }
}
