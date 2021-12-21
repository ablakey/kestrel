import { Team } from "../enum";
import { Entity } from "../game";
import { Relations } from "../types";

export interface Politics {
  kind: "Politics";
  team: Team;
  relations: Relations;
}

export class Politics {
  public static getHostileTeams(entity: Entity<"Politics">): Team[] {
    return Object.entries(entity.components.politics.relations)
      .sort(([, reputationA], [, reputationB]) => reputationB - reputationA)
      .filter(([, reputation]) => reputation < 0)
      .map(([team]) => team as Team);
  }
}
