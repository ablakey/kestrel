import { Entity } from "../game";
import { Relations } from "../types";
import { pickRandom } from "../utils";

export interface Politics {
  kind: "Politics";
  team: "Independent" | "Player" | "Rebellion" | "Confederacy";
  relations: Relations;
}

export class Politics {
  /**
   * Get a list of hostile teams, sorted by most to least hostile.
   */
  public static getHostileTeams(entity: Entity<"Politics">): Politics["team"][] {
    return Object.entries(entity.components.politics.relations)
      .sort(([, reputationA], [, reputationB]) => reputationB - reputationA)
      .filter(([, reputation]) => reputation < 0)
      .map(([team]) => team as Politics["team"]);
  }

  /**
   * Return one entity id (or null) for the most hostile target present.
   */
  public static getMostHostileTarget(
    entity: Entity<"Politics">,
    ships: Entity<"Politics">[]
  ): Entity<"Politics"> | null {
    const hostileTeams = Politics.getHostileTeams(entity);

    for (const team of hostileTeams) {
      const worstEnemies = ships.filter((s) => s.components.politics.team === team);
      if (worstEnemies.length) {
        return pickRandom(worstEnemies);
      }
    }

    return null;
  }
}
