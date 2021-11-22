import { Team } from "../enum";
import { assert } from "../utils";
import { BaseUtility } from "./BaseUtility";

export class QueryHelpers extends BaseUtility {
  /**
   * TODOL make public. Accept an optional  "teams" array to filter by?
   */
  private getTargets() {
    return this.ecs.query(["Politics"]).filter((e) => e.components.Politics.team !== Team.Player);
  }

  /**
   * From all possible targets, get the next one by indexing one beyond previousTarget.
   * This depends on ecs.query returning stable results.
   */
  getTarget(currentTarget: number | null, offsetIndex?: number): number | null {
    const targets = this.getTargets();

    if (!targets.length) {
      return null;
    }

    const currentTargetIndex = targets.findIndex((e) => e.id === currentTarget);

    if (currentTargetIndex === -1) {
      return targets[0].id;
    } else {
      const newTarget = targets.at((currentTargetIndex + (offsetIndex ?? 0)) % targets.length);
      assert(newTarget);
      return newTarget.id;
    }
  }
}
